import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import PopularProducts from "../data/popularProducts";
import { Colors } from "../constants/colors";
import Button from "../components/ui/Button";
import Variants from "../components/SingleProductDetails/Variants";
import { useLayoutEffect, useState } from "react";
import ButtonIcon from "../components/ui/ButtonIcon";
import Description from "../components/SingleProductDetails/Description";
import YouMightLikeList from "../components/SingleProductDetails/YouMightLikeList";
import PriceButtons from "../components/SingleProductDetails/PriceButtons";
import { useDispatch, useSelector } from "react-redux";
import { wishlistActions } from "../store/wishlist-slice";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { deleteProduct, storeProduct, updateProduct } from "../util/http";
import Modalui from "../components/ui/Modal";
import AddToCartConfirmationModal from "../components/SingleProductDetails/AddToCartConfirmation";

function SingleProductDetailsScreen({route, navigation}) {
    const product = route.params.product;
    const [modalVisible, setModalVisible] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [error, setError] = useState();
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.items);
    const [isAddedToWishlistConfirmation, setIsAddedToWishlistConfirmation] = useState(false);

    function setIsAddedToWishlistConfirmationHandler() {
        setIsAddedToWishlistConfirmation(true);
    }

    function hideIsAddedToWishlistConfirmationHandler() {
        setIsAddedToWishlistConfirmation(false);
    }

    const productIsFavorite = wishlistItems.find(wishlistItem => wishlistItem.id === product.id);

    function openModalHandler() {
        setModalVisible(true);
    };

    function closeModalHandler() {
        setModalVisible(false);
    };

    async function changeFavoriteStatusHandler() {
        const newProduct = {
            id: product.id,
            title: product.title,
            rating: product.rating,
            price: product.price,
            brand: product.brand
        };
        if (!productIsFavorite) {
            setIsAddedToWishlistConfirmationHandler();
            setIsSubmiting(true);
            setMessage('Updating the wishlist ...');
            try {
                if (productIsFavorite?.quantity) {
                    const id = await storeProduct(newProduct, 'wishlist');
                    dispatch(wishlistActions.addToWishlist({...newProduct, id}));
                } else {
                    await updateProduct(product.id, newProduct, 'wishlist');
                    dispatch(wishlistActions.addToWishlist(newProduct));
                }
            } catch (error) {
                setError('Could not save product - please try again later');
                setMessage('');
            }
            setIsSubmiting(false);
        } else {
            hideIsAddedToWishlistConfirmationHandler();
            setIsSubmiting(true);
            setMessage('Removing from wishlist ...')
            try {
                await deleteProduct(product.id, 'wishlist');
                dispatch(wishlistActions.removeFromWishlist(product.id))
            } catch (error) {
                setError('Could not delete product - please try again later');
                setMessage('');
            }
            setIsSubmiting(false);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <ButtonIcon
                                    onPress={changeFavoriteStatusHandler}
                                    icon={productIsFavorite ? 'heart' : 'heart-outline'}
                                    color={productIsFavorite ? 'red' : 'black'}
                                    size={24}
                                />
        })
    }, [navigation,changeFavoriteStatusHandler])

    const selectedProduct = PopularProducts.find(popularProduct => popularProduct.id === product.id);
    const ProductImage = <selectedProduct.image
                            width='100%'
                            height={280}
                            style={styles.image}
                        />

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
        <ScrollView 
            horizontal={false}
            nestedScrollEnabled={true}
            alwaysBounceVertical={false}
        >
            <View>
                {isAddedToWishlistConfirmation && <View style={styles.addConfirmationContainer}>
                    <View style={styles.addIcon}>
                        <Ionicons name="checkmark" size={12} color='#ffffff' />
                        <Text style={{marginLeft: 8, fontWeight: '500', fontSize: 12, color: 'white'}}>
                            Item deleted from your Wishlist
                        </Text>
                    </View>
                    <ButtonIcon
                        icon='close'
                        size={16}
                        style={{
                            padding: 0,
                            alignItems: 'stretch',
                            justifyContent: 'flex-start',
                            left: '100%'
                        }}
                        color='white'
                        onPress={hideIsAddedToWishlistConfirmationHandler}
                    />
                </View>}
                <View>
                    {ProductImage}
                </View>
                <View style={styles.textRootContainer}>
                    <Modalui
                        modalVisible={modalVisible}
                        onClose={closeModalHandler}
                        onHideModal={closeModalHandler}
                    >
                        <AddToCartConfirmationModal onClose={closeModalHandler} />
                    </Modalui>

                    <View style={styles.titleBrandContainer}>
                        <Text style={styles.title}>
                            {product.title}
                        </Text>
                        <View style={styles.brandContainer}>
                            <Text style={styles.brand}>
                                {product.brand || 'Brand'}
                            </Text>
                            <Button
                                style={{backgroundColor:'white'}}
                                textStyle={{fontSize:12,fontWeight:'700',color:Colors.purple}}
                            >
                                View Brand
                            </Button>
                        </View>
                    </View>
                    <Variants />
                    <View style={styles.rootContainer}>
                        <Text style={[styles.title, { marginBottom:16 }]}>
                            Description
                        </Text>
                    </View>
                    {!productIsFavorite && (
                        <>
                            <Description />
                            <View style={styles.rootContainer}>
                                <Text style={[
                                        styles.text
                                    ]}>
                                    Products you might like
                                </Text>
                            </View>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <YouMightLikeList />
                            </ScrollView>
                        </>
                    )}
                    <PriceButtons
                        product={product}
                        modalVisible={modalVisible}
                        onClose={closeModalHandler}
                        onOpenModal={openModalHandler}
                    />
                </View>
            </View>
        </ScrollView>
    )
};

export default SingleProductDetailsScreen;

const styles = StyleSheet.create({
    addConfirmationContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 9,
        position: 'absolute',
        left: 24,
        top: 13,
        right: 24,
        borderRadius: 4,
        zIndex: 10,
        height: 36,
        backgroundColor: Colors.deleteConfirmation
    },
    addIcon: {
        flexDirection: 'row',
        width: '90%'
    },
    image: {
        backgroundColor: '#047FB1',
    },
    textRootContainer: {
        paddingTop: 40,
        paddingHorizontal: 24,
        paddingBottom: 28
    },
    titleBrandContainer: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        shadowColor : Colors.shadow,
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 6,
        shadowOpacity: 0.25
    },
    title: {
        fontWeight: '700',
        fontSize: 24,
        color: Colors.price,
        marginBottom: 24
    },
    brandContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    brand: {
        color: Colors.price
    },
    rootContainer: {
        marginTop: 40
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.headerTitle,
        marginBottom: 16,
    },
});