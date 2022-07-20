import React, { Component } from 'react';
import
{
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import { Color, Fonts, Dimension } from '../theme';
import ToolBar from '../components/ToolBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';
import { getUserDetails, getCart, setCart } from '../utils/LocalStorage';
import Cart from '../utils/Cart';
import { orderPlace } from '../axios/ServerRequest';
import Loading from '../components/Loading';
import Toast from 'react-native-simple-toast';
import CartItem from '../components/CartItem';

class PlaceOrderScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      user: null,
      cartList: [],
      totalPrice: '',
      paymentMethod: '',
      loading: true,
      ck: 0,
      debt: 0,
    };
  }

  async componentDidMount()
  {
    this.reRenderSomething = this.props.navigation.addListener('focus', () =>
    {
      this.init();
    });
  }
  addToCart = async params =>
  {
    let cart = await getCart();
    let cartListData = cart !== null ? cart : [];
    let itemIndex = Cart.isProductExist(cartListData, params);
    if (itemIndex === -1)
    {
      cartListData.push(params);
    } else
    {
      if (params.count > 0)
      {
        cartListData[itemIndex] = params;
      } else
      {
        let filterData = cartListData.filter(item => item.id !== params.id);
        cartListData = filterData;
      }
    }
    let totalCount = Cart.getTotalCartCount(cartListData);
    let totalPrice = cartListData.reduce(
      (accum, item) => accum + item.subTotal,
      0,
    );
    this.setState({
      cartCount: totalCount,
      cartList: cartListData,
      totalPrice: totalPrice,
    });
    setCart(cartListData);
  };

  init = async () =>
  {
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

  onPlaceOrder = () =>
  {
    this.refs.loading.show();
    let itemPharmacy = null;
    if (this.props.route.params !== undefined)
    {
      itemPharmacy = this.props.route.params.item;
    }
    const { cartList, totalPrice, user, ck, cartCount } = this.state;
    const orderItems = [];
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
      fullname: itemPharmacy.CUSTOMER_NAME,
      phone: itemPharmacy.customer_tel,
      address: itemPharmacy.CUSTOMER_ADDRESS,
      user_id: user.user_id,
      total: totalPrice - ck,
      orderItems: orderItems,
      pharmacy_id: itemPharmacy.pharmacy_id,
      discount_price: ck,
      quantity: cartCount,
    };
    orderPlace(orderDetails)
      .then(response =>
      {
        let data = response.data;
        if (data.status === 'success')
        {
          setCart(null);
          this.props.navigation.goBack();
          Toast.showWithGravity('Đặt hàng thành công!', Toast.SHORT, Toast.BOTTOM);
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
      <CartItem
        item={item.item}
        addToCart={this.addToCart}
        count={item.count}
        subTotal={item.subTotal}
      />
    );
  }

  createAlert = () =>
  {
    const { item, count } = this.props;
    Alert.alert(
      '',
      'Bạn chắn chắn muốn bỏ đơn hàng này?',
      [
        {
          text: 'Đồng ý',
          onPress: () =>
          {
            this.props.navigation.goBack(setCart(null));
          },
        },
        {
          text: 'Không',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  render()
  {
    const { navigation } = this.props;
    const { pharmacy, cartList } = this.state;
    let itemPharmacy = null;
    if (this.props.route.params !== undefined)
    {
      itemPharmacy = this.props.route.params.item;
    }
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

    return (
      <View style={styles.mainContainer}>
        <View style={styles.box1}>
          <AppStatusBar
            backgroundColor={Color.colorPrimary}
            barStyle="light-content"
          />
          <ToolBar
            title="Đơn hàng"
            icon="arrow-left"
            onPress={() =>
            {
              cartList.length > 0
                ? this.createAlert()
                : navigation.goBack(setCart(null));
            }}
          />
          <ScrollView style={{ paddingBottom: 200 }}>
            <View style={styles.addressContainer}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.title}>Thông tin chung </Text>
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
                  flexDirection: 'column',
                  marginBottom: 10,
                }}>
                <Text style={styles.title}>Hiệu thuốc mua: </Text>
                <Text style={styles.title1}>
                  {itemPharmacy ? itemPharmacy.CUSTOMER_NAME : null}
                  {itemPharmacy.customer_tel
                    ? ' | ' + itemPharmacy.customer_tel
                    : null}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexDirection: 'column',
                  marginBottom: 10,
                }}>
                <Text style={styles.title}>Địa chỉ: </Text>
                <Text style={styles.title1}>
                  {itemPharmacy ? itemPharmacy.CUSTOMER_ADDRESS : null}
                </Text>
              </View>
            </View>
            <View style={styles.addContainer}>
              <TouchableOpacity
                onPress={() =>
                {
                  navigation.navigate('PopularProducts');
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <Text style={styles.titleAdd}>Thêm sản phẩm </Text>
                  <Icon
                    name="plus"
                    style={styles.iconAdd}
                    size={18}
                    thin={true}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: '100%',
                  height: 2,
                  backgroundColor: '#eeeeee',
                  marginBottom: 10,
                }}
              />
            </View>
            <FlatList
              data={this.state.cartList}
              renderItem={({ item, index }) => this.renderCartItem(item, index)}
              keyExtractor={item => item.id}
              extraData={this.state}
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
                <Text style={styles.subTitle}>Tiền Hàng (tạm tính): </Text>
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
                <Text style={styles.subTitle}>Chiết khấu : </Text>
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
                <Text style={styles.subTitle}>Tổng Cộng : </Text>
                <Text style={styles.title}>
                  {(this.state.totalPrice - this.state.ck)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                  VND
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
        {cartList.length > 0 ? (
          <View style={styles.box2}>
            <View style={styles.paymentContainer}>
              <TouchableOpacity
                style={styles.checkout_container}
                onPress={() => this.onPlaceOrder()}>
                <Text style={styles.checkout}>
                  Gửi đơn
                  {this.state.totalPrice
                    ? ' - ' +
                    (this.state.totalPrice - this.state.ck)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                    ' VND'
                    : null}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
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
  subTitle: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    color: Color.gray,
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
  addContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    margin: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    fontWeight: 'bold',
  },
  titleAdd: {
    fontSize: 18,
    fontFamily: Fonts.primaryRegular,
    fontWeight: 'bold',
    color: Color.colorPrimary,
  },
  iconAdd: {
    color: Color.colorPrimary,
  },
  title1: {
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
    justifyContent: 'center',
  },
  total_price: {
    height: 50,
    paddingTop: 10,
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: '700',
    backgroundColor: Color.white,
    color: Color.colorPrimary,
  },
  checkout_container: {
    textAlign: 'center',
    height: 90,
    backgroundColor: Color.colorPrimary,
    color: Color.white,
  },
  checkout: {
    width: '100%',
    paddingTop: 10,
    fontSize: 20,
    fontWeight: '700',
    color: Color.white,
  },
});

export default PlaceOrderScreen;
