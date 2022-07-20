import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import { Color, Fonts, Strings, Dimension } from '../theme';
import ToolBar from '../components/ToolBar';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { getUserDetails } from '../utils/LocalStorage';
import UserInput from '../components/UserInput';
import LoadingButton from '../components/LoadingButton';
import { DEFAULT_RULE, EMAIL_RULE, PHONE_RULE } from '../utils/Validator/rule';
import { updateUser } from '../axios/ServerRequest';
import { getToken, setUserDetails } from '../utils/LocalStorage';
import Validator from '../utils/Validator/Validator';

class AddressScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      user: null,
      name: '',
      phone: '',
      id: '',
      email: '',
      address: '',
      emailError: '',
      addressError: '',
      phoneError: '',
      token: '',
      loading: false,
    };
  }
  async componentDidMount()
  {
    let user = await getUserDetails();
    this.setState({
      user: user,
      id: user.user_id,
      phone: user.phone,
      name: user.fullname,
      address: user.address,
      email: user.email,
      token: user.token,
    });
  }

  updateAddress = () =>
  {
    const {
      user,
      email,
      address,
      emailError,
      addressError,
      phone,
      phoneError,
      id,
      name,
    } = this.state;

    if (!Validator(email, DEFAULT_RULE))
    {
      this.setState({
        emailError: 'Thông tin này bắt buộc.',
      });
      return;
    }

    if (!Validator(email, EMAIL_RULE))
    {
      this.setState({
        emailError: 'Email phải đúng theo mẫu ví dụ abc@gmail.com.',
      });
      return;
    }

    if (!Validator(address, DEFAULT_RULE))
    {
      this.setState({
        addressError: 'Thông tin này bắt buộc.',
      });
      return;
    }

    if (!Validator(phone, PHONE_RULE))
    {
      this.setState({
        phoneError: 'SDT cần phải đúng chuẩn 10 số.',
      });
      return;
    }

    this.setState({ loading: true });
    user.email = email;
    user.address = address;
    user.phone = phone;
    user.fullname = name;
    user.id = id;
    updateUser(user)
      .then(response =>
      {
        let data = response.data;
        if (data.status === 'success')
        {
          this.props.navigation.goBack();
          setUserDetails(user);
        }
        this.setState({ loading: false });
      })
      .catch(error =>
      {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render()
  {
    const { navigation } = this.props;
    const { user } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <AppStatusBar
            backgroundColor={Color.colorPrimary}
            barStyle="light-content"
          />
          <ToolBar
            title="Sửa thông tin"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          />
          {user !== null ? (
            <ScrollView
              style={{ padding: 20, paddingRight: 20 }}
              contentContainerStyle={styles.scrollview}
              onContentSizeChange={this.onContentSizeChange}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'always'}>
              <UserInput
                placeholder={Strings.nameHint}
                value={this.state.name}
                errorMessage={this.state.nameErrorMessage}
                maxLength={50}
                onChangeText={name =>
                {
                  this.setState({
                    name,
                  });
                }}
              />
              <UserInput
                placeholder={Strings.mobileHint}
                maxLength={50}
                value={this.state.phone}
                errorMessage={this.state.phoneError}
                error={this.state.phoneError}
                onChangeText={phone =>
                {
                  this.setState({
                    phone,
                  });
                }}
              />
              <UserInput
                placeholder={Strings.emailHint}
                value={this.state.email}
                error={this.state.emailError}
                onChangeText={email =>
                {
                  this.setState({
                    email,
                  });
                }}
              />
              <UserInput
                placeholder={Strings.addressHint}
                errorMessage={this.state.addressError}
                value={this.state.address}
                error={this.state.addressError}
                onChangeText={address =>
                {
                  this.setState({
                    address,
                  });
                }}
              />
              <View style={{ marginTop: 20 }}>
                <LoadingButton
                  title={Strings.save}
                  loading={this.state.loading}
                  onPress={() =>
                  {
                    this.updateAddress();
                  }}
                />
              </View>
            </ScrollView>
          ) : null}
        </View>
      </View>
    );
  }
}

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  box1: {
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    fontSize: 18,
    color: Color.textColor,
  },
  title: {
    fontSize: 16,
    color: Color.black,
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 5,
  },

  addContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
});
