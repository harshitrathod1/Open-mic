import React from "react";

import styles from "./StepAvatar.module.css";

const StepAvatar = ({ onNext }) => {
  return (
    <>
      <div>StepAvatar component</div>

      <button onClick={onNext}>Next</button>
    </>
  );
};

export default StepAvatar;
