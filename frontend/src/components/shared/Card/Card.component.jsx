import React from "react";

import styles from "./Card.module.css";

export const Card = ({ title, icon, children}) => {
  return (
      <div className={styles.card}>
        <div className={styles.headingWrapper}>
          <img src={`/images/${icon}.png`} alt="Logo" />
          <h1 className={styles.heading}>{ title }</h1>
        </div>
        {children}
      </div>
  );
};
