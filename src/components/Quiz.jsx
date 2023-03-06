import React from "react";

export default function Quiz({id, question}){
    return(
            <h4 className="quiz__questions" key={id}>{question}</h4>
    )
}