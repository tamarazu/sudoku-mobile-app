const initialStatus = {
    loading: false,
    error: null,
    sudokuStart: [],
    finish: false,
    player: '',
    leaderBoard: [
        {name: 'Tamara',
         time: 180   
        }
    ],
    visible: false,
    time: 0,
    modalVisible : false
}

const sudokuReducer = (state = initialStatus, action) => {
    switch(action.type) {
        case "SET_SUDOKU_START" :
            return ({
                ...state,
                sudokuStart: action.value
            })
        case "SET_LOADING" :
            return ({
                ...state,
                loading: action.value
            })
        case "CHANGE_SUDOKU_BOARD":
            const newBoard = []
            let tmpRow = []
            state.sudokuStart.map((row, i) => {
                tmpRow = []
                row.map((col, j) => {
                    if( i === action.payload.row && j === action.payload.col ) {
                        tmpRow.push(action.payload.value)
                    } else {
                        tmpRow.push(col)
                    }
                })
                newBoard.push(tmpRow)
            }) 
            return ({
                ...state,
                sudokuStart : newBoard
            })
        case 'SET_FINISH' : 
            return({
                ...state,
                finish: action.value
            })
        case 'SET_PLAYER_NAME':
            return ({
                ...state,
                player: action.value
            })
        case 'SET_POP_UP' :
            return ({
                ...state,
                visible: action.value
            })
        case 'SET_TIME':
            return ({
                ...state,
                time: action.value
            })
        case 'ADD_LEADER_BOARD' :
            return ({
                ...state,
                leaderBoard: [
                    ...state.leaderBoard,
                    action.value
                ]
            })
        case 'SET_MODAL': 
            return ({
                ...state,
                modalVisible: action.value
            })
        case 'SET_ERROR':
            return ({
                ...state,
                error: action.value
            })
        default:
            return state
    }

}

export default sudokuReducer