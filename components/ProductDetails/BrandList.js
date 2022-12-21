import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../util/http";
import ErrorOverlay from "../ui/ErrorOverlay";
import LoadingOverlay from "../ui/LoadingOverlay";
import { brandActions } from "../../store/brands-slice";
import Brands from "../../data/Brands";
import BrandItem from "./BrandItem";

function BrandList() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const brands = useSelector(state => state.brands.items);

    useEffect(() => {
        async function getBrands() {
            setIsFetching(true);
            try {
                const brands = await fetchProducts('brands');
                dispatch(brandActions.setProducts(brands));
            } catch (err) {
                setError('Could not fetch brands!');
            }
            setIsFetching(false);
        }
        getBrands();
    }, [error]);

    function errorHandler() {
        setError(null)
    }

    if(error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isFetching) {
        return <LoadingOverlay message='Fetching brands ...' />
    }

    function imageHandler(id) {
        const brand = Brands.find(brand => brand.id === id);
        return <brand.image
                    width={32}
                    height={32}
                />
    };

    return (
        <FlatList
            data={brands}
            renderItem={(itemData) => <BrandItem product={itemData.item} ProductImage={imageHandler.bind(this, itemData.item.id)} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{alignSelf: 'flex-start'}}
            numColumns={Math.ceil(Brands.length / 1)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            directionalLockEnabled={true}
            alwaysBounceVertical={false}
            nestedScrollEnabled={true}
        />
    )
};

export default BrandList;

const styles = StyleSheet.create({});