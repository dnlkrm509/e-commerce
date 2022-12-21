import { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import Modalui from "../components/ui/Modal";
import BuyProductModal from "../components/Wishlist/BuyProductModal";
import MoreProductsList from "../components/Wishlist/MoreProductsList";
import WishlistList from "../components/Wishlist/WishlistList";
import YouMightLikeThisList from "../components/Wishlist/YouMightLikeThisList";
import { Colors } from "../constants/colors";
import PopularProducts from "../data/popularProducts";

function WishlistScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');

    const [isAddedtoCartConfirmation, setIsAddedtoCartConfirmation] = useState(false);

    function setIsAddedtoCartConfirmationHandler() {
        setIsAddedtoCartConfirmation(true);
    };

    function openModalHandler(product) {
        setModalVisible(true);
        setSelectedProduct(product);
    }

    function imageHandler(id) {
        const product = PopularProducts.find(product => product.id === id);

        return <product.image
                    width={120}
                    height={96}
                    style={styles.image}
                />
    };

    function closeModalHandler() {
        setModalVisible(false);
        setIsAddedtoCartConfirmation(false);
    }

    return (
        <ScrollView
            horizontal={false}
            nestedScrollEnabled={true}
            alwaysBounceVertical={false}
        >
            <Modalui
                modalVisible={modalVisible}
                onClose={closeModalHandler}
                closeButton
                title="Buy Product"
                onHideModal={closeModalHandler}
            >
                <BuyProductModal
                    product={selectedProduct}
                    ProductImage={imageHandler.bind(this, selectedProduct.id)}
                    title="Buy Product"
                    onSetIsAddedtoCartConfirmation={setIsAddedtoCartConfirmationHandler}
                    isAddedtoCartConfirmation={isAddedtoCartConfirmation}
                    onClose={closeModalHandler}
                />
            </Modalui>

            {isAddedtoCartConfirmation && (
                <Modalui
                    modalVisible={isAddedtoCartConfirmation}
                    onClose={closeModalHandler}
                >
                    <BuyProductModal
                        product={selectedProduct}
                        ProductImage={selectedProduct.image}
                        onSetIsAddedtoCartConfirmation={setIsAddedtoCartConfirmationHandler}
                        isAddedtoCartConfirmation={isAddedtoCartConfirmation}
                        onClose={closeModalHandler}
                    />
                </Modalui>
            )}

            <View style={styles.screen}>
                <ScrollView
                    style={{height: 200}}
                    horizontal={true}
                    scrollEnabled={false}
                >
                    <WishlistList onOpenModal={openModalHandler} />
                </ScrollView>
                <View style={styles.rootContainer}>
                    <Text style={[
                            styles.text
                        ]}>
                        You might like this too
                    </Text>
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <YouMightLikeThisList />
                </ScrollView>
                

                <View style={styles.rootContainer}>
                    <Text style={[
                            styles.text
                        ]}>
                        More Products
                    </Text>
                </View>
                <ScrollView
                    horizontal={true}
                    scrollEnabled={false}
                    style={{height: 246}}
                >
                    <MoreProductsList />
                </ScrollView>

                
            </View>
        </ScrollView>
    )
};

export default WishlistScreen;

const styles = StyleSheet.create({
    screen: {
        paddingTop: 40,
        paddingHorizontal: 24,
        flex: 1
    },
    rootContainer: {
        marginTop: 40
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.headerTitle,
        marginBottom: 16,
    },
});