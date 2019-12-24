import React, { Component } from 'react';
import './App.css';

import Board from "./components/Board";
import { calculateWinner } from './helpers/helpers';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{ squares: Array(9).fill(null) }],
            xIsNext: true,
            winner: null
        }
    }

    nextPlayer() {
        return this.state.xIsNext ? 'X' : 'O';
    }

    updateStatus() {
        const winner = this.state.winner;
        return winner ? `Winner: ${winner}` : `Next player: ${this.nextPlayer()}`;
    }

    getCurrentSquare() {
        const history = this.state.history;
        return history[history.length - 1];
    }
    
    handleClick(i) {
        const history = this.state.history;
        const current = this.getCurrentSquare();
        const squares = current.squares.slice();
        
        if (this.state.winner || squares[i])
            return;
        
        squares[i] = this.nextPlayer();
        this.setState({
            history: history.concat([{ squares }]),
            xIsNext: !this.state.xIsNext,
            winner: calculateWinner(squares)
        });
    }

    render() {
        const current = this.getCurrentSquare();
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{this.updateStatus()}</div>
                    <ol></ol>
                </div>
            </div>
        );
    }
}

export default App;
