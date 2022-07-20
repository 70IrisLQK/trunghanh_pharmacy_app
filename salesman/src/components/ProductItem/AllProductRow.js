import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-feather1s';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color, Dimension, Fonts } from '../../theme';
class ProductItem extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      item: this.props.item,
      count: this.props.count ? this.props.count : 0,
      cart: null,
    };
  }

  setCart = (item, id, value, price) =>
  {
    let cart = {
      count: value,
      id: id,
      item: item,
      subTotal: parseFloat(price) * value,
    };
    this.setState(
      {
        cart: cart,
      },
      () =>
      {
        this.props.addToCart(this.state.cart);
      },
    );
  };

  render()
  {
    const { item, count, navigation } = this.props;
    console.log(this.props.onPress)
    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <View style={{ width: 70, marginLeft: 10 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.props.onPress}
              style={{ display: 'flex', flexDirection: 'row' }}>
              <Image
                style={styles.productImage}
                source={{
                  uri: item.image,
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
            <Text style={styles.title}>{item.product_name}</Text>
            <Text style={styles.option}>
              {(item.price).toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND' + '/' + item.unit.name}
            </Text>
            {count > 0 ? (
              <View style={styles.quantity}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.plusBtn}
                  onPress={() =>
                  {
                    this.setState({
                      count: this.state.count - 1,
                    });
                    this.setCart(item, item.product_id, this.state.count - 1, item.price);
                  }}>
                  <Icon name="minus" size={20} color={Color.red} />
                </TouchableOpacity>
                <Text style={styles.counter}>{count}</Text>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.plusBtn}
                  onPress={() =>
                  {
                    this.setState({
                      count: this.state.count + 1,
                    });
                    this.setCart(item, item.product_id, this.state.count + 1, item.price);
                  }}>
                  <Icon name="plus" size={18} color={Color.colorPrimary} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.addToCart}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                  {
                    this.setState({ count: this.state.count + 1 });
                    this.setCart(
                      item,
                      item.product_id,
                      this.state.count + 1,
                      item.price,
                    );
                  }}>
                  <Text style={styles.addToCartText}>Thêm vào đơn hàng</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

ProductItem.propTypes = {
  addToCart: PropTypes.func,
  item: PropTypes.object,
  count: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    flex: 1,
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
    elevation: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  box1: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 20,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 14,
    color: Color.gray,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    marginLeft: 10,
    marginRight: 10,

    height: 40,
    width: Dimension.window.width - 150,
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
    fontSize: 14,
    color: Color.red,
    marginLeft: 10,
    marginRight: 10,
  },
  productImage: {
    height: 70,
    width: 70,
  },
  addToCart: {
    backgroundColor: Color.colorPrimary,
    color: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 160,
    height: 40,
    marginTop: 5,
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
    marginTop: 5,
  },

  addToCartText: {
    color: Color.white,
  },
  plusBtn: {
    padding: 10,
  },
});
export default ProductItem;
