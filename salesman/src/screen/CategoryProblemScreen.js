import React, { Component } from 'react';
import
{
  ScrollView, StyleSheet, Text, View
} from 'react-native';
import Icon from 'react-native-feather1s';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getNoteType } from '../axios/ServerRequest';
import AppStatusBar from '../components/AppStatusBar';
import Loading from '../components/Loading';
import ToolBar from '../components/ToolBar';
import { Color, Fonts } from '../theme';
import { getUserDetails } from '../utils/LocalStorage';

class CategoryProblemScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      user: null,
      noteType: [],
      pharmacy: {},
      navigation: [],
      loading: true,
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
    this.fetchNoteType();
    this.setState({
      user: userDetail,
      navigation: navigation,
    });
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

  render()
  {
    const { noteType } = this.state;
    const { navigation } = this.props;
    let pharmacy = null;
    if (this.props.route.params !== undefined)
    {
      pharmacy = this.props.route.params.params.item;
    }
    return (
      <View style={styles.mainContainer}>
        <View>
          <AppStatusBar
            backgroundColor={Color.colorPrimary}
            barStyle="light-content"
          />
          <ToolBar
            title="Loại ghi chú"
            icon="arrow-left"
            onPress={() => navigation.goBack()}></ToolBar>

          <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
            {noteType.length > 0
              ? noteType.map((item, index) =>
              {
                return (
                  <TouchableOpacity
                    onPress={() =>
                    {
                      navigation.navigate('AddProblem', {
                        params: {
                          item: item,
                          navigation: navigation,
                          pharmacy: pharmacy,
                        },
                      });
                    }}>
                    <View style={styles.addressContainer}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          flexDirection: 'row',
                          marginBottom: 10,
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Icon name="box" size={24} color="#44C062" />
                          <Text style={styles.title1}>
                            {item ? item.name : null}
                          </Text>
                        </View>
                        <Icon name="chevron-right" size={24} />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
              : null}
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
    fontSize: 17,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
    marginLeft: 10,
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

export default CategoryProblemScreen;
