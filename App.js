import React, { useRef, useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Image, Touchable, Animated, Easing } from 'react-native';
// import CheckBox from 'react-native-checkbox';
// import {Checkbox, Text} from 'react-native-paper';

const App = () => {

    // 현재 날짜 표시
    const TimeText = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        const nowDate = year + "." + month + "." + day;
        return (
            <View style = {styles.TimeTextContainer}>
                <Text style = {styles.TimeTextDate}>{nowDate}</Text>
            </View>
        )
    }

    // 할일 텍스트 표시
    const ToDoText = () => {

        const [check, setCheck] = useState(false);
        const toggleCheck = () => {
                setCheck(!check);
            };

        const [checkImg, setCheckImg] = useState(false);
        const toggleCheckImg = () => {
            setCheckImg(!checkImg);
        };
        
        return (
            <View style = {styles.ToDoTextContainer}>
                <TouchableWithoutFeedback onPress={toggleCheckImg}>
                    <Image style = {styles.ToDoTextImage} source={ checkImg ? require('./img/icons/icon.png') : require('./img/icons/iconBack.png')} />
                </TouchableWithoutFeedback>
                <Text style = {styles.ToDoText}>뿌링클 먹기</Text>
                <TouchableWithoutFeedback style = {styles.ToDoCheckBtn} onPress={toggleCheck}>
                    <View style = {styles.ToDoCheckBtnCircle}>
                        <Text style = {styles.ToDoCheckBtnText}>{check ? '' : '✔'}</Text>
                    </View>
                </TouchableWithoutFeedback> 
                <TouchableOpacity style = {styles.ToDoRemoveBtn}><Text>x</Text></TouchableOpacity>
            </View>
        )
    }

    const AddModal = () => {
        return (
            <View style = {styles.AddModalContainer}>
                <TouchableOpacity style = {styles.AddModalBtn}>
                    {/* <Image source = {require('./img/icons/add.png')}></Image> */}
                    <Text style = {styles.AddModalBtnText}>+</Text>
                </TouchableOpacity>
                {/* 만약, +가 눌리면 모달창을 생성함 */}
            </View>
        )
    }
    return (
        <View style = {styles.mainContainer}>
            <TimeText></TimeText>
            <ToDoText></ToDoText>
            <AddModal></AddModal>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8EC',
    },
    TimeTextContainer: {
        marginTop: 40,
        marginBottom: 50,
    }, 
    TimeTextDate: {
        fontSize: 25,
        // fontWeight: 'bold',
    },
    ToDoTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        // backgroundColor: '#A3DBAB',
    },
    ToDoTextImage: {
        marginLeft: 10,
        marginRight: 10,
    },
    ToDoText: {
        flex: 1,
        // textAlign: 'center',
        marginRight: 10,
        // backgroundColor: '#FFFFFF',
        fontSize: 15,
    },

    ToDoCheckBtn: {
        // textAlign: 'center',
        marginRight: 10,
    },
    ToDoCheckBtnCircle: {
        width: 30,
        height: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: '100%',
        justifyContent: 'center',
        marginRight: 12,
        // alignItems: 'center',
        // textAlign: 'center',
    },
    ToDoCheckBtnText: {
        // justifyContent: 'space-between',
        // alignItems: 'center',
        textAlign: 'center',
        fontSize: 15,
    },
    ToDoRemoveBtn: {
        textAlign: 'center',
        marginRight: 5,
        fontSize: 10,
        // backgroundColor: '#FFFFFF',
    },
    AddModalContainer: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        // fontWeight: '100',
    },
    AddModalBtn: {
        // fontSize: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFB9A4',
        width: 70,
        height: 70,
        borderRadius: '100%',
        // textAlign: 'center',
        // flexDirection: 'row',
    
    },
    AddModalBtnText: {
        fontSize: 35,
        fontWeight: '800',
        color: '#FFFFFF',
        // textAlign: 'center',
    },
    
})
export default App;