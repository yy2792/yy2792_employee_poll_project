import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";
import employee_poll_front_page from "../assets/images/employee_poll_front_page.jpg";

function Home(props) {
  const { auth, newQuestions, doneQuestions } = props;
  const navigate = useNavigate();

  const [toggle, settoggle] = useState("NewQuestion");
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
        {questionsSections.map((d) => (
          <div key={d.key}>
            <QuestionList title={d.title} ids={d.ids} />
          </div>
        ))}
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
