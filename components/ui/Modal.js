import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Modal from 'react-native-modal';

import { TouchableHighlight } from "react-native-gesture-handler";

function Modalui({ modalVisible, onClose, children, height, onHideModal }) {
    return (
        <View style={styles.screen}>
                <Modal
                    isVisible={modalVisible}
                    hasBackdrop={true}
                    onBackdropPress={() => onClose()}
                    onSwipeComplete={() => onClose()}
                    propagateSwipe={true}
                    swipeDirection="down"
                    onHideModal={() => onHideModal()}
                    //useNativeDriver={false}
                    style={styles.modal}
                >
                    <View style={styles.modalInnerContainer}>
                        <View style={[
                                styles.content, { height: height }
                            ]}>
                            <ScrollView>
                                {children}
                                <TouchableHighlight style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            right: 0,
                                                            bottom: 0
                                                        }}/>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
    )
}

export default Modalui;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    modal: {
        margin:0,
        flex: 1
    },
    modalInnerContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 24,
        backgroundColor: 'white',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        flex: 1
    },
    content: {
        flex: 1,
        paddingBottom: 24
    }
});