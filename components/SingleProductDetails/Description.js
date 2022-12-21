import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function Description() {
    return (
        <>
            <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare venenatis felis at pulvinar. Etiam non eleifend sapien. Pellentesque nec orci vel elit consequat laoreet. Cras id fermentum turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel imperdiet purus, eget hendrerit ipsum. Duis quis commodo purus. In diam nibh, consequat ac posuere sit amet, condimentum in odio. Maecenas ultrices id ligula nec fringilla. Aenean pellentesque ac metus vitae porttitor. Vestibulum cursus aliquet magna vitae aliquam. Aenean faucibus tellus in tortor congue interdum non ut lorem. Aliquam ut ligula ac odio tincidunt tincidunt non sit amet arcu. Sed imperdiet ligula sit amet orci viverra auctor. In quam quam, cursus nec tortor ac, placerat mollis tortor.
            </Text>
        </>
    )
};

export default Description;

const styles = StyleSheet.create({
    description: {
        fontSize: 12,
        color: Colors.description
    },
});