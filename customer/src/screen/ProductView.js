import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import { Color, Fonts, Strings, Dimension } from '../theme';
import ToolBar from '../components/ToolBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';

import BadgeIcon from '../components/BadgeIcon';
import Cart from '../utils/Cart';
import { ProductImage } from '../axios/ServerRequest';
import
{
  getProductItem,
  getCart,
  setCart,
  setProductItem,
} from '../utils/LocalStorage';
import Toast from 'react-native-simple-toast';

class ProductView extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      quantity: 0,
      cartCount: 0,
      productItem: null,
      count: 0,
      cart: null,
    };
  }
  async componentDidMount()
  {
    let cart = await getCart();
    let item = null;
    if (this.props.route.params !== undefined)
    {
      item = this.props.route.params.item;
    }
    let cartCount = Cart.getTotalCartCount(cart);
    let count = Cart.getItemCountByProductView(cart, item);
    this.setState({
      productItem: item,
      cartCount: cartCount,
      cart: cart,
      count: count,
      quantity: 1,
    });
  }

  setToCart = (item, id, value, price) =>
  {
    let cart = {
      count: value,
      id: id,
      item: item,
      subTotal: parseFloat(price) * value,
    };
    this.addToCart(cart);
  };

  addToCart = async params =>
  {
    const { cart } = this.state;
    let cartListData = cart !== null ? cart : [];
    let itemIndex = Cart.isProductExist(cart, params);
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
    this.setState({
      cartCount: totalCount,
      cart: cartListData,
    });
    setCart(cartListData);
    Toast.showWithGravity(
      'Thêm sản phẩm thành công',
      Toast.SHORT,
      Toast.BOTTOM,
    );
  };

  render()
  {
    const { navigation } = this.props;
    const { productItem, isProductExist, count, quantity } = this.state;
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar
          backgroundColor={Color.colorPrimary}
          barStyle="light-content"
        />
        <ToolBar
          title="Thông tin sản phẩm"
          icon="arrow-left"
          onPress={() => navigation.goBack()}>
          <BadgeIcon
            icon="shopping-cart"
            count={this.state.cartCount}
            onPress={() =>
            {
              navigation.navigate('MyCart');
            }}
          />
        </ToolBar>
        {productItem !== undefined && productItem !== null ? (
          <ScrollView style={styles.scrollView}>
            <View style={styles.imageContainer}>
              <View>
                <Image
                  style={styles.productImage}
                  source={{
                    uri: productItem.image,
                  }}
                />
              </View>
            </View>
            <View style={styles.contentContainer}>
              {productItem.quantity > 0 ? (
                <Text style={styles.quantityContainer}>
                  Tình trạng: Còn hàng
                </Text>
              ) : (
                <Text style={styles.quantityContainer}>
                  Tình trạng: Hết hàng
                </Text>
              )}

              <Text style={styles.option}>
                {productItem.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                  ' VND' +
                  ' / ' +
                  productItem.unit.name}{' '}
              </Text>
              <Text style={styles.title}>{productItem.product_name}</Text>
              <Text style={styles.description}>{productItem.description}</Text>

              <View style={styles.quantity}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.plusBtn}
                  onPress={() =>
                  {
                    {
                      quantity > 1
                        ? this.setState({
                          quantity: quantity - 1,
                        })
                        : this.setState({
                          quantity: 1,
                        });
                    }
                  }}>
                  <Icon name="minus" size={20} color={Color.red} />
                </TouchableOpacity>
                <Text style={styles.counter}>{quantity}</Text>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.plusBtn}
                  onPress={() =>
                  {
                    this.setState({
                      quantity: quantity + 1,
                    });
                  }}>
                  <Icon name="plus" size={18} color={Color.colorPrimary} />
                </TouchableOpacity>
              </View>
              <View style={styles.addToCart}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                  {
                    this.setState({
                      count: count + quantity,
                    });
                    this.setToCart(
                      productItem,
                      productItem.product_id,
                      count + quantity,
                      productItem.price,
                    );
                  }}>
                  <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
    flexDirection: 'column',
  },
  title: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
  },
  imageContainer: {
    display: 'flex',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  productImage: {
    height: 200,
    width: 200,
  },
  box2: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 20,
    height: 20,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 16,
    color: Color.gray,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    marginTop: 20,
  },
  description: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 14,
    color: Color.gray,
    textAlign: 'center',
    marginTop: 20,
  },
  counter: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
    color: Color.black,
    textAlign: 'center',
    width: 30,
  },
  option: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
    color: Color.colorPrimary,
  },
  quantityContainer: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
    color: Color.colorPrimary,
    marginBottom: 20,
  },
  addToCartText: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    color: Color.white,
  },
  plusBtn: {
    padding: 10,
  },
  addToCart: {
    backgroundColor: Color.colorPrimary,
    color: Color.white,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: 140,
    marginTop: 20,
    marginLeft: 5,
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Color.white,
    color: Color.white,
    textAlign: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 33,
    width: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginTop: 20,
  },
});

export default ProductView;
