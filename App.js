import React, { useRef,useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { View, Text, Modal, ScrollView, TextInput, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Image, Touchable, Animated, Easing, TouchableNativeFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
const App = () => {

    // 달력
    const Calendar = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const nowDate = date.getDate();

        const today = month+1;
        const firstDay = new Date(year, month, 1); // 해당 월의 1일
        const lastDay = new Date(year, month + 1, 0); // 해당 월의 마지막날

        const firstDate = firstDay.getDate(); // 1일
        const lastDate = lastDay.getDate(); // 마지막날
        const days = [];
        for (let i = firstDate; i <= lastDate; i++) {
            days.push(i); // 1일부터 마지막날까지추가
        }

      
        return (
            <View style={styles.calendarContainer}>
                <View style={styles.calendarTodayContainer}>
                <Text style={styles.calendarToday}>{today}월</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.calendarDateContainer}>
                        {days.map((day) => (
                            <View key={day} style={[styles.calendarDate, nowDate === day ? {backgoundColor: '#D7D6FB'} :{backgroundColor:'#EFF5FD'} ]}>
                                <Text style={styles.calendarDateText}>{day}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        )

    }
    // 현재 날짜 표시
    const TimeText = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const nowDate = year + "." + month + "." + day;
        return (
            <View style={styles.TimeTextContainer}>
                <View style={styles.TimeText}>
                    <Text style={styles.TimeTextDate}>{nowDate}</Text>
                </View>

                {/* <View style={styles.TimeTextLine}></View> */}
                <View style={styles.TodoBlockContainer}>
                    <View style={styles.TodoBlock}>
                        <Text style={styles.TodoBlockCount}>{todoListCount}</Text>
                        <Text style={styles.TodoBlockText}>오늘 할일</Text>
                    </View>
                    <View style={styles.TodoBlock}>
                        <Text style={styles.TodoBlockCount}>{todoListCountCheck}</Text>
                        <Text style={styles.TodoBlockText}>완료된 할일</Text>
                    </View>
                </View>
                {/* <View style={styles.TodoBlock}></View>
                <View style={styles.TodoBlock}></View> */}
            </View>
        )
    };
    // 할일 텍스트 표시
    const ToDoText = ({ todoList, toggleCheck, removeTodo }) => {
        // const [del, setDel] = useState(false);
        // const deleteDel = () => {
        //     setDel(!del);
        // }
        return (
            <View style={styles.ToDoTextContainer}>
                <ScrollView>

                    {todoList.map((todo) => { // todoList배열목록을 todo로 순회
                        return (
                            <View key={todo.id} style={styles.ToDoAdd}>
                                <View style={[styles.color, { backgroundColor: todo.color }]}></View>
                                <TouchableWithoutFeedback onPress={() => toggleCheck(todo.id)}>
                                    <Image style={styles.ToDoTextImage} source={todo.checked ? require('./img/icons/icon.png') : require('./img/icons/iconBack.png')} />
                                </TouchableWithoutFeedback>
                                <Text style={[styles.ToDoText, todo.checked ? { color: 'red' } : { color: 'black' }]}>{todo.text}</Text>
                                <TouchableOpacity style={styles.ToDoRemoveBtn} onPress={() => removeTodo(todo.id)}><Icon name="remove" size={20} color="#D1D1D1"></Icon></TouchableOpacity>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>


        )
    }

    const AddModal = ({ setTodoList }) => {

        const [modal, setModal] = useState(false);
        const modalClick = () => {
            setModal(!modal);
        };
        const [text, setText] = useState(''); // 입력된 텍스트
        // const [todoList, setTodoList] = useState([]); // 저장된 텍스트 목록
        const changeText = (newText) => { // input안에 텍스트를 입력하면
            setText(newText); // 입력된 텍스트를 text에 저장함
        };

        const addTodo = () => { // 할일을 추가하면
            if (text !== '') {
                const newTodo = { // newTodo객체에 id와 text값을 저장하고,
                    id: Date.now(), // 할일마다 id 부여
                    text: text, // 여기에서의 text는 위에서 저장된 text를 의미함. (사용자가 입력한 텍스트)
                    checked: false, // 체크여부
                    color: selectColor, // 선택된 색상
                };
                // setTodoList([...todoList,newTodo]); //todoList(할일목록배열)의 복사본을 생성하고, newTodo객체를 덧붙임.
                setTodoList((prevList) => [...prevList, newTodo]);
                setText(''); // 입력창 초기화
                setSelectColor('#FFFCE7') // 색상 초기화

            };

        };

        const [selectColor, setSelectColor] = useState('#FFFCE7');
        // const [colorClick, setColorClick] = useState(false);
        const changeColor = (color) => {
            setSelectColor(color);
            // setColorClick(!colorClick);
        };
        const colorOptions = [
            { id: 1, color: '#FFB8B8' },
            { id: 2, color: '#FFF98B' },
            { id: 3, color: '#CAF6BD' },
            { id: 4, color: '#BDD3F6' },

        ]
        return (
            <View style={styles.AddModalContainer}>
                <TouchableOpacity style={styles.AddModalBtn} onPress={modalClick}>
                    {/* <Image source = {require('./img/icons/add.png')}></Image> */}
                    {/* <Text style = {styles.AddModalBtnText}>+</Text> */}
                    <Icon style={styles.AddModalBtnText} name="add" size={30} color="#000"></Icon>
                </TouchableOpacity>
                {/* 만약, +가 눌리면 모달창을 생성함 */}

                <Modal
                    animationType="slide" // 모달이 슬라이드 효과로 나타나도록
                    transparent={true} // 배경을 반투명하게
                    visible={modal} // 모달을 보이게할지 여부
                    onRequestClose={modalClick} // 안드로이드에서 뒤로가기 버튼 누를때 모달 안보이게하기
                >

                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalRemove}>
                                <TouchableWithoutFeedback onPress={modalClick}><Icon name="close" style={styles.modalRemoveIcon} ></Icon></TouchableWithoutFeedback>
                            </View>
                            <TextInput
                                placeholder="할일을 추가하세요."
                                onChangeText={changeText}
                                value={text}
                                style={styles.modalInput}
                            ></TextInput>
                            <View style={styles.checkColorContainer}>
                                {colorOptions.map((option) => (
                                    <TouchableOpacity key={option.id} onPress={() => changeColor(option.color)}
                                        style={[styles.checkColor, { backgroundColor: option.color }]}>
                                        <Icon name="check" style={[styles.checkColorIcon, selectColor === option.color ? { display: 'visible' } : { display: 'none' }]}></Icon>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.modalSave}>
                                <TouchableWithoutFeedback onPress={addTodo} style={styles.modalSaveCircle}><Icon name="add" style={styles.modalSaveText}></Icon></TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };

    const [todoList, setTodoList] = useState([]); // 저장된 텍스트 목록

    const todoListCount = todoList.length;
    const todoListCountCheck = todoList.filter(todo => todo.checked).length;
    // 체크 누를시
    const toggleCheck = (id) => {
        setTodoList((prevList) => prevList.map((todo) =>
            // 클릭한 todo.id와 동일한 id를 찾고, setTodoList의 복사본 생성, checked값을 클릭한 checked값의 반대로설정
            todo.id === id ? { ...todo, checked: !todo.checked } : todo
        ));
        // todoListCountCheck = todoList.length - 1;
    };
    // 삭제 누를시
    const removeTodo = (id) => {
        setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
    };

    return (
        <View style={styles.mainContainer}>
            <Calendar></Calendar>
            <TimeText></TimeText>
            {/* <Delete></Delete> */}
            <ToDoText todoList={todoList} toggleCheck={toggleCheck} removeTodo={removeTodo}></ToDoText>
            <AddModal setTodoList={setTodoList}></AddModal>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    calendarContainer: {
        width: '100%',
        height: 120,
        backgroundColor: 'white',
    },
    calendarDateContainer: {
        flexDirection: 'row',
    },
    calendarTodayContainer: {
        width: 100,
        height: 40,
        backgroundColor: 'blue',
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    calendarToday: {
        textAlign: 'center',
        fontSize: 20,
        
    },
    calendarDate: {
        width: 40,
    height: 40,
    backgroundColor: '#D7D6FB',
    borderRadius: 10, // 원 모양 만들기 위해 반지름 설정
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
    marginLeft: 10,
    marginRight: 10,

    // textAlign: 'center',
    },
    calendarDateText: {
        color: 'black',
    },  
//     calendarDateContainer: {
// textAlign: 'center',

//     },
    TimeTextContainer: {
        marginTop: 50,
        marginBottom: 15,
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        // backgroundColor: 'grey',
    },
    TimeText: {
        width: '100%',
        height: 30,
        // justifyContent: 'center',
        alignItems: 'center',
        // textAlign: 'center',
        // backgroundColor: 'pink',
        marginBottom: 20,
    },
    TimeTextDate: {
        fontSize: 20,
    },
    TodoBlockContainer: {
        width: '100%',
        height: 100,
        // backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 10,
    },
    TodoBlock: {
        width: 150,
        height: 80,
        marginLeft: 20,
        marginRight: 2,  // 두 블록 사이 간격
        backgroundColor: '#EFF5FD',  // 기본 색상
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,

        // color: 'red',        
    },
    TodoBlockText: {
        fontSize: 12,
    },
    TodoBlockCount: {
        fontSize: 20,
        marginBottom: 5,
    },
    deleteContainer: {
        flexDirection: 'row', // 가로 방향으로 정렬
        justifyContent: 'flex-end', // 오른쪽 끝으로 정렬
        alignItems: 'flex-start', // 위쪽 끝으로 정렬
        width: '100%',
        // backgroundColor: 'grey',
        // marginTop: 20, // 위쪽에서 떨어진 만큼 마진을 추가
        // marginRight: 20, // 오른쪽에서 떨어진 만큼 마진을 추가
    },
    deleteBtn: {
        width: 50,
        height: 30,
        // backgroundColor:'white',
        textAlign: 'center',
        marginRight: 3,
    },
    ToDoTextContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        width: '100%',
        height: '100%',
        // paddingHorizontal: 10,
        // backgroundColor: '#A3DBAB',
    },
    ToDoAdd: {
        width: '100%',
        height: 60,
        // backgroundColor: '#A3DBAB',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // textAlign: 'center',
    },
    ToDoTextImage: {
        marginLeft: 5,
        marginRight: 10,
    },
    ToDoText: {
        flex: 1,
        // textAlign: 'center',
        marginRight: 10,
        // backgroundColor: '#FFFFFF',
        fontSize: 15,
    },
    ToDoRemoveBtn: {
        textAlign: 'center',
        marginRight: 20,
        // size: 40,
        // fontSize: 
        // backgroundColor: '#FFFFFF',
        // display: 'none',
    },
    color: {
        width: 4,
        height: 45,
        // backgroundColor: 'red',
        marginLeft: 15,
        marginRight: 0,
        borderRadius: 10,
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
        backgroundColor: '#FF7C7C',
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
    // 모달---------------------------
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 320,
        height: 300,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalInput: {
        width: '100%',
        height: 45,
        marginTop: 20,
        marginBottom: 30,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#DEDEDE',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    modalRemove: {
        // flex: 1,
        // justifyContent: 'flex-end',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        height: 20,
        // backgroundColor: 'blue',
    },
    modalRemoveIcon: {
        // alignItems: 'flex-start',
        // backgroundColor: 'green',
        fontSize: 20,
        color: 'grey',
    },
    checkColorContainer: {
        flexDirection: 'row',
    },
    checkColor: {
        width: 40,
        height: 40,
        borderRadius: '100%',
        // backgroundColor: '#FFB9A4',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 45,
        justifyContent: 'center', // 세로로 중앙 정렬
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center',
    },
    checkColorIcon: {
        // justifyContent: 'center', // 세로로 중앙 정렬
        // alignItems: 'center', 
        // flexDirection: 'row',
        textAlign: 'center',
        fontSize: 20,
        color: '#FFFFFF',
        display: 'none',
    },
    modalSave: {
        width: 50,
        height: 40,
        backgroundColor: '#FF7C7C',
        borderRadius: 10,
        justifyContent: 'center', // 세로로 중앙 정렬
        alignItems: 'center',

    },
    modalSaveCircle: {
        justifyContent: 'center',
        alignContent: 'center',
        // flexDirection: 'row',
    },
    modalSaveText: {
        // alignContent: 'center',
        fontSize: 25,
        textAlign: 'center',
        color: 'white',
        fontWeight: '900',
    },
    // -------------------------------

})
export default App;