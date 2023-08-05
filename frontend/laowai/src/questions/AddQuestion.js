import React from "react";
import { Link } from "react-router-dom";
import "./AddQuestion.css";


/** Direct user to question form
 *
 * Forum -> AddQuestion
 */

function AddQuestion() {
  console.debug("AddQuestion");

  return (
    <div>
          <Link to={"/forum/questions/new"}>
            <button>
              Post a question
            </button>
          </Link>
    </div>
  );
}


export default AddQuestion;
