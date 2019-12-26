import React from "react";

export default function MoveButton({ text, onClick, classname }) {
    return (
        <li><button className={classname} onClick={onClick}>{text}</button></li>
    );
}