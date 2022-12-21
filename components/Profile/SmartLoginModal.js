import { View, Text, StyleSheet } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';

import { Colors } from "../../constants/colors";
import Button from "../ui/Button";
import ButtonIcon from "../ui/ButtonIcon";
import { useEffect, useState } from "react";
import { Icon } from "@rneui/themed/dist/Icon";

function SmartLoginModal({ title, onClose, onSlideOn }) {
    const [compatible, setCompatable] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        async function compatibleBiometricScanner() {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            const enrolled = await LocalAuthentication.isEnrolledAsync();
            setCompatable(compatible);
            setIsEnrolled(enrolled);
        }
        compatibleBiometricScanner();
    }, []);

    return (
        <>
            <View style={styles.titleContainer}>
                <View>
                    <Text style={styles.titleText}>
                        {title}
                    </Text>
                </View>
                <View>
                    <ButtonIcon icon='close' size={24} color={Colors.headerTitle} onPress={onClose} />
                </View>
            </View>
            <View style={styles.confirmationContainer}>
                <View style={styles.confirmationTexts}>
                    <Button
                        style={styles.buttonConfirmation}
                        textStyle={[
                            styles.confirmationText,
                            {
                                fontWeight: '700',
                                fontWeight: 'normal',
                                color: Colors.headerTitle,
                            }
                        ]}
                        onPress={() => {
                            async function authenticate() {
                                if (!compatible) throw 'This device is not compatible for biometric authentication'
                                if (!isEnrolled) throw "This device doesn't have biometric authentication enabled"
                                const result = await LocalAuthentication.authenticateAsync({
                                    promptMessage: 'Authenticate',
                                    fallbackLabel: 'Enter Password',
                                    requireConfirmation: true,
                                    disableDeviceFallback: false,
                                    cancelLabel: 'Abort'
                                });
                                if (result.success) {
                                    onSlideOn();
                                }
                            }
                            authenticate();
                        }}
                    >
                        <View>
                            <Icon type="ionicons" name='fingerprint' size={80} color={Colors.slideButtomOff} />
                            <Text style={{marginTop:24}}>Place your fingeron the finger print censor.</Text>
                        </View>
                    </Button>    
                </View>
                <Button
                    style={styles.button}
                    textStyle={[
                        {
                            fontSize: 14,
                            fontWeight: '700',
                            textAlign: 'center',
                            color: Colors.purple
                        }
                    ]}
                    onPress={() => onClose()}
                >
                    Cancel
                </Button>
            </View>
        </>
    )
};

export default SmartLoginModal;


const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        marginBottom: 40
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.headerTitle
    },
    confirmationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    confirmationTexts: {
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40
    },
    confirmationText: {
        fontWeight: 'bold',
        color: Colors.headerTitle,
        textAlign: 'center',
        alignSelf: 'stretch',
    },
    buttonConfirmation: {
        backgroundColor: '#ffffff'
    },
    button: {
        alignSelf: 'stretch',
        marginBottom: 24,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
});