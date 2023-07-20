import React, { useState } from 'react'
import styles from './question.module.css'
import data from "../../mock data/questions.json"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { Col, Container, Row } from 'react-bootstrap'
import ProgressBar from '../progressBar'
import OutlinedBtn from '../../common/button'

export default function Question() {
    const [answer, setAnswer] = useState("")
    const [disableOptions, setDisableOptions] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState({ number: 1, question: data[0] })
    const [progress, setProgress] = useState(0)
    const [score, setScore] = useState({ correctAnswers: 0, percent: 0 })

    const total_questions = data.length
    const difficulty_level = currentQuestion.question.difficulty === "easy" ? 1 : currentQuestion.question.difficulty === "medium" ? 2 : currentQuestion.question.difficulty === "hard" ? 3 : 0
    const options = [...currentQuestion.question.incorrect_answers, currentQuestion.question.correct_answer].map(option => decodeURIComponent(option))

    const getAnswer = (selectedAnswer) => {
        if (decodeURIComponent(currentQuestion.question.correct_answer) === selectedAnswer) {
            setAnswer({ selectedAnswer: selectedAnswer, isTrue: "Correct!" })
            const correctedAnswers = score.correctAnswers + 1
            const scorePercent = correctedAnswers * 100 / total_questions
            setScore({ percent: scorePercent, correctAnswers: correctedAnswers })
        }
        else {
            setAnswer({ selectedAnswer: selectedAnswer, isTrue: "Sorry!" })
            setScore({ ...score })
        }
        setDisableOptions(true)
    }

    const getNext = () => {
        if (currentQuestion.number < total_questions) {
            setDisableOptions(false)
            const newQuestionNumber = currentQuestion.number + 1
            const newQuestion = data[currentQuestion.number]
            setCurrentQuestion({ number: newQuestionNumber, question: newQuestion })
            setAnswer("")
            const newProgress = currentQuestion.number * 100 / total_questions
            setProgress(newProgress)
        }
        else {
            setCurrentQuestion(currentQuestion);
            const newProgress = currentQuestion.number * 100 / total_questions
            setProgress(newProgress)
        }
    }

    // console.log(currentQuestion)
    // console.log(score)

    return (
        <>
            <ProgressBar style={{ backgroundImage: `linear-gradient(90deg, rgb(168 168 168) ${progress}%, #fff 0%)`, marginBlock: "2px 16px", width: "98%", marginInline: "auto", border: "none", height: 16 }} />
            <Container className={styles.main}>

                <h4 className={styles.question_number}>Question {currentQuestion.number} of {total_questions}</h4>
                <p className={styles.category}>{decodeURIComponent(currentQuestion.question.category)}</p>
                <p>
                    {Array.from({ length: difficulty_level }).map(_ => (
                        <AiFillStar />
                    ))}
                    {Array.from({ length: 3 - difficulty_level }).map(_ => (
                        <AiOutlineStar />
                    ))}
                </p>
                <h5 className={styles.question}>{decodeURIComponent(currentQuestion.question.question)}</h5>

                <Row className={styles.row} >
                    {
                        options.map(option => (
                            <Col xs={6} md={3} className={styles.option}>
                                <OutlinedBtn
                                    onClick={() => getAnswer(option)} disabled={disableOptions}
                                    title={option}
                                    className={answer.selectedAnswer === option && styles.optionBtn}
                                    style={{ width: "100%" }}
                                />
                            </Col>
                        ))
                    }
                </Row>

                {
                    answer &&
                    <>
                        <h2 className={styles.answer}>{answer.isTrue}</h2>
                        <div style={{ textAlign: "center", marginBlock: "8px 32px" }}>
                            <OutlinedBtn
                                onClick={() => getNext()}
                                title={"Next Question"}
                            />
                        </div>
                    </>
                }
                <div style={{ flexGrow: 1 }} />
                <div className={styles.score}>
                    <p>Score: {score.percent}%</p>
                    <p>Max Score: 100%</p>
                </div>
                <ProgressBar
                    style={{ backgroundImage: `linear-gradient(90deg, #555 ${score.percent}%, #fff 0%)`, marginBottom: 16, borderRadius: 6 }}
                />
            </Container>
        </>
    )
}
