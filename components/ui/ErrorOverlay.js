import { View, Text, StyleSheet, Dimensions } from "react-native";
import Button from "./Button";


function ErrorOverlay({ message, onConfirm }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>
                An Error occured!
            </Text>
            <Text style={[styles.text, {marginBottom: 8}]}>{message}</Text>
            <Button style={{width: 50}} onPress={onConfirm}>
                Ok
            </Button>
        </View>
    )
};

export default ErrorOverlay;

const deviceWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        paddingLeft: deviceWidth * 0.25
    },
    text: {
        textAlign: 'center',
        marginVertical: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});