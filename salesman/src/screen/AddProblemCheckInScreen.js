import { Picker } from '@react-native-community/picker';
import React, { Component } from 'react';
import
{
  ScrollView, StyleSheet, Text, View
} from 'react-native';
import { getNoteType } from '../axios/ServerRequest';
import AppStatusBar from '../components/AppStatusBar';
import Loading from '../components/Loading';
import ToolBar from '../components/ToolBar';
import UserInput from '../components/UserInput';
import { Color, Dimension, Fonts } from '../theme';
import { setNoteDescriptionItem, setNoteItem } from '../utils/LocalStorage';

class AddProblemCheckInScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      noteType: [],
      selectedPhotoIndex: 0,
      localPhotos: [],
      description: '',
      descriptionError: false,
      descriptionErrorMessage: '',
      noteTypeSelected: '',
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
    this.fetchNoteType();
  };

  fetchNoteType = () =>
  {
    this.refs.loading.show();
    getNoteType()
      .then(response =>
      {
        this.setState({ noteType: response.data.note_types });
        this.refs.loading.close();
      })
      .catch(error =>
      {
        console.log(error);
        this.refs.loading.close();
      });
  };

  resetState = () =>
  {
    this.setState({
      descriptionErrorMessage: '',
      descriptionError: false,
    });
  };

  setNotes = () =>
  {
    setNoteItem(noteTypeSelected),
      setNoteDescriptionItem(description)
  }

  render()
  {
    const { noteType, description, localPhotos, noteTypeSelected } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.mainContainer}>
        <View>
          <AppStatusBar
            backgroundColor={Color.colorPrimary}
            barStyle="light-content"
          />
          <ToolBar
            title="Ghi chú"
            icon="arrow-left"
            onPress={() => navigation.goBack(this.setNotes)}></ToolBar>
          <View style={styles.listContainer}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
              <Text style={styles.title}>Nội dung</Text>
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
              <Text style={styles.title}>Loại ghi chú</Text>
              <View
                style={{
                  backgroundColor: Color.white,
                  color: Color.primary,
                  marginTop: 10,
                }}>
                <Picker
                  selectedValue={this.state.noteTypeSelected}
                  style={{ height: 50, width: '100%' }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ noteTypeSelected: itemValue })
                  }>
                  {noteType.map((item, index) =>
                  {
                    return (
                      <Picker.Item
                        label={item.name}
                        value={item.note_type_id}
                        key={item.note_type_id}
                      />
                    );
                  })}
                </Picker>
              </View>
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
    color: Color.colorPrimary,
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    color: Color.gray,
  },

  body: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.primaryRegular,
    color: Color.colorPrimary,
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

export default AddProblemCheckInScreen;
