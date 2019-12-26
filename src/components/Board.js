import React, { Component } from "react";

import Square from "./Square";
import Row from "./Row";

class Board extends Component {

    renderSquare(i) {
        return (
            <Square
                className={this.buildCssClass(i)}
                key={i}
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    buildCssClass(i) {
        let className = "square ";
        if (this.props.lines.includes(i))
            className += "highlight";
        else if (this.props.endgame)
            className += "borderless";
        
        return className;
    }

    renderRows() {
        let rows = [];
        let count = 0;
        for (let i = 0; i < 3; i++) {
            let squares = [];
            for (let j = 0; j < 3; j++) {
                squares.push(this.renderSquare( count ))
                count++;
            }
            rows.push(<Row key={i}>{squares}</Row>);
        }
        return rows;
    }

    render() {
        return(
            <div>
                {this.renderRows()}
            </div>
        )
    }
}

export default Board;