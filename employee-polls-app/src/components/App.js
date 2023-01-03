import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { connect } from "react-redux";

function App() {
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
