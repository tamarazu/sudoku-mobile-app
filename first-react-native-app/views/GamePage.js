import React, { useState } from 'react'
import { StyleSheet ,View, Text, Button, TouchableHighlight, Modal, ActivityIndicator, TouchableOpacity } from 'react-native'
import { State, LongPressGestureHandler } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { validateAnswer, sudokuSolver , setModal, freeAccess} from '../store/actions/sudokuAction'
import Board from '../components/Board'

export default function GamePage(props) {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const board = useSelector(state => state.sudokuReducer.sudokuStart)
    const finish = useSelector(state => state.sudokuReducer.finish)
    const loading = useSelector(state => state.sudokuReducer.loading)
    const player = useSelector(state => state.sudokuReducer.player)
    const time = useSelector(state => state.sudokuReducer.time)
    const modalVisible = useSelector(state => state.sudokuReducer.modalVisible)
    const error = useSelector(state => state.sudokuReducer.error)
    const level = props.route.params.level

    const setModalVisible = (event) => {
        dispatch(setModal(event))
    }

    const submitAnswer = (event) => {
        event.preventDefault()
        // dispatch(sudokuSolver({board, player, time}))
        dispatch(validateAnswer({board, player, time}))
    }

    const handleStateChange = ({nativeEvent}) => {
        if(nativeEvent.state === State.BEGAN) {
            dispatch(validateAnswer({board, player, time}))
            console.log('tombol began')
        } else if (nativeEvent.state === State.ACTIVE) {
            dispatch(freeAccess({player, time}))
            console.log('masuk active')
        } else if (nativeEvent.state === State.END) {
            // dispatch(freeAccess())
            console.log('masuk END')
        }
    }

    if(finish === true) navigation.navigate("Finish")

    if(error) return <Text>{error}</Text>
    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Sudoku App</Text> */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Your answer is wrong!</Text>

                    <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                        setModalVisible(false);
                    }}
                    >
                    <Text style={styles.textStyle}>Back</Text>
                    </TouchableHighlight>
                </View>
                </View>
            </Modal>
            <Board level={level}/>
            {/* <TouchableOpacity 
                style={styles.levelButton}
                onPress={(event) => submitAnswer(event)}
            >
                <Text style={styles.option}>Check</Text>
            </TouchableOpacity> */}
            <LongPressGestureHandler 
                style={styles.levelButton}
                onHandlerStateChange={(event) => handleStateChange(event)}
            >
                <Text style={styles.option}>Check</Text>
            </LongPressGestureHandler>
            
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,  
        backgroundColor: '#ECEBE4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    levelButton: {
        backgroundColor: '#ADA9AA',
        margin: 30,
        padding: 15,
        paddingLeft: 40,
        paddingRight:40,
        borderRadius: 20
    },
    option: {
        backgroundColor: '#ADA9AA',
        margin: 30,
        padding: 15,
        paddingLeft: 40,
        paddingRight:40,
        borderRadius: 20,
        fontSize: 20,
        fontFamily: 'BalooThambi2Bold',
        opacity: 0.6
    },
});
    