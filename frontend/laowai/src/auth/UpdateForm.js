import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import LaoWaiApi from "../api/api";
import Alert from "../common/Alert";

/** Update form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls update function prop
 * - redirects to /:username route
 *
 * Routes -> UpdateForm -> Alert
 * Routed as /update
 */

function UpdateForm() {

  const { currentUser } = useContext(UserContext);

  const username = currentUser.username;

  const history = useHistory();
  const [formData, setFormData] = useState({
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    college: "",
    proficiencyOfChinese: "",
    hometown: "",
    currentCity: "",
    imageUrl: "",
    headerImageUrl: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "SignupForm",
      "signup=", typeof signup,
      "formData=", formData,
      "formErrors=", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /:username.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await LaoWaiApi.update(username, formData);
    if (result.success) {
      history.push(`/${currentUser.username}`);
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
      <div className="SignupForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h2 className="mb-3">Sign Up</h2>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>First name</label>
                  <input
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>College</label>
                  <input
                      name="college"
                      className="form-control"
                      value={formData.college}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>proficiency of Chinese</label>
                  <input
                      name="proficiencyOfChinese"
                      className="form-control"
                      value={formData.proficiencyOfChinese}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Hometown (optional)</label>
                  <input
                      name="hometown"
                      className="form-control"
                      value={formData.hometown}
                      onChange={handleChange}
                  />
                </div>
                  <div className="form-group">
                  <label>Current city (optional)</label>
                  <input
                      name="currentCity"
                      className="form-control"
                      value={formData.currentCity}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Image url (optional)</label>
                  <input
                      name="imageUrl"
                      className="form-control"
                      value={formData.imageUrl}
                      onChange={handleChange}
                  />
                  </div>
                  <div className="form-group">
                  <label>Header image url (optional)</label>
                  <input
                      name="headerImageUrl"
                      className="form-control"
                      value={formData.headerImageUrl}
                      onChange={handleChange}
                  />
                  </div>

                {formErrors
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                <button
                    type="submit"
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default UpdateForm;