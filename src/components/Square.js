import React from "react";

export default function Square({ value, onClick, className }) {
    return (
        <button
            className={className}
            onClick={onClick}>
                {value}
        </button>
    );
}