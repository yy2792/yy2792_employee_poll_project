import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../actions/userAuth";

function Login(props) {
  return (
    <div>
      <h1>Please select user to login</h1>
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
