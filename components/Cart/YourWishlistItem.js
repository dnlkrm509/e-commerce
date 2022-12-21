import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import ButtonIcon from "../ui/ButtonIcon";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { useState } from "react";
import { deleteProduct } from "../../util/http";
import LoadingOverlay from "../ui/LoadingOverlay";
import ErrorOverlay from "../ui/ErrorOverlay";

function YourWishlistItem({ product, ProductImage, onOpenModal }) {
    const dispatch = useDispatch();
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [error, setError] = useState();
    const [message, setMessage] = useState('');
    const cartItems = useSelector(state => state.cart.items);
    const cartItem = cartItems.find(item => item.id === product.id);

    async function removeFromCartHandler() {
        if (cartItem) {
            if (cartItem.quantity > 0) {
                setIsSubmiting(true);
                setMessage('Removing from cart ...')
                try {
                    await deleteProduct(product.id, 'cart');
                    dispatch(cartActions.removeFromCart(product.id))
                } catch (error) {
                    setError('Could not delete product - please try again later');
                    setMessage('');
                }
                setIsSubmiting(false);
            }
        }
    };

    function openModalHandler() {
        onOpenModal(product);
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
        <View style={styles.rootOuterContainer}>
            <View style={styles.rootInnerContainer}>
                <ProductImage />
                <View style={styles.container}>
                    <Text
                        style={styles.titleText}
                    >
                        {product.title}
                    </Text>
                    <Text style={styles.price}>
                        RP {product.price}
                    </Text>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.icon}>
                            <ButtonIcon
                                icon='trash'
                                size={20}
                                color={Colors.purple}
                                style={{padding: 0}}
                                onPress={removeFromCartHandler}
                            />
                        </View>
                        <Button
                            style={{alignItems: 'flex-start'}}
                            textStyle={{fontSize: 12,fontWeight: '500'}}
                            onPress={openModalHandler}
                        >
                            Add to Cart
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    )
};

export default YourWishlistItem;

const styles = StyleSheet.create({
    rootOuterContainer: {
        backgroundColor: '#ffffff',
        alignItems: 'flex-start',
        borderRadius: 4,
        marginLeft: 16,
        elevation: 4,
        shadowColor: Colors.shadow,
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
    rootInnerContainer: {
        overflow: 'hidden',
        borderRadius: 4,
    },
    container: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        alignItems: 'flex-start'
    },
    titleText: {
        marginBottom: 12,
        fontSize: 14,
        color: Colors.headerTitle,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 12,
        color: Colors.headerTitle,
        fontWeight: 'bold',
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        padding: 4,
        borderWidth: 1,
        borderColor: Colors.purple,
        borderRadius: 4
    }
});