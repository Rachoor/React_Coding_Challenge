import React from "react";
import "./Questions.scss";
import { connect } from "react-redux";
import QuestionsForm from "./QuestionsForm";
import { Alert } from "antd";
import * as questionActions from "../../redux/actions/Questions";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Questions = ({
  currentQuestion,
  handleSubmit,
  success,
  handlePrevious
}) => {
  if (success) {
    return (
      <div className="padded">
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
          <Alert
            message="success"
            description="All Answers are successfully submitted"
            type="success"
            showIcon
          />
        </CSSTransition>
      </div>
    );
  }
  return (
    <TransitionGroup>
      <CSSTransition
        key={currentQuestion.identifier}
        timeout={500}
        classNames="fade"
      >
        <QuestionsForm
          handlePrevious={handlePrevious}
          question={currentQuestion}
          handleSubmit={handleSubmit}
        />
      </CSSTransition>
    </TransitionGroup>
  );
};

export default connect(
  ({ questions }) => ({
    currentQuestion: questions.currentQuestion,
    success: questions.success
  }),
  questionActions
)(Questions);
