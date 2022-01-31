import React from "react";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";

import { setAvatar } from "redux/userActivate/userActivate.actions";
import { activate } from "../../../http/index";
import { setAuth } from "redux/userAuth/userAuth.actions";

import Card from "components/shared/Card/Card.component";
import Button from "components/shared/Button/Button.component";
import Loader from "components/shared/Loader/Loader.component";

import styles from "./StepAvatar.module.css";

const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name,avatar } = useSelector((state) => state.userActivate); 
  const [ imageUrl, setImageUrl ] = useState('/images/monkey-avatar.png');
  const [ loading, setLoading ] = useState(false);
  const [ unMounted, setUnMounted] = useState(false);

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
    if (!name || !avatar){
      // alert("No images selected");
      return;
    } 
      
    setLoading(true);
    try{
      const { data } = await activate({ name, avatar});
      if(data.auth){
        if(!unMounted){
          dispatch(setAuth(data)); 
        }
      }
    }catch(error){
      console.log("Submit error : ",error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      setUnMounted(true);
    }
  },[]);

  if (loading) return <Loader message="Activation in progress..."/>

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
