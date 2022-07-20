import React, { Component } from 'react';
import {
  FlatList, ScrollView, StyleSheet, Text, View
} from 'react-native';
import Icon from 'react-native-feather1s';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppStatusBar from '../components/AppStatusBar';
import CartItem from '../components/CartItem';
import Loading from '../components/Loading';
import ToolBar from '../components/ToolBar';
import { Color, Fonts } from '../theme';
import Cart from '../utils/Cart';
import { getCart, getUserDetails, setCart } from '../utils/LocalStorage';

class PlaceOrderCheckInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cartList: [],
      totalPrice: '',
      paymentMethod: '',
      ck: 0,
      debt: 0,
    };
  }

  async componentDidMount() {
    this.reRenderSomething = this.props.navigation.addListener('focus', () => {
      this.init();
    });
  }
  addToCart = async params => {
    let cart = await getCart();
    let cartListData = cart !== null ? cart : [];
    let itemIndex = Cart.isProductExist(cartListData, params);
    if (itemIndex === -1) {
      cartListData.push(params);
    } else {
      if (params.count > 0) {
        cartListData[itemIndex] = params;
      } else {
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

  init = async () => {
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

  renderCartItem(item) {
    return (
      <CartItem
        item={item.item}
        addToCart={this.addToCart}
        count={item.count}
        subTotal={item.subTotal}
      />
    );
  }

  render() {
    const {navigation} = this.props;

    if (this.state.totalPrice > 5000000) {
      this.state.ck = (this.state.totalPrice / 100) * 2;
    } else if (this.state.totalPrice > 10000000) {
      this.state.ck = (this.state.totalPrice / 100) * 5;
    } else if (this.state.totalPrice > 20000000) {
      this.state.ck = (this.state.totalPrice / 100) * 10;
    } else {
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
            onPress={() => navigation.goBack()}
          />
          <ScrollView style={{paddingBottom: 200}}>
            <View style={styles.addContainer}>
              <TouchableOpacity
                onPress={() => {
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
              renderItem={({item, index}) => this.renderCartItem(item, index)}
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
                <Text style={styles.title}>Thành tiền: </Text>
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
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.subTitle}>Tiền Hàng (tạm tính): </Text>
                <Text style={styles.title4}>
                  {this.state.totalPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                  VND{' '}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.subTitle}>Chiết khấu : </Text>
                <Text style={styles.title4}>
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
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.subTitle}>Tổng Cộng : </Text>
                <Text style={styles.title4}>
                  {(this.state.totalPrice - this.state.ck)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND'}
                </Text>
              </View>
            </View>
          </ScrollView>
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
  subTitle: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    color: Color.gray,
  },
  title4: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    fontWeight: 'bold',
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
  addContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    margin: 10,
  },
  title: {
    fontSize: 18,
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
});

export default PlaceOrderCheckInScreen;
