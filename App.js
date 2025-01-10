import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Animated } from 'react-native';
// import { getParseTreeNode } from 'typescript';

const App = () => {
    const [input, setInput] = useState(''); // 입력값 저장
    const [text1, setText1] = useState([]); // 중요한 할일 목록을 배열로 저장
    const [text2, setText2] = useState([]); // 덜중요한 할일목록을 배열로 저장
    const [count, setCount] = useState(0);
    
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDay();
    const nowDate = year+"."+month+"."+day;


    const Input = () => {
        const [toggle, setToggle] = useState(false); // 토글 상태 관리
        const [position] = useState(new Animated.Value(0)); // 동그라미 위치
        const [textPosition] = useState(new Animated.Value(20)); // 텍스트 위치


        const ToggleSwitch = useCallback(() => { // 토글이 클릭되면 실행되는 함수
            Animated.timing(position, { // 타이밍 애니메이션을 생성하는 함수
                toValue: toggle ? 0 : 50, // 애니메이션이 완료될때 이동할 목표값 (toggle이 true이면 0, false이면 30)
                duration: 300, // 애니메이션 지속 시간
                useNativeDriver: true, // 네이티브 드라이버를 사용하여 애니메이션 실행
            }).start(); // 애니메이션을 실행하는 함수
        
            
            Animated.timing(textPosition, {
                toValue: toggle ? 20 : -20,
                duration: 100,
                useNativeDriver: true, 
            }).start();
            
            setToggle(!toggle); // 토글을 클릭하면 toggle의 상태가 반전됨. (true이면 false로)
        });

        cost 
        return (
        <View style={styles.inputContainer}>

            <View style={styles.toggle}>
                {/* 토글을 클릭하면 ToggleSwitch 함수 실행! */}
                <TouchableOpacity style={styles.toggleBtn} onPress={ToggleSwitch}>
                    <Animated.Text style={[styles.toggleText, {transform: [{translateX: textPosition}] }]}>
                        {toggle ? '중요' : '덜중요'}
                    </Animated.Text>
                    <Animated.View style={[styles.circle, {transform: [{translateX: position}]}
                    ]}>
                        <Text>{toggle ? '🍅' : '🍏'}</Text>
                    </Animated.View>
                    
                </TouchableOpacity>
            </View>

            <Text style={styles.inputDate}>{nowDate}</Text>

            <View style={styles.inputTextSubmitContainer}>
                <TextInput style={styles.input} placeholder="할일 입력" value={input} />
                <TouchableOpacity style={styles.submit} onPress={() => {
                // 버튼을 눌렀을때, input란이 공백이 아닐경우, 
                // 새로운 할일 목록을 만들어 객체로 저장
                // count값을 1 증가시켜 추가된 할일 마다 새로운 id 부여
                // input란을 초기화 
                // 기존 할일목록에 새로운 할일 추가
                if (input !== "") { 
                    const newInput1 = {id: count, text: input};
                    const newInput2 = {id: count, text: input};
                    setCount(count+1);
                    setInput('');
                    if (toggle) { // 토글이 true일때
                        setText1([...text1,newInput1]);
                    } else {
                        setText2([...text2,newInput2]);
                    }

                    // setText([...text1, newInput]);
                } else {
                    alert('입력값이 없어요.');
                }
                // 만약, 토글이 false이라면 text를 중요리스트에 추가한다.
                // 반대로 토글이 true이라면 text를 덜중요리스트에 추가한다.
                
                }}><Text>+</Text></TouchableOpacity>
            </View>
        

        </View>
        );
    };

    const ImportantItem = () => {
        return (
            <View style={styles.iconItemContainer}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>아이콘</Text>
                
                </View>
                <View style={styles.itemContainer}>
                    {text1.map(item => (
                        <View key={item.id}>
                        <Text>{item.text}</Text>
                        </View>
                    ))}
                    <Text style={styles.item}>중요리스트</Text>
                </View>
            </View>
        );
    };
    const LowImportantItem = () => {
        return (
            <View style={styles.iconItemContainer}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>아이콘</Text>
                </View>
                <View style={styles.itemContainer}>
                    
                {text2.map(item => (
                    <View key={item.id}>
                        <Text>{item.text}</Text>
                        </View>
                    ))}
                    
                    <Text style={styles.item}>덜중요리스트</Text>
                </View>
            </View>
        )
    }
    
    return (
        <View style = {styles.mainContainer}>
            <Input></Input>
            <ImportantItem />
            <LowImportantItem />
        </View>
    );
};

