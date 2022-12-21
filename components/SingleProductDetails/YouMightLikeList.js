import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import PopularProducts from "../../data/popularProducts";
import { productActions } from "../../store/products-slice";
import { fetchProducts } from "../../util/http";
import ErrorOverlay from "../ui/ErrorOverlay";
import LoadingOverlay from "../ui/LoadingOverlay";
import YouMightItem from "./YouMightLikeItem";

function YouMightLikeList() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const products = useSelector(state => state.products.items);

    useEffect(() => {
        async function getProducts() {
            setIsFetching(true);
            try {
                const products = await fetchProducts('products');
                dispatch(productActions.setProducts(products));
            } catch (error) {
                setError('Could not fetch products!')
            }
            setIsFetching(false)
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
                    width={144}
                    height={120}
                    style={styles.image}
                />
    }
    
    return (
        <FlatList
            data={products}
            renderItem={(itemData) => <YouMightItem product={itemData.item} ProductImage={imageHandler.bind(this, itemData.item.id)} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{alignSelf: 'flex-start', paddingBottom: 5}}
            numColumns={Math.ceil(PopularProducts.length / 1)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            directionalLockEnabled={true}
            alwaysBounceVertical={false}
            nestedScrollEnabled={true}
        />
    )
};

export default YouMightLikeList;

const styles = StyleSheet.create({
    image: {
        backgroundColor: '#047FB1',
    },
});