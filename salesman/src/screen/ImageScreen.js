import React, { Component, Fragment } from 'react';
import
{
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import { Color, Fonts, Dimension } from '../theme';
import ToolBar from '../components/ToolBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { setImageItem, getImageItem } from '../utils/LocalStorage';
import Loading from '../components/Loading';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';

class ImageScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      selectedPhotoIndex: 0,
      localPhotos: [],
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
    const image = await getImageItem();
    this.setState({
      localPhotos: image ? image : [],
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
      localPhotos: [],
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
    const { navigation } = this.props;
    const { localPhotos } = this.state;
    return (
      <View style={styles.mainContainer}>
        <View>
          <AppStatusBar
            backgroundColor={Color.colorPrimary}
            barStyle="light-content"
          />
          <ToolBar
            title="Hình ảnh"
            icon="arrow-left"
            onPress={() =>
              navigation.goBack(setImageItem(localPhotos))
            }></ToolBar>
          <View style={styles.listContainer}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
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

  scrollView: {
    backgroundColor: Color.lightblue,
  },
  body: {
    backgroundColor: Color.backgroundColor,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.primaryRegular,
    color: Color.colorPrimary,
    fontWeight: 'bold',
  },

  section: {
    backgroundColor: Color.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  photoList: {
    height: 90,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
    paddingHorizontal: 24,
  },
  photo: {
    marginRight: 10,
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.darkgray,
  },

  addButtonText: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 48,
  },
});

export default ImageScreen;
