import { fetchUsers, userDeleted, userView } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";

import { Link } from "react-router-dom";

export function UserList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);

  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
  };
  const handleView = (id) => {
    dispatch(userView({ id }));
  };
  return (
    <div className="container">
      <div className="row">
        <h1>Redux CRUD User app</h1>
      </div>
      <div className="row">
        <div className="two columns">
          <button
            onClick={() => dispatch(fetchUsers())}
            className="button-primary"
          >
            Load users
          </button>
        </div>
        <div className="two columns">
          <Link to="/add-user">
            <button className="button-primary">Add user</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                <th>FirstName</th>
                <th>lastName</th>
                <th>Email</th>
                <th>PhoneNumber</th>
                <th>Password</th>
                <th>Avatar</th>
                <th> &nbsp;&nbsp;&nbsp;&nbsp;Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {entities.length &&
                entities.map(
                  (
                    { id, firstName, lastName, email, phone, password, file },
                    i
                  ) => (
                    <tr key={i}>
                      <td>{id}</td>
                      <td>{firstName}</td>
                      <td>{lastName}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>{password}</td>
                      <Avatar src={file} sx={{ width: 70, height: 70 }} />
                      <td>
                        <Link to={`/edit-user/${id}`}>
                          <button>Edit</button>
                        </Link>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(id)}>Delete</button>
                      </td>
                      <td>
                        <button onClick={() => handleView(id)}>View</button>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
