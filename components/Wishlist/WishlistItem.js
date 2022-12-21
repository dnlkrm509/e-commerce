import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import Button from "../ui/Button";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

function WishlistItem({ product, onOpenModal, ProductImage }) {
    const navigation = useNavigation();

    return (
        <Button
            style={{backgroundColor:'white',marginBottom: 16,minWidth: 380,height: 97,paddingHorizontal:0,}}
            onPress={() => navigation.navigate('SingleProductDetails', {
                product: product
            })}
        >
            <View style={styles.rootOuterContainer}>
                <View style={styles.rootInnerContainer}>
                    <ProductImage />
                    <View style={styles.textContainer}>
                        <View style={styles.titleContainer}>
                            <View styl={styles.brandContainer}>
                                <Text
                                    style={styles.titleText}
                                >
                                    {product.title}
                                </Text>
                                <Text style={styles.brandText}>
                                    {product.brand ? product.brand : 'Brand'}
                                </Text>
                            </View>
                            <View style={styles.iconContainer}>
                                <Ionicons
                                    name="heart"
                                    size={17}
                                    color={Colors.headerTitle}
                                />
                            </View>
                            
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>
                                RP {product.price}
                            </Text>
                            <Button
                                onPress={onOpenModal.bind(this, product)}
                                style={{
                                    width: 64,
                                    height: 26}}
                            >
                                Buy
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </Button>
    )
};

export default WishlistItem;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    rootOuterContainer: {
        backgroundColor: '#ffffff',
        alignItems: 'flex-start',
        width: deviceWidth * 0.88,
        height: 89,
        padding: 8,
        marginBottom: 10,
        elevation: 4,
        shadowColor: Colors.shadow,
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 5,
        shadowOpacity: 0.25,
    },
    rootInnerContainer: {
        overflow: 'hidden',
        borderRadius: 8,
        flexDirection: 'row',
        flex: 1
    },
    image: {
        backgroundColor: '#047FB1',
    },
    textContainer: {
        paddingLeft: 36,
        alignItems: 'flex-start',
        flex: 1
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        flex: 1
    },
    brandContainer: {
        alignItems: 'flex-start',
    },
    titleText: {
        marginBottom: 4,
        fontSize: 14,
        color: Colors.headerTitle,
        fontWeight: 'bold'
    },
    brandText: {
        fontSize: 10,
        color: Colors.brand,
    },
    iconContainer: {
        marginLeft: 8,
        alignItems: 'center'
    },
    priceContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    },
    price: {
        fontSize: 12,
        color: Colors.price,
        marginTop: 12
    }
});