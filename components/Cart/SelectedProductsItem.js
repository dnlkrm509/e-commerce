import { View, Text, StyleSheet } from "react-native";
import DropShadow from "react-native-drop-shadow";
import { Colors } from "../../constants/colors";
import { Ionicons } from '@expo/vector-icons';
import Button from '../ui/Button';
import { useState } from "react";
import ButtonIcon from "../ui/ButtonIcon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cartActions } from '../../store/cart-slice';
import { deleteProduct, storeProduct, updateProduct } from "../../util/http";
import LoadingOverlay from "../ui/LoadingOverlay";
import ErrorOverlay from "../ui/ErrorOverlay";

function SelectedProductsItem({ product, ProductImage, selectAll, onUnselectOne, mode, onSetIsRemoveFromCartModal }) {
    const [isSelected, setIsSelected] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [error, setError] = useState();
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const cartItem = cartItems.find(item => item.id === product.id);
    
    useEffect(() => {
        if (selectAll) {
            setIsSelected(true);
        } else if (selectAll && mode === "one") {
            setIsSelected(false);
        } else if (!selectAll && mode === "all") {
            setIsSelected(false)
        }
    }, [selectAll, mode]);

    async function addToCartHandler() {
        const newProduct = {
            id: product.id,
            title: product.title,
            brand: product.brand,
            rating: +product.rating,
            price: +product.price,
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

    function removeFromCartHandler(product) {
        onSetIsRemoveFromCartModal(product);
    };

    function selectHanlder(newMode) {
        setIsSelected(prevState => !prevState);
        if (selectAll) {
            onUnselectOne(newMode);
        }
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
        <Button style={styles.rootOuterContainer} onPress={selectHanlder.bind(this, 'one')}>
            <View style={styles.rootInnerContainer}>
                <View style={styles.imageContainer}>
                    <View style={styles.iconContainer}>
                        {isSelected && (
                            <Ionicons name='checkmark' color='white' size={14} />
                        )}
                    </View>
                    <DropShadow
                        style={{
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 16
                            },
                            shadowRadius: 3,
                            shadowOpacity: 0.4
                        }}
                    >
                        <ProductImage />
                    </DropShadow>
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.titleContainer}>
                        <View style={styles.brandContainer}>
                            <Text
                                style={styles.titleText}
                            >
                                {product.title}
                            </Text>
                            <Text style={styles.brand}>
                                {product.brand ? product.brand : 'Brand'}
                            </Text>
                        </View>
                        <ButtonIcon
                            style={styles.buttonIcon}
                            icon='trash'
                            color={Colors.trash}
                            size={20}
                            onPress={removeFromCartHandler.bind(this, product)}
                        />
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>
                            RP {product.price}
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
                                {cartItem.quantity}
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
                </View>
            </View>
        </Button>
    )
};

export default SelectedProductsItem;

const styles = StyleSheet.create({
    rootOuterContainer: {
        backgroundColor: '#ffffff',
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 10,
        width: 380,
        height: 98,
        elevation: 8,
        shadowColor: Colors.shadow,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    rootInnerContainer: {
        overflow: 'hidden',
        flexDirection: 'row',
        width: '100%'
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        borderRadius: 4,
        backgroundColor: Colors.green,
        paddingHorizontal: 3,
        paddingVertical: 1,
        width: 20,
        height: 16,
    },
    textContainer: {
        paddingHorizontal: 16,
        alignItems: 'flex-start',
        flex: 1
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        flex: 1
    },
    brandContainer: {
        alignItems: 'flex-start'
    },
    titleText: {
        marginBottom: 4,
        fontSize: 14,
        color: Colors.headerTitle,
        fontWeight: 'bold'
    },
    brand: {
        fontSize: 10,
        color: Colors.brand
    },
    buttonIcon: {
        padding: 0
    },
    priceContainer: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        marginTop: 12
    },
    price: {
        fontSize: 12,
        color: Colors.price,
        fontWeight: '500',
        marginTop: 16
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
});