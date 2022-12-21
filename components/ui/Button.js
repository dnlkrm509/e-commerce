import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

function Button({ children, style, textStyle, onPress}) {
    return (
        <Pressable
            onPress={onPress}
            android_ripple={{color: '#ccc'}}
            style={({pressed}) => pressed 
            ? [styles.button, styles.pressed, style] 
            : [styles.button, style]}
        >
            <Text style={[styles.text, textStyle]}>
                {children}
            </Text>
        </Pressable>
    )
};

export default Button;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: Colors.purple,
        borderRadius: 4
    },
    pressed: {
        opacity: 0.7,
    },
    text: {
        color: 'white',
        textAlign: 'center'
    }
});