import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../constants/colors";
import { cartActions } from "../../store/cart-slice";
import { fetchProducts } from "../../util/http";
import Button from "../ui/Button";
import ErrorOverlay from "../ui/ErrorOverlay";
import LoadingOverlay from "../ui/LoadingOverlay";

function TotalPrice() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const cartItems = useSelector(state => state.cart.items);

    useEffect(() => {
        async function getProducts() {
            setIsFetching(true);
            try {
                const products = await fetchProducts('cart');
                dispatch(cartActions.setProducts(products));
            } catch (error) {
                setError('Could not fetch cart products!')
            }
            setIsFetching(false);
        }
        getProducts();
    }, [error]);

    const totalPrice = cartItems?.reduce((prev, current) => {
        return prev + new Number(current.totalPrice);
    }, 0);
    const totalQuantity = cartItems.reduce((prev, current) => {
        return prev + new Number(current.quantity);
    }, 0);
    const navigation = useNavigation();

    function errorHandler() {
        setError(null);
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isFetching) {
        return <LoadingOverlay message='Fetchind cart products ...' />
    }

    return (
        <View style={styles.rootOuterContainer}>
            <View style={styles.rootInnerContainer}>
                <View style={styles.priceQuantityContainer}>
                    <Text style={styles.titleText}>Total Price</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.price}>
                            RP {totalPrice.toFixed(3)}
                        </Text>
                        <Text style={styles.quantity}>
                            ({+totalQuantity}) items
                        </Text>
                    </View>
                </View>
                <Button
                    style={styles.button}
                    textStyle={styles.buttonText}
                    onPress={() => navigation.navigate('Checkout')}
                >
                    Buy
                </Button>
            </View>
        </View>
    )
};

export default TotalPrice;

const styles = StyleSheet.create({
    rootOuterContainer: {
        marginTop: 40,
        paddingVertical: 16,
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
    },
    rootInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    priceQuantityContainer: {
        alignItems: 'flex-start'
    },
    titleText: {
        fontSize: 12,
        color: 'black'
    },
    price: {
        fontWeight: 'bold',
        fontSize: 12,
        marginRight: 4,
        textAlign: 'center',
        color: 'black'
    },
    quantity: {
        fontSize: 10,
        textAlign: 'center',
        color: Colors.brand
    },
    button: {
        paddingVertical: 7,
        paddingHorizontal: 16,
        alignItems: 'center',

    },
    buttonText: {
        fontWeight: '500',
        fontSize: 12
    }
});