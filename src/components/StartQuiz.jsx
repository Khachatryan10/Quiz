import React from "react";

export default function StartQuiz({handleStart}){
    return(
        <div className="startQuizDiv">
            <h1 className="startQuizDiv__h1">Quizzical</h1>
            <p className="startQuizDiv__prg">Answer interesting questions!</p>
            <br />
            <button className="startQuizDiv__btn" onClick={handleStart}>Start Quiz</button>
        </div>
    )
}