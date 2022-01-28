import React, { useState } from "react";

import { createRoom as create } from "../../http";
import { useNavigate } from "react-router-dom";

import TextInput from "components/shared/TextInput/TextInput.component";
import styles from "./AddRoomModel.module.css";

const AddRoomModel = ({ onClose }) => {
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();

  async function createRoom(){
    //server call
    try{
      if(!topic) return;
      const { data } = await create({ topic, roomType });
      navigate(`/room/${data.id}`);
    }catch(error){
      console.log("Error while creating room on server ",error);
    }    
  }

  return (
    <div className={styles.modelMask}>
      <div className={styles.modelBody}>
        <button onClick={onClose} className={styles.closeButton}>
          <img src="/images/close.png" alt="close" />
        </button>
        <div className={styles.modelHeader}>
          <h3 className={styles.heading}>Enter the topic to be discussed</h3>
          <TextInput fullwidth="true" value={topic} onChange={ (e) => setTopic(e.target.value)}/>
          <h2 className={styles.subHeading}>Room types</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={ () => setRoomType('open')}
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
            >
              <img src="/images/globe.png" alt="GLOBE" />
              <span>Open</span>
            </div>
            <div
              onClick={ () => setRoomType('social')}
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
            >
              <img src="/images/social.png" alt="SOCIAL" />
              <span>Social</span>
            </div>
            <div
              onClick={ () => setRoomType('private')}
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
            >
              <img src="/images/lock.png" alt="LOCK" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modelFooter}>
          <h2>Start a room, open to everyone</h2>
          <button onClick={createRoom} className={styles.footerButton}>
            <img src="/images/celebration.png" alt="Celebrate" />
            <span>Let's go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModel;
