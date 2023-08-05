import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import LaoWaiApi from "../api/api";
import UserContext from "../auth/UserContext";

/** New post form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - create a new post
 * - redirects to /[username]/posts route
 *
 */

function NewPostForm() {
  const { currentUser } = useContext(UserContext);

  const history = useHistory();

  const [formData, setFormData] = useState({
    body: "",
    pic: ""
  });

  console.debug(
      "NewPostForm",
      "NewPostForm =", typeof NewPostForm,
      "formData=", formData,
  );

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  /** Handle form submit:
   *
   * If successful, redirect to /[username]/posts.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    await LaoWaiApi.createPost(currentUser.username, formData);
    history.push(`/${currentUser.username}/posts`);
  }

  return (
    <div className="NewPostForm">
      {currentUser
        ? (
          <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>What's on your mind?</label>
                    <input
                        name="body"
                        className="form-control"
                        value={formData.body}
                        onChange={handleChange}
                        required
                    />
                  </div>
                  <div className="form-group">
                    <label>Upload a picture here (optional): </label>
                    <input
                        name="pic"
                        className="form-control"
                        value={formData.pic}
                        onChange={handleChange}
                    />
                  </div>

                  <button
                      className="btn btn-primary float-right" onSubmit={handleSubmit}
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        ): <p>Sorry, please login/sign up first to access the question form.</p>
      }
      <Link to={`/${currentUser.username}/posts`}><button>Go back</button></Link>
    </div>
  );
}


export default NewPostForm;
