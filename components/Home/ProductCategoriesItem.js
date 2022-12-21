import { View, Text, StyleSheet } from "react-native";
import Button from "../ui/Button";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

function ProductCategoriesItem({ product, ProductImage }) {
    const navigation = useNavigation();

    return (
        <Button
            style={{backgroundColor:'white',marginHorizontal:5}}
            textStyle={styles.text}
            onPress={() => navigation.navigate('ProductDetails',
                {
                    title: product.title
                }
            )}
        >
            <View style={styles.rootContainer}>
                <ProductImage />
                <Text style={styles.text}>
                    {product.title}
                </Text>
            </View>
        </Button>
    )
};

export default ProductCategoriesItem;

const styles = StyleSheet.create({
    rootContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 8
    },
    text: {
        marginTop: 8,
        color: Colors.headerTitle
    }
});