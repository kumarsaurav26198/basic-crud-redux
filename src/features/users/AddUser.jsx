import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import { userAdded } from "./usersSlice";
import CountryList from "../../components/CountryList";

export function AddUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const handleAvatar = function loadFile(event) {
    if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFile(file);
    }
  };

  const usersAmount = useSelector((state) => state.users.entities.length);
  const handleClick = () => {
    if (firstName && lastName && email && phone && password && file) {
      dispatch(
        userAdded({
          id: usersAmount + 1,
          firstName,
          lastName,
          email,
          phone,
          avatar,
          password,
          file,
        })
      );
      setError(null);
      history.push("/");
    } else {
      setError("Fill in all fields");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setAvatar("");
    setFile("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add user</h1>
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
            placeholder="FirstName"
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
          <CountryList />
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
          <label htmlFor="emailInput">Password</label>
          <input
            className="u-full-width"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />

          {error && error}
          <button onClick={handleClick} className="button-primary">
            Add user
          </button>
        </div>
      </div>
    </div>
  );
}