const styles = StyleSheet.create({
    toggleBtn: {
        width: 100,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#ccc', // 길쭉한 부분 배경색
        justifyContent: 'center',
        alignItems: 'center', // 텍스트와 동그라미가 중앙에 정렬되게 함
        position: 'relative', // 애니메이션을 위해 필요
        paddingHorizontal: 10, // 좌우 여백 추가
    },
    toggleText: {
        position: 'absolute', // 텍스트를 길쭉한 부분 안에 배치
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center', // 텍스트 중앙 정렬
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff', // 동그라미 색상
        position: 'absolute', // 동그라미가 길쭉한 부분 위에 떠 있도록 설정
        top: 5,
        left: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // toggleText: {
    //     // position: 'relative',
    //     position: 'absolute', // 텍스트를 길쭉한 부분 안에 배치
    //     fontSize: 16,
    //     // color: '#fff',
    //     fontWeight: 'bold',
    //     textAlign: 'center', // 텍스트 중앙 정렬
    // },
    // toggleBtn: {
    //     width: 100,
    //     height: 50,
    //     borderRadius: 30,
    //     backgroundColor: '#ccc', // 배경색 (길쭉한 부분)
    //     justifyContent: 'center',
    //     padding: 5,
    //     position: 'relative',
    //   },
    //   circle: {
    //     width: 50,
    //     height: 50,
    //     borderRadius: '100%',
    //     backgroundColor: '#fff', // 동그라미 색상
    //     // borderWidth: 2,
    //     // borderColor: '#4caf50', // 동그라미 테두리 색상 (원하는 색으로 변경)
    //   },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFEADF',
        width: '100%',
        height: '100%',
    },
    mainText: {
        textAlign: 'center',
    },
    mainInput: {

    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#763E3E',
        width: '100%',
        height: '30%',
    },
    inputDate: {
        textAlign: 'center',
        fontSize: 20,
    },

    input: {
        flex: 1,
    },  
    submit: {
        width: 40,
        height: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputTextSubmitContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },  
    iconItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '35%',
        backgoundColor: '#FFFFFF',
        marginTop: 20,
        marginBottom: 20,
    },
    iconContainer: {
        justifyContent: 'center',
        width: '20%',
        height: '100%',
        backgroundColor: '#DFCBCB',
    },
    icon: {
        textAlign: 'center',
    },
    itemContainer: {
        justifyContent: 'center',
        width: '80%',
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    item: {
        textAlign: 'center',
    },
});
export default App;

// import React, { useState } from 'react';
// import { SafeAreaView, TextInput, Button, FlatList, Text, View, TouchableOpacity } from 'react-native';

// export default function App() {
//   // 상태 정의: 할 일 목록과 새로운 할 일
//   const [task, setTask] = useState('');
//   const [tasks, setTasks] = useState([]);

//   // 새로운 할 일을 목록에 추가하는 함수
//   const addTask = () => {
//     if (task.trim()) {
//       setTasks([...tasks, { id: Math.random().toString(), text: task }]);
//       setTask('');
//     }
//   };

//   // 할 일 삭제 함수
//   const deleteTask = (taskId) => {
//     setTasks(tasks.filter(task => task.id !== taskId));
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, padding: 20 }}>
//       <TextInput
//         style={{
//           height: 40,
//           borderColor: 'gray',
//           borderWidth: 1,
//           marginBottom: 20,
//           paddingHorizontal: 10
//         }}
//         placeholder="할 일을 입력하세요"
//         value={task}
//         onChangeText={setTask}
//       />
//       <Button title="추가" onPress={addTask} />
      
//       <FlatList
//         data={tasks}
//         renderItem={({ item }) => (
//           <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
//             <Text style={{ flex: 1 }}>{item.text}</Text>
//             <TouchableOpacity onPress={() => deleteTask(item.id)}>
//               <Text style={{ color: 'red' }}>삭제</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         keyExtractor={item => item.id}
//       />
//     </SafeAreaView>
//   );
// }
