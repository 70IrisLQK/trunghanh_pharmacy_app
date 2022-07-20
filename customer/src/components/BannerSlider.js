import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import ViewSlider from '../components/ViewSlider';
import Dimension from '../theme/Dimension';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from '../theme/Color';
import Fonts from '../theme/Fonts';
import Strings from '../theme/Strings';
import Slide1 from "../assets/images/slide1.png"
import Slide2 from "../assets/images/slide2.png"
import Slide3 from "../assets/images/slide3.png"
const { width, height } = Dimension.window;

function BannerSlider(props) {
  return (
    <ViewSlider
      renderSlides={
        <>
          <View style={styles.viewBox}>
            <Image
              style={styles.bannerImage}
              source={
                Slide1
              }
              style={{ height: 200, width }}
            />
          </View>

          <View style={styles.viewBox}>
            <Image
              style={styles.bannerImage}
              source={
                Slide2
              }
              style={{ height: 200, width }}
            />
          </View>
        </>
      }
      style={styles.slider} //Main slider container style
      height={180} //Height of your slider
      slideCount={2} //How many views you are adding to slide
      dots={true} // Pagination dots visibility true for visibile
      dotActiveColor={Color.colorPrimary} //Pagination dot active color
      dotInactiveColor={Color.gray} // Pagination do inactive color
      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
      autoSlide={true} //The views will slide automatically
      slideInterval={3000} //In Miliseconds
    />
  );
}
const styles = StyleSheet.create({
  viewBox: {
    justifyContent: 'center',
    width: width,
    alignItems: 'center',
    height: '100%',
  },
  slider: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dotContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
});

export default BannerSlider;
