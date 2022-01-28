import React from "react";
import { useState,useEffect } from "react";

import AddRoomModel from "components/AddRoomModel/AddRoomModel.component";
import RoomCard from "components/RoomCard/RoomCard.component";
import { getAllRooms } from "../../http/index";

import styles from "./Rooms.module.css";

// const rooms = [
//   {
//     id: 1,
//     topic: "Which framework is best for frontend ?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 2,
//     topic: "Which framework is best for backend ?",
//     speakers: [
//       {
//         id: 1,
//         name: "Sheldon ",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "Leornard ",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 20,
//   },
//   {
//     id: 3,
//     topic: "Is veganism the new way to go?",
//     speakers: [
//       {
//         id: 1,
//         name: "Penny",
//         avatar: "/images/monkey-avatar.png",
//       },
//       {
//         id: 2,
//         name: "Bernadette",
//         avatar: "/images/monkey-avatar.png",
//       },
//     ],
//     totalPeople: 10,
//   },
// ];

const Rooms = () => {
  const [showRoomModel,setRoomModel] = useState(false);
  const [rooms,setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      setRooms(data);
    }
    fetchRooms();
  }, []);

  function openRoomModel(){
    setRoomModel(true);
  }
  
  return (
    <>
      <div className="container">
        <div className={styles.roomHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All voice rooms</span>
            <div className={styles.searchBox}>
              <img src="/images/search-icon.png" alt="searchIcon"></img>
              <input className={styles.searchInput} type="text" />
            </div>
          </div>
          <div className={styles.right}>
            <button onClick={openRoomModel} className={styles.startRoomButton}>
              <img src="/images/add-room-icon.png" alt="add-room" />
              <span>Start a room</span>
            </button>
          </div>
        </div>

        <div className={styles.roomList}>
          {rooms.map((room) => (
            <RoomCard key = { room.id } room={room} />
          ))}
        </div>
      </div>
      {
        showRoomModel && <AddRoomModel onClose={() => setRoomModel(false)}/> 
      }
    </>
  );
};

export default Rooms;
