import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LaoWaiApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import AnswerList from "../answers/AnswerList";

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

  if (!question) return <LoadingSpinner />;


  return (
      <div className="ForumDetail col-md-8 offset-md-2">
        <h4>{question.title}</h4>
        <p>by {question.username} posted at: {question.postedat}</p>
        <p>{question.body}</p>
        <Link to={`/forum/${id}/answers/new`}><button>Post an answer</button></Link>
        <AnswerList id={id}/>
        <Link to={`/forum`}><button>Go back</button></Link>
      </div>
  );
}

export default ForumDetail;
