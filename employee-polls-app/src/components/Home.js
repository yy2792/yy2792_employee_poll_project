import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";
import employee_poll_front_page from "../assets/images/employee_poll_front_page.jpg";

function Home(props) {
  const { auth, newQuestions, doneQuestions } = props;
  const [answeredQuestionVisible, setAnsweredQuestionVisible] =
    useState("newQ");

  const navigate = useNavigate();

  function showUnansweredPolls(e) {
    setAnsweredQuestionVisible("newQ");
  }

  function showAnsweredPolls(e) {
    setAnsweredQuestionVisible("done");
  }

  const questionsSections = [
    {
      key: "newQ",
      title: "New Questions",
      ids: newQuestions,
    },
    {
      key: "done",
      title: "Done Questions",
      ids: doneQuestions,
    },
  ];

  useEffect(() => {
    !auth && navigate("/login");
  }, [auth, navigate]);

  return (
    <div className="home-container">
      <div className="background_img">
        <img src={employee_poll_front_page} alt="employee_poll_front_page" />
      </div>
      <div className="home-list">
        <div className="togglecontainer">
          <button className="btnstyle3" onClick={(e) => showUnansweredPolls(e)}>
            Unanswered Polls
          </button>
          <button className="btnstyle3" onClick={(e) => showAnsweredPolls(e)}>
            Answered Polls
          </button>
        </div>
        {questionsSections.map(
          (d) =>
            d.key === answeredQuestionVisible && (
              <div key={d.key}>
                <QuestionList title={d.title} ids={d.ids} />
              </div>
            )
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({ questions, userAuth, users }) => {
  if (userAuth)
    return {
      doneQuestions: Object.keys(questions)
        .filter((k) => Object.keys(users[userAuth].answers).includes(k))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
      newQuestions: Object.keys(questions)
        .filter((k) => !Object.keys(users[userAuth].answers).includes(k))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
      auth: users[userAuth],
    };
  else {
    return {};
  }
};

export default connect(mapStateToProps)(Home);
