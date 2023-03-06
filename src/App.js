import React, {useState, useEffect} from "react";
import StartQuiz from "./components/StartQuiz";
import Quiz from "./components/Quiz";
import Answers from "./components/Answers";
import {nanoid} from "nanoid";
import ResultBtn from "./components/ResultBtn";


export default function App(){
const [openQuiz, setOpenQuiz] = useState(false)
const [quizData, setQuizData] = useState([])
const [score, setScore] = useState(0)
const [showResult, setShowResult] = useState(false)
const [arrOfData, setArrOfData] = useState([])

useEffect(function(){
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res => res.json())
        .then(data => setQuizData(data.results))
        .catch(error => console.log(error))
},[quizData])


function getData(){
return quizData.map(quiz => {
  return {question: quiz.question, answers: 
      [{answer : quiz.correct_answer, id: nanoid(),
        isChosen : false, isCorrect: true, answeredCorrect: undefined},
        ...quiz.incorrect_answers.map(answer => 
          ({answer, id : nanoid(), isChosen: false, isCorrect : false, answeredCorrect: undefined} ))], id: nanoid() } 
  })
}

function handleStart(){
    setOpenQuiz(true)
    setArrOfData(getData())
}

function handleClick(id,itemId){
  setArrOfData(prevState => {
    return prevState.map(quiz => ({
          ...quiz,
          answers: quiz.answers.map(item => {
            return item.id === id && showResult === false ? {...item, isChosen: !item.isChosen} 
            : quiz.id === itemId  && showResult === false ? {...item, isChosen: false, answeredCorrect:undefined} 
            : item
          })
      }))
  })

  setArrOfData(prevState => {
    return prevState.map(quiz => ({
          ...quiz,
          answers: quiz.answers.map(item => {
            return item.isCorrect === true && item.isChosen  ? 
            {...item,answeredCorrect: true} : 
            item.isChosen && item.isCorrect === false ? 
            {...item,answeredCorrect: false} : item
        })
    }))
  })
}

function handleResult(){
  setShowResult(true)
  setScore(prevScore => {
  arrOfData.map(item => {
    item.answers.map(elem => {
          if (elem.answeredCorrect){
              return prevScore ++
          }
          return elem
      })
      return item
    })
    return prevScore
  })
}

function replay(){
setArrOfData([])
  fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => 
        setQuizData(data.results),
        setArrOfData(getData())  
      )
      .catch(error => console.log(error))

setShowResult(false)
setScore(0)
}


const questsAnswers = arrOfData.map(item => {
const allAnswers = item.answers.sort(function(a, b){
  return a.id > b.id ? 1 : -1} ).map(elem => {
    return(
      <Answers 
          answers={elem.answer.replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&amp;/g,'&').replace(/&nbsp;/g, " ").replace("/&deg;/", "°")} 
          answeredCorrect={elem.answeredCorrect} 
          isCorrect={elem.isCorrect} 
          isChosen={elem.isChosen} 
          id={elem.id}
          key={elem.id}
          handleClick={handleClick}
          itemId={item.id}
          showResult={showResult}
          title={elem.answer.length > 20 ? elem.answer.replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&amp;/g,'&').replace(/&nbsp;/g, " ") : ""}
      />
    )
  })

return(
    openQuiz && 
      <>              
        <Quiz question={item.question.replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&amp;/g,'&').replace(/&nbsp;/g, " ")} id={item.id}/>
        {allAnswers}
        <hr />
      </>
  )
})

  return(
    <div className="glb-container">
      <div className="quizContainer">
          {!openQuiz && <StartQuiz handleStart = {handleStart} />}
          {questsAnswers}
          
        <div className="scoresAndBtn">
          {openQuiz && showResult && <h3>You scored {score}/5 correct answers</h3> }
          {openQuiz && <ResultBtn handleResult={handleResult} showResult={showResult} replay={replay}  />}
        </div>
      </div>
    </div>
  )
}
