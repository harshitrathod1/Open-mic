import React, { useState } from "react";

import Card from "components/shared/Card/Card.component";

import TextInput from "components/shared/TextInput/TextInput.component";
import Button from "components/shared/Button/Button.component";

import styles from './StepOtp.module.css';

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just texted you" icon="lock-emoji">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />

          <div className={styles.actionButtonWrap}>
            <Button onClick={onNext} text="Next" />
          </div>
          
          <p className={styles.bottomParagraph}>
            By entering your number, You're agreeing to our Service and Privacy
            Policy. Thanks!
          </p>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
