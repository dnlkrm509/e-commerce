import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { Colors } from "../../constants/colors";
import ButtonIcon from "../ui/ButtonIcon";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { deleteProduct, storeProduct, updateProduct } from "../../util/http";
import ErrorOverlay from "../ui/ErrorOverlay";
import LoadingOverlay from "../ui/LoadingOverlay";

function BuyProductModal({ product, ProductImage, onSetIsDeletedConfirmation, isAddedtoCartConfirmation, title, onClose, isRemoveFromCartModal, productToRemove }) {
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
        onClose();
    };

    async function removeOneFromCartHandler() {
        const newProduct = {
            id: product.id,
            title: product.title,
            brand: product.brand,
            rating: +product.rating,
            price: +product.price,
            quantity: +cartItem?.quantity  - 1 || 0,
            totalPrice: product.price * (cartItem?.quantity - 1) || 0
        }
        if (cartItem) {
            if (cartItem.quantity > 0) {
                setIsSubmiting(true);
                setMessage('Removing from cart ...')
                try {
                    if (cartItem?.quantity === 1) {
                        await deleteProduct(product.id, 'cart');
                        dispatch(cartActions.removeFromCart(product.id))
                    } else if (cartItem.quantity > 1) {
                        await updateProduct(product.id, newProduct, 'cart');
                        dispatch(cartActions.removeOneFromCart(product.id));
                    }
                    
                } catch (error) {
                    setError('Could not delete product - please try again later');
                    setMessage('');
                }
                setIsSubmiting(false);
            }
        }
    };

    async function removeFromCartHandler() {
        setIsSubmiting(true);
        setMessage('Removing from cart ...')
        try {
            await deleteProduct(productToRemove.id, 'cart');
            dispatch(cartActions.removeFromCart(productToRemove.id));
            onSetIsDeletedConfirmation();
        } catch (error) {
            setError('Could not delete product - please try again later');
            setMessage('');
        }
        setIsSubmiting(false);
        onClose()
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
            {!(isRemoveFromCartModal || isAddedtoCartConfirmation) && 
            (<>
                <View style={styles.titleContainer}>
                    <View>
                        <Text style={styles.titleText}>
                            {title}
                        </Text>
                    </View>
                    <View>
                        <ButtonIcon icon='close' size={24} color={Colors.headerTitle} onPress={onClose} />
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    
                    <View style={styles.imageContainer}>
                        <ProductImage />
                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.brandContainer}>
                            <Text style={styles.titleText2}>
                                {product.title}
                            </Text>
                            <Text style={styles.brandText}>
                                {product.brand ? product.brand : 'Brand'}
                            </Text>
                        </View>                
                        <Text style={styles.detail}>
                            View Detail
                        </Text>
                    </View>
                </View>
                <View style={styles.lineBreak}></View>
                <View style={styles.variantContainer}>
                    <Text style={styles.variantText}>
                        Variant
                    </Text>
                    <View style={styles.volume}>
                        <View style={styles.container100}>
                            <Text style={styles.text100}>
                                100 ml
                            </Text>
                            <Ionicons
                                name='checkmark'
                                size={12}
                                color={Colors.green}
                                style={{marginLeft: 8}}
                            />
                        </View>
                        <View style={styles.container220}>
                            <Text style={styles.text220}>
                                220 ml
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.quantityContainer}>
                    <Text style={styles.quantityTitle}>
                        Quantity
                    </Text>
                    <View style={styles.buttonIconsContainer}>
                        <View style={styles.icon}>
                            <ButtonIcon
                                style={{padding: 4}}
                                icon="remove"
                                size={24}
                                color={Colors.text}
                                onPress={removeOneFromCartHandler}
                            />
                        </View>
                        <Text style={styles.quantityText}>
                            {+cartItem?.quantity || 0}
                        </Text>
                        <View style={[styles.icon, {borderColor: Colors.purple} ]}>
                            <ButtonIcon
                                style={{padding: 4}}
                                icon="add"
                                size={24}
                                color={Colors.purple}
                                onPress={addToCartHandler}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
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
            </>)}
            {isRemoveFromCartModal && (
                <View style={styles.removeModalContainer}>
                    <View style={styles.lineBreak2}></View>
                    <View style={styles.confirmationTexts}>
                        <Text style={[styles.confirmationText, {
                            fontSize: 20
                        }]}>
                            Are you sure you want to delete this product from your Wishlist?
                        </Text>
                        <Text style={[styles.confirmationText, { fontSize: 16, marginVertical: 16, fontWeight: 'normal' }]}>
                            You can add it again later.
                        </Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <Button
                            style={styles.cancelButton}
                            textStyle={[
                                {
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }
                            ]}
                            onPress={() => onClose()}
                        >
                            Cancel
                        </Button>
                        <Button
                            style={[styles.cancelButton, {
                                backgroundColor: '#ffffff',
                                borderWidth: 1,
                                borderColor: Colors.purple,
                                marginLeft: 16
                            }]}
                            textStyle={[
                                {
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: Colors.purple
                                }
                            ]}
                            onPress={removeFromCartHandler}
                        >
                            Delete
                        </Button>
                    </View>
                </View>
            )}
        </View>
    )
};

export default BuyProductModal;


const styles = StyleSheet.create({
    rootContainer: {
        alignItems: 'flex-start',
        alignSelf: 'stretch',
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderRadius: 4,
        flex: 1,
        overflow: 'hidden',
        marginBottom: 16
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        marginBottom: 40
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.headerTitle
    },
    imageContainer: {
        marginRight: 16
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    },
    brandContainer: {
        alignItems: 'flex-start'
    },
    titleText2: {
        marginBottom: 4,
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.headerTitle
    },
    brandText: {
        fontSize: 14,
        color: Colors.headerTitle
    },
    detail: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Colors.purple
    },
    lineBreak: {
        marginBottom: 16,
        height: 1,
        backgroundColor: Colors.lineBreak2,
        alignSelf: 'stretch'
    },
    variantContainer: {
        alignItems: 'flex-start'
    },
    variantText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: Colors.headerTitle
    },
    volume: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    container100: {
        marginRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 12,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        borderColor: Colors.green,
        borderWidth: 1
    },
    text100: {
        fontSize: 12,
        color:Colors.green
    },
    container220: {
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 12,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        borderColor: Colors.price,
        borderWidth: 1
    },
    text220: {
        fontSize: 12,
        color:Colors.price
    },
    quantityContainer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    quantityTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.headerTitle
    },
    buttonIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: Colors.text,
        borderRadius: 4,
        alignItems: 'flex-start'
    },
    quantityText: {
        marginHorizontal: 12,
        fontSize: 16,
        color: Colors.headerTitle
    },
    buttonsContainer: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24,
        alignSelf: 'stretch'
    },
    button: {
        paddingVertical: 11,
        flex: 1
    },
    textStyle: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    removeModalContainer: {
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1
    },
    lineBreak2: {
        width: 80,
        height: 6,
        backgroundColor: Colors.lineBreak2,
        borderRadius: 8,
        marginBottom: 40
    },
    confirmationTexts: {
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        alignSelf: 'stretch'
    },
    confirmationText: {
        fontWeight: 'bold',
        color: Colors.headerTitle,
        textAlign: 'center',
        alignSelf: 'stretch',
    },
    buttonConfirmation: {
        alignSelf: 'stretch',
        backgroundColor: '#ffffff',
    },
    cancelButton: {
        alignSelf: 'stretch',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 11
    }
});