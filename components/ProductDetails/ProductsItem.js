import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Button from "../ui/Button";

function ProductsItem({ product, ProductImage }) {
    const navigation = useNavigation();

    return (
        <Button
            style={{backgroundColor:'white',margin:16}}
            onPress={() => navigation.navigate('SingleProductDetails', {
                product: product
            })}
        >
            <View style={styles.rootOuterContainer}>
                <View style={styles.rootInnerContainer}>
                    <ProductImage />
                    <View style={styles.textContainer}>
                        <View style={styles.ratingContainer}>
                            <Ionicons
                                name='star'
                                color={Colors.headerTitle}
                                size={10}
                            />
                            <Text style={styles.ratingText}>
                                {product.rating}/5
                            </Text>
                            <Text style={[
                                    styles.ratingText,
                                    {color: Colors.text}
                                ]}
                            >
                                (999)
                            </Text>
                        </View>
                        <Text
                            style={styles.titleText}
                        >
                            {product.title}
                        </Text>
                        <Text
                            style={styles.brand}
                        >
                            {product.brand || 'Brand'}
                        </Text>
                        <Text style={styles.price}>
                            RP {product.price}
                        </Text>
                    </View>
                </View>
            </View>
        </Button>
    )
};

export default ProductsItem;

const styles = StyleSheet.create({
    rootOuterContainer: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 4,
        height: 234,
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
    textContainer: {
        paddingTop: 12,
        paddingHorizontal: 8,
        alignItems: 'flex-start'
    },
    ratingContainer: {
        flexDirection: 'row'
    },
    ratingText: {
        paddingHorizontal: 4,
        fontSize: 12,
        color: Colors.headerTitle,
        textAlign: 'right'
    },
    titleText: {
        marginTop: 8,
        marginBottom: 4,
        fontSize: 14,
        color: Colors.headerTitle,
        fontWeight: 'bold'
    },
    brand: {
        fontSize: 12,
        marginBottom: 16,
        color: Colors.brand
    },
    price: {
        fontSize: 14,
        color: Colors.headerTitle,
        fontWeight: 'bold'
    }
});