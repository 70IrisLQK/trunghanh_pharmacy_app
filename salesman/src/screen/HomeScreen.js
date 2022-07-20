import React, { Component } from 'react';
import
{
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import { Color, Fonts } from '../theme';
import ToolBar from '../components/ToolBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';
import BannerSlider from '../components/BannerSlider';
import Loading from '../components/Loading';
import { getNewProducts, getNote } from '../axios/ServerRequest';
import { getUserDetails, setUserLocation } from '../utils/LocalStorage';
import ProductItem from '../components/ProductItem';
import { Card, Paragraph } from 'react-native-paper';
import Moment from 'react-moment';
import Geolocation from '@react-native-community/geolocation';
import { io } from 'socket.io-client';

class HomeScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      loading: true,
      newProduct: [],
      note: [],
      user: [],
      user_id: '',
      currentLongitude: '',
      currentLatitude: '',
      locationStatus: '',
      coordinates: [],
      myPosition: {
        latitude: 0,
        longitude: 0,
        timestamp: 0,
      },
    };

    this.socket = io('https://trunghanh.azurewebsites.net');
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
    this.fetchNewProducts();
    this.fetchNote();
    this.setState({
      user_id: userDetail.user_id,
      user: userDetail,
    });
    this.requestLocationPermission();
  };

  requestLocationPermission = async () =>
  {
    if (Platform.OS === 'ios')
    {
      this.getOneTimeLocation();
      this.subscribeLocationLocation();
    } else
    {
      try
      {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED)
        {
          //To Check, If Permission is granted
          this.getOneTimeLocation();
          this.subscribeLocationLocation();
        } else
        {
          this.setState({
            locationStatus: 'Permission Denied',
          });
        }
      } catch (err)
      {
        console.warn(err);
      }
    }
  };
  getOneTimeLocation = () =>
  {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position =>
      {

        let tempPosition = { ...this.state.myPosition };
        tempPosition.latitude = position.coords.latitude;
        tempPosition.longitude = position.coords.longitude;
        tempPosition.timestamp = position.timestamp;

        console.log(this.socket)

        this.socket.emit('marker', {
          data: tempPosition,
          id: this.state.user_id,
          fullname: this.state.user.fullname,
        });
        this.setState({
          myPosition: tempPosition,
          loading: false,
        });


        console.log(this.state.myPosition);
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        const coordinates = [currentLongitude, currentLatitude];
        console.log(currentLatitude, currentLongitude);

        this.setState({
          currentLongitude: currentLongitude,
          currentLatitude: currentLatitude,
          coordinates: [currentLongitude, currentLatitude],
        });
        setUserLocation(coordinates);
      },
      error =>
      {
        this.setState({
          locationStatus: error.message,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  subscribeLocationLocation = () =>
  {
    const watchID = Geolocation.watchPosition(
      position =>
      {
        //Will give you the location on location change

        let tempPosition = { ...this.state.myPosition };
        tempPosition.latitude = position.coords.latitude;
        tempPosition.longitude = position.coords.longitude;
        tempPosition.timestamp = position.timestamp;
        console.log(tempPosition)

        this.socket.emit('marker', {
          data: tempPosition,
          id: this.state.user_id,
          fullname: this.state.user.fullname,
        });
        this.setState({
          myPosition: tempPosition,
          isLoading: false,
        });

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        const coordinates = [currentLongitude, currentLatitude];

        this.setState({
          currentLongitude: currentLongitude,
          currentLatitude: currentLatitude,
          coordinates: [currentLongitude, currentLatitude],
        });
        setUserLocation(coordinates);
      },
      error =>
      {
        this.setState({
          locationStatus: error.message,
        });
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
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

  fetchNote = user_id =>
  {
    this.refs.loading.show();
    getNote(user_id)
      .then(response =>
      {
        this.setState({ note: response.data.notes });
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
      <ProductItem
        item={item}
        key={item => item.product_id}
        navigation={this.props}
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
    const { user, note, coordinates } = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <AppStatusBar backgroundColor="#44C062" barStyle="light-content" />
          <ToolBar
            title="Trang chủ"
            icon="menu"
            onPress={() => navigation.openDrawer()}></ToolBar>

          <ScrollView style={styles.scrollView}>
            <View>
              <View style={{ marginLeft: 20, marginTop: 20 }}>
                <View style={styles.productHeaderContainer}>
                  <Text style={styles.title}>Sản phẩm mới</Text>
                  <TouchableOpacity
                    onPress={() =>
                    {
                      navigation.navigate('NewProducts');
                    }}>
                    <Text style={styles.subtitle}>Xem tất cả</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <FlatList
                style={{ marginLeft: 10 }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={this.state.newProduct}
                renderItem={({ item, index }) =>
                  this.renderProductItem(item, index)
                }
                keyExtractor={item => item.product_id}
                extraData={this.state}
                maxToRenderPerBatch
              />

              {note.length > 0
                ? note.slice(0, 1).map((item, index) =>
                {
                  return (
                    <View style={{ marginLeft: 20, marginTop: 20, flex: 1 }}>
                      <View style={styles.productHeaderContainer}>
                        <Text style={styles.title}>Ghi chú mới nhất</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                        {
                          this.props.navigation.navigate('ProductView', {
                            screen: 'Problem',
                            params: { item: item },
                          });
                        }}>
                        <Card
                          style={{
                            height: 150,
                            width: 375,
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
                          }}>
                          <Card.Content>
                            {item.status === 'Chờ xử lý' ? (
                              <View
                                style={{
                                  flexDirection: 'column',
                                  alignItems: 'flex-end',
                                }}>
                                <Icon
                                  name="clock"
                                  size={20}
                                  color={Color.orange}
                                  thin={false}
                                />

                                <Paragraph style={{ color: Color.orange }}>
                                  {item ? item.status : null}
                                </Paragraph>
                              </View>
                            ) : (
                              <View
                                style={{
                                  flexDirection: 'column',
                                  alignItems: 'flex-end',
                                }}>
                                <Icon
                                  name="clock"
                                  size={20}
                                  color={Color.blueviolet}
                                  thin={false}
                                />
                                <Paragraph style={{ color: Color.blueviolet }}>
                                  {item ? item.status : null}
                                </Paragraph>
                              </View>
                            )}
                            <View
                              style={{
                                width: '100%',
                                height: 2,
                                backgroundColor: '#eeeeee',
                                marginBottom: 10,
                              }}
                            />
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                                marginBottom: 10,
                              }}>
                              <Text style={styles.title1}>Nhà thuốc</Text>
                              <Text style={styles.title2}>
                                {item
                                  ? item.pharmacy
                                    ? item.pharmacy.CUSTOMER_NAME
                                    : ''
                                  : ''}
                              </Text>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                                marginBottom: 10,
                              }}>
                              <Text style={styles.title1}>Ngày gửi</Text>
                              <Text style={styles.title2}>
                                <Moment element={Text} format="DD-MM-YYYY">
                                  {item ? item.created_at : null}
                                </Moment>
                              </Text>
                            </View>
                          </Card.Content>
                        </Card>
                      </TouchableOpacity>
                    </View>
                  );
                })
                : null}
            </View>
          </ScrollView>
        </View>
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

  productHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
  },

  title: {
    fontFamily: Fonts.primarySemiBold,
    color: Color.blue,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  paragraph: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
    marginLeft: 10,
  },
  subtitle: {
    fontFamily: Fonts.primarySemiBold,
    color: Color.gray,
    fontSize: 14,
    marginLeft: 10,
  },

  title1: {
    fontSize: 13,
    fontFamily: Fonts.primaryRegular,
    color: '#44C062',
  },
  title2: {
    fontSize: 13,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
  },
});

export default HomeScreen;
