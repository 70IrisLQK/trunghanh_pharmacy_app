import React, {Component} from 'react';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import Icon from 'react-native-feather1s';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import {getPopularProducts, searchProduct} from '../axios/ServerRequest';
import AppStatusBar from '../components/AppStatusBar';
import Loading from '../components/Loading';
import AllProductRow from '../components/ProductItem/AllProductRow';
import SearchBar from '../components/SearchBar';
import ToolBar from '../components/ToolBar';
import {Color} from '../theme';
import Cart from '../utils/Cart';
import {getCart, setCart} from '../utils/LocalStorage';

class PopularProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularProduct: [],
      selected: false,
      cartCount: 0,
      cartList: [],
      showSearch: false,
      searchData: [],
      searchText: '',
    };
  }

  async componentDidMount() {
    this.reRenderSomething = this.props.navigation.addListener('focus', () => {
      this.init();
    });
  }

  init = async () => {
    this.fetchPopularProducts();
    let cart = await getCart();
    this.setState({searchProduct: [], showSearch: false});
    this.setState({
      cartList: await getCart(),
      cartCount: Cart.getTotalCartCount(cart),
    });
  };

  fetchPopularProducts = () => {
    this.refs.loading.show();
    getPopularProducts()
      .then(response => {
        this.setState({popularProduct: response.data.products});
        this.refs.loading.close();
      })
      .catch(error => {
        console.log(error);
        this.refs.loading.close();
      });
  };

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
    this.setState({
      cartCount: totalCount,
      cartList: cartListData,
      selected: !this.state.selected,
    });
    setCart(cartListData);
    //this.resetData();
    Toast.showWithGravity(
      'Thêm sản phẩm thành công',
      Toast.SHORT,
      Toast.BOTTOM,
    );
  };
  resetData = () => {
    this.setState({popularProduct: this.state.popularProduct});
  };

  navigateToScreen = item => {
    this.props.navigation.navigate('ProductPopularView', {
      screen: 'ProductPopularView',
      params: {item: item},
    });
  };
  renderProductItem(item) {
    let cart = Cart.getItemCountByProductView(this.state.cartList, item);
    return (
      <AllProductRow
        item={item}
        addToCart={this.addToCart}
        count={cart}
        onPress={() => {
          this.navigateToScreen(item);
        }}
      />
    );
  }

  onchangeSearchText(text) {
    searchProduct(text)
      .then(response => {
        this.setState({searchData: response.data.products});
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const {navigation} = this.props;
    console.log(this.state.searchData);
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar backgroundColor="#44C062" barStyle="light-content" />
        <ToolBar
          title="Tất cả sản phẩm"
          icon="arrow-left"
          onPress={() => navigation.goBack()}>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => {
              this.setState({showSearch: true});
            }}>
            <Icon name="search" size={24} color="#ffffff" />
          </TouchableOpacity>
        </ToolBar>
        <View style={{paddingLeft: 10, paddingRight: 10, marginBottom: 100}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.popularProduct}
            renderItem={({item, index}) => this.renderProductItem(item, index)}
            keyExtractor={item => item.product_id}
            extraData={this.state}
          />
        </View>
        {this.state.showSearch ? (
          <View style={styles.searchContainer}>
            <SearchBar
              onChangeText={text => this.onchangeSearchText(text)}
              onClose={() => {
                this.setState({showSearch: false, searchData: []});
              }}
              data={this.state.searchData}
            />
            {this.state.searchData.length > 0 ? (
              <View
                style={{paddingLeft: 10, paddingRight: 10, marginBottom: 100}}>
                <FlatList
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={false}
                  data={this.state.searchData}
                  renderItem={({item, index}) =>
                    this.renderProductItem(item, index)
                  }
                  keyExtractor={item => item.product_id}
                  extraData={this.state}
                />
              </View>
            ) : null}
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
});

export default PopularProductScreen;
