import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Color, Fonts, Dimension } from '../../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
class ProductItem extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      item: this.props.item,
    };
  }

  render()
  {
    const { item } = this.props;
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
            <TouchableOpacity activeOpacity={1} onPress={this.props.onPress}>
              <Text style={styles.title}>{item.product_name}</Text>
              <Text style={styles.option}>
                Giá bán:{' '}
                {(item.price).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND' + '/' + item.unit.name}
                {/* {item.price.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }) +
                  '/' +
                  item.unit.name} */}
              </Text>
            </TouchableOpacity>
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
});
export default ProductItem;
