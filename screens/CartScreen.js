import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SelectedProductsList from "../components/Cart/SelectedProductsList";
import YourWishlistList from "../components/Cart/YourWishlistList";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../constants/colors";
import Button from "../components/ui/Button";
import TotalPrice from "../components/Cart/TotalPrice";
import Modalui from "../components/ui/Modal";
import BuyProductModal from "../components/Cart/BuyProductModal";
import ButtonIcon from "../components/ui/ButtonIcon";
import PopularProducts from "../data/popularProducts";

function CartScreen() {
    const [selectAll, setSelectAll] = useState(false);
    const [mode, setMode] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedProductToRemove, setSelectedProductToRemove] = useState('');

    const [isAddedtoCartConfirmation, setIsAddedtoCartConfirmation] = useState(false);
    const [isRemoveFromCartModal, setIsRemoveFromCartModal] = useState(false);
    const [isDeletedConfirmation, setIsDeletedCartConfirmation] = useState(false);

    function setIsDeletedConfirmationHandler() {
        setIsDeletedCartConfirmation(true);
    }

    function hideIsDeletedConfirmationHandler() {
        setIsDeletedCartConfirmation(false);
    }

    function setIsAddedtoCartConfirmationHandler() {
        setIsAddedtoCartConfirmation(true);
    };

    function SetIsRemoveFromCartModalHandler(product) {
        setSelectedProductToRemove(product);
        setIsRemoveFromCartModal(true);
    };

    function openModalHandler(product) {
        setModalVisible(true);
        setSelectedProduct(product);
    }

    function imageHandler() {
        const product = PopularProducts.find(product => product.id === selectedProduct.id);
        return <product.image
                    width={72}
                    height={72}
                    style={styles.image}
                />
    }

    function closeModalHandler() {
        setModalVisible(false);
        setIsAddedtoCartConfirmation(false);
        setIsRemoveFromCartModal(false);
    }

    function selectAllHandler(newMode) {
        setSelectAll(prevState => !prevState);
        if (typeof(newMode) === 'string') {
            setMode(newMode);
            return;
        }
        
        if (newMode !== 'one') {
            setMode('all')
        }
    };

    return (
        <ScrollView
            horizontal={false}
            alwaysBounceVertical={false}
        >


            {!(isAddedtoCartConfirmation) && (
                <Modalui
                    modalVisible={modalVisible}
                    onClose={closeModalHandler}
                    onHideModal={closeModalHandler}
                >
                    <BuyProductModal
                        product={selectedProduct}
                        ProductImage={imageHandler}
                        title="Add to Cart"
                        onSetIsAddedtoCartConfirmation={setIsAddedtoCartConfirmationHandler}
                        isAddedtoCartConfirmation={isAddedtoCartConfirmation}
                        isRemoveFromCartModal={isRemoveFromCartModal}
                        onSetIsDeletedConfirmation={setIsDeletedConfirmationHandler}
                        onClose={closeModalHandler}
                    />
                </Modalui>
            )}

            {(isRemoveFromCartModal) && (
                <Modalui
                    modalVisible={isRemoveFromCartModal}
                    onClose={closeModalHandler}
                >
                    <BuyProductModal
                        product={selectedProduct}
                        productToRemove={selectedProductToRemove}
                        ProductImage={selectedProduct.image}
                        onSetIsAddedtoCartConfirmation={setIsAddedtoCartConfirmationHandler}
                        isAddedtoCartConfirmation={isAddedtoCartConfirmation}
                        isRemoveFromCartModal={isRemoveFromCartModal}
                        onSetIsDeletedConfirmation={setIsDeletedConfirmationHandler}
                        onClose={closeModalHandler}
                    />
                </Modalui>
            )}



            <View style={styles.screen}>
                {isDeletedConfirmation && <View style={styles.deleteConfirmationContainer}>
                    <View style={styles.deleteIcon}>
                        <Ionicons name="checkmark" size={12} color='#ffffff' />
                        <Text style={{marginLeft: 8, fontWeight: '500', fontSize: 12, color: 'white'}}>
                            Item deleted from your Wishlist
                        </Text>
                    </View>
                    <ButtonIcon
                        icon='close'
                        size={16}
                        style={{
                            padding: 0,
                            alignItems: 'stretch',
                            justifyContent: 'flex-start',
                            left: '100%'
                        }}
                        color='white'
                        onPress={hideIsDeletedConfirmationHandler}
                    />
                </View>}
                <View style={styles.SelectedProductsContainer}>
                    <Button
                        onPress={selectAllHandler}
                        style={styles.titleIconContainer}
                    >
                        <View style={styles.iconContainer}>
                            {selectAll && (
                                <Ionicons
                                    style={{alignItems:'center', padding: 0}}
                                    name='checkmark'
                                    color='white'
                                    size={14}
                                    
                                />
                            )}
                        </View>
                        <View style={{paddingLeft: 16, paddingTop: 4}}>
                            <Text style={styles.titleText}>
                                Select All
                            </Text>
                        </View>
                    </Button>
                    <View style={styles.lineBreak}></View>
                    <ScrollView
                        horizontal={true}
                        scrollEnabled={false}
                        style={{height: 246}}
                    >
                        <SelectedProductsList
                            selectAll={selectAll}
                            onUnselectOne={selectAllHandler}
                            mode={mode}
                            onSetIsRemoveFromCartModal={SetIsRemoveFromCartModalHandler}
                        />
                    </ScrollView>
                    <View style={[styles.lineBreak, { marginTop: 16 }]}></View>
                </View>
                <View style={styles.rootContainer}>
                    <Text style={[
                            styles.text
                        ]}>
                        Your Wishlist
                    </Text>
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <YourWishlistList onOpenModal={openModalHandler} />
                </ScrollView>
                <TotalPrice/>
            </View>
        </ScrollView>
    )
};

export default CartScreen;

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 24,
        paddingTop: 40,
        flex: 1,
    },
    SelectedProductsList: {
        alignItems: 'flex-start'
    },
    deleteConfirmationContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 9,
        position: 'absolute',
        left: 49,
        top: 45,
        right: 49,
        borderRadius: 4,
        zIndex: 10,
        height: 36,
        backgroundColor: Colors.deleteConfirmation
    },
    deleteIcon: {
        flexDirection: 'row',
        width: '90%'
    },
    titleIconContainer: {
        flexDirection: 'row',
        padding: 0,
        backgroundColor: 'white',
        marginBottom: 16
    },
    iconContainer: {
        backgroundColor: Colors.green,
        paddingHorizontal: 3,
        paddingVertical: 1,
        borderRadius: 4,
        width: 20,
        height: 16
    },
    titleText: {
        fontSize: 14,
        color: Colors.headerTitle,
    },
    lineBreak: {
        marginBottom: 16,
        height: 2,
        backgroundColor: Colors.lineBreak3
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
    image: {
        backgroundColor: Colors.image
    },
});