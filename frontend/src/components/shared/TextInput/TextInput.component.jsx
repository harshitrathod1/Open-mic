import React from "react";

import styles from "./TextInput.module.css";

const TextInput = (props) => {
  return (
    <div>
      <input
        type="text"
        {...props}
        style={{ width: props.fullwidth === "true" ? "100%" : "inherit" }}
        className={styles.input}
      />
    </div>
  );
};

export default TextInput;
