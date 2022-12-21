import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import ProfileButtons from "../components/ui/ProfileButtons";
import { Colors } from "../constants/colors";
import { useState } from "react";
import SmartLoginModal from "../components/Profile/SmartLoginModal";
import Modalui from "../components/ui/Modal";

function SettingsScreen() {
    const navigation = useNavigation();
    const [isOff, setIsOff] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    function modalHandler() {
        if (isOff) {
            setModalVisible((prevState) => !prevState);
        } else {
            setIsOff(true);
        }
    }

    function isSlideOnHandler() {
        setIsOff(false);
    }

    function closeModalHandler() {
        setModalVisible(false);
    }

    return (
        <View style={styles.screen}>
            <View style={styles.accountContainer}>
                <Modalui
                    modalVisible={modalVisible}
                    onClose={closeModalHandler}
                    closeButton
                    onHideModal={closeModalHandler}
                >
                    <SmartLoginModal
                        title="Text"
                        onSlideOn={isSlideOnHandler}
                        onClose={closeModalHandler}
                    />
                </Modalui>
                <Text style={styles.accountTitle}>
                    Account
                </Text>
                <ProfileButtons
                    title='Personal Data'
                    text='Tap to edit your personal data'
                    onPress={() => navigation.navigate('PersonalData')}
                />
                <ProfileButtons
                    title='Address Data'
                    text='Tap to edit or add address'
                    onPress={() => navigation.navigate('AddressData')}
                />
                <ProfileButtons
                    title='Change Password'
                    text='Tap to edit your password'
                />
                <ProfileButtons
                    title='Smart Login'
                    text='Set Face ID or Fingerprint to Login'
                    slideButton={true}
                    isOff={isOff}
                    onModal={modalHandler}
                />
            </View>
            <View style={styles.accountContainer}>
                <Text style={styles.accountTitle}>
                    Others
                </Text>
                <ProfileButtons
                    title='Review Application'
                />
                <ProfileButtons
                    title='Terms & Condition'
                />
                <ProfileButtons
                    title='Log Out'
                />
            </View>
        </View>
    )
};

export default SettingsScreen;

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 24,
        flex: 1
    },
    accountContainer: {
        paddingTop: 32,
        alignItems: 'flex-start'
    },
    accountTitle: {
        fontWeight: '700',
        fontSize: 16,
        color: Colors.headerTitle
    },
});