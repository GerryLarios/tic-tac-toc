import React, { Component } from "react";

import Square from "./Square";
import Row from "./Row";

import { calculateWinner } from "../helpers/helpers";

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: null
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (this.state.winner || squares[i]) return;
        squares[i] = this.nextPlayer();
        this.setState({
            squares,
            xIsNext: !this.state.xIsNext,
            winner: calculateWinner(squares)
        });
    }

    renderSquare(i) {
        return (
            <Square 
                value={this.state.squares[i]} 
                onClick={() => this.handleClick(i)}
            />
        );
    }

    nextPlayer() {
        return this.state.xIsNext ? 'X' : 'O';
    }

    updateStatus() {
        return this.state.winner ? 
            `Winner: ${this.state.winner}` : 
            `Next player: ${this.nextPlayer()}`;
    }

    render() {
        const status = this.updateStatus();
        return(
            <div>
                <div className="status">{status}</div>
                <Row>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </Row>
                <Row>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </Row>
                <Row>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </Row>
            </div>
        )
    }
}

export default Board;