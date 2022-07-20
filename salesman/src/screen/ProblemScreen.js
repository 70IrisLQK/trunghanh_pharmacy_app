import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Fonts} from '../theme';
import ToolBar from '../components/ToolBar';
import Icon from 'react-native-feather1s';
import {getUserDetails} from '../utils/LocalStorage';
import Loading from '../components/Loading';
import Toast from 'react-native-simple-toast';
import {color} from 'react-native-reanimated';
import Moment from 'react-moment';
import {Paragraph} from 'react-native-paper';
class ProblemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      note: null,
    };
  }

  async componentDidMount() {
    this.reRenderSomething = this.props.navigation.addListener('focus', () => {
      this.init();
    });
  }

  init = async () => {
    let userDetails = await getUserDetails();
    let item = null;
    if (this.props.route.params !== undefined) {
      item = this.props.route.params.item;
    }
    console.log(this.props.route.params.item);
    this.setState({
      user: userDetails,
      note: item,
    });
  };

  render() {
    const {navigation} = this.props;
    const {user, note} = this.state;
    return (
      <View style={styles.mainContainer}>
        <View>
          <AppStatusBar
            backgroundColor={Color.colorPrimary}
            barStyle="light-content"
          />
          <ToolBar
            title="Thông tin ghi chú"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          />
          <ScrollView contentContainerStyle={{paddingBottom: 80}}>
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
                <Text style={styles.title}>
                  Mã ghi chú: {note ? note.note_id.substring(0, 8) : null}
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
                  Ngày gửi: {' '}
                  {note ? (
                    <Moment element={Text} format="DD-MM-YYYY">
                      {note.create_at}
                    </Moment>
                  ) : null}
                </Text>
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
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.title1}>Loại ghi chú</Text>
                <Text style={styles.title2}>
                  {note
                    ? note.notetype
                      ? note.notetype.name
                      : '(Chưa có)'
                    : '(Chưa có)'}
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
                <Text style={styles.title1}>Trạng thái</Text>
                {note ? (
                  note.status === 'Chờ xử lý' ? (
                    <Paragraph style={{color: Color.orange}}>
                      {note.status}
                    </Paragraph>
                  ) : (
                    <Paragraph style={{color: Color.blueviolet}}>
                      {note.status}
                    </Paragraph>
                  )
                ) : null}
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
                <Text style={styles.title1}>Người tạo</Text>
                <Text style={styles.title}>{user ? user.fullname : null}</Text>
              </View>
            </View>

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
                <Text style={styles.title}>Thông tin chung</Text>
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
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.title1}>Tên cửa hàng</Text>
                <Text style={styles.title}>
                  {note
                    ? note.pharmacy
                      ? note.pharmacy.CUSTOMER_NAME
                      : '(Chưa có)'
                    : '(Chưa có)'}
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
                <Text style={styles.title1}>Mã cửa hàng</Text>
                <Text style={styles.title} numberOfLines={1}>
                  {note
                    ? note.pharmacy
                      ? note.pharmacy.pharmacy_id.substring(0, 8)
                      : '(Chưa có)'
                    : '(Chưa có)'}
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
                <Text style={styles.title1}>Số điện thoại</Text>
                <Text style={styles.title}>
                  {note
                    ? note.pharmacy
                      ? note.pharmacy.customer
                        ? note.pharmacy.customer
                        : '(Chưa có)'
                      : '(Chưa có)'
                    : null}
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
                <Text style={styles.title1}>Địa chỉ</Text>
                <Text numberOfLines={1} style={styles.title}>
                  {note
                    ? note.pharmacy
                      ? note.pharmacy.CUSTOMER_ADDRESS
                      : '(Chưa có)'
                    : '(Chưa có)'}
                </Text>
              </View>
            </View>

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
                <Text style={styles.title}>Nội dung ghi chú</Text>
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
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.title} numberOfLines={3}>
                  {note
                    ? note.description
                      ? note.description
                      : '(Chưa có)'
                    : '(Chưa có)'}
                </Text>
              </View>
            </View>
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
                <Text style={styles.title} numberOfLines={3}>
                  Nội dung phản hồi
                </Text>
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
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.title}>
                  {note
                    ? note.reply_note
                      ? note.reply_note
                      : '(Chưa có)'
                    : '(Chưa có)'}
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
    backgroundColor: Color.backgroundColor,
    flexDirection: 'column',
    flex: 1,
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
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
  },
  title1: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    color: '#44C062',
  },
  title2: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    color: Color.blue,
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

export default ProblemScreen;
