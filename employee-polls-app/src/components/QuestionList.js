import React from "react";
import { connect } from "react-redux";
import Question from "./Question";

function QuestionList(props) {
  const { title, questions } = props;

  return (
    <div className="question-list-container">
      <div className="question-list-title">
        <b>{title}</b>
      </div>
      <div className="question-list-questions">
        {questions &&
          Object.keys(questions)
            .map((qid) => questions[qid])
            .map((q) => (
              <div key={q.id}>
                <Question id={q.id} />
              </div>
            ))}
      </div>
    </div>
  );
}

const mapStateToProps = ({ questions }) => ({
  questions: questions,
});

export default connect(mapStateToProps)(QuestionList);
