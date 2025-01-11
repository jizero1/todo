import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

const App = () => {

    // 현재 날짜 표시
    const TimeText = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        const nowDate = year + "." + month + "." + day;
        return (
            <View>
                <Text>{nowDate}</Text>
            </View>
        )
    }

    // 할일 텍스트 표시
    const ToDoText = () => {

        console.log('./img/icons/img1.PNG');

        return (
            <View>
                {/* 아이콘, 텍스트, 체크박d스, x */}
                <Image source={require('./img/icons/img.PNG')} style={styles.image} />
                
            </View>
        )
    }
    return (
        <View>
            <TimeText></TimeText>
            <ToDoText></ToDoText>
        </View>
    )
}


const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    },
})
export default App;