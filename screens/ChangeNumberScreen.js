import { ScrollView, KeyboardAvoidingView, View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";
import { fetchSingleData, insertData, numberOfRows } from "../util/database";
import Button from "../components/ui/Button";
import { Profile } from "../models/profile";

function ChangeNumberScreen({ navigation, route }) {
    const [number, setNumber] = useState('');
    const [profile, setProfile] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        async function loadProfile() {
            const id = await numberOfRows();
            const profile = await fetchSingleData(id);
            setProfile(profile);
            setTimeout(() => {
                setNumber(profile.phoneNumber.toString());
            }, 500);
        }

        if (isFocused) {
            loadProfile();
        }
    }, [isFocused])
    
    function changeTextHandler(enteredValue) {
        setNumber(enteredValue);
    };

    async function presseHandler() {
        if (route) {
            const profile = new Profile(
                route?.params.pickedImage,
                route?.params.fullName,
                route?.params.dateOfBirth,
                route?.params.gender,
                route?.params.email,
                +number
            );
            await insertData(profile);
        }
        
        navigation.navigate('PersonalData', {
            number: +number
        })
    }

    return (
        <ScrollView style={{flex:1}}>
            <KeyboardAvoidingView style={styles.screen} behavior='position' >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Change Number
                    </Text>
                    <Text style={styles.text}>
                        Make sure you are inputing the number that never registered before.
                    </Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, { fontSize: 14, marginBottom: 12 }]}>
                        New Number
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={changeTextHandler}
                            value={number}
                            keyboardType='number-pad'
                            style={{padding:8,width: '85%'}}
                        />
                        <Ionicons name='eye-outline' size={24} color={Colors.headerTitle}/>
                    </View>
                    <View style={styles.lineBreak}></View>
                </View>
            </KeyboardAvoidingView>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    textStyle={{fontWeight:'700'}}
                    onPress={presseHandler}
                >
                    Change Number
                </Button>
            </View>
        </ScrollView>
    )
};

export default ChangeNumberScreen;

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    screen: {
        paddingTop: 32,
        paddingHorizontal: 24,
        alignItems: 'flex-start',
        height: deviceHeight * 0.77,
    },
    titleContainer: {
        marginBottom: 24,
        alignItems: 'flex-start',
        alignSelf: 'stretch'
    },
    title: {
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '700',
        color: Colors.headerTitle
    },
    text: {
        fontSize: 12,
        color: Colors.headerTitle,
        alignSelf: 'stretch'
    },
    inputContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingVertical: 10
    },
    lineBreak: {
        height: 1,
        backgroundColor: Colors.brand,
        alignSelf: 'stretch'
    },
    buttonContainer: {
        backgroundColor: 'white',
        shadowColor: Colors.shadow,
        shadowOffset: {width: 0, height: -5},
        shadowRadius: 4,
        shadowOpacity: 0.25,
        paddingVertical: 12,
        paddingHorizontal: 24
    },
    button: {
        paddingVertical: 11,
    }
});