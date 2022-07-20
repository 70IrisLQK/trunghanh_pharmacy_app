import React, { Component } from 'react';
import
{
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import { Color, Dimension, Fonts } from '../theme';

import ToolBar from '../components/ToolBar';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';
import BannerSlider from '../components/BannerSlider';
import Loading from '../components/Loading';
import { getNewProducts, getNote } from '../axios/ServerRequest';
import { getUserDetails, setUserLocation } from '../utils/LocalStorage';
import ProductItem from '../components/ProductItem';
import Toast from 'react-native-simple-toast';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Moment from 'react-moment';
import Geolocation from '@react-native-community/geolocation';

class ListProblemScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      loading: true,
      notes: [],
      user: [],
      user_id: '',
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
    this.fetchNote();
    this.setState({
      user_id: userDetail.user_id,
      user: userDetail,
    });
  };

  fetchNote = user_id =>
  {
    this.refs.loading.show();
    getNote(user_id)
      .then(response =>
      {
        this.setState({ notes: response.data.notes });
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
    const { user, notes } = this.state;
    return (
      <View style={styles.mainContainer}>
        <View>
          <AppStatusBar
            backgroundColor={Color.colorPrimary}
            barStyle="light-content"
          />
          <ToolBar
            title="Ghi chú"
            icon="menu"
            onPress={() => navigation.openDrawer()}>
            <TouchableOpacity
              onPress={() =>
              {
                navigation.navigate('ListPharmacy');
              }}>
              <Icon name="plus" size={24} color="#ffffff" />
            </TouchableOpacity>
          </ToolBar>

          <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
            {notes.length > 0 ? (
              notes.map((item, index) =>
              {
                return (
                  <TouchableOpacity
                    onPress={() =>
                    {
                      navigation.navigate('ProductView', {
                        screen: 'Problem',
                        params: { item: item },
                      });
                    }}>
                    <View style={styles.addressContainer}>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          flexDirection: 'row',
                          marginBottom: 10,
                        }}>
                        <Text style={styles.title}>
                          Mã ghi chú:{' '}
                          {item ? item.note_id.substring(0, 8) : null}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          flexDirection: 'row',
                          marginBottom: 10,
                        }}>
                        <Text style={styles.subTitle}>
                          Ngày gửi:{' '}
                          <Moment element={Text} format="DD-MM-YYYY">
                            {item.create_at}
                          </Moment>
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
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          flexDirection: 'row',
                          marginBottom: 10,
                        }}>
                        <Text style={styles.title1}>Loại ghi chú</Text>
                        <Text style={styles.title2}>
                          {item ? item.notetype ? item.notetype.name : '(Chưa có)' : null}
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
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          flexDirection: 'row',
                          marginBottom: 10,
                        }}>
                        <Text style={styles.title1}>Người tạo</Text>
                        <Text style={styles.title}>
                          {user ? user.fullname : null}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : null}
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
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
  },
  title1: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    color: '#44C062',
  },
  title2: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    color: Color.blue,
  },
  title3: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    color: Color.orange,
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
  productImage: {
    height: 100,
    width: 100,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default ListProblemScreen;
