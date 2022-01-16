import React from "react";

import "./StepPhoneEmail.module.css";

const StepPhoneEmail = ({ onNext }) => {
  return (
    <>
      <div>StepPhoneEmail component</div>
      <button onClick={onNext}>Next</button>
    </>
  );
};

export default StepPhoneEmail;
