import React from "react";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";

import { setAvatar } from "redux/userActivate/userActivate.actions";
import { activate } from "../../../http/index";

import Card from "components/shared/Card/Card.component";
import Button from "components/shared/Button/Button.component";

import styles from "./StepAvatar.module.css";
import { setAuth } from "redux/userAuth/userAuth.actions";

const StepAvatar = ({ onNext }) => {
  const { name,avatar } = useSelector((state) => state.userActivate); 
  const dispatch = useDispatch();
  const [ imageUrl, setImageUrl ] = useState('/images/monkey-avatar.png');

  function captureImage(event){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function(){
        setImageUrl(reader.result);
        dispatch(setAvatar(reader.result))
      }
  }

  async function submit(){
    try{
      const { data } = await activate({ name, avatar});
      if(data.auth){
        dispatch(setAuth(data))
      }
    }catch(error){
      console.log("Submit error : ",error);
    }
  }
  return (
    <>
      <Card title={`Okay ${name}.. !`} icon="monkey-emoji">
        <p className={styles.subHeading}>How's this photo?</p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImage} src={imageUrl} alt="avatar" />
        </div>

        <div>
          <input id="avatarInput"
            onChange={captureImage}
            className={styles.avatarInput} 
            type="file" 
          />
          <label className={styles.avatarLabel} htmlFor="avatarInput">Choose a different photo</label>
        </div>

        <div className={styles.actionButtonWrap}>
          <Button onClick={submit} text="Next" />
        </div>
      </Card>
    </>
  );
};

export default StepAvatar;
