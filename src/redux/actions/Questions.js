import { HANDLE_NEXT,HANDLE_PREVIOUS } from "../constants/Questions";

export const handleSubmit = (e, question, form, index) => dispatch => {
  e.preventDefault();
  form.validateFields((err, values) => {
    if (!err) {
      dispatch({
        type: HANDLE_NEXT,
        value: values[question.identifier],
        question
      });
    }
  });
};

export const handlePrevious = question => {
  return {
    type:HANDLE_PREVIOUS,
    question
  }
};
