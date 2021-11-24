import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Divider, TextArea } from "semantic-ui-react";
import Comment from "./Comment";

const Main = ({ model, id, username, socket }) => {
  const url = " https://i.mdel.net/i/db/" + model.image;
  const INITIAL = {
    name: username,
    date: "",
    body: "",
    id: id,
  };
  const [comments, setComments] = useState([]);
  const [message, setmessage] = useState("");

  const joinroom = (name, room) => {
    if (name !== "" && room !== "") {
      socket.emit("join-room", room);
    }
  };
  const sendMessge = async () => {
    const messageData = {
      room: id,
      author: username,
      open: true,
    };
    await socket.emit("send-message", messageData);
  };
  const removeTyping = async () => {
    const messageData = {
      room: id,
      author: username,
      open: false,
    };
    await socket.emit("send-message", messageData);
  };

  useEffect(() => {
    joinroom(username, id);
    socket.on("recive-message", (data) => {
      data.open ? setmessage(data.author + "typing . . .") : setmessage("");
    });
    axios
      .get(`http://localhost:4000/comments/${id}`)
      .then((result) => {
        setComments(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [socket, message]);

  const profile =
    "data:image/png;base64,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";
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(INITIAL);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setComment((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    const req = await axios.post("http://localhost:4000/models", comment);
    window.location.reload();
    setOpen(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "20%",
        width: "40%",
      }}
    >
      <img
        src={url}
        style={{
          marginLeft: "25%",
          borderRadius: "50%",
          width: "50%",
          height: "40%",
        }}
        alt="not"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#edf0ee",
          marginTop: "4%",
          borderRadius: "20px",
          paddingLeft: "7%",
          width: "100%",
          paddingTop: "3%",
          boxShadow: "3px 6px gray",
        }}
      >
        <h5>Discussion {message} </h5>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img
            src={profile}
            style={{ borderRadius: "50%", width: "10%", height: 45 }}
            alt="not"
          />
          {!open ? (
            <Button
              onClick={() => {
                setOpen(true);
              }}
              style={{
                width: "80%",
                marginTop: "2%",
                border: "1px solid gray",
                backgroundColor: "transparent",
                height: 35,
                marginLeft: "3%",
                borderRadius: "25px",
                marginBottom: "5%",
              }}
              content="write comment . . ."
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <textarea
                onClick={sendMessge}
                name="body"
                onChange={handleInput}
                style={{
                  outline: "none",
                  width: "80%",
                  border: "2px solid gray",
                  backgroundColor: "transparent",
                  height: 200,
                  marginLeft: "3%",
                  borderRadius: "25px",
                  marginBottom: "5%",
                  padding: "5%",
                }}
                placeholder="write comment . . ."
              />
              <div
                style={{
                  display: "flex",
                  marginLeft: "10%",
                  flexDirection: "row",
                  marginBottom: "5%",
                }}
              >
                <Button
                  onClick={() => {
                    handleSubmit();
                    removeTyping();
                  }}
                  content="Add comment"
                  color="linkedin"
                  style={{ borderRadius: "25px", width: "40%" }}
                />
                <Button
                  onClick={() => {
                    setOpen(false);
                    removeTyping();
                  }}
                  content="cancel"
                  style={{
                    borderRadius: "25px",
                    width: "35%",
                    backgroundColor: "transparent",
                    border: "1px solid gray",
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <Divider />
        {comments.map((i) => {
          return (
            <div>
              <Comment name={i.name} date={i.date} comment={i.comment} />
              <Divider />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
