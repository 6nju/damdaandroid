import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export const Topbar = ({ label, value, image }) => (
    <View style={styles.container}>
        <View style={styles.icon}>
            <Image  
					style={{width:70, height: 70}}
                        source={image}
                  />
        </View>
        <Text style={styles.label}>{label}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        backgroundColor: 'red',
    },
    label: {
        textAlign: 'center',
    },
    text: {
        margin: 12,
        color: 'white',
    },
})