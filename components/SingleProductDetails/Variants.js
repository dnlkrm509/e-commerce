import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { Ionicons } from '@expo/vector-icons';
import Button from "../ui/Button";
import { useState } from "react";

function Variants() {
    const [is120, setIs120] = useState(true);

    function variantHandler(bool) {
        setIs120(bool);
    };
    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>
                Variants
            </Text>
            <View style={styles.buttons}>
                <View>
                    <Button
                        style={[styles.button,{marginRight:12,width:85,height:34,borderWidth:1,borderColor:Colors.green}]}
                        onPress={variantHandler.bind(this, true)}
                    >
                        <View
                            style={{flexDirection:'row',alignItems:'center'}}
                        >
                            <Text style={{fontSize:12,color:Colors.green}}>
                                120 ml
                            </Text>
                            {is120 && (
                                <Ionicons
                                    name='checkmark'
                                    size={16}
                                    color={Colors.green}
                                    style={{marginLeft: 8}}
                                />
                            )}
                        </View>
                    </Button>
                </View>
                <View>
                    <Button
                        style={[styles.button,{marginRight:12,width:85,height:34,borderWidth:1,borderColor:Colors.headerTitle,alignItems:'center'}]}
                        onPress={variantHandler.bind(this, false)}
                    >
                        <View
                            style={{flexDirection:'row',alignItems:'center'}}
                        >
                            <Text style={{fontSize:12,color:Colors.headerTitle}}>
                                100 ml
                            </Text>
                            {!is120 && (
                                <Ionicons
                                    name='checkmark'
                                    size={16}
                                    color={Colors.headerTitle}
                                    style={{marginLeft: 8}}
                                />
                            )}
                        </View>
                    </Button>
                </View>
            </View>
        </View>
    )
};

export default Variants;

const styles = StyleSheet.create({
    rootContainer: {
        marginTop: 40
    },
    title: {
        fontWeight: '700',
        color: Colors.headerTitle
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 16,
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#ffffff'
    },
});