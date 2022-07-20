import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList, StatusBar, Image, Text } from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import { Color } from '../theme';
import ToolBar from '../components/ToolBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';
import BadgeIcon from '../components/BadgeIcon';
import { getNewProducts, searchProduct } from '../axios/ServerRequest';
import ProductRow from '../components/ProductItem/ProductRow';
import Cart from '../utils/Cart';
import Loading from '../components/Loading';
import Toast from 'react-native-simple-toast';
import SearchBar from '../components/SearchBar';

class NewProductScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      newProduct: [],
      showSearch: false,
      searchData: [],
      searchText: '',
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
    this.fetchNewProducts();
  };

  fetchNewProducts = () =>
  {
    this.refs.loading.show();

    getNewProducts()
      .then(response =>
      {
        this.setState({ newProduct: response.data.products });
        this.refs.loading.close();
      })
      .catch(error =>
      {
        console.log(error);
        this.refs.loading.close();
      });
  };

  navigateToScreen = item =>
  {
    this.props.navigation.navigate('ProductView', {
      screen: 'ProductView',
      params: { item: item },
    });
  };

  renderProductItem(item)
  {
    return (
      <ProductRow
        item={item}
        onPress={() =>
        {
          this.navigateToScreen(item);
        }}
      />
    );
  }
  onchangeSearchText(text)
  {
    searchProduct(text)
      .then(response =>
      {
        this.setState({ searchData: response.data.products });
      })
      .catch(error =>
      {
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
          title="Sản phẩm mới"
          icon="arrow-left"
          onPress={() => navigation.goBack()}>
          <BadgeIcon
            icon="search"
            onPress={() =>
            {
              this.setState({ showSearch: true });
            }}
          />
        </ToolBar>
        <View style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 100 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.newProduct}
            renderItem={({ item, index }) => this.renderProductItem(item, index)}
            keyExtractor={item => item.product_id}
            extraData={this.state}
            maxToRenderPerBatch
          />
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
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default NewProductScreen;
