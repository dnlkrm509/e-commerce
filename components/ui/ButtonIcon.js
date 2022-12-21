import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from '@rneui/themed';

function ButtonIcon({ onPress, icon, size, color, style, type }) {
    return (
        <Pressable
            style={({pressed}) => pressed
                ? [styles.button, styles.pressed, style]
                : [styles.button, style]
            }
            onPress={onPress}
        >
            {type && (
                <Icon type={type} name={icon} size={size} color={color}  />
            )}
            {!type && <Ionicons name={icon} size={size} color={color} />}
        </Pressable>
    )
};

export default ButtonIcon;

const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.7
    }
});