import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Modal, ScrollView, TextInput, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const date = new Date();
    const year = date.getFullYear(); // 현재클릭한 연도랑 사용자가 선택한 연도랑 같은지 비교하기위한 year객체 생성
    const month = date.getMonth(); // 현재클릭한 달이랑 사용자가 선택한 달이랑 같은지 비교하기위한 month객체 생성
    const dateDay = date.getDate(); // 현재클릭한 날짜랑 사용자가 선택한 날짜랑 같은지 비교하기위한 date객체 생성
    const nowMonth = selectedDate.getMonth() + 1;
    const nowYear = selectedDate.getFullYear();
    const nowDate = selectedDate.getDate();

    // 오늘 날짜인지 확인하는 함수
    const isToday = (selectedDate.getDate() === new Date().getDate() &&
        selectedDate.getMonth() === new Date().getMonth() &&
        selectedDate.getFullYear() === new Date().getFullYear());
    // ----------------------------------------------------



    // const dateText = `${nowMonth}월 ${nowDate}일`;
    const firstDay = new Date(nowYear, nowMonth, 1); // 해당 월의 1일 객체를 반환
    const lastDay = new Date(nowYear, nowMonth + 1, 0); // 해당 월의 마지막날 객체를 반환
    const firstDate = firstDay.getDate(); // 1 이라는 날짜값만 반환
    const lastDate = lastDay.getDate(); // 마지막 날짜값만 반환

    // const [days,setDays] = useState([]); 대신 useMemo를 사용하여 날짜배열 관리
    const days = useMemo(() => {
        // const firstDay = new Date(nowYear, nowMonth, 1); // 해당 월의 1일 객체를 반환
        // const lastDay = new Date(nowYear, nowMonth + 1, 0); // 해당 월의 마지막날 객체를 반환
        // const firstDate = firstDay.getDate(); // 1 이라는 날짜값만 반환
        // const lastDate = lastDay.getDate(); // 마지막 날짜값만 반환

        const days = []; // 날짜를 저장할 빈 배열생성
        for (let i = firstDate; i <= lastDate; i++) {
            days.push(i); // 1일부터 마지막날까지 배열에 추가
        }
        // setDays(newDays); // days 배열안에 1일부터 마지막날까지 날짜가 저장된 newDays를 저장
        return days;
    }, [nowYear, nowMonth]);

// 월 변경 함수 ( < > 누르면 direction값에 따라 월 변경 )
const changeMonth = useCallback((direction) => {
    const newDate = new Date(selectedDate); // newDate라는 새로운 날짜객체 생성후, 현재 날짜값을 복붙
    newDate.setMonth(newDate.getMonth() + direction); // setMonth는 월을 설정하는 Date객체의 내장함수
    setSelectedDate(newDate); // 변경된 월을 selectedDate에 저장
}, [selectedDate]);

// const [click, setClick] = useState(false);
// const dateClick = () => {
//     setClick(!click);
// }
 // 날짜 선택 함수 ( 클릭한 날짜를 selectedDate에 저장 )
 const handleDateClick = useCallback((day) => {
    const newDate = new Date(selectedDate); // newDate라는 새로운 날짜객체 생성
    newDate.setDate(day); // 클릭한 날짜를 newDate객체에 저장
    setSelectedDate(newDate); // 저장된 날짜를 selectedDate에 저장
},[selectedDate]);

useEffect(() => {
    getData();  // 컴포넌트 마운트 시 데이터 가져오기
}, [selectedDate]);  // 연도나 월이 변경될 때마다 다시 데이터 로드


const [a, setA] = useState({});
const getData = async () => {

    let updatedA = {}; // 날짜별로 false, true저장 (데이터의 유무)
 
    for (let i = firstDate; i <= lastDate; i++) {
        const allDays = nowYear + "-" + nowMonth + "-" + i;
        const get = await AsyncStorage.getItem(allDays);
        if (get === null || get === "[]") {
            // 데이터가 없으면 false
            updatedA[allDays] = false;
        } else {
            // 데이터가 있으면 true
            updatedA[allDays] = true;
        }
    }
    setA(updatedA);
}

