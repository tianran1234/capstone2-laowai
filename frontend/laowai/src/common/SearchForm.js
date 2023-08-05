import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SearchForm.css";

/** Search widget.
 *
 * Appears on homepage.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { HomePage } -> SearchForm
 */

function SearchForm() {
  console.debug("SearchForm");

  const [username, setUsername] = useState("");

  const history = useHistory();

  // async function searchUser() {
  //   let users = await LaoWaiApi.getUser(username.trim() || undefined);
  //   return users[0];
  // }
  
  async function handleSubmit(evt) {
    evt.preventDefault();
    // let user = await searchUser();
     // take care of accidentally trying to search for just spaces
    setUsername(username.trim());
    await history.push(`/users/${username.trim()}`)
  }

  /** Update form fields */
  function handleChange(evt) {
    setUsername(evt.target.value);
  }

  return (
      <div className="SearchForm mb-4">
        <form className="form-inline" onSubmit={handleSubmit}>
          <input
              className="form-control form-control-lg flex-grow-1"
              name="username"
              placeholder="Search by username."
              value={username}
              onChange={handleChange}
          />
          <button type="submit" className="btn btn-lg btn-primary">
            Submit
          </button>
        </form>
      </div>
  );
}

export default SearchForm;
