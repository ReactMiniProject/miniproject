import React from "react";
import styled from "styled-components";

const Input = (props) => {

  const {size, padding, margin, placeholder, label, _onChange, type} = props;

  const styles = { size: size, margin: margin, padding: padding, placeholder: placeholder, label: label, _onChange, type };

  return (
    <React.Fragment>
      <Label>{label}</Label>
      <ElInput {...styles} onChange={_onChange} />
    </React.Fragment>
  )
}

export default Input;

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  _onChange: () => {},
};

const ElInput = styled.input`
  padding: 8px 8px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;