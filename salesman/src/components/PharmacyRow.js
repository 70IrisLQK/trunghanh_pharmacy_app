import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Fonts, Strings, Dimension} from '../theme';
import ToolBar from '../components/ToolBar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';
import {getUserDetails} from '../utils/LocalStorage';
import BadgeIcon from '../components/BadgeIcon';
import Cart from '../utils/Cart';
import Logo from '../components/Logo';
import OrderItem from '../components/ProductItem/OrderItem';
import {Picker} from '@react-native-community/picker';
import {orderPlace} from '../axios/ServerRequest';
import Loading from '../components/Loading';
import Toast from 'react-native-simple-toast';
import {getNewAddress} from '../axios/ServerRequest';
import {color} from 'react-native-reanimated';
import {Button} from 'react-native-paper';

class PharmacyRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    this.reRenderSomething = this.props.navigation.addListener('focus', () => {
      this.init();
    });
  }

  init = async () => {};

  render() {
    const {item, navigation} = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <ScrollView contentContainerStyle={{paddingBottom: 10}}>
            <View style={styles.addressContainer}>
              <TouchableOpacity onPress={this.props.onPress}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <Text style={styles.titleStore}>{item.CUSTOMER_NAME}</Text>
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
                    {item.pharmacy_id.substring(0, 8)}
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
                    {item.CUSTOMER_ADDRESS === ''
                      ? 'Chưa có địa chỉ'
                      : item.CUSTOMER_ADDRESS}
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
                      ? item.customer_tel === ''
                        ? '(Chưa có)'
                        : item.customer_tel
                      : null}
                  </Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  display: 'flex',
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
                    
                    navigation.navigate('CategoryProblem', {
                      params: {
                        item: item
                      }
                    });
                  }}>
                  Chọn
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
    marginTop: 10,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
  },

  titleStore: {
    fontSize: 20,
    fontFamily: Fonts.primaryRegular,
    color: '#44C062',
  },
  title1: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    color: Color.red,
    marginLeft: 10,
  },
  title2: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
    marginLeft: 10,
  },
  iconAddress2: {
    color: Color.colorPrimary,
  },
  iconAddress3: {
    color: Color.colorPrimary,
  },
  title3: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
    marginLeft: 10,
  },
  buttonOrder: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    backgroundColor: '#44C062',
    marginRight: 40,
  },
  buttonCheckIn: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    backgroundColor: '#a3d989',
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    color: Color.gray,
  },
  subTitle: {
    fontSize: 15,
    fontFamily: Fonts.primaryRegular,
    color: Color.gray,
  },
});

export default PharmacyRow;
