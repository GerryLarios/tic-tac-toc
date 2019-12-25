import React from "react";

export default function MoveButton({ text, onClick }) {
    return (
        <li><button onClick={onClick}>{text}</button></li>
    );
}