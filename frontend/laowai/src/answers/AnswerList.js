import React, { useState } from "react";
import LaoWaiApi from "../api/api";


/** Show page with list of answers of a question.
 *
 * On mount, loads answers from API.
 *
 * This is routed to at /forum/[id]
 *
 * Routes -> { AnswerList }
 */

function AnswerList({id}) {
  console.debug("AnswerList");

  const [answers, setAnswers] = useState(null);

  async function getAnswers() {
    let answers = await LaoWaiApi.getAnswers(id);
    setAnswers(answers);
  }

  getAnswers();
  

  return (
    <div className="AnswerList col-md-8 offset-md-2">
      {answers
        ? (
            <div className="AnswerList-list">
              {answers.map(a => (
                  <div>
                    <p><small>Answered by {a.username} at {a.postedat}</small></p>
                    <h6>{a.body}</h6>
                  </div>
                  ))}
            </div>
        ) : (
          <p className="lead">No answers posted yet.</p>
        )
      }
    </div>
  );
}

export default AnswerList;
