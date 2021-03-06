import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/shared/Card/Card.component";
import Button from "../../components/shared/Button/Button.component";

import styles from "./Home.module.css";

const Home = () => {

  let navigate = useNavigate();

  const signInLinkStyle = {
    color : '#0077FF',
    fontWeight : 'bold',
    textDecoration : 'none',
    marginLeft : '5px'
  }

  function startRegister(){
      navigate("/authenticate")
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to Open Mic" icon="logo">
        <p className={styles.text}>
          We're are working hard to get Open Mic ready for everyone! While we
          wrap up finishing touches, we are adding people gradually so nothing
          breaks up!
        </p>
        <div>
            <Button onClick={startRegister} text="Let's Go"/>
        </div>
        <div className={styles.signinwrapper}>
          <span className={styles.hasInvite}>Have an invite text? </span>
        </div>
      </Card>
    </div>
  );
};

export default Home;
