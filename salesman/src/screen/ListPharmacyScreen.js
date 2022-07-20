import React, { Component } from 'react';
import
  {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    FlatList,
    StatusBar,
  } from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import { Color, Fonts, Strings, Dimension } from '../theme';

import ToolBar from '../components/ToolBar';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';
import { getPharmacy, searchPharmacy } from '../axios/ServerRequest';
import { getUserDetails } from '../utils/LocalStorage';
import PharmacyRow from '../components/PharmacyRow';
import Loading from '../components/Loading';
import Toast from 'react-native-simple-toast';
import SearchBar from '../components/SearchBar';

class ListPharmacyScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      pharmacy: [],
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
    this.fetchPharmacies();
    this.setState({
      searchPharmacy: [],
      showSearch: false,
    });
  };

  fetchPharmacies = () =>
  {
    this.refs.loading.show();
    getPharmacy()
      .then(response =>
      {
        this.setState({
          pharmacy: response.data.pharmacies,
        });
        this.refs.loading.close();
      })
      .catch(error =>
      {
        console.log(error);
        this.refs.loading.close();
      });
  };

  resetData = () =>
  {
    this.setState({
      pharmacy: this.state.pharmacy,
    });
  };

  navigateToScreen = item =>
  {
    this.props.navigation.navigate('ProductView', {
      screen: 'DetailPharmacy',
      params: { item: item },
    });
  };

  onchangeSearchText(text)
  {
    searchPharmacy(text)
      .then(response =>
      {
        this.setState({
          searchData: response.data.pharmacies,
        });
      })
      .catch(error =>
      {
        console.log(error);
      });
  }
  renderPharmacyItem(item)
  {
    return (
      <PharmacyRow
        item={item}
        navigation={this.props.navigation}
        pharmacy={this.state.pharmacy}
        onPress={() =>
        {
          this.navigateToScreen(item);
        }}
      />
    );
  }

  render()
  {
    const { navigation } = this.props;
    const { pharmacy } = this.state;
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar backgroundColor="#44C062" barStyle="light-content" />
        <ToolBar
          title="Nhà thuốc"
          icon="arrow-left"
          onPress={() => navigation.goBack()}>
          <TouchableOpacity
            style={{
              marginRight: 10,
            }}
            onPress={() =>
            {
              this.setState({
                showSearch: true,
              });
            }}>
            <Icon name="search" size={24} color="#ffffff" />
          </TouchableOpacity>
        </ToolBar>
        <View
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            marginBottom: 100,
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={pharmacy}
            renderItem={({ item, index }) => this.renderPharmacyItem(item, index)}
            keyExtractor={item => item.pharmacy_id}
            extraData={this.state}
          />
        </View>
        {this.state.showSearch ? (
          <View style={styles.searchContainer}>
            <SearchBar
              onChangeText={text => this.onchangeSearchText(text)}
              onClose={() =>
              {
                this.setState({
                  showSearch: false,
                  searchData: [],
                });
              }}
              data={this.state.searchData}
            />
            {this.state.searchData.length > 0 &&
              this.state.searchData.map((item, index) =>
              {
                return (
                  <View
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      marginBottom: 100,
                    }}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={this.state.searchData}
                      renderItem={({ item, index }) =>
                        this.renderPharmacyItem(item, index)
                      }
                      keyExtractor={item => item.pharmacy_id}
                      extraData={this.state}
                      maxToRenderPerBatch
                    />
                  </View>
                );
              })}
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

export default ListPharmacyScreen;
