import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import PersonalData from "../components/Profile/PersonalData";
import RecentlyViewed from "../components/Profile/RecentlyViewed";
import Transaction from "../components/Profile/Transaction";
import { fetchSingleData, numberOfRows } from "../util/database";

function ProfileScreen() {
    const isFocused = useIsFocused();
    const [profile, setProfile] = useState([]);

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
            <ScrollView alwaysBounceVertical={false}>
                <PersonalData profile={profile} />
                <View style={styles.transactionContainer}>
                    <Transaction />
                    <RecentlyViewed />
                </View>
            </ScrollView>
        </View>
    )
};

export default ProfileScreen;

const styles = StyleSheet.create({
    screen: { 
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 24
    },
    transactionContainer: {
        alignItems: 'flex-start',
        marginTop: 40,
    },
});