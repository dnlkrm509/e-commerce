import { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import BrandList from "../components/ProductDetails/BrandList";
import Button from "../components/ui/Button";
import PopularProductsList from "../components/ProductDetails/PopularProductList";
import ProductsList from "../components/ProductDetails/ProductsList";

function DetailsScreen({ route, navigation }) {
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (route.params) {
            setTitle(route.params.title)
        }
    }, [route])
    return (
        <ScrollView
            horizontal={false}
            nestedScrollEnabled={true}
            alwaysBounceVertical={false}
        >
            <View style={styles.screen}>
                {title !== '' && <Text style={styles.title}>{title}</Text>}
                <Text style={styles.text}>
                    Promotion
                </Text>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('../assets/img/Ad/Ad2.png')}
                    />
                </View>
                <View style={styles.lists}>
                    <View style={styles.rootContainer}>
                        <Text style={[
                                styles.text,
                                {marginBottom: 16}
                            ]}>
                                Brands
                        </Text>
                    </View>
                    <ScrollView horizontal={true}>
                        <BrandList />
                    </ScrollView>
                    <View style={styles.rootContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.titleText}>
                                Popular {title === '' ? 'Products' : title}
                            </Text>
                            <Button
                                style={{marginBottom:24,backgroundColor:'white'}}
                                textStyle={styles.bodyText}
                                
                            >
                                View All
                            </Button>
                        </View>
                    </View>
                    <ScrollView horizontal={true}>
                        <PopularProductsList />
                    </ScrollView>
                    <View style={styles.horizonatBreak}></View>
                    <View>
                        <View style={styles.textContainer}>
                            <Text style={styles.titleText}>
                                Products
                            </Text>
                        </View>
                    </View>
                    <ScrollView
                        horizontal={true}
                        scrollEnabled={false}
                        style={{height: 485}}
                    >
                        <ProductsList />
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    )
};

export default DetailsScreen;

const styles = StyleSheet.create({
    screen: {
        paddingTop: 40,
        paddingHorizontal: 24,
        flex: 1
    },
    title: {
        fontWeight: '700',
        fontSize: 24,
        color: Colors.price,
        marginBottom: 40
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.headerTitle,
        marginBottom: 16,
    },
    imageContainer: {
        height: 200,
        width: '100%',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: Colors.shadow,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.25,
        shadowRadius: 6
    },
    image: {
        width: '100%',
        height: '100%'
    },
    rootContainer: {
        marginTop: 40
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.headerTitle,
        marginBottom: 24,
    },
    bodyText: {
        fontSize: 12,
        color: Colors.purple,
        fontWeight: '500'
    },
    horizonatBreak: {
        marginVertical: 40,
        height: 4,
        backgroundColor: Colors.lineBreak
    },
});