import React, { Component } from 'react';
import
{
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
  Image,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import { Color, Fonts, Strings, Dimension } from '../theme';

import Logo from '../components/Logo';
import Card from '../components/Card';
import UserInput from '../components/UserInput';
import LoadingButton from '../components/LoadingButton';
import { checkInternetConnection, userLogin } from '../axios/ServerRequest';
import Validator from '../utils/Validator/Validator';
import { DEFAULT_RULE, PHONE_RULE, PASSWORD_RULE } from '../utils/Validator/rule';
import Toast from 'react-native-simple-toast';
import { setUserDetails } from '../utils/LocalStorage';
const defaultHandler = global.ErrorUtils.getGlobalHandler()
class LoginScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: false,
      usernameErrorMessage: '',
      passwordError: false,
      passwordErrorMessage: '',
    };
  }

  componentDidMount = () =>
  {
    checkInternetConnection();
  };

  login = () =>
  {
    const {
      username,
      password,
      usernameError,
      passwordError,
      usernameErrorMessage,
      passwordErrorMessage,
    } = this.state;

    if (!Validator(username, DEFAULT_RULE))
    {
      this.setState({
        usernameErrorMessage: Strings.usernameErrorMessage,
        usernameError: true,
      });
      return;
    }
    if (!Validator(password, DEFAULT_RULE))
    {
      this.setState({
        passwordErrorMessage: Strings.passwordErrorMessage,
        passwordError: true,
      });
      return;
    }
    userLogin(username, password)
      .then(response =>
      {
        let data = response.data;
        if (data.user.role_id === 'A54FA54C-04A8-4C56-9993-1ECC797DA1A4')
        {
          if (data.status === "success")
          {
            this.showToast("Đăng nhập thành công");
            setUserDetails(data.user);
            this.props.navigation.replace('HomeScreen');
          } else
          {
            this.showToast("Đăng nhập thất bại");
          }
        } else
        {
          this.showToast(
            'Quá trình xác thực đã thất bại. Bạn không có quyền truy cập hệ thống này!',
          );
          return;
        }
      })
      .catch(error =>
      {
        console.log(error.message);
        this.setState({
          usernameErrorMessage: "Đăng nhập thất bại. Tài khoản hoặc mật khẩu đã sai!",
          usernameError: true,
          passwordErrorMessage: "Đăng nhập thất bại. Tài khoản hoặc mật khẩu đã sai!",
          passwordError: true,
        });
      });
  };

  resetState = () =>
  {
    this.setState({
      usernameErrorMessage: '',
      usernameError: false,
      passwordErrorMessage: '',
      passwordError: false,
    });
  };

  showToast = message =>
  {
    Toast.showWithGravity(message, Toast.SHORT, Toast.CENTER);
  };

  render()
  {
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar
          barStyle="light-content"
          backgroundColor={Color.colorPrimary}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <View style={styles.innerContainer}>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={styles.scrollview}
              onContentSizeChange={this.onContentSizeChange}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'always'}>
              <View>
                <View style={styles.headingContainer}>
                  <Text style={styles.heading}>{Strings.login_text1}</Text>

                  <Text style={styles.tagline}>{Strings.login_text2}</Text>
                </View>
                <Logo />
                <Card style={{ margin: 30, padding: 20 }}>
                  <UserInput
                    placeholder={Strings.usernameHint}
                    error={this.state.usernameError}
                    value={this.state.username}
                    errorMessage={this.state.usernameErrorMessage}
                    maxLength={10}
                    onChangeText={username =>
                    {
                      this.setState({
                        username,
                      }),
                        this.resetState();
                    }}
                  />
                  <UserInput
                    placeholder={Strings.passwordHint}
                    secureTextEntry={true}
                    error={this.state.passwordError}
                    value={this.state.password}
                    errorMessage={this.state.passwordErrorMessage}
                    maxLength={20}
                    onChangeText={password =>
                    {
                      this.setState({
                        password,
                      }),
                        this.resetState();
                    }}
                  />
                  <View
                    style={[
                      styles.loginLinkContainer,
                      { marginTop: 20, justifyContent: 'flex-end' },
                    ]}>
                    <View style={styles.buttonContainer}>
                      <LoadingButton
                        title={Strings.signin}
                        onPress={() =>
                        {
                          this.login();
                        }}
                      />
                    </View>
                  </View>
                </Card>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: Color.white,
    flexDirection: 'column',
    padding: 20,
    flexGrow: 1,
  },
  container: {
    flex: 1,
    zIndex: 99999999,
  },
  loginLinkContainer: {
    display: 'flex',

    flexDirection: 'row',
    width: '100%',
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 20,
  },

  heading: {
    fontSize: 20,
    fontFamily: Fonts.primarySemiBold,
    color: Color.headingColor,
  },

  tagline: {
    fontSize: 12,
    fontFamily: Fonts.primaryRegular,
    color: Color.taglineColor,
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: Fonts.primaryRegular,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontFamily: Fonts.primaryBold,
  },
  linkText: {
    flex: 1,
    color: Color.textColor,
    padding: 10,
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    justifyContent: 'space-between',
    textAlign: 'right',
  },
  activeLinkText: {
    flex: 1,
    color: Color.colorPrimaryDark,
    padding: 10,
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    textAlign: 'left',
  },
  bottomImage: {
    height: 150,
    width: 150,
    position: 'absolute',
    bottom: 0,
    right: 80,
    zIndex: 1,
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {},
});
export default LoginScreen;
