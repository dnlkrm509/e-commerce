import { View, Image, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import NewArrivalsList from "../components/Home/NewArrivalsList";
import PopularProductsList from "../components/Home/PopularProductsList";
import ProductCategoriesList from "../components/Home/ProductCategoriesList";
import { Colors } from "../constants/colors";
import Button from "../components/ui/Button";

function HomeScreen({ navigation }) {
    return (
        <ScrollView
            horizontal={false}
            nestedScrollEnabled={true}
            alwaysBounceVertical={false}
        >
            <View style={styles.screen}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('../assets/img/Ad/Ad1.png')}
                    />
                </View>
                <View style={styles.lists}>
                    <View style={styles.rootContainer}>
                        <Text style={[
                                styles.text,
                                {marginBottom: 24}
                            ]}>
                            Product Categories
                        </Text>
                    </View>
                    <ScrollView horizontal={true}>
                        <ProductCategoriesList />
                    </ScrollView>
                    <View style={styles.rootContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.titleText}>
                                Popular Products
                            </Text>
                            <Button
                                style={{marginBottom:24,backgroundColor:'white'}}
                                textStyle={styles.bodyText}
                                onPress={() => navigation.navigate('ProductDetails')}
                            >
                                View All
                            </Button>
                        </View>
                    </View>
                    <ScrollView horizontal={true}>
                        <PopularProductsList />
                    </ScrollView>
                    <View style={styles.horizonatBreak}></View>
                    <Text style={styles.text}>
                        Promotion
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require('../assets/img/Ad/Ad2.png')}
                    />
                </View>
                <View style={[
                        styles.lists,
                        {marginBottom: 49}
                    ]}>
                    <View style={styles.rootContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.titleText}>
                                New Arrivals
                            </Text>
                            <Button
                                style={{marginBottom:24,backgroundColor:'white'}}
                                textStyle={styles.bodyText}
                                onPress={() => navigation.navigate('ProductDetails')}
                            >
                                View All
                            </Button>
                        </View>
                    </View>
                    <ScrollView
                        horizontal={true}
                        scrollEnabled={false}
                        style={{height: 246}}
                    >
                        <NewArrivalsList />
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    )
};

export default HomeScreen;

const styles = StyleSheet.create({
    screen: {
        paddingTop: 40,
        paddingHorizontal: 9,
        flex: 1
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
    lists: {
        paddingHorizontal: 15
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
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.headerTitle,
        marginBottom: 16,
    }
});