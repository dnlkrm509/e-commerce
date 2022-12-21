import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { Ionicons } from '@expo/vector-icons';
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";

function NewArrivalsItem({ product, ProductImage }) {
    const navigation = useNavigation();
    
    return (
        <Button
            style={{backgroundColor:'white',marginBottom: 16,minWidth: 380,height: 104,paddingHorizontal:0}}
            onPress={() => navigation.navigate('SingleProductDetails', {
                product: product
            })}
        >
            <View style={styles.rootOuterContainer}>
                <View style={styles.imageContainer}>
                    <ProductImage />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.titleRatingContainer}>
                        <View>
                            <Text
                                style={styles.titleText}
                            >
                                {product.title}
                            </Text>
                            <Text style={styles.brand}>
                                {product.brand ? product.brand : 'Brand'}
                            </Text>
                        </View>
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
                    </View>
                    <Text style={styles.price}>
                        RP {product.price}
                    </Text>
                </View>
            </View>
        </Button>
    )
};

export default NewArrivalsItem;

const styles = StyleSheet.create({
    rootOuterContainer: {
        backgroundColor: '#ffffff',
        alignItems: 'flex-start',
        borderRadius: 4,
        minWidth: 380,
        height: 104,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    image: {
        backgroundColor: '#047FB1',
    },
    textContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'flex-start',
        flex: 1
    },
    titleRatingContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        justifyContent: 'space-between'
    },
    ratingContainer: {
        flexDirection: 'row',
    },
    ratingText: {
        paddingHorizontal: 4,
        fontSize: 12,
        color: Colors.headerTitle,
        textAlign: 'right'
    },
    titleText: {
        marginBottom: 4,
        fontSize: 14,
        color: Colors.headerTitle,
        fontWeight: 'bold'
    },
    brand: {
        fontSize: 12,
        color: Colors.brand
    },
    price: {
        fontSize: 14,
        color: Colors.headerTitle,
        fontWeight: 'bold',
        marginTop: 16
    }
});