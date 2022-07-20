import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { updateUser } from '../axios/ServerRequest';
import AppStatusBar from '../components/AppStatusBar';
import LoadingButton from '../components/LoadingButton';
import ToolBar from '../components/ToolBar';
import UserInput from '../components/UserInput';
import { Color, Strings } from '../theme';
import { getUserDetails, setUserDetails } from '../utils/LocalStorage';
import { DEFAULT_RULE, EMAIL_RULE } from '../utils/Validator/rule';
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
    } = this.state;

    if (!Validator(email, DEFAULT_RULE))
    {
      this.setState({
        emailError: true,
      });
      return;
    }

    if (!Validator(email, EMAIL_RULE))
    {
      this.setState({
        emailError: true,
      });
      return;
    }

    if (!Validator(address, DEFAULT_RULE))
    {
      this.setState({
        addressError: true,
      });
      return;
    }

    this.setState({ loading: true });
    user.email = email;
    user.address = address;
    updateUser(user)
      .then(response =>
      {
        let data = response.data;
        if (data.status === "success")
        {
          this.props.navigation.navigate(goBack());
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
            title="Địa chỉ"
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
                editable={false}
              />
              <UserInput
                placeholder={Strings.mobileHint}
                value={this.state.phone}
                maxLength={50}
                editable={false}
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
