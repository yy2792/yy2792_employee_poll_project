import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { handleSaveAnswer } from "../actions/common";

function Poll(props) {
  const { dispatch, questions, users, authedUser } = props;
  const { question_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    !authedUser.id && navigate("/login");
  }, [authedUser, navigate]);

  function handleAns(answer) {
    const data = {
      authedUser: authedUser.id,
      qid: question_id,
      answer,
    };
    dispatch(handleSaveAnswer(data));
  }

  if (!questions[question_id])
    return <h1 data-testid="404">404 Page Not Found</h1>;
  else
    return (
      <div className="Poll-Container">
        <h2>Poll by {questions[question_id].author}</h2>
        <img
          className="pollImg"
          src={users[questions[question_id].author].avatarURL}
          alt=""
        />
        <h2>Would You Rather</h2>
        <div className="Poll-Sub-Container">
          <div className="Poll-Option">
            <div>{questions[question_id].optionOne["text"]}</div>
            {Object.keys(authedUser["answers"]).includes(question_id) ? (
              authedUser["answers"][question_id] === "optionOne" ? (
                <button disabled>Voted</button>
              ) : (
                <button disabled>click</button>
              )
            ) : (
              <button
                className="pollBtn"
                onClick={() => handleAns("optionOne")}
              >
                click
              </button>
            )}
            <p>
              Total votes: {questions[question_id].optionOne["votes"].length}(
              {(
                (100 * questions[question_id].optionOne["votes"].length) /
                (questions[question_id].optionOne["votes"].length +
                  questions[question_id].optionTwo["votes"].length)
              ).toFixed(1)}
              %)
            </p>
          </div>
          <div className="Poll-Option">
            <div>{questions[question_id].optionTwo["text"]}</div>
            {Object.keys(authedUser["answers"]).includes(question_id) ? (
              authedUser["answers"][question_id] === "optionTwo" ? (
                <button disabled>Voted</button>
              ) : (
                <button disabled>click</button>
              )
            ) : (
              <button
                className="pollBtn"
                onClick={() => handleAns("optionTwo")}
              >
                click
              </button>
            )}
            <p>
              Total votes: {questions[question_id].optionTwo["votes"].length}(
              {(
                (100 * questions[question_id].optionTwo["votes"].length) /
                (questions[question_id].optionOne["votes"].length +
                  questions[question_id].optionTwo["votes"].length)
              ).toFixed(1)}
              %)
            </p>
          </div>
        </div>
      </div>
    );
}

const mapStateToProps = ({ users, userAuth, questions }) => ({
  authedUser: userAuth ? users[userAuth] : { id: null },
  questions,
  users,
});

export default connect(mapStateToProps)(Poll);
