import React, { Component } from 'react';

import
  {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    FlatList,
    Button,
  } from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import { Color, Fonts, Dimension } from '../theme';
import ToolBar from '../components/ToolBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getUserDetails, getCart, setCart } from '../utils/LocalStorage';
import Cart from '../utils/Cart';
import CartItem from '../components/CartItem';
import EmptyCart from '../assets/images/emptycart.png';
class MyCartScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      cartCount: 0,
      user: null,
      cartList: [],
      totalPrice: '',
      pharmacy: []
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
    let cart = await getCart();
    let userDetails = await getUserDetails();
    let totalPrice = cart.reduce((accum, item) => accum + item.subTotal, 0);
    let item = null;
    if (this.props.route.params !== undefined)
    {
      item = this.props.route.params.item;
    }
    this.setState({
      cartCount: Cart.getTotalCartCount(cart),
      cartList: cart,
      user: userDetails,
      totalPrice: totalPrice,
      pharmacy: item,
    });
  };

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
  renderCartItem(item)
  {
    let count = Cart.getItemCount(this.state.cartList, item);
    return (
      <CartItem item={item.item} addToCart={this.addToCart} count={count} />
    );
  }

  render()
  {
    const { navigation, item } = this.props;
    const { pharmacy } = this.state;
    return (
      <View style={styles.container}>
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
              navigation.goBack()
            }}
          />
          <View style={styles.contactContainer}>
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
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              <Text style={styles.title}>{pharmacy ? pharmacy.CUSTOMER_NAME + ' | ' + pharmacy.customer_tel : null} </Text>
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
              <Text style={styles.title}>{pharmacy ? pharmacy.CUSTOMER_ADDRESS : null}</Text>
            </View>
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
            key={item => item.product_id}
            data={this.state.cartList}
            renderItem={({ item, index }) => this.renderCartItem(item, index)}
            keyExtractor={item => item.product_id}
            extraData={this.state}
            contentInset={{ bottom: 150 }}
            contentContainerStyle={{ paddingBottom: 150 }}
          />
        </View>
        {this.state.cartCount > 0 ? (
          <View style={styles.box2}>
            <View style={{ width: '50%' }}>
              <Text style={styles.total_price}>
                Tổng cộng: {this.state.totalPrice}
              </Text>
            </View>
            <View style={{ width: '50%' }}>
              <TouchableOpacity
                style={styles.checkout_container}
                onPress={() =>
                {
                  this.props.navigation.navigate('ProductView', {
                    screen: 'PlaceOrder',
                  });
                }}>
                <Text style={styles.checkout}>Mua sắm ({this.state.cartCount})</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View style={styles.imgContainerStyle}>
              <Image style={styles.imageStyle} source={EmptyCart} />
            </View>
            <Text style={styles.title}>Bạn chưa có sản phẩm nào trong giỏ hàng</Text>
            <Button
              color={Color.colorPrimaryDark}
              title="Tiếp tục mua sắm"
              onPress={() =>
              {
                this.props.navigation.navigate('ProductView', {
                  screen: 'Home',
                });
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  box1: {
    display: 'flex',
    flexDirection: 'column',
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
  },
  total_price: {
    height: 50,
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 20,
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
    fontSize: 20,
    fontWeight: '700',
    color: Color.white,
  },
  imgContainerStyle: {
    height: 250,
    width: 250,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    resizeMode: 'center',
  },
  title: {
    color: Color.textColor,
    fontFamily: Fonts.primarySemiBold,
    fontSize: 20,
    marginBottom: 20,
  },
  btnStyle: {
    padding: 10,
    backgroundColor: Color.colorPrimaryDark,
    borderRadius: 20,
    margin: 20,
    fontSize: 16,
  },
  contactContainer: {
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
});

export default MyCartScreen;
