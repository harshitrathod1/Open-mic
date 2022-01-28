import React, { useState } from "react";
import { verifyOtp } from "../../../http/index";
import { useSelector, useDispatch } from "react-redux";

import Card from "components/shared/Card/Card.component";
import TextInput from "components/shared/TextInput/TextInput.component";
import Button from "components/shared/Button/Button.component";

import styles from './StepOtp.module.css';
import { setAuth } from "redux/userAuth/userAuth.actions";

const StepOtp = () => {
  const [otp, setOtp] = useState("");
  let { phone, hash } = useSelector((state) => state.userAuth.otp );
  const dispatch = useDispatch();

  async function submit(){
      if(!otp || !phone || !hash){
        return;
      }
      try{
        const { data } = await verifyOtp({ otp, phone, hash });
        console.log(data);
        dispatch(setAuth(data));
      }catch(error){
        alert("OTP invalid");
        console.log(error);
      }
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just texted you" icon="lock-emoji">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />

          <div className={styles.actionButtonWrap}>
            <Button onClick={submit} text="Next" />
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
