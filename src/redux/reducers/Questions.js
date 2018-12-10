import { HANDLE_NEXT, HANDLE_PREVIOUS } from "../constants/Questions";
import { questionnaire } from "../utils/questionnaire.json";
const questions = (
  state = {
    questions: questionnaire.questions,
    currentQuestion: questionnaire.questions[0],
    success: false
  },
  action
) => {
  switch (action.type) {
    case HANDLE_NEXT:
      const index = state.questions.findIndex(question => {
        return question.identifier === action.question.identifier;
      });
      const updatedQuestions = state.questions.map(question => {
        if (question.identifier === action.question.identifier) {
          return { ...question, value: action.value };
        } else {
          return question;
        }
      });
      if (index > -1) {
        if (state.questions.length - 1 === index) {
          return {
            ...state,
            success: true
          };
        } else {
          return {
            ...state,
            questions: updatedQuestions,
            currentQuestion: state.questions[index + 1]
          };
        }
      } else {
        return { ...state, questions: updatedQuestions };
      }
    case HANDLE_PREVIOUS:
      const i = state.questions.findIndex(question => {
        return question.identifier === action.question.identifier;
      });
      if (i > -1) {
        if (i === 0) {
          return {
            ...state
          };
        } else {
          return {
            ...state,
            currentQuestion: state.questions[i - 1]
          };
        }
      } else {
        return state;
      }

    default:
      return state;
  }
};

export default questions;
