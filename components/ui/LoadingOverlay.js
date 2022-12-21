import { View, Text, Dimensions, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";

function LoadingOverlay({ message }) {
    return (
        <View style={styles.rootContainer}>
            <Text style={styles.message}>{message}</Text>
            <ActivityIndicator size='large' />
        </View>
    )
};

export default LoadingOverlay;

const deviceWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: deviceWidth * 0.06
    },
    message: {}
});