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
import {getUserDetails, getCart, setCart} from '../utils/LocalStorage';
import BadgeIcon from '../components/BadgeIcon';
import Cart from '../utils/Cart';
import Logo from '../components/Logo';
import OrderDetailItem from '../components/ProductItem/OrderDetailItem';
import {Picker} from '@react-native-community/picker';
import Loading from '../components/Loading';
import {getOrderDetails} from '../axios/ServerRequest';
class OrderDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      orderId: '',
      orders: [],
      fullname: '',
    };
  }

  async componentDidMount() {
    this.reRenderSomething = this.props.navigation.addListener('focus', () => {
      this.init();
    });
  }

  init = async () => {
    this.getOrders(this.props.route.params.item.order_id);
    this.setState({
      orderId: this.props.route.params.item.order_id,
      orders: this.props.route.params.item,
      fullname: this.props.route.params.item.user.fullname,
    });
  };

  getOrders = id => {
    this.refs.loading.show();
    getOrderDetails(id)
      .then(response => {
        let data = response.data;
        if (data.status === 'Success') {
          this.setState({orderList: data.orderDetails});
        }
        this.refs.loading.close();
      })
      .catch(error => {
        console.log(error);
        this.refs.loading.close();
      });
  };

  renderCartItem(item) {
    return <OrderDetailItem item={item} />;
  }

  render() {
    const {navigation} = this.props;
    const {orderList, orders, fullname} = this.state;
    console.log(orders);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.box1}>
          <AppStatusBar
            backgroundColor={Color.colorPrimary}
            barStyle="light-content"
          />
          <ToolBar
            title="Thông tin đơn hàng"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          />
          <ScrollView style={{paddingBottom: 5}}>
            <View style={styles.addressContainer}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.title}>Địa chỉ nhận hàng </Text>
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
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: 10,
                }}>
                <Text style={styles.title} numberOfLines={1}>
                  Tên: {orders ? (orders.user === '' ? null : fullname) : null}{' '}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: 10,
                }}>
                <Text style={styles.title} numberOfLines={1}>
                  SĐT:{' '}
                  {orders ? (orders.user === '' ? null : orders.phone) : null}{' '}
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
                <Text style={styles.title} numberOfLines={1}>
                  Địa chỉ: {orders ? orders.shipping_address : null}
                </Text>
              </View>
            </View>
            <FlatList
              data={orderList}
              renderItem={({item, index}) => this.renderCartItem(item, index)}
              keyExtractor={item => item.order_detail_id}
              maxToRenderPerBatch
            />
            <View style={styles.addressContainer}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.title}>Phương thức thanh toán </Text>
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
                <Text style={styles.title}>
                  {orders
                    ? orders.payment
                      ? orders.payment.name
                      : null
                    : null}
                </Text>
              </View>
            </View>
            <View style={styles.amountContainer}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.title}>Tổng cộng : </Text>
                <Text style={styles.title}>
                  {orders.total_price > 0 ? orders.total_price.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND' : 0}
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
                <Text style={styles.title}>Đã thanh toán : </Text>
                <Text style={styles.title}>
                  {orders.paid_price > 0
                    ? orders.paid_price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND'
                    : '(Chưa có)'}
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
                <Text style={styles.title}>Còn nợ : </Text>
                <Text style={styles.title}>
                  {orders.debt_price > 0 ? orders.debt_price.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND' : '(Chưa có)'}
                </Text>
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
    flex: 1,
    backgroundColor: Color.backgroundColor,
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
  amountContainer: {
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
    backgroundColor: '#ffffff',
    marginBottom: 130,
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
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
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
  },
  paymentContainer: {
    flexDirection: 'row',
    flexDirection: 'row',
  },
  total_price: {
    height: 50,
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    backgroundColor: Color.white,
    color: Color.colorPrimary,
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
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: Color.white,
  },
});

export default OrderDetailScreen;
