import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../constants/colors";
import Button from "../ui/Button";
import { Icon } from "@rneui/themed";

function ProfileButtons({ title, text, onPress, slideButton, isOff, onModal }) {

    function slideHandler() {
        onModal();
    };
    
    return (
        <View style={styles.rootContainer}>
            <Button
                style={[styles.button, { marginTop: 0 }]}
                onPress={onPress}
            >
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        <Text style={styles.text}>
                            {text}
                        </Text>
                    </View>
                    <View>
                        {!slideButton && <Ionicons name='chevron-forward' color={Colors.headerTitle} size={16} />}
                        {slideButton && (
                            <View>
                                {isOff && (
                                    <Icon
                                        type="font-awsome"
                                        name="toggle-off"
                                        size={60}
                                        color={Colors.slideButtomOff}
                                        onPress={slideHandler}
                                    />
                                )}
                                {!isOff && (
                                    <Icon
                                        type="font-awsome"
                                        name="toggle-on"
                                        size={60}
                                        color={Colors.deleteConfirmation}
                                        onPress={slideHandler}
                                    />
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </Button>
            <View style={styles.lineBreak}></View>
        </View>
    )
};

export default ProfileButtons;

const styles = StyleSheet.create({
    rootContainer: {
        marginTop: 8,
        alignItems: 'flex-start',
        alignSelf: 'stretch'
    },
    button: {
        alignSelf: 'stretch',
        paddingVertical: 12,
        paddingHorizontal: 0,
        borderRadius: 0,
        marginTop: 4,
        backgroundColor: '#ffffff',
    },
    container: {
        width: '100%',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        marginBottom: 4,
        fontWeight: '700',
        fontSize: 12,
        color: Colors.headerTitle
    },
    text: {
        fontSize: 10,
        color: Colors.headerTitle
    },
    lineBreak: {
        height: 1,
        alignSelf: 'stretch',
        backgroundColor: 'black'
    }
});