import { View, Text, StyleSheet } from "react-native";
import Button from "../ui/Button";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

function BrandItem({ product, ProductImage }) {
    const navigation = useNavigation();

    return (
        <Button
            style={{backgroundColor:'white',marginHorizontal:5}}
            textStyle={styles.text}
            
        >
            <View style={styles.rootContainer}>
                <ProductImage />
            </View>
        </Button>
    )
};

export default BrandItem;

const styles = StyleSheet.create({
    rootContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 8
    }
});