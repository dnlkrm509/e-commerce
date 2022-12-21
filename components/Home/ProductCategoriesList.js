import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import ProductsCategories from "../../data/productCategories";
import { categoryActions } from "../../store/categories-slice";
import { fetchProducts } from "../../util/http";
import ErrorOverlay from "../ui/ErrorOverlay";
import LoadingOverlay from "../ui/LoadingOverlay";
import ProductCategoriesItem from "./ProductCategoriesItem";

function ProductCategoriesList() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const categories = useSelector(state => state.categories.items);

    useEffect(() => {
        async function getCategories() {
            setIsFetching(true);
            try {
                const categories = await fetchProducts('categories');
                dispatch(categoryActions.setProducts(categories));
            } catch (err) {
                setError('Could not fetch categories!');
            }
            setIsFetching(false);
        }
        getCategories();
    }, [error]);

    function errorHandler() {
        setError(null)
    }

    if(error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isFetching) {
        return <LoadingOverlay message='Fetching categories ...' />
    }

    function imageHandler(id) {
        const category = ProductsCategories.find(category => category.id === id);
        return <category.image
                    width={32}
                    height={32}
                />
    };

    return (
        <FlatList
            data={categories}
            renderItem={(itemData) => <ProductCategoriesItem product={itemData.item} ProductImage={imageHandler.bind(this, itemData.item.id)} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{alignSelf: 'flex-start'}}
            numColumns={Math.ceil(ProductsCategories.length / 1)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            directionalLockEnabled={true}
            alwaysBounceVertical={false}
            nestedScrollEnabled={true}
        />
    )
};

export default ProductCategoriesList;

const styles = StyleSheet.create({});