import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../../constants/colors";
import Button from "../ui/Button";

function PersonalData({ profile }) {
    const navigation = useNavigation();

    return (
        <View style={styles.personalDatasContainer}>
            <View style={styles.imageTopUpContainer}>
                <View style={styles.imageContainer}>
                    {!profile && (
                        <Image
                            style={{width:'100%',height:'100%'}}
                            source={require('../../assets/img/profile/profile.png')}
                        />
                    )}
                    {profile && (
                        <Image
                            style={{width:'100%',height:'100%'}}
                            source={{uri: profile.imageUri}}
                        />
                    )}
                </View>
                <View style={styles.personalDataContainer}>
                    <Text style={styles.name}>
                        {profile?.fullName || 'Liam Henderson'}
                    </Text>
                    <Text style={styles.number}>
                        {profile?.phoneNumber || '08912345677'}
                    </Text>
                    <Text style={styles.email}>
                        {profile?.email || 'hi.liam@mail.com'}
                    </Text>
                </View>
            </View>
            <View style={styles.topUpContainer}>
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceText}>
                        E-Balance
                    </Text>
                    <Text style={styles.moneyText}>
                        RP 1900000
                    </Text>
                </View>
                <Button
                    textStyle={{fontWeight:'500'}}
                    onPress={() => navigation.navigate('TopUp')}
                >
                    Top Up
                </Button>
            </View>
        </View>
    )
}

export default PersonalData;

const styles = StyleSheet.create({
    personalDatasContainer: {
        padding: 16,
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        borderRadius: 4,
        shadowColor: Colors.shadow,
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 2,
        shadowOpacity: 0.25,
        elevation: 6
    },
    imageTopUpContainer: {
        marginBottom: 24,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    imageContainer: {
        marginRight: 24,
        width: 66,
        height: 66,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        overflow:'hidden'
    },
    personalDataContainer: {
        alignItems: 'flex-start'
    },
    name: {
        fontWeight: '700',
        fontSize: 16,
        color: Colors.headerTitle
    },
    number: {
        marginVertical: 4,
        fontSize: 12,
        color: Colors.number
    },
    email: {
        fontSize: 12,
        color: Colors.number
    },
    topUpContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    balanceContainer: {
        alignItems: 'flex-start'
    },
    balanceText: {
        fontSize: 12,
        color: Colors.headerTitle
    },
    moneyText: {
        fontWeight: '700',
        fontSize: 16,
        color: Colors.headerTitle
    },
})