import React, { Component } from 'react';
import
{
  View,
  StyleSheet,
  Image,
  FlatList, StatusBar, ScrollView, Text
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import { Color, Fonts, } from '../theme';
import SearchBar from '../components/SearchBar';
import ToolBar from '../components/ToolBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';
import BadgeIcon from '../components/BadgeIcon';
import { getProductList, searchProductCategory, } from '../axios/ServerRequest';
import { getCart, setCart } from '../utils/LocalStorage';
import ProductRow from '../components/ProductItem/ProductRow';
import Cart from '../utils/Cart';
import Loading from '../components/Loading';
import EmptyProduct from '../assets/images/emptyproduct.png';
import Toast from "react-native-simple-toast"

class ProductsScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      categoryData: [],
      products: [],
      selected: false,
      cartCount: 0,
      cartList: [],
      category: '',
      showSearch: false,
      searchData: [],
      searchText: '',
      category_id: '',
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
    this.fetchProductsList(this.props.route.params.item.category_id);
    let categoryID = this.props.route.params.item.category_id;
    let cart = await getCart();
    this.setState({ searchProduct: [], showSearch: false });
    this.setState({
      cartList: await getCart(),
      cartCount: Cart.getTotalCartCount(cart),
      category: this.props.route.params.item.category,
      category_id: categoryID,
    });
  };

  fetchProductsList = category =>
  {
    this.refs.loading.show();

    getProductList(category)
      .then(response =>
      {
        this.setState({ products: response.data.products });
        this.refs.loading.close();
      })
      .catch(error =>
      {
        console.log(error);
        this.refs.loading.close();
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
    this.setState({
      cartCount: totalCount,
      cartList: cartListData,
      selected: !this.state.selected,
    });
    setCart(cartListData);
    //this.resetData();
    Toast.showWithGravity("Thêm sản phẩm thành công", Toast.SHORT, Toast.BOTTOM);
  };
  resetData = () =>
  {
    this.setState({ popularProduct: this.state.popularProduct });
  };

  navigateToScreen = item =>
  {
    this.props.navigation.navigate('ProductView', { item: item });
  };

  renderProductItem(item)
  {
    let cart = Cart.getItemCountByProductView(this.state.cartList, item);
    return (
      <ProductRow
        item={item}
        addToCart={this.addToCart}
        count={cart}
        onPress={() =>
        {
          this.navigateToScreen(item);
        }}
      />
    );
  }

  onchangeSearchText(text)
  {
    const { category_id } = this.state
    searchProductCategory(text, category_id)
      .then(response =>
      {
        this.setState({ searchData: response.data.products });
        if (response.data.products < 1)
        {
          Toast.showWithGravity('Không tìm thấy sản phẩm', Toast.BOTTOM, Toast.SHORT)
        }
        this.refs.loading.close();
      })
      .catch(error =>
      {
        this.refs.loading.close();
        console.log(error);
      });
  }

  render()
  {
    const { navigation } = this.props;

    return (
      <View style={styles.mainContainer}>
        <AppStatusBar backgroundColor="#44C062" barStyle="light-content" />
        <ToolBar
          title={this.state.category}
          icon="arrow-left"
          onPress={() => navigation.goBack()}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() =>
            {
              this.setState({ showSearch: true });
            }}>
            <Icon name="search" size={24} color="#ffffff" />
          </TouchableOpacity>

          <BadgeIcon
            icon="shopping-cart"
            count={this.state.cartCount}
            onPress={() =>
            {
              navigation.navigate('MyCart');
            }}
          />
        </ToolBar>
        <View style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 100 }}>

          {this.state.products.length == 0 ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <View style={styles.imgContainerStyle}>
                <Image style={styles.imageStyle} source={EmptyProduct} />
              </View>
            </View>
          ) : (<FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.products}
            renderItem={({ item, index }) => this.renderProductItem(item, index)}
            keyExtractor={item => item.product_id}
            extraData={this.state}
          />)}
        </View>
        {this.state.showSearch ? (
          <View style={styles.searchContainer}>
            <SearchBar
              onChangeText={text => this.onchangeSearchText(text)}
              onClose={() =>
              {
                this.setState({ showSearch: false, searchData: [] });
              }}
              data={this.state.searchData}
            />
            <ScrollView horizontal={false}>
              {this.state.searchData &&
                this.state.searchData.map((item, index) =>
                {
                  return (
                    <View style={styles.itemContainer}>
                      <TouchableOpacity
                        style={{ display: 'flex', flexDirection: 'row' }}
                        activeOpacity={1}
                        onPress={() =>
                        {
                          this.setState({ searchProduct: [], showSearch: false });
                          this.navigateToScreen(item);
                        }}>
                        <View style={{ width: 50, height: 50 }}>
                          <Image
                            source={{
                              uri: item.image,
                            }}
                            style={{ height: 35, width: 35 }}
                          />
                        </View>
                        <Text style={{ fontSize: 16 }}>{item.product_name}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        ) : null}
        <Loading ref="loading" indicatorColor={Color.colorPrimary} />
      </View>
    );
  }
}

const BAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: 'column',
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
    color: Color.gray,
    fontFamily: Fonts.primarySemiBold,
    fontSize: 20,
    marginBottom: 10,
  },
  searchContainer: {
    marginTop: BAR_HEIGHT,
    width: '100%',
    backgroundColor: '#ffffff',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  itemContainer: {
    marginTop: 10,
    flex: 1,
  },
});

export default ProductsScreen;
