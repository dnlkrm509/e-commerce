import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { Ionicons } from '@expo/vector-icons';
import Button from "./Button";

function AddressData({ title, main, fullName, phoneNumber, address, isEditing }) {
    const rootContainer = [styles.rootContainer];
    const border = {borderColor:Colors.purple,borderWidth:1,borderRadius:8};
    
    if (isEditing) {
        rootContainer.push(border);
    }

    return (
        <View>
            {!isEditing && (
                <View style={rootContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText1}>
                            {title}
                        </Text>
                        {main && <View style={styles.main}>
                            <Text style={styles.mainText}>Main Address</Text>
                        </View>}
                        {!main && (
                            <Ionicons name='ellipsis-horizontal' size={16} color={Colors.headerTitle} />
                        )}
                    </View>
                    <View style={styles.addressContainer}>
                        <Text style={styles.text}>{fullName}</Text>
                        <Text style={[styles.text, { marginVertical:8 }]}>{phoneNumber}</Text>
                        <Text style={styles.text}>{address}</Text>
                    </View>
                    <Button
                        style={styles.button}
                        textStyle={styles.buttonText}
                    >
                        Change Address
                    </Button>
                </View>
            )}
            {isEditing && (
                <Button
                    style={{backgroundColor:'white', paddingHorizontal:0,paddingVertical:0,marginBottom: 24}}
                >
                    <View style={[rootContainer,{marginBottom: 0}]}>
                        <View style={[styles.titleContainer, {width: '100%'}]}>
                            <Text style={styles.titleText1}>
                                {title}
                            </Text>
                            {main && <Ionicons name='checkmark' size={20} color={Colors.green} />}
                            {!main && <Text></Text>}
                        </View>
                        <View style={styles.addressContainer}>
                            <Text style={styles.text}>{fullName}</Text>
                            <Text style={[styles.text, { marginVertical:8 }]}>{phoneNumber}</Text>
                            <Text style={styles.text}>{address}</Text>
                        </View>
                        <View style={{alignSelf: 'stretch'}}>
                            <Button
                                style={styles.button}
                                textStyle={styles.buttonText}
                            >
                                Change Address
                            </Button>
                        </View>
                    </View>
                </Button>
            )}
        </View>
    )
}

export default AddressData;
const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 24,
        alignItems: 'flex-start',
        padding: 16,
        backgroundColor: 'white',
        shadowColor: Colors.shadow,
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 6,
        shadowOpacity: 0.25,
        borderRadius: 8,
        alignSelf: 'stretch'
    },
    titleContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText1: {
        fontWeight: '700',
        fontSize: 16,
        color: Colors.headerTitle
    },
    main: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: Colors.purple,
        borderRadius: 4
    },
    mainText: {
        fontSize: 10,
        color: 'white'
    },
    addressContainer: {
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        marginTop: 12
    },
    text: {
        fontSize: 12,
        color: Colors.price
    },
    button: {
        alignSelf: 'stretch',
        marginTop: 16,
        backgroundColor: 'white',
        borderColor: Colors.purple,
        borderWidth: 1
    },
    buttonText: {
        color: Colors.purple,
        paddingVertical: 11,
        fontSize: 12,
        fontWeight: '500'
    },
});