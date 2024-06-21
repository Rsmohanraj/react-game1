
import React, {useReducer,useEffect} from 'react'
import {Button, Dialog, DialogActions, DialogTitle, Grid, Paper, Typography} from '@mui/material'
import { red } from '@mui/material/colors';


const initialState = {
    board: Array(9).fill(null),
    xIsNext: true,
    winner: null,
    openDialog: false,
}

function reducer(state, action) {
    switch (action.type) {
        case 'make_move':
           if(state.board[action.index] || state.winner) {
            return state;

           }
           const boardcopy =[...state.board];
           boardcopy[action.index] = state.xIsNext? 'X' : 'O';
           const winner = calculatewinner(boardcopy);
           return {
            ...state,
               board: boardcopy,
               xIsNext:!state.xIsNext,
               winner: winner,
               openDialog: !!winner
           }
               case 'reset':

                return{...initialState,board: Array(9).fill(null)};
                case 'close_dialog':
                    return{...state,openDialog: false}
                    default:
                        throw new Error('unhandled action type');    

            }
    }
function calculatewinner(board) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;

   
}

function TicTacToe() 
{
    const [state, dispatch] = useReducer(reducer, initialState);
   return (

    <div className='game'>
        <Typography variant='h5' component="h2">
            LET START TIC-TAK GAME
        </Typography>

         <Typography variant='h5' component="h2">
            player:{state.xIsNext? 'X':'O'}
           <br />   
            {state.winner? `${state.winner}wins!`:''}
           
           
          
           <br />
         
          
        </Typography>
       
        <Grid  container spacing={2} justifyContent="center"  style={{maxWidth:400}}>
            {
                state.board.map((cell,index) =>(
           
                <Grid item xs={4}  key={index}>

                    <Paper className='cell' elevation={3} style={{backgroundColor: 'yellowgreen'}}
                     onClick={() => dispatch({type:'make_move',index})}>
                        {cell}
                    </Paper>
                </Grid>
                )) 

            }
        </Grid>
        <Button variant="contained" onClick={() => dispatch({type:'reset'})}
        style={{marginTop:20}}>reset game</Button>
        <Dialog open={state.openDialog} onClose={() => dispatch({type:'close_dialog'})}>
            <DialogTitle>{state.winner ?`${state.winner}wins!`:'Draw'}</DialogTitle>
            <DialogActions>
                <Button onClick={() => dispatch({type:'reset'})} color='primary'></Button>
            </DialogActions>
        </Dialog>


    </div>
  )
}


export default TicTacToe