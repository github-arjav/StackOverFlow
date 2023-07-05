import React, { useState } from 'react'
import {useParams, Link, useNavigate, useLocation} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import copy from 'copy-to-clipboard'

import upvote from '../../assests/sort-up.svg'
import downvote from '../../assests/sort-down.svg'
import './Question.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'
import { postAnswer, deleteQuestion, voteQuestion } from '../../actions/question'

const QuestionsDetails = () => {

    const {id} = useParams()
    const questionsList = useSelector(state => state.questionsReducer)
    
    const [Answer, setAnswer] = useState('') 
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const url = 'https://myclone-stack-overflow.netlify.app'
    const User = useSelector((state) => (state.currentUserReducer))
    const handlePostAns = (e, answerLength) =>{
      e.preventDefault()
      if(User === null){
        alert('Login or SignUp to answer')
        Navigate('/Auth')
      }else{
        if(Answer === ''){
          alert('Enter an answer before submitting')
        }else{
          dispatch(postAnswer({id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name,userId:User.result._id}))
        }
      }
    }

    const handleShare = () => {
      copy(url + location.pathname)
      alert('Copied url : '+url+location.pathname)
    }

    const handleDelete = () => {
      dispatch(deleteQuestion(id, Navigate))
    }

    const handleUpVote = () => {
      dispatch(voteQuestion(id, 'upvote', User.result._id))
    }

    const handleDownVote = () => {
      dispatch(voteQuestion(id, 'downvote', User.result._id))
    }

  return (
    <div className='question-details-page'>
        {
            questionsList.data === null ?
            <h1>Loading...</h1> :
            <>
                {
                    questionsList.data.filter(question => question._id === id).map(question => (
                        <div key={question._id}>
                             <section className='question-details-container'>
                                <h1>{question.questionTitle}</h1>
                                <div className="question-details-container-2">
                                    <div className="question-votes">
                                        <img src={upvote} alt="upVote" width='18' className='votes-icon' onClick={handleUpVote}/>
                                        <p>{question.upVote.length - question.downVote.length}</p>
                                        <img src={downvote} alt="downVote" width='18' className='votes-icon'onClick={handleDownVote}/>
                                    </div>
                                    <div style={{width: '100%'}}>
                                        <p className='question-body'>{question.questionBody}</p>
                                        <div className="question-details-tags">
                                          {
                                            question.questionTags.map((tag) => (
                                              <p key={tag}>{tag}</p>
                                            ))
                                          }
                                        </div>
                                        <div className="question-actions-user">
                                          <div>
                                            <button type='button' onClick={handleShare}>Share</button>
                                            {
                                              User?.result._id === question?.userId && (
                                                <button type='button' onClick={handleDelete}>Delete</button>
                                              )
                                            }
                                          </div>
                                          <div>
                                            <p>asked {moment(question.askedOn).fromNow()}</p>
                                            <Link to={`/Users/${question.userId}`} className='user-link' style={{color: '#0086d8'}}>
                                              <Avatar backgroundColor="orange" px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                              <div>
                                                {question.userPosted}
                                              </div>
                                            </Link>
                                          </div>
                                        </div>
                                    </div>
                                </div>
                             </section>
                             {
                              question.noOfAnswers !== 0 && (
                                <section>
                                  <h3>{question.noOfAnswers} Answers</h3>
                                  <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                                </section>
                              )
                             }
                             <section className='post-ans-container'>
                                <h3>Your Answer</h3>
                                <form onSubmit={ (e) => {handlePostAns(e, question.answer.length)}}>
                                  <textarea name="" id="" cols="30" rows="10" onChange={ e => setAnswer(e.target.value)}></textarea><br />
                                  <input type="submit" className='post-ans-btn' value='Post your answer'/>
                                </form>
                                <p>
                                  Browse other question tagged {question.questionTags.map((tag) => (
                                    <Link to='/Tags' key={tag} className='ans-tags'> {tag} </Link>
                                  ))} or 
                                  <Link to='/AskQuestion' style={{textDecoration:'none', color:'#009dff'}}> ask your own question.</Link>
                                </p>
                             </section>
                        </div>
                    ))
                }
            </>
        }
    </div>
  )
}

export default QuestionsDetails