import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import LaoWaiApi from "../api/api";
import UserContext from "../auth/UserContext";

/** New question form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - create a new question
 * - redirects to /forum route
 *
 * Routed as /forum/new
 */

function NewQuestionForm() {
  const { currentUser } = useContext(UserContext);

  const history = useHistory();

  const [formData, setFormData] = useState({
    title: "",
    body: ""
  });

  console.debug(
      "NewQuestionForm",
      "NewQuestionForm =", typeof NewQuestionForm,
      "formData=", formData,
  );

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  /** Handle form submit:
   *
   * If successful, redirect to /forum.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    await LaoWaiApi.createQuestion(currentUser.username, formData);
    history.push("/forum");
  }
  

  return (
    <div className="NewQuestionForm">
      {currentUser
        ? (
          <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <h3 className="mb-3">New Question Form</h3>

            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Title of Question</label>
                    <input
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        autoComplete="title"
                        required
                    />
                  </div>
                  <div className="form-group">
                    <label>Body of Question</label>
                    <input
                        name="body"
                        className="form-control"
                        value={formData.body}
                        onChange={handleChange}
                        autoComplete="current-body"
                        required
                    />
                  </div>

                  <button
                      className="btn btn-primary float-right" onSubmit={handleSubmit}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        ): <p>Sorry, please login/sign up first to access the question form.</p>
      }
      <Link to={`/forum`}><button>Go back</button></Link>
    </div>
  );
}


export default NewQuestionForm;
