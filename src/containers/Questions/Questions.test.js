import React from "react";
import { shallow, configure, mount } from "enzyme";
import Questions from "./Questions";
import QuestionsForm from "./QuestionsForm";
import store from "../../redux/store";
import actions from "../../redux/actions/Questions";
import Adapter from "enzyme-adapter-react-16";
import { HANDLE_NEXT, HANDLE_PREVIOUS } from "../../redux/constants/Questions";

configure({ adapter: new Adapter() });

const question = {
  question_type: "multiple-choice",
  identifier: "list_12111610",
  headline: "Bist Du Beamter oder im öffentlichen Dienst angestellt?",
  description: null,
  required: false,
  multiple: "false",
  choices: [
    {
      label: "Ja",
      value: "Ja",
      selected: false
    },
    {
      label: "Nein",
      value: "Nein",
      selected: false
    }
  ],
  jumps: []
};

describe("<Questions>", () => {
  it("component renders without crashing", () => {
    const wrapper = shallow(<Questions store={store} />);
  });

  it("component should have two buttons", () => {
    const wrapper = mount(<Questions store={store} />);
    expect(wrapper.find("Button").length).toEqual(2);
  });

  it("Previous buttons should correct label", () => {
    const wrapper = mount(<Questions store={store} />);
    expect(
      wrapper
        .find("Button")
        .first()
        .text()
    ).toEqual("Previous");
  });

  it("Next buttons should correct label", () => {
    const wrapper = mount(<Questions store={store} />);
    expect(
      wrapper
        .find("Button")
        .last()
        .text()
    ).toEqual("Next");
  });

  it("Next question should appear on clicking next button", () => {
    store.dispatch({
      type: HANDLE_NEXT,
      value: "hello",
      question
    });
    const wrapper = shallow(<Questions store={store} />);
    expect(wrapper.props().currentQuestion.identifier).toEqual("list_12111777");
  });

  it("Previous question should appear on clicking Previous button", () => {
    store.dispatch({
      type: HANDLE_PREVIOUS,
      question
    });
    const wrapper = shallow(<Questions store={store} />);
    expect(wrapper.props().currentQuestion.identifier).toEqual("list_12110962");
  });
});
