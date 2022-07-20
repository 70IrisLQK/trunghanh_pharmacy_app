import React, { Component, Fragment } from 'react';
import
{
  Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-simple-toast';
import { addProblem } from '../axios/ServerRequest';
import AppStatusBar from '../components/AppStatusBar';
import Loading from '../components/Loading';
import ToolBar from '../components/ToolBar';
import UserInput from '../components/UserInput';
import { Color, Dimension, Fonts } from '../theme';
import { getUserDetails } from '../utils/LocalStorage';
import { DEFAULT_RULE } from '../utils/Validator/rule';
import Validator from '../utils/Validator/Validator';

class AddProblemScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      user: null,
      noteType: [],
      navigation: [],
      pharmacy: [],
      selectedPhotoIndex: 0,
      localPhotos: [],
      name: '',
      address: '',
      phone: '',
      description: '',
      descriptionError: false,
      descriptionErrorMessage: '',
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
    let item = null;
    let navigation = null;
    let pharmacy = null;
    if (this.props.route.params !== undefined)
    {
      item = this.props.route.params.params.item;
      navigation = this.props.route.params.params.navigation;
      pharmacy = this.props.route.params.params.pharmacy;
    }

    this.setState({
      user: userDetails,
      pharmacy: pharmacy,
      noteType: item,
      navigation: navigation,
      name: pharmacy.CUSTOMER_NAME,
      address: pharmacy.CUSTOMER_ADDRESS,
      phone: pharmacy.customer_tel ? pharmacy.customer_tel : '(Chưa có)',
    });
  };

  onAddProblem = () =>
  {
    const {
      user,
      description,
      image,
      noteType,
      pharmacy,
      localPhotos,
      descriptionError,
      descriptionErrorMessage,
    } = this.state;
    if (!Validator(description, DEFAULT_RULE))
    {
      this.setState({
        descriptionErrorMessage: 'Nội dung bắt buộc',
        descriptionError: true,
      });
      return;
    }
    let formData = new FormData();
    let file = null;
    if (localPhotos && localPhotos.length > 0)
    {
      localPhotos.forEach(image =>
      {
        file = {
          uri:
            Platform.OS === 'ios'
              ? image.path.replace('file://', '')
              : image.path,
          name:
            image.filename ||
            Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
          type: image.mime || 'image/jpeg',
        };
        formData.append('image', file);
      });
    }
    formData.append('user_id', user.user_id);
    formData.append('description', description);
    formData.append('note_type_id', noteType.note_type_id);
    formData.append('pharmacy_id', pharmacy.pharmacy_id);
    this.refs.loading.show();
    addProblem(formData)
      .then(response =>
      {
        let data = response.data;
        if (data.status === 'success')
        {
          this.setState({
            localPhotos: [],
            description: '',
          });
          this.props.navigation.goBack();
          this.refs.loading.close();
        }
      })
      .catch(error =>
      {
        console.log(error.message);
        Toast.showWithGravity('Đã xảy ra lỗi. Vui lòng thử lại');
        this.refs.loading.close();
      });
  };
  onPressAddPhotoBtn = () =>
  {
    this.ActionSheetSelectPhoto.show();
  };
  showActionSheet = index =>
  {
    this.setState({
      selectedPhotoIndex: index,
    });
    this.ActionSheet.show();
  };

  onActionDeleteDone = index =>
  {
    if (index === 0)
    {
      const array = [...this.state.localPhotos];
      array.splice(this.state.selectedPhotoIndex, 1);
      this.setState({ localPhotos: array });
    }
  };

  onActionSelectPhotoDone = index =>
  {
    switch (index)
    {
      case 0:
        ImagePicker.openCamera({}).then(image =>
        {
          this.setState({
            localPhotos: [...this.state.localPhotos, image],
          });
        });
        break;
      case 1:
        ImagePicker.openPicker({
          multiple: true,
          maxFiles: 10,
          mediaType: 'photo',
        })
          .then(images =>
          {
            images.forEach(image =>
            {
              this.setState({
                localPhotos: [...this.state.localPhotos, image],
              });
            });
          })
          .catch(error =>
          {
            alert(JSON.stringify(error));
          });
        break;
      default:
        break;
    }
  };

  renderListPhotos = localPhotos =>
  {
    const photos = localPhotos.map((photo, index) => (
      <TouchableOpacity
        key={index}
        onPress={() =>
        {
          this.showActionSheet(index);
        }}>
        <Image style={styles.photo} source={{ uri: photo.path }} />
      </TouchableOpacity>
    ));

    return photos;
  };

  resetState = () =>
  {
    this.setState({
      descriptionErrorMessage: '',
      descriptionError: false,
    });
  };

  renderSelectPhotoControl = localPhotos =>
  {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Hình ảnh</Text>
        <ScrollView style={styles.photoList} horizontal={true}>
          {this.renderListPhotos(localPhotos)}
          {localPhotos.length < 1 ? (
            <TouchableOpacity onPress={this.onPressAddPhotoBtn.bind(this)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      </View>
    );
  };
  render()
  {
    const {
      navigation,
      item,
      pharmacy,
      name,
      address,
      phone,
      description,
      localPhotos,
    } = this.state;
    return (
      <View style={styles.mainContainer}>
        <View>
          <AppStatusBar
            backgroundColor={Color.colorPrimary}
            barStyle="light-content"
          />
          <ToolBar
            title="Thêm ghi chú"
            icon="arrow-left"
            onPress={() => navigation.goBack()}></ToolBar>
          <View style={styles.listContainer}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
              <Text style={styles.title}>Thông tin</Text>
              <UserInput
                placeholder={'Tên nhà thuốc'}
                value={name}
                editable={false}
                selectTextOnFocus={false}
              />
              <UserInput
                placeholder={'Địa chỉ'}
                value={address}
                editable={false}
                selectTextOnFocus={false}
              />
              <UserInput
                placeholder={'Số điện thoại'}
                value={phone}
                editable={false}
                selectTextOnFocus={false}
              />
              <UserInput
                placeholder={'Nội dung ghi chú'}
                error={this.state.descriptionError}
                value={description}
                errorMessage={this.state.descriptionErrorMessage}
                multiline
                numberOfLines={5}
                onChangeText={description =>
                {
                  this.setState({
                    description,
                  }),
                    this.resetState();
                }}
              />
              <Fragment>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                  <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <View style={styles.body}>
                      {this.renderSelectPhotoControl(localPhotos)}
                    </View>
                  </ScrollView>
                  <ActionSheet
                    ref={o => (this.ActionSheet = o)}
                    title={'Bạn có chắc chắn bỏ tấm ảnh này?'}
                    options={['Xác nhận', 'Hủy bỏ']}
                    cancelButtonIndex={1}
                    destructiveButtonIndex={0}
                    onPress={index =>
                    {
                      this.onActionDeleteDone(index);
                    }}
                  />
                  <ActionSheet
                    ref={o => (this.ActionSheetSelectPhoto = o)}
                    title={'Chọn ảnh'}
                    options={['Chụp hình...', 'Chọn từ thư viện...', 'Hủy']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={index =>
                    {
                      this.onActionSelectPhotoDone(index);
                    }}
                  />
                </SafeAreaView>
              </Fragment>
            </ScrollView>
          </View>
          <View style={styles.box2}>
            <View style={styles.paymentContainer}>
              <TouchableOpacity
                style={styles.checkout_container}
                onPress={() => this.onAddProblem()}>
                <Text style={styles.checkout}>Ghi chú</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  listContainer: {
    padding: 20,
    margin: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: Color.graylight,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    color: Color.gray,
  },
  scrollView: {
    backgroundColor: Color.lightblue,
  },
  body: {
    backgroundColor: Color.backgroundColor,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
    fontWeight: 'bold',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Color.gray,
  },
  highlight: {
    fontWeight: '700',
  },
  section: {
    backgroundColor: Color.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addPhotoTitle: {
    fontSize: 15,

    fontWeight: 'bold',
  },
  photoList: {
    height: 70,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
    paddingHorizontal: 24,
  },
  photo: {
    marginRight: 10,
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.darkgray,
  },
  photoIcon: {
    width: 50,
    height: 50,
  },
  addButtonContainer: {
    padding: 15,
    justifyContent: 'flex-end',
  },
  addButtonText: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 48,
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
    justifyContent: 'center',
    borderRadius: 20,
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
    fontSize: 20,
    fontWeight: '700',
    color: Color.white,
  },
});

export default AddProblemScreen;
