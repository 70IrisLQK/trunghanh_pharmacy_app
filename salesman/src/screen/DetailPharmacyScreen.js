import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import ToolBar from '../components/ToolBar';
import { Color, Fonts } from '../theme';
class DetailPharmacyScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      pharmacyItem: null,
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
    this.setState({
      pharmacyItem: item,
    });
  };

  render()
  {
    const { navigation } = this.props;
    const { pharmacyItem } = this.state;
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar
          backgroundColor={Color.colorPrimary}
          barStyle="light-content"
        />
        <ToolBar
          title="Nhà thuốc"
          icon="arrow-left"
          onPress={() => navigation.goBack()}></ToolBar>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View style={styles.addressContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginBottom: 10,
              }}>
              <Text style={styles.title1}>Mã đại lí</Text>
              <Text style={styles.title}>
                {pharmacyItem ? pharmacyItem.pharmacy_id.substring(0, 8) : null}
              </Text>
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
              <Text style={styles.title1}>Thông tin chung</Text>
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
              <Text style={styles.title2} numberOfLines={1}>
                Tên nhà thuốc
              </Text>
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
              <Text style={styles.title2}>Địa chỉ</Text>
              <Text style={styles.titleSub} numberOfLines={1}>
                {pharmacyItem ? ' ' + pharmacyItem.CUSTOMER_ADDRESS : null}
              </Text>
            </View>
          </View>

          <View style={styles.addressContainer}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              <Text style={styles.title1}>Miêu tả</Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 2,
                backgroundColor: '#eeeeee',
                marginBottom: 10,
              }}
            />
            <Text style={styles.titleSub}>
              {pharmacyItem
                ? pharmacyItem.description
                  ? pharmacyItem.description
                  : '(Chưa có)'
                : null}
            </Text>
          </View>
        </ScrollView>
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
    fontSize: 18,
    color: Color.colorPrimary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
});

export default DetailPharmacyScreen;
