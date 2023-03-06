import React from "react";

export default function Answers(props){
    const styles = {
        backgroundColor: "",
        border : "2px solid rgb(79, 10, 175)"
    }

    if (props.isChosen){
        styles.backgroundColor = "rgba(195, 147, 220, 0.6)"
        styles.border = "2px solid transparent"
    }

    if(props.showResult && props.isCorrect === true){
        styles.backgroundColor = "rgba(4, 206, 70, 0.7)"
        styles.border = "2px solid transparent"
    }

    if(props.showResult && props.answeredCorrect === false){
        styles.backgroundColor = "rgba(231, 92, 92, 0.3)"
        styles.border = "2px solid transparent"
    }

    if (props.showResult && props.answeredCorrect === undefined && props.isCorrect === false){
        styles.border = "2px solid grey"
    }

    return(
        <button className="quizAnswers"  title={props.title} 
        disabled={props.answeredCorrect === undefined 
        && props.showResult && props.isCorrect === false ? 
        true : false} style={styles} onClick={() => 
        props.handleClick(props.id, props.itemId)}
        >{props.answers}</button>
    )
}