import * as React from 'react';
import {Text, View, StyleSheet} from "react-native";

export default function AddMembers({navigation}) {
    return (
        <View style={styles.samples}>
            <Text>This is the Add Members page</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    samples: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});