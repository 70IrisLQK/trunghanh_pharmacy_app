import React, { Component } from 'react';
import
{
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import { Color, Fonts, Dimension } from '../theme';
import ToolBar from '../components/ToolBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getUserDetails, getCart, setCart } from '../utils/LocalStorage';
import Cart from '../utils/Cart';
import OrderItem from '../components/ProductItem/OrderItem';
import { Picker } from '@react-native-community/picker';
import { orderPlace } from '../axios/ServerRequest';
import Loading from '../components/Loading';
import Toast from 'react-native-simple-toast';
import { getAllPayment } from '../axios/ServerRequest';
import UserInput from '../components/UserInput';
import Icons from 'react-native-feather1s';
import Validator from '../utils/Validator/Validator';
import { DEFAULT_RULE_INPUT } from '../utils/Validator/rule';

class PlaceOrder extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      user: null,
      cartList: [],
      totalPrice: '',
      paymentMethod: '',
      payments: [],
      paid: 0,
      paidError: false,
      paidErrorMessage: '',
      ck: 0,
      debt: 0,
      cartCount: null,
    };
  }

  async componentDidMount()
  {
    this.reRenderSomething = this.props.navigation.addListener('focus', () =>
    {
      this.init();
    });
  }

  init = async () =>
  {
    this.fetchPayment();
    let cart = await getCart();
    let userDetails = await getUserDetails();
    let totalPrice = cart.reduce((accum, item) => accum + item.subTotal, 0);
    this.setState({
      cartCount: Cart.getTotalCartCount(cart),
      cartList: cart,
      user: userDetails,
      totalPrice: totalPrice,
    });
  };

  fetchPayment = () =>
  {
    this.refs.loading.show();
    getAllPayment()
      .then(response =>
      {
        this.setState({ payments: response.data.payments });
        this.refs.loading.close();
      })
      .catch(error =>
      {
        console.log(error);
        this.refs.loading.close();
      });
  };

  resetState = () =>
  {
    this.setState({
      paidErrorMessage: '',
      paidError: false,
    });
  };

  onPlaceOrder = () =>
  {
    const {
      user,
      cartList,
      totalPrice,
      paymentMethod,
      paid,
      ck,
      debt,
      cartCount, paidErrorMessage, paidError
    } = this.state;
    const orderItems = [];
    if (paid < 0)
    {
      this.setState({
        paidErrorMessage: 'Không nhập nhỏ hơn 0',
        paidError: true,
      });
      return;
    }
    if (!Validator(paid, DEFAULT_RULE_INPUT))
    {
      this.setState({
        paidErrorMessage: 'Thông tin bắt buộc',
        paidError: true,
      });
      return;
    }

    this.refs.loading.show();
    for (let i = 0; i < cartList.length; i++)
    {
      const orderItem = {
        id: cartList[i].item.product_id,
        itemName: cartList[i].item.product_name,
        itemQuantity: cartList[i].count,
        itemImage: cartList[i].item.image,
        itemPrice: cartList[i].item.price,
        itemTotal: cartList[i].subTotal,
        itemUnit: cartList[i].item.unit.name,
      };
      orderItems.push(orderItem);
    }
    const orderDetails = {
      fullname: user.fullname,
      phone: user.phone,
      address: user.address,
      user_id: user.user_id,
      total: totalPrice - ck,
      payment_id: paymentMethod,
      orderItems: orderItems,
      paid: paid,
      debt: debt - paid,
      quantity: cartCount,
      ck: ck,
    };
    orderPlace(orderDetails)
      .then(response =>
      {
        let data = response.data;
        if (data.status === 'success')
        {
          setCart(null);
          this.props.navigation.navigate('ThankYou');
          this.refs.loading.close();
        }
      })
      .catch(error =>
      {
        console.log(error.message);
        Toast.showWithGravity(error.message);
        this.refs.loading.close();
      });
  };

  renderCartItem(item)
  {
    return (
      <OrderItem item={item.item} count={item.count} subTotal={item.subTotal} />
    );
  }

  render()
  {
    const { navigation } = this.props;
    const { user, payments, paymentMethod } = this.state;

    if (this.state.totalPrice > 5000000)
    {
      this.state.ck = (this.state.totalPrice / 100) * 2;
    } else if (this.state.totalPrice > 10000000)
    {
      this.state.ck = (this.state.totalPrice / 100) * 5;
    } else if (this.state.totalPrice > 20000000)
    {
      this.state.ck = (this.state.totalPrice / 100) * 10;
    } else
    {
      this.state.ck;
    }

    this.state.debt = this.state.totalPrice - this.state.ck;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.box1}>
          <AppStatusBar
            backgroundColor={Color.colorPrimary}
            barStyle="light-content"
          />
          <ToolBar
            title="Đặt hàng"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          />
          <ScrollView style={{ paddingBottom: 200 }}>
            <TouchableOpacity
              onPress={() =>
              {
                this.props.navigation.navigate('Address');
              }}>
              <View style={styles.addressContainer}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',

                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.title}>Địa chỉ nhận hàng </Text>
                    <Icons
                      size={16}
                      name="arrow-right"
                      style={{ marginLeft: 200, marginTop: 3 }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 2,
                    backgroundColor: '#eeeeee',
                    marginBottom: 10,
                  }}
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginBottom: 10,
                  }}>
                  <Text style={styles.title}>
                    Tên: {user ? user.fullname : null}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginBottom: 10,
                  }}>
                  <Text style={styles.title}>
                    SĐT: {user ? user.phone : null}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <Text style={styles.title}>
                    Địa chỉ: {user ? user.address : null}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <FlatList
              data={this.state.cartList}
              renderItem={({ item, index }) => this.renderCartItem(item, index)}
              keyExtractor={item => item.id}
              extraData={this.state}
              maxToRenderPerBatch
            />
            <View style={styles.amountContainer}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.title}>Tiền Hàng (tạm tính): </Text>
                <Text style={styles.title}>
                  {this.state.totalPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                  VND{' '}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.title}>Chiết khấu : </Text>
                <Text style={styles.title}>
                  {this.state.totalPrice > 5000000
                    ? this.state.ck
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : this.state.totalPrice > 10000000
                      ? this.state.ck
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      : this.state.totalPrice > 100000000
                        ? this.state.ck
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : 0}{' '}
                  VND
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 2,
                  backgroundColor: '#eeeeee',
                  marginBottom: 10,
                }}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.title}>Tổng Cộng : </Text>
                <Text style={styles.title}>
                  {(this.state.totalPrice - this.state.ck)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                  VND
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginBottom: 10,
                }}>
                <Text style={styles.title}>Đặt hàng : </Text>
                <UserInput
                  error={this.state.paidError}
                  value={this.state.paid}
                  errorMessage={this.state.paidErrorMessage}
                  keyboardType="numeric"
                  maxLength={20}
                  placeholder='0'
                  onChangeText={paid =>
                  {
                    this.setState({
                      paid: paid > this.state.totalPrice ? 0 : paid,
                    }),
                      this.resetState();
                  }}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.title}>Còn nợ : </Text>
                <Text style={styles.title}>
                  {(this.state.debt - this.state.paid)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                  VND
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.box2}>
          <View style={styles.paymentContainer}>
            <View style={{ width: '35%' }}>
              <View
                style={{ backgroundColor: Color.white, color: Color.primary }}>
                <Picker
                  selectedValue={this.state.paymentMethod}
                  style={{ height: 50, width: '100%' }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ paymentMethod: itemValue })
                  }>
                  {payments.map((item, index) =>
                  {
                    return (
                      <Picker.Item
                        label={item.name}
                        value={item.payment_id}
                        key={item.payment_id}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View style={{ width: '65%' }}>
              <TouchableOpacity
                style={styles.checkout_container}
                onPress={() =>
                {
                  this.state.paid >= 0
                    ? this.onPlaceOrder()
                    : Toast.showWithGravity(
                      'Thông tin thanh toán không chính xác',
                      Toast.BOTTOM,
                      Toast.SHORT,
                    );
                }}>
                <Text style={styles.checkout}>
                  {this.state.paid > 0
                    ? `Đặt hàng - ${this.state.paid
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND`
                    : 'Đặt hàng'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Loading ref="loading" indicatorColor={Color.colorPrimary} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
    flexDirection: 'column',
  },
  scrollView: {
    backgroundColor: Color.white,
    flexDirection: 'column',
    padding: 20,
    flexGrow: 1,
  },
  bottomImage: {
    height: 150,
    width: 150,
    position: 'absolute',
    bottom: 0,
    right: 80,
    zIndex: 1,
    flex: 1,
    opacity: 0.5,
    justifyContent: 'flex-end',
  },
  userRow: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: Color.graylight,
    margin: 10,
  },
  amountContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 20,
    padding: 20,
    margin: 10,
    backgroundColor: '#ffffff',
    marginBottom: 180,
  },
  addressContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 20,
    padding: 20,
    margin: 10,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
  },
  box2: {
    width: Dimension.window.width,
    height: 50,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: Color.colorPrimary,
    display: 'flex',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  paymentContainer: {
    flexDirection: 'row',
    flexDirection: 'row',
  },
  total_price: {
    height: 50,
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    backgroundColor: Color.white,
    color: Color.colorPrimary,
  },
  checkout_container: {
    textAlign: 'center',
    height: 50,
    backgroundColor: Color.colorPrimary,
    color: Color.white,
  },
  checkout: {
    width: '100%',
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: Color.white,
  },
});

export default PlaceOrder;
