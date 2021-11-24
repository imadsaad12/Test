import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Main from "./profile/Main";
import Ratings from "./Rating/Rating";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000/");

const Profile = () => {
  const { id } = useParams();
  const query = new URLSearchParams(window.location.search);
  const username = query.get("username");

  const [model, setModel] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:4000/models/${id}`)
      .then((res) => {
        setModel(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(model);
  return (
    <div
      style={{
        marginLeft: "15%",
        marginTop: "2%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Main model={model} id={id} username={username} socket={socket} />
      <Ratings id={id} username={username} />
    </div>
  );
};

export default Profile;
