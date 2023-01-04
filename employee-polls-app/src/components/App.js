import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Poll from "./Poll";
import NavBar from "./NavBar";
import Leaderboard from "./Leaderboard";
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
      {auth && <NavBar />}
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/leaderboard" element={<Leaderboard />} />
          <Route exact path="/questions/:question_id" element={<Poll />} />
        </Routes>
      </div>
    </Router>
  );
}

const mapStateToProps = ({ userAuth }) => ({
  auth: userAuth,
});

export default connect(mapStateToProps)(App);