const [click, setClick] = useState({});
const dateClick = (day) => {
    setClick((prevState) => {
        const newState = {};
        
        // 이전에 클릭된 날짜를 모두 false로 설정하고
        for (const key in prevState) {
            newState[key] = false;
        }
        
        // 클릭한 날짜는 true로 설정
        newState[day] = true;

        return newState;
    });
};
    
    // ------------------------ 달력 ------------------------ //
    const Calendar = () => {

        return (
            <View style={styles.calendarContainer}>
                <View style={styles.calendarTodayContainer}>
                    <View style={styles.calendarToday}>
                        <Text style={styles.calendarTodayText}>{nowYear}년 {nowMonth}월 </Text>
                        <View style={styles.calendarTodayDate}>
                            <Text style={styles.calendarTodayDateText}>{nowDate}일</Text>
                        </View>
                    </View>
                    <View style={styles.calendarTodayLeftRightContainer}>
                        <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.calendarTodayLeft}><Icon name="chevron-left" size={20} color="#FFFFFF" style={styles.calendarTodayLeftIcon}></Icon></TouchableOpacity>
                        <TouchableOpacity onPress={() => changeMonth(1)} style={styles.calendarTodayRight}><Icon name="chevron-right" size={20} color="#FFFFFF" style={styles.calendarTodayRightIcon}></Icon></TouchableOpacity>
                    </View>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.calendarDateContainer}>
                        {days.map((day) => {
                            const days = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
                            const dayOfWeek = days.getDay();
                            let dayText = "";
                            switch (dayOfWeek) {
                                case 0: dayText = "일"; break;
                                case 1: dayText = "월"; break;
                                case 2: dayText = "화"; break;
                                case 3: dayText = "수"; break;
                                case 4: dayText = "목"; break;
                                case 5: dayText = "금"; break;
                                case 6: dayText = "토"; break;
                            }

                            const dayKey = `${nowYear}-${nowMonth}-${day}`;  // 날짜 포맷: 'YYYY-MM-DD'

                            return (
                                <TouchableOpacity key={day} onPress={() => {handleDateClick(day); dateClick(day);}}>
                                    {/* click === true ? {backgroundColor: 'red'} : {backgroundColor: 'blue'} */}
                                    <View key={day} style={[styles.calendarDate, dateDay === day && year === selectedDate.getFullYear() && month === selectedDate.getMonth() ? { backgroundColor: '#C4D1F5' } : { backgroundColor: '#F9F9F9' }, click[day] ? {borderWidth: 3, borderColor: '#B7C6DA'} : {borderWidth: 3, borderColor: '#F9F9F9'}]}>
                                        <Text style={[styles.calendarDayText, dateDay === day && year === selectedDate.getFullYear() && month === selectedDate.getMonth() ? { color: '#FFFFFF' } : { color: '#898989' }]}>{dayText}</Text>
                                        <Text style={styles.calendarDateText}>{day}</Text>
                                        <Text style={[styles.calendarDot, a[dayKey] ? { display: 'visible' } : { display: 'none' }]}>.</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }

    // ------------------------ 현재 날짜 표시 & 할일 갯수 표시 ------------------------ //
    const TimeText = () => {
        const date = new Date();
        // const year = date.getFullYear();
        // const month = date.getMonth() + 1;
        // const day = date.getDate();
        // const nowDate = year + "." + month + "." + day;
        return (
            <View style={styles.TimeTextContainer}>
                <View style={styles.TimeText}>
                    <TouchableOpacity style={[styles.nowDay, isToday ? { display: 'flex' } : { display: 'none' }]}><Text style={styles.nowDayText}>오늘</Text></TouchableOpacity>
                </View>
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
            </View>
        )
    };

    // ------------------------ 할일 목록 표시 (체크, 텍스트, 삭제) ------------------------ //
    const ToDoText = ({ todoList, toggleCheck, removeTodo }) => { // props로 값을 받아와서 사용
        return (
            <View style={styles.ToDoTextContainer}>
                {/* 저장된 할일이 없을경우, 할일이 없음을 표시하고, 할일이 있으면 할일 띄우기 */}
                {todoList.length === 0 ? (
                    <View style={styles.TodoTextNoContainer}>
                        <Image source={require('./img/icons/background.png')} style={styles.TodoTextNoImg}></Image>
                        <Text style={styles.TodoTextNoText}>할 일이 아직 없어요.</Text>
                    </View>
                ) : (
                    <ScrollView>
                        {todoList.map((todo) => { // todoList배열목록을 todo로 순회
                            return (
                                <View key={todo.id} style={styles.ToDoAdd}>
                                    <View style={[styles.color, { backgroundColor: todo.color }]}></View>
                                    <TouchableWithoutFeedback onPress={() => toggleCheck(todo.id)}>
                                        <Image style={styles.ToDoTextImage} source={todo.checked ? require('./img/icons/icon.png') : require('./img/icons/iconBack.png')} />
                                    </TouchableWithoutFeedback>
                                    <Text style={[styles.ToDoText, todo.checked ? { color: '#B6B6B6' } : { color: 'black' }]}>{todo.text}</Text>
                                    <TouchableOpacity style={styles.ToDoRemoveBtn} onPress={() => removeTodo(todo.id)}><Icon name="remove" size={20} color="#D1D1D1"></Icon></TouchableOpacity>
                                </View>
                            );
                        })}
                    </ScrollView>
                )}
            </View>
        )
    }


    // ------------------------ 모달창 (input, 인덱스색상 선택, 제출버튼) ------------------------ //
    const AddModal = ({ setTodoList }) => {

        // + 버튼 누를시, 모달창 띄우기
        const [modal, setModal] = useState(false);
        const modalClick = () => {
            setModal(!modal);
            setText('');
        };

        // input에 입력된 텍스트 저장
        const [text, setText] = useState('');
        const changeText = (newText) => { // input안에 텍스트를 입력하면,
            setText(newText); // 입력된 텍스트를 text에 저장함
        };

        // 제출 버튼 누를시, 모달창 안의 정보 저장
        const addTodo = async () => {
            if (text !== '') { // 입력된 텍스트가 있을경우, 아래 코드 실행
                const newTodo = { // newTodo 객체 생성후, 아래 데이터 저장
                    id: Date.now(), // 텍스트마다 id 부여 (id는 구분가능하도록 현재시간으로 저장)
                    text: text, // 사용자가 입력한 텍스트 저장
                    checked: false, // 체크 여부 저장
                    color: selectColor, // 색상 정보 저장

                };
                // props로 전송받은 setTodoList(텍스트 배열)의 상태 업데이트
                setTodoList((prevList) => {
                    const updatedList = [...prevList, newTodo]; // prevList는 이전 상태값을 의미함, prevList복사본에 newTodo데이터 저장
                    return updatedList;
                });
                // dateKey는 정보마다 구분 가능한 key
                const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
                // 로컬 스토리지에 데이터 저장 (updatedList안에 텍스트 배열(id, text, checked, color)이 들어있음)
                try {
                    await AsyncStorage.setItem(dateKey, JSON.stringify([...todoList, newTodo]));
                } catch (error) {
                    console.error("모달창 내부 데이터 저장 오류", error);
                }
                setText(''); // input란 초기화
                setSelectColor('#FFFCE7') // 색상 초기화
            };
        };

        // 색상 클릭시 해당 색상저장
        const [selectColor, setSelectColor] = useState('#F3F3F3');
        const changeColor = (color) => {
            setSelectColor(color);
        };

        // 색상마다 id와 color값 저장
        const colorOptions = [
            { id: 1, color: '#FFF584' },
            { id: 2, color: '#C4F6B6' },
            { id: 3, color: '#FFA8A0' },
            { id: 4, color: '#DCBBFC' },
            { id: 5, color: '#BAE3F7' },
        ];

        return (
            <View style={styles.AddModalContainer}>
                <TouchableOpacity style={styles.AddModalBtn} onPress={modalClick}>
                    <Icon style={styles.AddModalBtnText} name="add" size={30} color="#000"></Icon>
                </TouchableOpacity>
                <Modal
                    animationType="slide" // 모달이 슬라이드 효과로 나타나도록
                    transparent={true} // 배경을 반투명하게
                    visible={modal} // 모달을 보이게할지 여부
                    onRequestClose={modalClick} // 안드로이드에서 뒤로가기 버튼 누를때 모달 안보이게하기
                >
                    <View style={styles.modalBackground} >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalRemove}>
                                <TouchableWithoutFeedback onPress={modalClick}><Icon name="close" style={styles.modalRemoveIcon} ></Icon></TouchableWithoutFeedback>
                            </View>
                            <Image source={require('./img/icons/icon.png')} style={styles.modalIconImage}></Image>
                            <TextInput
                                placeholder="오늘 할 일을 입력하세요."
                                onChangeText={changeText}
                                value={text}
                                style={styles.modalInput}
                                selectionColor="#CFCFCF"
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
                                <TouchableOpacity onPress={addTodo} style={styles.modalSaveCircle}><Icon name="add" style={styles.modalSaveText}></Icon></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };


    // ---------------------- props로 전송되는 것들 -------------------- //

    // 텍스트(id, text, checked, color 정보가 담겨있음) 배열이 저장되는 곳
    const [todoList, setTodoList] = useState([]);
    // 체크버튼 누를시, 체크표시 (체크상태 변경)
    const toggleCheck = useCallback((id) => {
        setTodoList((prevList) => {
            const updatedList = prevList.map((todo) =>
                // 선택한 todo의 id와 체크버튼의 id가 동일하다면, todo복사본 생성후, checked의 상태를 true로 변경
                todo.id === id ? { ...todo, checked: !todo.checked } : todo
            );
            return updatedList;
        });
    }, []);

    // 삭제버튼 누를시, todo에 저장된 id 삭제
    const removeTodo = useCallback((id) => {
        setTodoList((prevList) => {
            const updatedList = prevList.filter((todo) => todo.id !== id);
            return updatedList;
        });
    }, []);




    // 저장소의 데이터 조회 ( selectedDate(선택한 연도,달) 의 값이변경될때마다 실행 )
    // --------------------- 할일 목록 조회 ------------------------ //
    useEffect(() => {
        const loadTodos = async () => {
            const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
            const storedTodos = await AsyncStorage.getItem(dateKey); // 저장소의 데이터를 꺼냄

            if (storedTodos) { // 데이터가 존재한다면, 아래 코드 실행
                setTodoList(JSON.parse(storedTodos)); // 저장된 할 일을 로드

            } else {
                setTodoList([]); // 저장된 할일이 없으면 빈배열로 설정
            }
        };
        loadTodos();


    }, [selectedDate]);

    // 저장소에 데이터 저장 ( todoList(텍스트관련 데이터)와 selectedDate(선택한 연도,달)의 값이 변경될때마다 실행)
    // --------------------- 할일 목록 저장 -------------------------- //
    useEffect(() => {
        const saveTodosToStorage = async () => {
            const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
            try {
                await AsyncStorage.setItem(dateKey, JSON.stringify(todoList));
            } catch (error) {
                console.log("할일 데이터 저장 오류발생", error);
            }

        };
        saveTodosToStorage();
    }, [todoList, selectedDate]);

    // 체크버튼 눌리면, 할일 갯수 변경 ( todoList의 값이 변경될때마다 실행 )
    const todoListCount = todoList.length;
    const [todoListCountCheck, setTodoListCountCheck] = useState(0);
    useEffect(() => {
        setTodoListCountCheck(todoList.filter(todo => todo.checked).length);
    }, [todoList]);

    return (
        <View style={styles.mainContainer}>
            <Calendar todoList={todoList}></Calendar>
            <TimeText></TimeText>
            <ToDoText todoList={todoList} toggleCheck={toggleCheck} removeTodo={removeTodo}></ToDoText>
            <AddModal setTodoList={setTodoList}></AddModal>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    calendarIconContainer: {
        // flex: 1,
        width: '100%',
        height: 50,
        // backgroundColor: 'grey',
        alignItems: 'center', // 세로 중앙 정렬
        // justifyContent: 'center', // 가로 중앙 정렬
        flexDirection: 'row', // 기본 방향 설정 (가로 방향)
        // position: 'absolute', // 화면 상단에 고정
        // left: 0, // 왼쪽 끝에 배치
        // marginTop: 5,
    },
    calendarView: {
        width: 100,
        height: 30,
        // backgroundColor: 'blue',
        // marginLeft: 20,
        marginLeft: 10,
        marginTop: 20,
    },
    calendarContainer: {
        width: '100%',
        height: 140,
        // backgroundColor: '#F2F9FF',
    },
    calendarDateContainer: {
        flexDirection: 'row',
        // marginTop: 20,
    },

    calendarTodayContainer: {
        // width: 170,
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 10,
        marginTop: 15,
        marginLeft: 15,

        // backgroundColor: 'blue',
        borderRadius: 15,
        padding: 5,
        // position: 'relative',
        // marginRight: 10,
    },
    calendarTodayLeftRightContainer: {
        // flex: 1,
        // justifyContent: 'space-between',
        // alignItems:'flex-start',
        flexDirection: 'row',

    },
    calendarTodayLeft: {
        width: 30,
        height: 30,
        backgroundColor: '#C4D1F5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        borderRadius: 10,
    },
    calendarTodayRight: {
        width: 30,
        height: 30,
        backgroundColor: '#C4D1F5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 30,
        borderRadius: 10,
    },
    calendarTodayLeftIcon: {
        textAlign: 'center',

    },
    calendarTodayRightIcon: {
        textAlign: 'center',
    },
    calendarToday: {
        width: 150,
        height: 40,
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    calendarTodayText: {
        fontSize: 16,
        fontWeight: '600',
        // marginRight: 12,
    },
    calendarTodayDate: {
        width: 50,
        height: 30,
        // backgroundColor: '#EFF4FC',
        backgroundColor: '#FCDBD3',
        // textAlign: 'center',
        // alignItems:'center',
        justifyContent: 'center',
        // borderRadius: '100%',
        borderRadius: 15,
    },
    calendarTodayDateText: {
        textAlign: 'center',
        fontWeight: '600',
    },

    calendarDate: {
        width: 45,
        height: 65,
        // backgroundColor: '#D7D6FB',
        borderRadius: 10, // 원 모양 만들기 위해 반지름 설정
        justifyContent: 'center', // 세로 중앙 정렬
        alignItems: 'center', // 가로 중앙 정렬
        marginLeft: 10,
        marginRight: 10,

        // borderWidth: 3,
        // borderColor: '#C4D1F5',
        position: 'relative',

    },
    calendarDayText: {
        fontSize: 10,
        fontWeight: '600',
        paddingTop: 5,
        // paddingBottom: 5,
        color: '#D1D1D1',
        position: 'absolute',
        top: 0,
    },

    calendarDateText: {
        color: 'black',
        position: 'absolute',
        top: 23,
    },
    calendarDot: {
        position: 'absolute',

        top: 14,
        fontSize: 35,
        color: '#7B9AFC',
    },

    TimeTextContainer: {
        // marginTop: 10,
        // marginBottom: 15,
        width: '100%',
        // height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        // backgroundColor: '#C4D1F5',
        // borderTopWidth: 2,
        // borderColor: '#F3F3F3',
        // paddingTop: 10,
        // marginTop: 20,
    },
    TimeText: {
        width: '100%',
        height: 30,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // alignContent: 'center',
        textAlign: 'center',
        // backgroundColor: 'pink',
        flexDirection: 'row',
        // marginBottom: 10,
        // marginTop: 10,
    },


    nowDay: {
        width: 40,
        height: 23,
        backgroundColor: '#FF987F',
        // backgroundColor: '#FA8F6E',
        marginLeft: 5,
        // textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'row',
        borderRadius: 10,
        paddingBottom: 2,
        // marginTop: 2,

    },
    nowDayText: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    TodoBlockContainer: {
        width: '100%',
        height: 80,
        // backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 10,
        // borderTopWidth: 2,
    },
    TodoBlock: {

        width: 140,
        height: 70,
        marginLeft: 20,
        marginRight: 2,  // 두 블록 사이 간격
        backgroundColor: '#EFF4FC',  // 기본 색상
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        // borderWidth: 4,
        // borderColor: '#C4D1F5',
    },
    TodoBlockText: {
        fontSize: 12,
        // color: '#909090',
    },
    TodoBlockCount: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: '800',
    },
    deleteContainer: {
        flexDirection: 'row', // 가로 방향으로 정렬
        justifyContent: 'flex-end', // 오른쪽 끝으로 정렬
        alignItems: 'flex-start', // 위쪽 끝으로 정렬
        width: '100%',
    },
    deleteBtn: {
        width: 50,
        height: 30,
        // backgroundColor:'white',
        textAlign: 'center',
        marginRight: 3,
    },
    ToDoTextContainer: {
        flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        width: '100%',
        height: '100%',
        // paddingHorizontal: 10,
        // backgroundColor: '#EEF1F6',
        paddingTop: 10,
    },
    TodoTextNoContainer: {
        width: '100%',
        height: 400,
        // backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TodoTextNoText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#D7D7D7',
    },
    TodoTextNoImg:{
        marginBottom: 10,
        width: 80,
        height: 80,
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
        height: 38,
        // backgroundColor: 'red',
        marginLeft: 15,
        marginRight: 0,
        borderRadius: 5,
        // backgroundColor: '#DDDDDD',
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
        // backgroundColor: '#D7D6FB',
        backgroundColor: '#C4D1F5',
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
        height: 350,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
    },
    modalInput: {
        width: '90%',
        height: 45,
        marginTop: 50,
        marginBottom: 30,
        borderBottomWidth: 2,
        borderColor: '#CFCFCF',
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
    modalIconImage: {
        // marginRight: 10,
        marginBottom: 8,

        // textAlign: 'center',
        // justifyContent: 'center',
    },
    modalIconText: {
        fontSize: 15,
        fontWeight: '600',
    },
    checkColorContainer: {
        flexDirection: 'row',
    },
    checkColor: {
        width: 35,
        height: 35,
        borderRadius: '100%',
        // backgroundColor: '#FFB9A4',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 45,
        justifyContent: 'center',
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
        backgroundColor: '#C4D1F5',
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