import React, { Component } from 'react';
import
{
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import { Color, Fonts, Dimension } from '../theme';
import ToolBar from '../components/ToolBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getUserDetails } from '../utils/LocalStorage';
import { getOrder } from '../axios/ServerRequest';
import Loading from '../components/Loading';
import moment from 'moment';
class MyOrderScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      user: null,
      orderList: [],
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
    let userDetails = await getUserDetails();
    this.setState({
      user: userDetails,
    });

    this.getOrders();
  };

  getOrders = () =>
  {
    const { user } = this.state;
    this.refs.loading.show();
    getOrder(user.user_id)
      .then(response =>
      {
        let data = response.data;
        if (data.status === 'Success')
        {
          this.setState({ orderList: data.orders });
        }
        this.refs.loading.close();
      })
      .catch(error =>
      {
        console.log(error);
        this.refs.loading.close();
      });
  };

  render()
  {
    const { navigation } = this.props;
    const { orderList } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <AppStatusBar
            backgroundColor={Color.colorPrimary}
            barStyle="light-content"
          />
          <ToolBar
            title="Đơn hàng"
            icon="menu"
            onPress={() => navigation.openDrawer()}
          />
          {orderList.length > 0 ? (
            <ScrollView>
              <View>
                {orderList.map((item, index) =>
                {
                  return (
                    <View key={index}>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() =>
                        {
                          this.props.navigation.navigate('ProductView', {
                            screen: 'OrderDetailScreen',
                            params: { item: item },
                          });
                        }}>
                        <View
                          style={{
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                          }}>
                          <View style={styles.orderItemContainer}>
                            <View
                              style={{ display: 'flex', flexDirection: 'row' }}>
                              <Text style={styles.title}>Mã đơn hàng: </Text>
                              <Text style={styles.subTitle}>
                                {item.order_id.substring(0, 8)}
                              </Text>
                            </View>
                            <View
                              style={{ display: 'flex', flexDirection: 'row' }}>
                              <Text style={styles.title}>
                                Thời gian đặt hàng:{' '}
                              </Text>
                              <Text style={styles.subTitle}>
                                {moment(item.created_at).format(
                                  'DD/MM/YYYY, h:mm:ss',
                                )}
                              </Text>
                            </View>
                            <View
                              style={{ display: 'flex', flexDirection: 'row' }}>
                              <Text style={styles.title}>Tổng tiền : </Text>
                              <Text style={styles.subTitle}>
                                {item.total_price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                                  ' VND'}
                              </Text>
                            </View>
                            <View
                              style={{ display: 'flex', flexDirection: 'row' }}>
                              <Text style={styles.title}>Tình trạng : </Text>
                              <Text
                                style={[
                                  styles.subTitle,
                                  { color: Color.colorPrimaryDark },
                                ]}>
                                {item.status}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 280,
              }}>
              <Text style={styles.titleOrder}>
                Bạn chưa có đơn hàng nào rồi
              </Text>
              <Button
                color={Color.colorPrimaryDark}
                title="Tiếp tục mua sắm"
                onPress={() =>
                {
                  this.props.navigation.navigate('Home');
                }}
              />
            </View>
          )}
        </View>
        <Loading ref="loading" indicatorColor={Color.colorPrimary} />
      </View>
    );
  }
}

export default MyOrderScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.backgroundColor,
  },
  box1: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
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
  },
  orderItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    borderRadius: 10,
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
    marginBottom: 30,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    color: Color.gray,
  },
  titleOrder: {
    color: Color.textColor,
    fontFamily: Fonts.primarySemiBold,
    fontSize: 20,
    marginBottom: 20,
  },
});
