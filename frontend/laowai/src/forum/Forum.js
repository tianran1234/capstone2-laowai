import React, { useState, useEffect } from "react";
import LaoWaiApi from "../api/api";
import ForumCard from "./ForumCard";
import AddQuestion from "../questions/AddQuestion";

/** Show page with list of all questions.
 *
 * On mount, loads questions from API.
 *
 * This is routed to /forum
 *
 * Routes -> { ForumCard }
 */

function Forum() {
  console.debug("Forum");

  const [questions, setQuestions] = useState(null);

  useEffect(function getQuestionsOnMount() {
    console.debug("Forum useEffect getQuestionsOnMount");
    showQuestions();
  }, []);

  async function showQuestions() {
    let questions = await LaoWaiApi.getQuestions();
    setQuestions(questions);
  }

  if (!questions) return <h4>No question has been posted.</h4>

  return (
    <div className="Forum col-md-8 offset-md-2">
      <AddQuestion />
      {questions.length
        ? (
            <div className="Forum-list">
                {questions.map(q => (
                    <ForumCard
                        id={q.id}
                        title={q.title}
                        username={q.username}
                        postedat={q.postedat}
                    />
                ))}
            </div>
        ) : (
            <p className="lead">No questions are posted yet.</p>
        )
        }
    </div>
  );
}

export default Forum;
