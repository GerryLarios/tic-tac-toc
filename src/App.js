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
            step: 0,
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
        return this.state.history[this.state.step];
    }
    
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.step + 1);
        const current = this.getCurrentSquare();
        const squares = current.squares.slice();
        
        if (this.state.winner || squares[i])
            return;
        
        squares[i] = this.nextPlayer();
        this.setState({
            history: history.concat([{ squares }]),
            step: history.length,
            xIsNext: !this.state.xIsNext,
            winner: calculateWinner(squares)
        });

        console.log(history.length);
    }

    jumpTo(step) {
        this.setState({
            step,
            xIsNext: (step % 2) === 0,
            winner: (step === this.state.step ? this.state.winner : null)
        });
    }

    getMoves() {
        return this.state.history.map((step, move) => {
            const desc = move ? `Go to move #${move}` : 'Restart game';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            );
        });
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={this.getCurrentSquare().squares} 
                        onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{this.updateStatus()}</div>
                    <ol>{this.getMoves()}</ol>
                </div>
            </div>
        );
    }
}

export default App;
