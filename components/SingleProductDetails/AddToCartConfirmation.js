import { View, Text, StyleSheet } from "react-native";
import Button from "../ui/Button";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

function AddToCartConfirmationModal({ onClose }) {
    const navigation = useNavigation();
    
    return (
        <View style={styles.confirmationContainer}>
            <View style={styles.lineBreak2}></View>
            <View style={styles.confirmationTexts}>
                <Text style={[styles.confirmationText, {
                    fontSize: 20
                }]}>
                    This item is added to cart
                </Text>
                <Text style={[styles.confirmationText, { fontSize: 16, marginVertical: 16, fontWeight: 'normal' }]}>
                    See your cart to proceed to checkout
                </Text>
                <Button
                    style={styles.buttonConfirmation}
                    textStyle={[
                        styles.confirmationText,
                        {
                            fontSize: 16,
                            fontWeight: 'normal',
                            color: Colors.purple,
                            textDecorationLine: 'underline'
                        }
                    ]}
                    onPress={() => {
                        navigation.navigate('Cart')
                        onClose()
                    }}
                >
                    Tap here
                </Button>
            </View>
            <Button
                style={styles.okButton}
                textStyle={[
                    {
                        fontSize: 14,
                        fontWeight: '700',
                        textAlign: 'center'
                    }
                ]}
                onPress={() => onClose()}
            >
                Ok
            </Button>
        </View>
    )
}

export default AddToCartConfirmationModal;

const styles = StyleSheet.create({
    confirmationContainer: {
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1
    },
    lineBreak2: {
        width: 80,
        height: 6,
        backgroundColor: Colors.lineBreak2,
        borderRadius: 8,
        marginBottom: 40
    },
    confirmationTexts: {
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        alignSelf: 'stretch', marginBottom: 40
    },
    confirmationText: {
        fontWeight: 'bold',
        color: Colors.headerTitle,
        textAlign: 'center',
        alignSelf: 'stretch',
    },
    buttonConfirmation: {
        alignSelf: 'stretch',
        backgroundColor: '#ffffff',
    },
    okButton: {
        alignSelf: 'stretch',
        marginBottom: 24,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});