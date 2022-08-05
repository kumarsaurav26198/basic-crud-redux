import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import { userUpdated } from "./usersSlice";
import CountryList from "../../components/CountryList";

export function EditUser() {
  const { pathname } = useLocation();
  const userId = parseInt(pathname.replace("/edit-user/", ""));

  const user = useSelector((state) => state.users.entities[userId]);
  const dispatch = useDispatch();
  const history = useHistory();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [phone, setPhone] = useState(user?.phone);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState(user?.password);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(user?.file);

  const handleAvatar = function loadFile(event) {
    if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFile(file);
    }
  };

  const handleClick = () => {
    if (email) {
      dispatch(
        userUpdated({
          id: userId,
          firstName,
          lastName,
          email,
          phone,
          password,
          file,
        })
      );

      setError(null);
      history.push("/");
    } else {
      setError("Fill in all fields");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Edit user</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <input
            type="file"
            onChange={handleAvatar}
            id="upload"
            accept="image/*"
            style={{ display: "none" }}
          />
          <label htmlFor="upload">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <Avatar
                id="avatar"
                src={file}
                style={{
                  width: "70px",
                  height: "70px",
                }}
              />
            </IconButton>
          </label>

          <label htmlFor="nameInput">First Name</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="test@mailbox.com"
            id="nameInput"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
            value={firstName}
          />
          <label htmlFor="nameInput">Last Name</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="LastName"
            id="nameInput"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
            value={lastName}
          />
          <label htmlFor="nameInput">Phone</label>
          <input
            className="u-full-width"
            type="tel"
            placeholder="Phone"
            id="nameInput"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
            value={phone}
          />
          <label htmlFor="emailInput">Email</label>
          <input
            className="u-full-width"
            type="email"
            placeholder="test@mailbox.com"
            id="emailInput"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
          />
          <CountryList />
          <label htmlFor="emailInput">Password</label>
          <input
            className="u-full-width"
            type="password"
            // id="emailInput"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
          <button onClick={handleClick} className="button-primary">
            Save user
          </button>
          {error && error}
        </div>
      </div>
    </div>
  );
}
