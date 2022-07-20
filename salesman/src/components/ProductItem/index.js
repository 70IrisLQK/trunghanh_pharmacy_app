import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color, Fonts } from '../../theme';
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
    const { item, navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <View style={styles.innerContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.props.onPress}>
              <Image
                style={styles.productImage}
                source={{
                  uri: item.image,
                }}
              />
              <Text style={styles.title}>{item.product_name}</Text>

              <Text style={styles.option}>
                {(item.price).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND' + '/' + item.unit.name}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

ProductItem.propTypes = {
  item: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    width: 220,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 14,
    color: Color.black,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    height: 35,
  },
  option: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 14,
    color: Color.red,
    textAlign: 'center',
  },
  productImage: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    alignContent: 'center',
    alignSelf: 'center'
  },
});
export default ProductItem;
