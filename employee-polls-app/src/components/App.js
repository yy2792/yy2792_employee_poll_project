import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { connect } from "react-redux";
import { useEffect } from "react";
import { handleData } from "../actions/common";

function App(props) {
  const { dispatch, auth } = props;
  useEffect(() => {
    dispatch(handleData());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

const mapStateToProps = ({ userAuth }) => ({
  auth: userAuth,
});

export default connect(mapStateToProps)(App);
