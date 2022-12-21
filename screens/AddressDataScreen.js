import { View, StyleSheet, Dimensions } from "react-native";
import AddressData from "../components/ui/AddressData";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchSingleData, numberOfRows } from "../util/database";
import Button from "../components/ui/Button";
import { Colors } from "../constants/colors";

function AddressDataScreen() {
    const isFocused = useIsFocused();
    const [profile, setProfile] = useState([]);
    const [isEditing, setIsEditing] = useState();

    function pressHandler() {
        setIsEditing((prevState) => !prevState)
    };

    useEffect(() => {
        async function loadProfile() {
            const id = await numberOfRows();
            const profile = await fetchSingleData(id);
            setProfile(profile);
        }

        if (isFocused) {
            loadProfile();
        }
    }, [isFocused])
    
    return (
        <View style={styles.screen}>
            <View style={styles.addressDataContainer}>
                <AddressData
                    title='Rumah'
                    main={true}
                    fullName={profile?.fullName}
                    phoneNumber={profile?.phoneNumber}
                    address='JI Jababeka 17-B Kawasan Industri Jababeka Tahap I BI U/20 cibitung, Bakasi'
                    isEditing={isEditing}
                />
                <AddressData
                    title='Rumah 2'
                    main={false}
                    fullName={profile?.fullName}
                    phoneNumber={profile?.phoneNumber}
                    address='Address Text'
                    isEditing={isEditing}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    textStyle={{fontWeight:'700'}}
                    onPress={pressHandler}
                >
                    Change Main Address
                </Button>
            </View>
        </View>
    )
};

export default AddressDataScreen;

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'flex-start'
    },
    addressDataContainer: {
        paddingTop: 24,
        height: deviceHeight * 0.77,
        paddingHorizontal: 24,
    },
    buttonContainer: {
        backgroundColor: 'white',
        shadowColor: Colors.shadow,
        shadowOffset: {width: 0, height: -5},
        shadowRadius: 4,
        shadowOpacity: 0.25,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignSelf: 'stretch'
    },
    button: {
        paddingVertical: 11,
    }
});