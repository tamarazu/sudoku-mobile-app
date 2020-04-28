import axios from 'axios'
// import { useNavigation } from '@react-navigation/native'

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

export const setPlayerName = (value) => {
    return ({
        type: "SET_PLAYER_NAME",
        value: value
    })
}

export const setLoading = (value) => {
    return ({
        type: "SET_LOADING",
        value: value
    })
}

export const setFinish = (value) => {
    return({
        type: 'SET_FINISH',
        value: value
    })
}

export const setSudokuStart = (value) => {
    return ({
        type: "SET_SUDOKU_START",
        value: value
    })
}

export const setPopUp = (value) => {
    return ({
        type: "SET_PUP_UP",
        value: value
    })
}

export const setTime = (value) => {
    return ({
        type: "SET_TIME",
        value: value
    })
}

export const setModal = (value) => {
    return ({
        type: "SET_MODAL",
        value: value
    })
}

export const changeSudokuBoard = (value) => {
    return ({
        type: "CHANGE_SUDOKU_BOARD",
        payload: {
            row: value.row,
            col: value.col,
            value: value.value
        }
    })
}

export const addLeaderBoard = (value) => {
    return ({
        type: 'ADD_LEADER_BOARD',
        value: value
    })
}

export const setError = (value) => {
    return ({
        type: 'ADD_LEADER_BOARD',
        value: value
    })
}

export const fetchNewBoard = (value) => {
    return function(dispatch) {
        dispatch(setLoading(true))
        axios
            
            .get(`https://sugoku.herokuapp.com/board?difficulty=${value}`)
            .then(({ data }) => {
                dispatch(setSudokuStart(data.board))
            })
            .catch(({ response }) => {
                dispatch(setError('cannot load board'))
                console.log('ini error')
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    }
}

export const validateAnswer = (value) => {
    return function(dispatch) {
        // console.log(encodeParams({board: value.board}))
        dispatch(setLoading(true))
        axios
            .post('https://sugoku.herokuapp.com/validate', encodeParams({board: value.board}))
            .then(({ data }) => {
                console.log('masuk data')
                console.log(data)
                if(data.status === 'solved') {
                    dispatch(setFinish(true))
                    let playerFinish = {
                        name: value.player,
                        time: value.time
                    }
                    dispatch(addLeaderBoard(playerFinish))
                    console.log(data.status)
                } else {
                    dispatch(setModal(true))
                    dispatch(setFinish(false))
                }
            })
            .catch(({ response }) => {
                dispatch(setError('Internal Server Error'))
                // console.log(response)
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    }
}


export const freeAccess = (value) => {
    return function(dispatch) {
        dispatch(setFinish(true))
        let playerFinish = {
            name: value.player,
            time: value.time
        }
        dispatch(addLeaderBoard(playerFinish))
        console.log('cheating')
    }
}


export const sudokuSolver = (value) => {
    return function(dispatch) {
        dispatch(setLoading(true))
        axios
            .post('https://sugoku.herokuapp.com/solve', encodeParams({board: value.board}))
            .then(({ data }) => {
                console.log(data)
            })
            .catch(({ response }) => {
                console.log(response)
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    }
}