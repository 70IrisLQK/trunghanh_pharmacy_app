import axios from 'axios';
import React, { Component } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { getRoute } from '../axios/ServerRequest';
import { BING_KEY } from '../common';
import AppStatusBar from '../components/AppStatusBar';
import Loading from '../components/Loading';
import ToolBar from '../components/ToolBar';
import { Color } from '../theme';
import { getUserDetails, getUserLocation } from '../utils/LocalStorage';
import TabRouteScreen from './TabRouteScreen.js';
class RouteScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      loading: true,
      pharmacies: [],
      user: [],
      user_id: '',
      status: 'Trong tuyến',
      newAddress: [],
      pharmacy: [],
      coordinate: [],
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
    const userDetail = await getUserDetails();
    this.setState({
      user_id: userDetail.user_id,
    });
    this.fetchDistance();
  };

  fetchDistance = async () =>
  {
    let pharmacy = [];
    const { newAddress, user_id } = this.state;
    const coordinates = await getUserLocation();
    const address = [];
    this.refs.loading.show();
    getRoute(user_id)
      .then(response =>
      {
        pharmacy = response.data.routes;
        this.setState({ pharmacies: response.data.routes });
        pharmacy.map(item =>
        {
          this.refs.loading.show();
          axios
            .get(
              `http://dev.virtualearth.net/REST/V1/Routes?wp.0=${coordinates[1]},${coordinates[0]}&wp.1=${item.pharmacy.longitude},${item.pharmacy.latitude}&key=${BING_KEY}`,
            )
            .then(res =>
            {
              const distance =
                res.data.resourceSets[0].resources[0].travelDistance.toFixed(2);
              const status = item.status;
              address.push({
                status,
                ...item.pharmacy,
                distance,
              });
              this.setState({ newAddress: address });
            })
            .catch(error =>
            {
              console.log(error.message);
            });
        });
        this.refs.loading.close();
      })
      .catch(error =>
      {
        console.log(error);
        this.refs.loading.close();
      });
  };

  //   fetchDistance = () => {
  //     let pharmacy = [];
  //     this.refs.loading.show();
  //     getPharmacy()
  //       .then(response => {
  //         pharmacy = response.data.pharmacies;
  //         this.setState({pharmacies: response.data.pharmacies});
  //         let newDataAddress = [];
  //         pharmacy.map(item => {
  //           axios
  //             .get(
  //               `https://api.mapbox.com/directions/v5/mapbox/driving/-122.42,37.78;-77.03,38.91?access_token=AlwOyPWhETCFEXRORhMtnyiFtSAnzGD-AB_BfxpbpU4hhVbvTohkSVtpeGakJ5jX`,
  //             )
  //             .then(res => {
  //               newDataAddress.push({
  //                 ...item,
  //                 longitude:
  //                   res.data.resourceSets[0].resources[0].point.coordinates[0],
  //                 latitude:
  //                   res.data.resourceSets[0].resources[0].point.coordinates[1],
  //               });
  //               this.setState({
  //                 newAddress: newDataAddress,
  //               });

  //               this.refs.loading.close();
  //             })
  //             .catch(error => {
  //               console.log(error.message);
  //               this.refs.loading.close();
  //             });
  //           this.refs.loading.close();
  //         });
  //         this.refs.loading.close();
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         this.refs.loading.close();
  //       });
  //   };

  // createNewAddresses = () => {
  //   this.refs.loading.show();
  //   const {newAddress} = this.state;
  //   createNewAddress(newAddress)
  //     .then(response => {
  //       let data = response.data;
  //       if (data.status === 'success') {
  //         this.refs.loading.close();
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error.message);
  //       Toast.showWithGravity(error.message);
  //       this.refs.loading.close();
  //     });
  // };

  resetData = () => { };

  navigateToScreen = item =>
  {
    this.props.navigation.navigate('ProductView', {
      screen: 'DetailPharmacy',
      params: { item: item.Pharmacy },
    });
  };

  renderPharmacyItem(item)
  {
    return (
      <TabRouteScreen
        item={item}
        navigation={this.props.navigation}
        coordinate={this.state.coordinate}
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
    const { newAddress } = this.state;
    console.log(newAddress)
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar backgroundColor="#44C062" barStyle="light-content" />
        <ToolBar
          title="Đi tuyến"
          icon="menu"
          onPress={() => navigation.openDrawer()}></ToolBar>
        {newAddress.length > 0 ? (
          <FlatList
            style={{ marginLeft: 10 }}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            data={newAddress.sort((a, b) =>
              a.distance.localeCompare(b.distance),
            )}
            renderItem={({ item, index }) => this.renderPharmacyItem(item, index)}
            keyExtractor={item => item.route_id}
            maxToRenderPerBatch
          />
        ) : (
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 280,
            }}>
            <Text style={styles.titleOrder}>
              Bạn chưa có tuyến đường nào rồi
            </Text>
          </View>
        )}

        <Loading ref="loading" indicatorColor={Color.colorPrimary} />
      </View>
    );
  }
}

const BAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: 'column',
  },
});

export default RouteScreen;
