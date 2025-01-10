import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { getParseTreeNode } from 'typescript';

const App = () => {
    const [input, setInput] = useState(''); // 입력값 저장
    const [text, setText] = useState([]); // 할일 목록을 배열로 저장
    const [count, setCount] = useState(0);

    const Input = () => {
        return (
        <View style={styles.inputContainer}>
            <TextInput placeholder="할일 입력" value={input} onChangeText={setInput}/>
            <Button title="+" onPress={() => {
                // 버튼을 눌렀을때, input란이 공백이 아닐경우, 
                // 새로운 할일 목록을 만들어 객체로 저장
                // count값을 1 증가시켜 추가된 할일 마다 새로운 id 부여
                // input란을 초기화 
                // 기존 할일목록에 새로운 할일 추가
                if (input !== "") {
                    const newInput = {id: count, text: input};
                    setCount(count+1);
                    setInput('');
                    setText([...text, newInput]);
                } else {
                    alert('입력값이 없어요.');
                }
                
                
            }}
            />
        </View>
        );
    };

    const InputValue = () => {
        return (
            <View style={styles.inputTextContainer}>
                {/* map()함수를 이용해서 text배열 안을 순차적으로 돌면서, 각 항목(item)에 접근한다. */}
                {text.map((item) => (
                    <Text key={item.id}>{item.text}</Text>
                ))}
                
            </View>
        );
    };
    
    return (
        <View>
            <Text>ㅇㄹㄴㅇㄹToDo</Text>
            <Input />
            <InputValue />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {

    },
    inputTextContainer: {
        marginTop: 20,
        borderColor: '#d8f0e6',
        borderWidth: 5,
        width: '100%',
        height: 40,
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
