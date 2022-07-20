import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, BackHandler, Button } from 'react-native';
import Done from '../assets/images/done.png';
import { Color, Fonts, Strings, Dimension } from '../theme';
import AppStatusBar from '../components/AppStatusBar';

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <View style={styles.imgContainerStyle}>
            <Image style={styles.imageStyle} source={Done} />
          </View>
          <Text style={styles.title}>Cảm ơn bạn đã đặt hàng!</Text>
          <Button
            color={Color.colorPrimaryDark}
            title="Tiếp tục mua sắm"
            onPress={() => {
              this.props.navigation.replace('HomeScreen');
            }}
          />
        </View>
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
  imageStyle: {
    width: '50%',
    height: '50%',
  },
  title: {
    color: Color.textColor,
    fontFamily: Fonts.primarySemiBold,
    fontSize: 20,
    marginBottom: 20,
  },
});
export default ThankYou;
