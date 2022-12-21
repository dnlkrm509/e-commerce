import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import PopularProducts from "../../data/popularProducts";
import { cartActions } from "../../store/cart-slice";
import { fetchProducts } from "../../util/http";
import ErrorOverlay from "../ui/ErrorOverlay";
import LoadingOverlay from "../ui/LoadingOverlay";
import SelectedProductsItem from "./SelectedProductsItem";

function SelectedProductsList({ selectAll, onUnselectOne, mode, onSetIsRemoveFromCartModal }) {
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
                setError('Coul not fetch cart items!')
            }
            setIsFetching(false);
        }
        getProducts();
    }, [error]);

    function errorHandler() {
        setError(null);
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isFetching) {
        return <LoadingOverlay message='Fetching products ...' />
    }

    function imageHandler(id) {
        const product = PopularProducts.find(product => product.id === id);
        return <product.image
                    width={85}
                    height={85}
                    style={styles.image}
                />
    }

    return (
        <FlatList
            data={cartItems}
            renderItem={(itemData) => <SelectedProductsItem
                                            product={itemData.item}
                                            ProductImage={imageHandler.bind(this, itemData.item.id)}
                                            selectAll={selectAll}
                                            onUnselectOne={onUnselectOne}
                                            mode={mode}
                                            onSetIsRemoveFromCartModal={onSetIsRemoveFromCartModal}
                                        />
                        }
            keyExtractor={(item) => item.id}
            contentContainerStyle={{alignSelf: 'flex-start', paddingBottom: 5}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            alwaysBounceVertical={false}
        />
    )
};

export default SelectedProductsList;

const styles = StyleSheet.create({
    image: {
        marginLeft: 10,
        backgroundColor: '#047FB1',
    },
});