
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PopularProducts from "../../data/popularProducts";
import { fetchProducts } from "../../util/http";
import ErrorOverlay from "../ui/ErrorOverlay";
import LoadingOverlay from "../ui/LoadingOverlay";
import WishlistItem from "./WishlistItem";
import { wishlistActions } from "../../store/wishlist-slice";

function WishlistList({ onOpenModal }) {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const products = useSelector(state => state.wishlist.items);

    useEffect(() => {
        async function getProducts() {
            setIsFetching(true);
            try {
                const products = await fetchProducts('wishlist');
                dispatch(wishlistActions.setProducts(products));
            } catch (error) {
                setError('Could not fetch products!')
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
                    width={120}
                    height={96}
                    style={styles.image}
                />
    };

    return (
        <FlatList
            data={products}
            renderItem={(itemData) => <WishlistItem product={itemData.item} ProductImage={imageHandler.bind(this, itemData.item.id)} onOpenModal={onOpenModal} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{alignSelf: 'flex-start', paddingBottom: 5}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            directionalLockEnabled={true}
            alwaysBounceVertical={false}
            nestedScrollEnabled={true}
        />
    )
};

export default WishlistList;

const styles = StyleSheet.create({
    image: {
        backgroundColor: '#047FB1',
    },
});