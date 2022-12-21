import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { storeProduct, updateProduct } from "../../util/http";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import ErrorOverlay from "../ui/ErrorOverlay";
import LoadingOverlay from "../ui/LoadingOverlay";
import { useState } from "react";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";

function PriceButtons({ modalVisible, onOpenModal, onClose, product }) {
    const navigation = useNavigation();
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [error, setError] = useState();
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const cartItem = cartItems.find(item => item.id === product.id);

    async function addToCartHandler() {
        const newProduct = {
            id: product.id,
            title: product.title,
            brand: product.brand,
            rating: product.rating,
            price: product.price,
            quantity: +cartItem?.quantity + 1 || 1,
            totalPrice: product.price * (cartItem?.quantity + 1 || 1) || 0
        };

        setIsSubmiting(true);
        setMessage('Saving in cart ...');
        try {
            if (cartItem?.quantity === 0) {
                const id = await storeProduct(newProduct, 'cart');
                dispatch(cartActions.addToCart({...newProduct, id}));
            } else {
                await updateProduct(product.id, newProduct, 'cart');
                dispatch(cartActions.addToCart(newProduct));
            }
        } catch (error) {
            setError('Could not save product - please try again later');
            setMessage('');
        }
        setIsSubmiting(false);
    };

    async function addedToCartConfirmationHandler() {
        await addToCartHandler();
        onOpenModal();
    };

    function errorHandler() {
        setError(null);
    }

    if (error && !isSubmiting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isSubmiting) {
        return <LoadingOverlay message={message} />
    }

    return (
        <View style={styles.rootContainer}>
            <View style={styles.priceContainer}>
                <Text style={{color:Colors.headerTitle}}>
                    Price
                </Text>
                <Text style={styles.price}>
                    RP {product.price}
                </Text>
            </View>
            <View style={styles.buttons}>
                <Button
                    style={[[styles.button, {
                        backgroundColor: '#ffffff',
                        borderWidth: 1,
                        borderColor: Colors.purple
                    }]]}
                    textStyle={[styles.textStyle, {
                        color: Colors.purple
                    }]}
                    onPress={() => {
                        navigation.navigate('Checkout');
                        onClose();
                    }}
                >
                    Buy Now
                </Button>
                {!cartItem && (
                    <Button
                        style={[styles.button, {
                            marginLeft: 16
                        }]}
                            textStyle={[styles.textStyle]}
                        onPress={addedToCartConfirmationHandler}
                    >
                        Add to Cart
                    </Button>
                )}
            </View>
        </View>
    )
};

export default PriceButtons;

const styles = StyleSheet.create({
    rootContainer: {
        marginTop: 20,
        paddingVertical: 12,
        backgroundColor: '#ffffff',
        shadowColor: Colors.shadow,
        shadowOffset: {width: 0, height: -5},
        shadowRadius: 6,
        shadowOpacity: 0.25
    },
    priceContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.headerTitle
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        paddingVertical: 11,
        flex: 1
    },
    textStyle: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
});