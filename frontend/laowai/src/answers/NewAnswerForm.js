import React, { useContext, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import LaoWaiApi from "../api/api";
import UserContext from "../auth/UserContext";

function NewAnswerForm() {

  const { currentUser } = useContext(UserContext);

  const username = currentUser.username;

  const {id} = useParams();

  const history = useHistory();

  const [formData, setFormData] = useState({
    body: ""
  });


  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  /** Handle form submit:
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    await LaoWaiApi.createAnswer(username, id, formData);
    history.push(`/forum/${id}`);
  }



  return (
    <div className="NewAnswerForm">
      {currentUser
        ? (
          <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <h4 className="mb-3">New Answer Form</h4>
            <div className="card">
              <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Enter your answer below: </label>
                    <input
                        type="text"
                        name="body"
                        className="form-control"
                        value={formData.body}
                        onChange={handleChange}
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
      <Link to={`/forum/${id}`}><button>Go back</button></Link>
    </div>
  );
}
  

export default NewAnswerForm;