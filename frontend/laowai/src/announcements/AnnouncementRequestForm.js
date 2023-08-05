import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import LaoWaiApi from "../api/api";
import UserContext from "../auth/UserContext";

/** Announcement request form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - create an announcement request
 * - redirects to /announcements route
 *
 * Routed as /announcement_requests/new
 */

function AnnouncementRequestForm() {
  const { currentUser } = useContext(UserContext);

  const history = useHistory();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    pic:"",
  });

  console.debug(
      "AnnouncementRequestForm",
      "AnnouncementRequestForm =", typeof AnnouncementRequestForm,
      "formData=", formData,
  );

  /** Handle form submit:
     *
     * If successful, redirect to /announcements.
     */

  async function handleSubmit(evt) {
    evt.preventDefault();
    await LaoWaiApi.createAnnouncementRequest(currentUser.username, formData);
    history.push("/announcements");
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  

  return (
    <div className="AnnouncementRequestForm">
      {currentUser
        ? (
          <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <h3 className="mb-3">Announcement Request Form</h3>

            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Title of Announcement</label>
                    <input
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                  </div>
                  <div className="form-group">
                    <label>Body of Announcement</label>
                    <input
                        name="body"
                        className="form-control"
                        value={formData.body}
                        onChange={handleChange}
                        required
                    />
                  </div>

                  <div className="form-group">
                    <label>Picture of Announcement (optional)</label>
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
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        ): <p>Sorry, please login/sign up first to make this request.</p>
      }
      <Link to={`/announcements`}><button>Go back</button></Link>
    </div>
  );
}


export default AnnouncementRequestForm;
