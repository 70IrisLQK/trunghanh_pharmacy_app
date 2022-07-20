import React, { Component } from 'react';
import
{
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import { Color, Fonts, Dimension } from '../theme';
import ToolBar from '../components/ToolBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';
import BadgeIcon from '../components/BadgeIcon';
import { salesCheckIn, getCheckIn } from '../axios/ServerRequest';
import Toast from 'react-native-simple-toast';
import { Switch } from 'react-native-paper';
import { color } from 'react-native-reanimated';
import
{
  getCart,
  getImageItem,
  getNoteDescriptionItem,
  getNoteItem,
  getUserDetails,
  setCart,
  setImageItem,
} from '../utils/LocalStorage';
import Loading from '../components/Loading';
import Cart from '../utils/Cart';
const screenWidth = Dimensions.get('window').width;

const CheckInSelect = (checkInName, icon) =>
{
  return (
    <View
      style={{
        backgroundColor: color.white,
        margin: 8,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 24,
        width: (screenWidth - 64) / 2,
      }}>
      <Text>{checkInName}</Text>
      <Icon name={icon} />
    </View>
  );
};

class CheckInScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      loading: true,
      user: [],
      cart: [],
      localImage: [],
      description: '',
      note_type_id: '',
      pharmacyItem: null,
      isSwitchOn: false,
      timer: null,
      minutes_Counter: '00',
      seconds_Counter: '00',
      startDisable: false,
      data: [
        {
          id: 1,
          title: 'Đơn hàng',
          color: '#ffffff',
          image: require('../assets/images/create-order.png'),
          navigate: 'PlaceOrderCheckIn',
        },
        {
          id: 2,
          title: 'Hình ảnh',
          color: '#ffffff',
          image: require('../assets/images/create-image.png'),
          navigate: 'Image',
        },
      ],
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
    let item = null;
    if (this.props.route.params !== undefined)
    {
      item = this.props.route.params.item;
    }
    let cart = await getCart();
    let image = await getImageItem();
    let notes = await getNoteItem();
    let user = await getUserDetails();
    let description = await getNoteDescriptionItem();
    let note_type_id = await getNoteItem();
    this.setState({
      pharmacyItem: item,
      localImage: image,
      notes: notes,
      cart: cart,
      user: user,
      description: description,
      note_type_id: note_type_id,
    });
  };

  onToggleSwitch = () =>
  {
    let timer = setInterval(() =>
    {
      var num = (Number(this.state.seconds_Counter) + 1).toString(),
        count = this.state.minutes_Counter;

      if (Number(this.state.seconds_Counter) == 59)
      {
        count = (Number(this.state.minutes_Counter) + 1).toString();
        num = '00';
      }

      this.setState({
        minutes_Counter: count.length == 1 ? '0' + count : count,
        seconds_Counter: num.length == 1 ? '0' + num : num,
      });
    }, 1000);

    this.setState({ timer: timer });

    this.setState({ startDisable: true, isSwitchOn: true });
  };

  onButtonStop = () =>
  {
    clearInterval(this.state.timer);
    this.setState({ startDisable: false });
  };

  clickEventListener(item)
  {
    this.props.navigation.navigate(item.navigate);
  }

  createAlert = () =>
  {
    const { item, count } = this.props;
    Alert.alert(
      '',
      'Bạn chắn chắn muốn bỏ đơn hàng này?',
      [
        {
          text: 'Đồng ý',
          onPress: () =>
          {
            this.props.navigation.goBack(setCart(null));
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

  onCheckIn = () =>
  {
    const {
      cart,
      user,
      localImage,
      startDisable,
      timer,
    } = this.state;
    let item = null;
    if (this.props.route.params !== undefined)
    {
      item = this.props.route.params.item;
    }
    let pharmacyItem = item;
    let status = startDisable === true ? 'Mở cửa' : 'Đóng cửa';
    let formData = new FormData();
    let file = null;
    this.refs.loading.show();
    if (startDisable === false && localImage)
    {
      if (localImage && localImage.length > 0)
      {
        localImage.forEach(image =>
        {
          file = {
            uri:
              Platform.OS === 'ios'
                ? image.path.replace('file://', '')
                : image.path,
            name:
              image.filename ||
              Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
            type: image.mime || 'image/jpeg',
          };
          formData.append('image', file);
        });
      }
      formData.append('user_id', user.user_id);
      formData.append('pharmacy_id', pharmacyItem.pharmacy_id);
      formData.append('address', pharmacyItem.CUSTOMER_ADDRESS);
      formData.append('status', status);
      salesCheckIn(formData)
        .then(response =>
        {
          let data = response.data;
          if (data.status === 'success')
          {
            setImageItem(null);
            this.props.navigation.goBack();
          }
        })
        .catch(error =>
        {
          setImageItem(null);
          setCart(null);
          Toast.showWithGravity(error.message);
          this.refs.loading.close();
        });
    } else if (
      timer &&
      status === 'Mở cửa' &&
      cart &&
      pharmacyItem &&
      localImage
    )
    {
      let totalPrice = cart.reduce((accum, item) => accum + item.subTotal, 0);
      let totalCount = Cart.getTotalCartCount(cart);
      const orderItems = [];
      if (localImage && localImage.length > 0)
      {
        localImage.forEach(image =>
        {
          file = {
            uri:
              Platform.OS === 'ios'
                ? image.path.replace('file://', '')
                : image.path,
            name:
              image.filename ||
              Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
            type: image.mime || 'image/jpeg',
          };
          formData.append('image', file);
        });
      }

      for (let i = 0; i < cart.length; i++)
      {
        const orderItem = {
          id: cart[i].item.product_id,
          itemName: cart[i].item.product_name,
          itemQuantity: cart[i].count,
          itemImage: cart[i].item.image,
          itemPrice: cart[i].item.price,
          itemTotal: cart[i].subTotal,
          itemUnit: cart[i].item.unit.name,
        };
        orderItems.push(orderItem);
      }

      formData.append('user_id', user.user_id);
      formData.append('pharmacy_id', pharmacyItem.pharmacy_id);
      formData.append('orderItems', JSON.stringify(orderItems));
      formData.append('total', totalPrice);
      formData.append('status', status);
      formData.append('phone', pharmacyItem.customer_tel);
      formData.append('address', pharmacyItem.CUSTOMER_ADDRESS);
      formData.append('timer', timer);
      formData.append('quantity', totalCount);
      salesCheckIn(formData)
        .then(response =>
        {
          let data = response.data;
          if (data.status === 'success')
          {
            setImageItem(null);
            setCart(null);
            this.onButtonStop();
            this.props.navigation.goBack();
          }
        })
        .catch(error =>
        {
          setImageItem(null);
          setCart(null);
          Toast.showWithGravity(error.message);
          this.refs.loading.close();
        });
    } else if (startDisable === true && localImage)
    {
      if (localImage && localImage.length > 0)
      {
        localImage.forEach(image =>
        {
          file = {
            uri:
              Platform.OS === 'ios'
                ? image.path.replace('file://', '')
                : image.path,
            name:
              image.filename ||
              Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
            type: image.mime || 'image/jpeg',
          };
          formData.append('image', file);
        });
      }
      formData.append('user_id', user.user_id);
      formData.append('pharmacy_id', pharmacyItem.pharmacy_id);
      formData.append('address', pharmacyItem.CUSTOMER_ADDRESS);
      formData.append('status', status);
      formData.append('timer', timer);
      salesCheckIn(formData)
        .then(response =>
        {
          let data = response.data;
          if (data.status === 'success')
          {
            setImageItem(null);
            this.props.navigation.goBack();
          }
        })
        .catch(error =>
        {
          setImageItem(null);
          setCart(null);
          console.log(error.message);
          Toast.showWithGravity(error.message);
          this.refs.loading.close();
        });
    } else
    {
      Toast.showWithGravity(
        'Vui lòng cung cấp hình ảnh.',
        Toast.BOTTOM,
        Toast.SHORT,
      );
      return;
    }
  };

  render()
  {
    const { navigation } = this.props;
    const { pharmacyItem, isSwitchOn, localImage } = this.state;
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar
          backgroundColor={Color.colorPrimary}
          barStyle="light-content"
        />
        <ToolBar
          title="Nhà thuốc"
          icon="arrow-left"
          onPress={() =>
          {
            this.state.cart
              ? this.createAlert()
              : navigation.goBack(setCart(null));
          }}></ToolBar>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: 10,
                margin: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={styles.title1}>Thời gian:</Text>
                <Text style={styles.title4}>
                  {' ' + this.state.minutes_Counter} :{' '}
                  {this.state.seconds_Counter}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={styles.title1}>Mở cửa:</Text>
                <Switch
                  style={styles.switch}
                  value={isSwitchOn}
                  onValueChange={this.onToggleSwitch}
                />
              </View>
            </View>
          </View>

          <View style={styles.addressContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: 10,
              }}>
              <Text style={styles.title1}>Thông tin nhà thuốc</Text>
            </View>
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
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              <Text style={styles.title2}>Mã nhà thuốc</Text>
              <Text style={styles.titleSub}>
                {pharmacyItem ? pharmacyItem.pharmacy_id.substring(0, 8) : null}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              <Text style={styles.title2}>Tên nhà thuốc</Text>
              <Text style={styles.titleSub}>
                {pharmacyItem ? pharmacyItem.CUSTOMER_NAME : null}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              <Text style={styles.title2}>Số điện thoại</Text>
              <Text style={styles.titleSub}>
                {pharmacyItem
                  ? pharmacyItem.customer_tel
                    ? pharmacyItem.customer_tel
                    : '(Chưa có)'
                  : null}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              <Text style={styles.title2}>Địa chỉ </Text>
              <Text style={styles.titleSub} numberOfLines={1}>
                {pharmacyItem ? pharmacyItem.CUSTOMER_ADDRESS : null}
              </Text>
            </View>
          </View>
          <View style={styles.container}>
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.listContainer}
              data={this.state.data}
              horizontal={false}
              numColumns={2}
              keyExtractor={item =>
              {
                return item.id;
              }}
              renderItem={({ item }) =>
              {
                return (
                  <TouchableOpacity
                    style={[styles.card, { backgroundColor: item.color }]}
                    onPress={() =>
                    {
                      this.clickEventListener(item);
                    }}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Image
                        style={styles.icon}
                        source={require('../assets/images/arrow_right.png')}
                      />
                    </View>
                    <Image style={styles.cardImage} source={item.image} />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.box2}>
          <View style={styles.paymentContainer}>
            <TouchableOpacity
              style={styles.checkout_container}
              onPress={() =>
              {
                localImage && localImage.length > 0
                  ? this.onCheckIn()
                  : Toast.showWithGravity(
                    'Vui lòng cung cấp ảnh nhà thuốc',
                    Toast.SHORT,
                    Toast.BOTTOM,
                  );
              }}>
              <Text style={styles.checkout}>Check out</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  title1: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 16,
    color: Color.colorPrimary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  switch: {
    marginTop: 8,
  },
  title4: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 18,
    color: Color.red,
    marginTop: 10,
  },

  title2: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 14,
    color: Color.gray,
    fontWeight: '400',
  },
  titleSub: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 14,
    color: Color.black,
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
    marginTop: 2,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    //paddingHorizontal: 5,
    backgroundColor: '#FFFFFF',
  },
  listContainer: {
    alignItems: 'center',
  },
  /******** card **************/
  card: {
    marginHorizontal: 2,
    marginVertical: 2,
    flexBasis: '48%',
    height: 150,
    width: 190,
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardImage: {
    height: 50,
    width: 50,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    flex: 1,
    color: Color.colorPrimary,
    fontWeight: 'bold',
  },
  icon: {
    height: 20,
    width: 20,
  },
  box2: {
    width: Dimension.window.width,
    height: 50,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: Color.colorPrimary,
    display: 'flex',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    justifyContent: 'center',
    borderRadius: 20,
  },
  checkout_container: {
    textAlign: 'center',
    height: 50,
    backgroundColor: Color.colorPrimary,
    color: Color.white,
  },
  checkout: {
    width: '100%',
    paddingTop: 10,
    fontSize: 20,
    fontWeight: '700',
    color: Color.white,
  },
});

export default CheckInScreen;
