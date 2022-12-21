import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import ButtonIcon from "../ui/ButtonIcon";

function Transaction() {
    const navigation = useNavigation();

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.transactionText}>
                Your Transaction
            </Text>
            <View style={styles.icons}>
                <View style={styles.iconContainer}>
                    <ButtonIcon
                        icon='card'
                        color={Colors.purple}
                        size={32}
                        onPress={() => navigation.navigate('Transaction')}
                    />
                    <Text style={styles.iconText}>
                        Waiting Payment
                    </Text>
                </View>
                <View style={styles.iconContainer}>
                    <ButtonIcon
                        type='font-awesome'
                        icon='truck'
                        color={Colors.purple}
                        size={32}
                        onPress={() => navigation.navigate('Transaction')}
                    />
                    <Text style={styles.iconText}>
                        On Delivery
                    </Text>
                </View>
                <View style={styles.iconContainer}>
                    <ButtonIcon
                        type='fontisto'
                        icon='shopping-bag'
                        size={32}
                        color={Colors.purple}
                        onPress={() => navigation.navigate('Transaction')}
                    />
                    <Text style={styles.iconText}>
                        All Transactions
                    </Text>
                </View>
            </View>
        </View>
    )
};

export default Transaction;

const styles = StyleSheet.create({
    rootContainer: {
        alignItems: 'flex-start',
        alignSelf: 'stretch'
    },
    transactionText: {
        fontWeight: '700',
        fontSize: 16,
        color: Colors.headerTitle
    },
    icons: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
        backgroundColor:'#ffffff',
        width: 94.33
    },
    iconText: {
        fontWeight: '700',
        marginTop: 8,
        fontSize: 12,
        textAlign: 'center',
        color: Colors.headerTitle
    },
})