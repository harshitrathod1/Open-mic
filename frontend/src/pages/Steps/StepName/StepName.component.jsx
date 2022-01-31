import React from "react";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";

import { setName } from "redux/userActivate/userActivate.actions";

import Card from "components/shared/Card/Card.component";
import Button from "components/shared/Button/Button.component";
import TextInput from "components/shared/TextInput/TextInput.component";

import styles from "./StepName.module.css";
 
const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.userActivate);
  const dispatch = useDispatch();
  const [ nameInput, setNameInput ] = useState(name);

  function nextStep(){
    if(!nameInput){
      return;
    }

    dispatch(setName(nameInput));
    onNext();
  }

  return (
    <>
      <Card title="Enter your full name.." icon="goggle-emoji">
        <TextInput value={nameInput} onChange={(e) => setNameInput(e.target.value)} />

        <p className={styles.paragraph}>
          People use real names at Open Mic :) !
        </p>

        <div className={styles.actionButtonWrap}>
          <Button onClick={nextStep} text="Next" />
        </div>
      </Card>
    </>
  );
};

export default StepName;
