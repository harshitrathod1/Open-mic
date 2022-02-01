import React, { useState } from "react";

import Phone from "./Phone/Phone.component";
import Email from "./Email/Email.component";

import styles from "./StepPhoneEmail.module.css";

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmailMap[type];

  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.buttonWrapper}>
            <button
              className={`${styles.tabButton} ${type === "phone" ? styles.active : ""}`}
              onClick={() => setType("phone")}
            >
              <img src="/images/phone-white.png" alt="Phone" />
            </button>

            <button
              className={`${styles.tabButton} ${type === "email" ? styles.active : ""}`}
              onClick={() => setType("email")}
            >
              <img src="/images/mail-white.png" alt="Email" />
            </button>
          </div>
          <Component onNext={onNext} />
          <div className={styles.otpWarn}>
            <p>
              Otp service takes charges,<br/> 
              So you can see your OTP in browser dev tools<br/>
              PRESS CTRL + SHIFT + J
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepPhoneEmail;
