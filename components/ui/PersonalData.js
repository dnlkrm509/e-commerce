import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function PersonalData({ title, text, isEditing, keyboardType, onChangeText, value }) {
    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>
                {title}
            </Text>
            <View
                style={isEditing
                    ? [styles.textContainer, { backgroundColor: '#fff' }]
                    : [styles.textContainer]
                }
            >
                {!isEditing && <Text style={styles.text}>
                    {text}
                </Text>}
                {isEditing && (
                    <TextInput
                        style={styles.text}
                        placeholder={text}
                        keyboardType={keyboardType}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={value}
                        onChangeText={onChangeText}
                    />
                )}
            </View>
            <View style={styles.lineBreak}></View>
        </View>
    )
};

export default PersonalData;

const styles = StyleSheet.create({
    rootContainer: {
        marginTop: 24,
    },
    title: {
        fontWeight: '700',
        color: Colors.headerTitle
    },
    textContainer: {
        alignItems: 'flex-start',
        paddingLeft: 8,
        backgroundColor: Colors.personalData
    },
    text: {
        fontSize: 12,
        color: Colors.brand,
        paddingVertical: 10,
        alignSelf: 'stretch'
    },
    lineBreak: {
        alignSelf: 'stretch',
        height: 1,
        backgroundColor: Colors.brand
    }
});