import React, { Component } from "react";

import Square from "./Square";
import Row from "./Row";

class Board extends Component {

    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return(
            <div>
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