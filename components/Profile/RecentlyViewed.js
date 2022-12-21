import { View, StyleSheet } from "react-native";
import ProfileButtons from "../ui/ProfileButtons";

function RecentlyViewed() {
    return (
        <View style={styles.rootContainer}>
            <ProfileButtons
                title='Recently Viewed'
                text='You might forgot to put these product into your cart'
            />
            <ProfileButtons
                title='Complain'
                text='Experiencing bad things? Tell Us'
            />
            <ProfileButtons
                title='Help Center'
                text='Kinda lost? Find your answer here'
            />
        </View>
    )
};

export default RecentlyViewed;

const styles = StyleSheet.create({
    rootContainer: {
        
    },
});