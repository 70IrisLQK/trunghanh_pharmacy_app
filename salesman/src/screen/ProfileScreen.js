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
import {getUserDetails, getCart} from '../utils/LocalStorage';
import BadgeIcon from '../components/BadgeIcon';
import Cart from '../utils/Cart';
import Logo from '../components/Logo';
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0,
      user: null,
    };
  }

  async componentDidMount() {
    this.reRenderSomething = this.props.navigation.addListener('focus', () => {
      this.init();
    });
  }

  init = async () => {
    let cart = await getCart();
    let userDetails = await getUserDetails();
    this.setState({
      cartCount: Cart.getTotalCartCount(cart),
      user: userDetails,
    });
  };

  render() {
    const {navigation} = this.props;
    const {user} = this.state;
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar
          backgroundColor={Color.colorPrimary}
          barStyle="light-content"
        />
        <ToolBar
          title="Tài khoản"
          icon="menu"
          onPress={() => navigation.openDrawer()}>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => {
              navigation.navigate('ProductView', {
                screen: 'Address'
              });
            }}>
            <Icon name="edit" size={24} color="#ffffff" />
          </TouchableOpacity>
        </ToolBar>

        <ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollview}>
          <View style={{marginTop: '10%', marginBottom: '5%'}}>
            <Logo />
          </View>
          <View style={styles.userRow}>
            <Text>Tên : </Text>
            <Text>{user ? user.fullname : null}</Text>
          </View>
          <View style={styles.border} />
          <View style={styles.userRow}>
            <Text>Số diện thoại : </Text>
            <Text>{user ? user.phone : null}</Text>
          </View>
          <View style={styles.border} />
          <View style={styles.userRow}>
            <Text>Địa chỉ : </Text>
            <Text>{user ? user.address : null}</Text>
          </View>
          <View style={styles.border} />
        </ScrollView>
        <View style={styles.bottomImage}>
          <Image source={require('../assets/images/thumb1.png')} />
        </View>
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
    backgroundColor: Color.white,
    flexDirection: 'column',
    padding: 20,
    flexGrow: 1,
  },
  bottomImage: {
    height: 150,
    width: 150,
    position: 'absolute',
    bottom: 0,
    right: 80,
    zIndex: 1,
    flex: 1,
    opacity: 0.5,
    justifyContent: 'flex-end',
  },
  userRow: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: Color.graylight,
    margin: 10,
  },
});

export default ProfileScreen;
