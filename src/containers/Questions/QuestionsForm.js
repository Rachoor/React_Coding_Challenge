import React from "react";
import { Form, Button, Input, Radio, Checkbox, Card } from "antd";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const Fields = props => {
  switch (props.question_type) {
    case "text":
      return (
        <FormItem>
          {props.getFieldDecorator(props.identifier, {
            initialValue: props.value,
            ...(props.required && {
              rules: [
                {
                  required: true,
                  message:"Required!"
                }
              ]
            })
          })(<Input />)}
        </FormItem>
      );
    case "multiple-choice":
      if (props.multiple === "false") {
        return (
          <FormItem>
            {props.getFieldDecorator(props.identifier, {
              initialValue: props.value,
              ...(props.required && {
                rules: [
                  {
                    required: true,
                    message:"Required!"
                  }
                ]
              })
            })(
              <RadioGroup>
                {props.choices.map(choice => {
                  return (
                    <Radio key={choice.value} value={choice.value}>
                      {choice.label}
                    </Radio>
                  );
                })}
              </RadioGroup>
            )}
          </FormItem>
        );
      } else {
        return (
          <FormItem>
            {props.getFieldDecorator(props.identifier, {
              initialValue: props.value,
              ...(props.required && {
                rules: [
                  {
                    required: true,
                    message:"Required!"
                  }
                ]
              })
            })(
              <Checkbox.Group>
                {props.choices.map(choice => {
                  return (
                    <Checkbox key={choice.value} value={choice.value}>
                      {choice.label}
                    </Checkbox>
                  );
                })}
              </Checkbox.Group>
            )}
          </FormItem>
        );
      }
    default:
      return null;
  }
};

const QuestionsForm = props => {
  const { question, form, handleSubmit, handlePrevious } = props;
  return (
    <div className="padded">
      <Card
        title={question.headline}
        bordered={false}
        style={{ width: "100%" }}
      >
        <Form onSubmit={e => handleSubmit(e, question, form)}>
          <Fields {...question} getFieldDecorator={form.getFieldDecorator} />
          <div className="space-between">
            <Button type="primary" onClick={() => handlePrevious(question)}>
              Previous
            </Button>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Form.create()(QuestionsForm);
