import React, { useState } from "react";
import { sendOtp } from "../../../../http/index";
import { useDispatch } from "react-redux";
import { setOtp } from "redux/userAuth/userAuth.actions";

import Card from "components/shared/Card/Card.component";
import Button from "components/shared/Button/Button.component";
import TextInput from "components/shared/TextInput/TextInput.component";
import validator from "validator";

import styles from "../StepPhoneEmail.module.css";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  async function submit() {
    //server request
    if (!phoneNumber) {
      alert("No number provided");
      return;
    }

    const isCorrectPhoneNumber = validator.isMobilePhone(phoneNumber);

    if(isCorrectPhoneNumber === false){
      alert("Not a correct phone number");
      return; 
    }

    const { data } = await sendOtp({ phone: phoneNumber });
    console.log("YOUR OTP IS : ", data.otp);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
  }

  return (
    <div>
      <Card title="Enter your phone number" icon="phone">
        <TextInput
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div>
          <div className={styles.actionButtonWrap}>
            <Button text="Next" onClick={submit} />
          </div>
          <p className={styles.bottomParagraph}>
            By entering your number, you're agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Phone;
