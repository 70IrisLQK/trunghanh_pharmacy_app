import React, {Component} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-feather1s';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {showLocation} from 'react-native-map-link';
import {Button} from 'react-native-paper';
import {getCheckIn} from '../axios/ServerRequest';
import Loading from '../components/Loading';
import {Color, Fonts} from '../theme';
import {getUserDetails, getUserLocation} from '../utils/LocalStorage';
class TabRouteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      coordinate: [],
      routeStatus: [],
      user_id: '',
    };
  }

  async componentDidMount() {
    this.reRenderSomething = this.props.navigation.addListener('focus', () => {
      this.init();
    });
  }

  init = async () => {
    const coordinates = await getUserLocation();
    const user = await getUserDetails();
    this.setState({
      coordinate: coordinates,
      user_id: user.user_id,
    });
    this.fetchCheckIn();
  };

  fetchCheckIn = () => {
    const {item} = this.props;
    const {user_id} = this.state;
    this.refs.loading.show();
    getCheckIn(user_id, item.pharmacy_id)
      .then(response => {
        this.setState({routeStatus: response.data.routes});
        this.refs.loading.close();
      })
      .catch(error => {
        console.log(error);
        this.refs.loading.close();
      });
  };

  handleGetDirections = async item => {
    const coordinates = await getUserLocation();
    showLocation({
      latitude: item.longitude,
      longitude: item.latitude,
      sourceLatitude: coordinates[1],
      sourceLongitude: coordinates[0],
      googleForceLatLon: true,
      directionsMode: 'bike',
    });
  };

  createAlert = item => {
    Alert.alert(
      '',
      'Khoảng cách quá lớn. Vui lòng đến gần cửa hàng hơn.',
      [
        {
          text: 'Lấy vị trí',
          onPress: () => {
            this.handleGetDirections(item);
          },
        },
        {
          text: 'Không',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  render() {
    const {navigation, item} = this.props;
    const {routeStatus} = this.state;
    console.log(routeStatus)
    return (
      <View style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <ScrollView contentContainerStyle={{paddingBottom: 10}}>
            <View style={styles.addressContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductView', {
                    screen: 'DetailPharmacy',
                    params: {item: item},
                  });
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <Text style={styles.titleStore}>
                    {item ? item.CUSTOMER_NAME : null}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <Text style={styles.subTitle}>
                    {item ? item.pharmacy_id.substring(0, 8) : null}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <Icon name="map-pin" size={16} style={styles.iconAddress1} />
                  <Text style={styles.title1}>
                    {item ? item.distance : null} Km
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <Icon name="map-pin" size={16} style={styles.iconAddress2} />
                  <Text numberOfLines={1} style={styles.title2}>
                    {item
                      ? item.CUSTOMER_ADDRESS === ''
                        ? 'Chưa có địa chỉ'
                        : item.CUSTOMER_ADDRESS
                      : null}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <Icon name="phone" size={16} style={styles.iconAddress3} />
                  <Text numberOfLines={1} style={styles.title3}>
                    {item
                      ? item.customer_tel
                        ? item.customer_tel
                        : '(Chưa có)'
                      : null}
                  </Text>
                </View>
                {item.status === 'Đã hoàn thành' ? (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}>
                    <Icon name="clock" size={16} style={styles.iconAddress3} />
                    <Text numberOfLines={1} style={styles.title3}>
                      {item.status}
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: 10,
                  margin: 10,
                }}>
                <Button
                  style={styles.buttonOrder}
                  icon="cart"
                  mode="contained"
                  onPress={() => {
                    navigation.navigate('ProductView', {
                      screen: 'PlaceOrder',
                      params: {item: item},
                    });
                  }}>
                  Đặt hàng
                </Button>
                <Button
                  style={styles.buttonCheckIn}
                  icon="google-maps"
                  mode="contained"
                  onPress={() => {
                    item.distance < 0.1
                      ? navigation.navigate('ProductView', {
                          screen: 'CheckIn',
                          params: {item: item},
                        })
                      : this.createAlert(item);
                  }}>
                  Check in
                </Button>
              </View>
            </View>
          </ScrollView>
        </View>
        <Loading ref="loading" indicatorColor={Color.colorPrimary} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Color.backgroundColor,
    flexDirection: 'column',
    flex: 1,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: Color.graylight,
    margin: 10,
  },
  addressContainer: {
    height: 260,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 20,
    padding: 20,
    margin: 10,
    marginTop: 5,
    backgroundColor: '#ffffff',
  },
  titleStore: {
    fontSize: 18,
    fontFamily: Fonts.primaryRegular,
    color: '#44C062',
  },
  title1: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    color: Color.red,
    marginLeft: 10,
  },
  title2: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
    marginLeft: 10,
  },
  iconAddress1: {
    color: Color.red,
  },
  iconAddress2: {
    color: Color.black,
  },
  iconAddress3: {
    color: '#44C062',
  },
  title3: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    color: '#44C062',
    marginLeft: 10,
  },
  buttonOrder: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    backgroundColor: '#44C062',
    marginRight: 40,
  },
  buttonCheckIn: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    backgroundColor: '#a3d989',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    color: Color.gray,
  },
  subTitle: {
    fontSize: 13,
    fontFamily: Fonts.primaryRegular,
    color: Color.gray,
  },
});

export default TabRouteScreen;
