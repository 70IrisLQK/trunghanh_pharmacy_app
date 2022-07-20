import React, { Component } from 'react';
import
{
    ScrollView, StyleSheet, Text, View
} from 'react-native';
import Icon from 'react-native-feather1s';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from "react-native-simple-toast";
import { orderPlace } from '../axios/ServerRequest';
import AppStatusBar from '../components/AppStatusBar';
import Loading from '../components/Loading';
import ToolBar from '../components/ToolBar';
import { Color, Fonts } from '../theme';
import { getUserDetails, setCart } from '../utils/LocalStorage';

class CategoryFlagScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            user: null,
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
        this.setState({
            user: userDetails,
        });
    };


    onCategoryFlagScreen = () =>
    {
        this.refs.loading.show();
        const { user, cartList, totalPrice, paymentMethod } = this.state;
        const orderItems = [];
        for (let i = 0; i < cartList.length; i++)
        {
            const orderItem = {
                id: cartList[i].item.product_id,
                itemName: cartList[i].item.product_name,
                itemQuantity: cartList[i].count,
                itemImage: cartList[i].item.image,
                itemPrice: cartList[i].item.price,
                itemTotal: cartList[i].subTotal,
                itemUnit: cartList[i].item.unit.name,
            };
            orderItems.push(orderItem);
        }
        const orderDetails = {
            fullname: user.fullname,
            phone: user.phone,
            address: user.address,
            user_id: user.user_id,
            total: totalPrice,
            payment_id: paymentMethod,
            orderItems: orderItems,
        };
        orderPlace(orderDetails)
            .then(response =>
            {
                let data = response.data;
                if (data.status === "success")
                {
                    setCart(null);
                    this.props.navigation.navigate('ThankYou');
                    this.refs.loading.close();
                }
            })
            .catch(error =>
            {
                console.log(error.message);
                Toast.showWithGravity(error.message)
                this.refs.loading.close();
            });
    };

    render()
    {
        const { navigation } = this.props;
        return (
            <View style={styles.mainContainer}>
                <View>
                    <AppStatusBar
                        backgroundColor={Color.colorPrimary}
                        barStyle="light-content"
                    />
                    <ToolBar
                        title="Loại cắm cờ"
                        icon="arrow-left"
                        onPress={() => navigation.goBack()}
                    >
                    </ToolBar>

                    <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                        <TouchableOpacity onPress={() =>
                        {
                            navigation.navigate('AddFlag');
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
                                        <Icon name="flag" size={24} color="#44C062" />
                                        <Text style={styles.title1}>Cửa hàng tiềm năng</Text>
                                    </View>
                                    <Icon name="chevron-right" size={24} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>
                        {
                            navigation.navigate('AddFlag');
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
                                        <Icon name="flag" size={24} color="#44C062" />
                                        <Text style={styles.title1}>Đại lí đối thủ</Text>
                                    </View>
                                    <Icon name="chevron-right" size={24} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <Loading ref="loading" indicatorColor={Color.colorPrimary} />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Color.backgroundColor,
        flexDirection: 'column',
        flex: 1
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
        color: Color.black
    },
    title1: {
        fontSize: 17,
        fontFamily: Fonts.primaryRegular,
        color: Color.black,
        marginLeft: 10
    },
    title2: {
        fontSize: 16,
        fontFamily: Fonts.primaryRegular,
        color: Color.blue
    },
    title3: {
        fontSize: 16,
        fontFamily: Fonts.primaryRegular,
        color: Color.orange
    },
    text: {
        fontSize: 16,
        fontFamily: Fonts.primaryRegular,
        color: Color.gray
    },
    subTitle: {
        fontSize: 15,
        fontFamily: Fonts.primaryRegular,
        color: Color.gray
    },
    productImage: {
        height: 100,
        width: 100,
        alignContent: "center",
        justifyContent: "center",
    },
});

export default CategoryFlagScreen;
