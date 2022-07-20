import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import ToolBar from '../components/ToolBar';
import { Color, Fonts } from '../theme';


class ProductView extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      productItem: null,
    };
  }
  async componentDidMount()
  {
    let item = null;
    if (this.props.route.params !== undefined)
    {
      item = this.props.route.params.item;
    }
    this.setState({
      productItem: item,
    });
  }

  render()
  {
    const { navigation } = this.props;
    const { productItem } = this.state;
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar
          backgroundColor={Color.colorPrimary}
          barStyle="light-content"
        />
        <ToolBar
          title="Thông tin sản phẩm"
          icon="arrow-left"
          onPress={() => navigation.goBack()}></ToolBar>
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
                {(productItem.price).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND' + '/' + productItem.unit.name}
                {/* {productItem.price.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }) +
                  '/' +
                  productItem.unit.name} */}
              </Text>
              <Text style={styles.title}>{productItem.product_name}</Text>
              <Text style={styles.description}>
                {productItem ? productItem.description : null}
              </Text>
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
