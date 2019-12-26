import React, { Component } from 'react';
import './App.css';

import Board from "./components/Board";
import { calculateWinner, squareCoordinates } from './helpers/helpers';
import MoveButton from './components/MoveButton';
import SortButton from './components/SortButton';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{ squares: Array(9).fill(null) }],
            xIsNext: true,
            step: 0,
            winner: null,
            ascending: true
        }
    }

    nextPlayer() {
        return this.state.xIsNext ? 'X' : 'O';
    }

    updateStatus() {
        const winner = this.state.winner;
        return winner ? `Winner: ${winner}` : `Next player: ${this.nextPlayer()}`;
    }

    getLastSquareSet() {
        return this.state.history[this.state.step];
    }
    
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.step + 1);
        const current = this.getLastSquareSet();
        const squares = current.squares.slice();

        if (this.state.winner || squares[i]) return;
        
        squares[i] = this.nextPlayer();
        this.setState({
            history: history.concat([{ squares }]),
            step: history.length,
            xIsNext: !this.state.xIsNext,
            winner: calculateWinner(squares)
        });
    }

    jumpTo(step) {
        this.setState({
            step,
            xIsNext: (step % 2) === 0,
            winner: (step === this.state.step ? this.state.winner : null)
        });
    }

    sortToggle() {
        this.setState({ ascending: !this.state.ascending });
    }

    renderMoveButtons() {
        let prev = this.state.history[0];
        const buttons = this.state.history.map((current, move) => {
            const text = move ? `Go to move #${move} on ${squareCoordinates(prev.squares, current.squares)}` : 'Restart game';
            const className = this.state.step === move ? "selected" : "";
            prev = current;
            return (
                <MoveButton 
                    key={move}
                    classname={className}
                    text={text}
                    onClick={() => this.jumpTo(move)} />
            );
        });

        return this.state.ascending ? buttons : buttons.slice(0).reverse();
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={this.getLastSquareSet().squares} 
                        onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>
                        <SortButton 
                            ascending={this.state.ascending} 
                            onClick={() => this.sortToggle()} />
                        {this.updateStatus()}
                    </div>
                    <ol>{this.renderMoveButtons()}</ol>
                </div>
            </div>
        );
    }
}

export default App;
