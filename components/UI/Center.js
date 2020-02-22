import React from 'react'
import { View, StyleSheet } from 'react-native'

const Center = props => {
    return (
        <View style={{ ...styles.centered, ...props.style }}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default Center
