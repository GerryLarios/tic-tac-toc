import React from "react";

export default function SortButton({ ascending, onClick }) {
    return (
        <button onClick={onClick}>
            {ascending ? <span>&darr;</span> : <span>&uarr;</span>}
        </button>
    )
}