import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Image,
    Text,
    StyleSheet,
    Alert
} from "react-native";
import PersonalData from "../components/ui/PersonalData";
import { Colors } from "../constants/colors";
import { Ionicons } from '@expo/vector-icons';
import Button from "../components/ui/Button";
import { useEffect, useLayoutEffect, useState } from "react";
import {
    launchCameraAsync,
    launchImageLibraryAsync,
    useCameraPermissions,
    PermissionStatus,
    useMediaLibraryPermissions
} from 'expo-image-picker';
import { Profile } from "../models/profile";
import { fetchSingleData, insertData, numberOfRows } from "../util/database";
import { useIsFocused } from "@react-navigation/native";

function PersonalDataScreen({ navigation, route }) {
    const [isEditing, setIsEditing] = useState(false);

    const [cameraPermissionInformation, requestPermissions] = useCameraPermissions();
    const [photosPermissionInformation, photosRequestPermissions] = useMediaLibraryPermissions();
    const [photoType, setPhotoType] = useState('');
    const [pickedImage, setPickedImage] = useState();
    const isFocused = useIsFocused();
    const [profile, setProfile] = useState([]);
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    useEffect(() => {
        async function loadProfile() {
            const id = await numberOfRows();
            const profile = await fetchSingleData(id);
            setPickedImage(profile.imageUri);
            setFullName(profile.fullName);
            setDateOfBirth(profile.dateOfBirth);
            setGender(profile.gender);
            setEmail(profile.email);
            setNumber(profile.phoneNumber);
            setProfile(profile);
        }

        if (isFocused) {
            loadProfile();
        }
    }, [isFocused])

    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => {
                        setIsEditing(prevState => !prevState);
                    }}
                    style={{backgroundColor:'#ffffff',paddingHorizontal:0,paddingVertical:0}}
                    textStyle={{color:Colors.headerTitle,fontWeight:'700'}}
                >
                    {isEditing && (
                        <Text onPress={saveHandler}>
                            Save
                        </Text>
                    )}
                    {!isEditing && (
                        <Text>Edit</Text>
                    )}
                </Button>
            )
        });
    }, [navigation, isEditing, saveHandler]);

    function changeTextHandler(identifier, enteredValue) {
        if (identifier === 'fullName') {
            setFullName(enteredValue);
        }
        if (identifier === 'dateOfBirth') {
            setDateOfBirth(enteredValue);
        }
        if (identifier === 'gender') {
            setGender(enteredValue);
        }
        if (identifier === 'email') {
            setEmail(enteredValue);
        }
    }

    async function verifyPermission() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermissions();

            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permisssions!')
            return false;
        }

        return true;
    }

    async function verifyPhotoPermission() {
        if (photosPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await photosRequestPermissions();

            return permissionResponse.granted;
        }

        if (photosPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permisssions!')
            return false;
        }

        return true;
    }

    async function imageHandler() {
        const hasPermission = await verifyPhotoPermission();
        if (!hasPermission) {
            return;
        }
        const response = await launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5
        });
        if (!response.canceled) {
            setPickedImage(response.assets[0].uri);
        }
    }

    async function takeImageHandler() {
        hasPermisson = await verifyPermission();
        if (!hasPermisson) {
            return;
        }
        const response = await launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5
        });
        if (!response.canceled) {
            setPickedImage(response.assets[0].uri);
        }
    };

    let imagePreview = <Image
                            style={{width:'100%',height:'100%'}}
                            source={require('../assets/img/profile/profile.png')}
                        />
    if (profile) {
        imagePreview = <Image
                            style={{borderRadius:'50%',width:'100%',height:'100%'}}
                            source={{uri: profile.imageUri}}
                        />
    }
    
    let imageButtons = <View></View>;

    function imagePickerHandler() {
        setPhotoType('choose type');
    }

    if (photoType === 'choose type') {
        imageButtons = (
            <View style={{marginTop: 40}}>
                <Button
                    onPress={takeImageHandler}
                    style={{marginBottom:16, paddingVertical:16}}
                >
                    Take Photo
                </Button>
                <Button
                    onPress={imageHandler}
                    style={{paddingVertical:16}}
                >
                    Choose Photo
                </Button>
            </View>
        )
    }

    if (pickedImage) {
        imagePreview = <Image
                            style={{borderRadius:'50%',width:'100%',height:'100%'}}
                            source={{ uri: pickedImage }}
                        />
    }

    async function saveHandler() {
        const profile = new Profile(
            pickedImage,
            fullName,
            dateOfBirth,
            gender,
            email,
            number
        );
        insertDataHandler(profile);
        navigation.navigate('Profile')
    };

    async function insertDataHandler(data) {
        await insertData(data);
    }

    return (
        <ScrollView style={{flex:1,paddingTop:32}}>
            <KeyboardAvoidingView style={styles.screen} behavior='position' >
                <View style={{alignItems:'center'}}>
                    {isEditing && (
                    <Button
                        style={[styles.imageContainer, {paddingHorizontal:0,paddingVertical:0}]}
                        onPress={imagePickerHandler}
                    >
                        <View style={styles.imageContainer}>
                            {imagePreview}
                        
                            {isEditing && (<View style={styles.iconContainer}>
                                <Ionicons
                                    name='camera-outline'
                                    color={Colors.headerTitle}
                                    size={17.6}
                                />
                            </View>)}
                        </View>
                    </Button>)}
                    {!isEditing && (
                        <View style={styles.imageContainer}>
                            {imagePreview}
                    
                            {isEditing && (
                            <View style={styles.iconContainer}>
                                <Ionicons
                                    name='camera-outline'
                                    color={Colors.headerTitle}
                                    size={17.6}
                                />
                            </View>)}
                        </View>
                    )}
                </View>
                <PersonalData
                    title='Full Name'
                    text={profile?.fullName || 'Liam Henderson'}
                    isEditing={isEditing}
                    onChangeText={changeTextHandler.bind(this, 'fullName')}
                    value={fullName}
                />
                <PersonalData
                    title='Date of Birth'
                    text={profile?.dateOfBirth || '27 March 1998'}
                    isEditing={isEditing}
                    value={dateOfBirth}
                    onChangeText={changeTextHandler.bind(this, 'dateOfBirth')}
                />
                <PersonalData
                    title='Gender'
                    text={profile?.gender || 'Male'}
                    isEditing={isEditing}
                    value={gender}
                    onChangeText={changeTextHandler.bind(this, 'gender')}
                />
                <PersonalData
                    title='Email'
                    text={profile?.email || 'hi.liam@email.com'}
                    isEditing={isEditing}
                    value={email}
                    keyboardType='email-address'
                    onChangeText={changeTextHandler.bind(this, 'email')}
                />
                {isEditing && imageButtons}
                {!isEditing && <View style={styles.phoneNumButtonContainer}>
                    <View style={styles.phoneNumContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                Phone Number
                            </Text>
                            <View style={styles.verifiedContainer}>
                                <Ionicons name="checkmark" color='#ffffff' size={12} />
                                <Text style={{marginLeft:4,fontSize:10,color:'#ffffff'}}>
                                    Verified
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.number}>
                            {profile?.phoneNumber || '08912345677'}
                        </Text>
                    </View>
                    <Button
                        style={{backgroundColor: '#ffffff'}}
                        textStyle={{color: Colors.purple,fontWeight:'700',fontSize:12}}
                        onPress={() => navigation.navigate('ChangeNumber', {
                                pickedImage,
                                fullName,
                                dateOfBirth,
                                gender,
                                email,
                                number
                        })}
                    >
                        Change
                    </Button>
                </View>}
            </KeyboardAvoidingView>
        </ScrollView>
    )
};

export default PersonalDataScreen;

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 24,
        flex: 1
    },
    imageContainer: {
        width: 88,
        height: 88,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'transparent'
    },
    iconContainer: {
        width: 29.33,
        height: 29.33,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    phoneNumButtonContainer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    phoneNumContainer: {
        alignItems: 'flex-start',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 13
    },
    title: {
        fontWeight: '700',
        color: Colors.headerTitle
    },
    verifiedContainer: {
        flexDirection: 'row',
        marginLeft: 8,
        alignItems: 'center',
        backgroundColor: Colors.purple,
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 12
    },
    number: {
        fontSize: 16,
        color: Colors.headerTitle
    },
});