import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icons from 'react-native-feather1s';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppStatusBar from '../components/AppStatusBar';
import Loading from '../components/Loading';
import ToolBar from '../components/ToolBar';
import { Color, Fonts } from '../theme';


class CategoryScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      cartCount: 0,
      category: [],
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
    this.fetchCategory();
    this.setState({
      cartCount: Cart.getTotalCartCount(cart),
    });
  };

  render()
  {
    const { navigation } = this.props;
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar
          backgroundColor={Color.colorPrimary}
          barStyle="light-content"
        />
        <ToolBar
          title="Danh mục"
          icon="menu"
          onPress={() => navigation.openDrawer()}></ToolBar>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductView', {
              screen: 'ListPharmacy',
            })
          }>
          <View style={styles.categoryItem}>
            <Text style={styles.title}>Tất cả nhà thuốc</Text>
            <Icons name="arrow-right" size={16} />
          </View>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductView', {
              screen: 'NewProduct',
            })}>
          <View style={styles.categoryItem}>
            <Text style={styles.title}>Tất cả sản phẩm</Text>
            <Icons name="arrow-right" size={16} />
          </View>
        </TouchableOpacity>
        <Loading ref="loading" indicatorColor={Color.colorPrimary} />
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
    backgroundColor: Color.white,
    flexDirection: 'column',
    padding: 20,
  },
  categoryItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: Color.white,
    borderRadius: 15,
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
  },
});
export default CategoryScreen;
