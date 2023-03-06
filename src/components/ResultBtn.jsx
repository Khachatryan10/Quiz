import React from "react";

export default function ResultBtn({showResult, replay, handleResult}){
    return(
        <button className="resultBtn" onClick={showResult ? replay : handleResult}>{showResult ? "Play again" :  "Check answers"}</button>
    )
}