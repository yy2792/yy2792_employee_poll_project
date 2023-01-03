import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../actions/userAuth";

function Login(props) {
  console.log(props);
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const { dispatch, auth, users } = props;

  useEffect(() => {
    auth && navigate(-1);
  }, [auth]);

  function handleLogin() {
    dispatch(setAuthUser(user));
  }

  return (
    <div>
      <h1>Please select user to login</h1>
      <select
        value={user}
        data-testid="dropdown"
        onChange={(e) => setUser(e.target.value)}
      >
        <option>Select User</option>
        {Object.keys(users).map((k) => (
          <option key={users[k].id} value={users[k].id}>
            {users[k].name} ({users[k].id})
          </option>
        ))}
      </select>
    </div>
  );
}

const mapStateToProps = ({ userAuth, users }) => {
  return {
    auth: userAuth,
    users,
  };
};

export default connect(mapStateToProps)(Login);
