import React, { Component } from 'react';
import
{
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    FlatList,
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import { Color, Fonts, Strings, Dimension } from '../theme';
import ToolBar from '../components/ToolBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';
import { getUserDetails, getCart, setCart } from '../utils/LocalStorage';
import BadgeIcon from '../components/BadgeIcon';
import Cart from '../utils/Cart';
import Logo from '../components/Logo';
import OrderItem from '../components/ProductItem/OrderItem';
import { Picker } from '@react-native-community/picker';
import { orderPlace } from '../axios/ServerRequest';
import Loading from '../components/Loading';
import Toast from "react-native-simple-toast"
import
{
    getAllPayment,
} from '../axios/ServerRequest';
import { color } from 'react-native-reanimated';

class PharmacyScreen extends Component
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


    onPharmacyScreen = () =>
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
        const { user } = this.state;
        return (
            <View style={styles.mainContainer}>
                <View>
                    <AppStatusBar
                        backgroundColor={Color.colorPrimary}
                        barStyle="light-content"
                    />
                    <ToolBar
                        title="Nhà thuốc"
                        icon="arrow-left"
                        onPress={() => navigation.goBack()}>
                        <TouchableOpacity
                            style={{ marginRight: 10 }}
                            onPress={() =>
                            {
                                this.setState({ showSearch: true });
                            }}>
                            <Icon name="search" size={24} color="#ffffff" />
                        </TouchableOpacity>

                        <BadgeIcon
                            icon="filter"
                        // onPress={() => {
                        //     navigation.navigate('MyCart');
                        // }}
                        />
                    </ToolBar>

                    <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                        <View style={styles.addressContainer}>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    marginBottom: 10,
                                }}>
                                <Icon name="home" size={18} color="#44C062" />
                                <Text style={styles.pharmacy}>  350 Nhà thuốc</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() =>
                        {
                            navigation.navigate('Problem');
                        }}>
                            <View style={styles.addressContainer}>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        flexDirection: 'row',
                                        marginBottom: 10,
                                    }}>
                                    <Text style={styles.title}>Mã vấn đề: DV.123456.123</Text>
                                </View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        flexDirection: 'row',
                                        marginBottom: 10,
                                    }}>
                                    <Text style={styles.subTitle}>Ngày gửi: 04/04/2022</Text>
                                </View>
                                <View
                                    style={{
                                        width: '100%',
                                        height: 2,
                                        backgroundColor: '#eeeeee',
                                        marginBottom: 10,
                                    }}
                                />
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        flexDirection: 'row',
                                        marginBottom: 10,
                                    }}>
                                    <Text style={styles.title1}>Loại ghi chú</Text>
                                    <Text style={styles.title2}>Yêu cầu khách hàng</Text>
                                </View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        flexDirection: 'row',
                                        marginBottom: 10,
                                    }}>
                                    <Text style={styles.title1}>Trạng thái</Text>
                                    <Text style={styles.title3}>Chờ xử lý</Text>
                                </View>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        flexDirection: 'row',
                                        marginBottom: 10,
                                    }}>
                                    <Text style={styles.title1}>Người tạo</Text>
                                    <Text style={styles.title}>Quốc Khánh</Text>
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
    pharmacy: {
        fontSize: 16,
        fontFamily: Fonts.primaryRegular,
        color: "#44C062"
    },
    title1: {
        fontSize: 16,
        fontFamily: Fonts.primaryRegular,
        color: "#44C062"
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

export default PharmacyScreen;
