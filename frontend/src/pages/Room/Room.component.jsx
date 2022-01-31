import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useWebRTC } from "hooks/useWebRTC";
import { getRoom } from "../../http";

import styles from "./Room.module.css";

const Room = () => {
  const { id: roomId } = useParams();
  const user = useSelector((state) => state.userAuth.userDetails);
  const { clients, provideRef,handleMute} = useWebRTC(roomId, user);
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [isMute,setMute] = useState(true);

  const handleManualLeave = () => {
    navigate("/rooms");
  };

  const handleMuteClick = (clientId) => {
    if(clientId !== user.id){
      return;
    }
    setMute((isMute) => !isMute);
  };

  useEffect(() => {
    handleMute(isMute,user.id);
  },[isMute]);

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      setRoom((prevState) => data);
    };

    fetchRoom();
  }, [roomId]);

  return (
    <div>
      <div className="container">
        <button onClick={handleManualLeave} className={styles.goBack}>
          <img src="/images/arrow-left.png" alt="left-arrow" />
          <span>All voice rooms</span>
        </button>
      </div>

      <div className={styles.clientsWrap}>
        <div className={styles.header}>
          <h2 className={styles.topic}>{room?.topic}</h2>
          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              <img src="/images/palm.png" alt="Palm png" />
            </button>
            <button onClick={handleManualLeave} className={styles.actionBtn}>
              <img src="/images/win.png" alt="win png" />
              <span>Leave quietly</span>
            </button>
          </div>
        </div>
        <div className={styles.clientsList}>
          {clients.map((client) => {
            return (
              <div key={client.id} className={styles.client}>
                <div className={styles.userHead}>
                  <audio
                    ref={(instance) => provideRef(instance, client.id)}
                    // controls
                    autoPlay
                  ></audio>
                  <img
                    className={styles.userAvatar}
                    src={client.avatar}
                    alt=""
                  />
                  <button onClick={() => handleMuteClick(client.id) } className={styles.micBtn}>
                    {client.muted ? (
                      <img src="/images/mic-mute.png" alt="mic-mute-icon" />
                    ) : (
                      <img src="/images/mic.png" alt="mic-icon" />
                    )}
                  </button>
                </div>
                <h4>{client.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Room;
