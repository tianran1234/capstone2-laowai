import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LaoWaiApi from "../api/api";
import AnswerList from "../answers/AnswerList";
import "./ForumDetail.css";

/** Question Detail page.
 *
 * Renders information about an question.
 *
 * Routed at /forum/[id]
 *
 * Routes -> ForumDetail 
 */

function ForumDetail() {
  const { id } = useParams();
  console.debug("ForumDetail", "id=", id);

  const [question, setQuestion] = useState(null);

  useEffect(function getQuestionOnMount() {
    async function getQuestion() {
      const question = await LaoWaiApi.getQuestion(id);
      setQuestion(question);
    }
    getQuestion();
  }, [id]);

  if (!question) return (
    <div>
      <h4>Sorry, the question doesn't exist.</h4>;
      <Link to={`/forum`}><button>Go back</button></Link>
    </div>
  )


  return (
    <div>
      <div className="ForumDetail col-md-8 offset-md-2">
        <h4>{question.title}</h4>
        <p>Posted by {question.username} at: {question.postedat}</p>
        <p>{question.body}</p>
        <div className="answers">
          <AnswerList id={id}/>
        </div>
      </div>
      <Link to={`/forum/${id}/answers/new`}><button id="answerbtn">Post an answer</button></Link>
      <Link to={`/forum`}><button id="backbtn">Go back</button></Link>
    </div>
  );
}

export default ForumDetail;
