import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import SearchUser from "../../components/SearchUser/SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  createChat,
  createMessage,
  getAllChats,
} from "../../Redux/Message/message.action";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Link } from "react-router-dom";

const Message = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [inputContent, setInputContent] = useState("");
  const chatContainerRef = useRef(null);

  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const auth = useSelector((state) => state.auth);

  const handleSelectImage = async (e) => {
    setLoading(true);
    const imgUrl = await uploadToCloudinary(e.target.files[0], "image");
    setSelectedImage(imgUrl);
    setLoading(false);
  };

  const handleCreateMessage = (value) => {
    const message = {
      chatId: currentChat.id,
      content: value,
      image: selectedImage,
    };
    dispatch(createMessage({ message, sendMessageToServer }));
    setSelectedImage(null);
  };

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  // useEffect(() => {
  //   setMessages([...messages, message.message]);
  // }, [message.message]);

  // useEffect(() => {
  //   const sock = new SockJS("http://localhost:5454/ws");
  //   const stomp = Stomp.over(sock);
  //   setStompClient(stomp);

  //   stomp.connect({}, onConnect, onErr);
  // }, []);

  useEffect(() => {
    const sock = new SockJS("http://localhost:5454/ws");
    const stomp = Stomp.over(sock);
    setStompClient(stomp);

    stomp.connect({}, onConnect, onErr);

    return () => {
      if (stompClient && subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const onConnect = () => {
    console.log("websocket connected...");
  };

  const onErr = (error) => {
    console.log("error connecting to websocket", error);
  };

  // useEffect(() => {
  //   if (stompClient && auth.user && currentChat) {
  //     console.log("yea it's coming inside");
  //     const subscription = stompClient.subscribe(
  //       `/user/${currentChat.id}/private`,
  //       onMessageReceive
  //     );
  //   }
  // });

  useEffect(() => {
    if (stompClient && auth.user && currentChat) {
      if (subscription) {
        subscription.unsubscribe();
      }
      const newSubscription = stompClient.subscribe(
        `/user/${currentChat.id}/private`,
        onMessageReceive
      );
      setSubscription(newSubscription);

      return () => {
        if (newSubscription) {
          newSubscription.unsubscribe();
        }
      };
    }
  }, [stompClient, auth.user, currentChat]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      console.log("Sending message to server:", newMessage);
      stompClient.send(
        `/app/chat/${currentChat?.id.toString()}`,
        {},
        JSON.stringify(newMessage)
      );
    }
  };

  const onMessageReceive = (payload) => {
    try {
      const receivedMessage = JSON.parse(payload.body);
      console.log("message received from web socket", receivedMessage);

      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    } catch (error) {
      console.error("Failed to parse message as JSON:", error, payload.body);
    }
  };

  const handleUserSelectionForChat = (userId) => {
    // Dispatch action to create a chat with the selected user
    dispatch(createChat({ userId }));
  };

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid className="px-5" item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <Link to="/">
                <div className="flex space-x-4 items-center py-5">
                  <ArrowBackIcon style={{ cursor: "pointer" }} />

                  <h1 className="text-xl font-bold">Home</h1>
                </div>
              </Link>
              <div className="h-[83vh]">
                <div>
                  <SearchUser onUserClick={handleUserSelectionForChat} />
                  {/* <SearchUser /> */}
                </div>
                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollBar">
                  {message?.chats?.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setCurrentChat(item);
                        setMessages(item.messages);
                      }}
                    >
                      <UserChatCard chat={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className="h-full" item xs={9}>
          {currentChat ? (
            <div>
              <div className="flex justify-between items-center border-l p-5">
                <div className="flex items-center space-x-3">
                  <Avatar />
                  <p>
                    {auth.user?.id === currentChat.users[0]?.id
                      ? currentChat.users[1]?.firstName +
                        " " +
                        currentChat.users[1]?.lastName
                      : currentChat.users[0]?.firstName +
                        " " +
                        currentChat.users[0]?.lastName}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <IconButton>
                    <CallIcon />
                  </IconButton>
                  <IconButton>
                    <VideocamIcon />
                  </IconButton>
                </div>
              </div>
              <div
                ref={chatContainerRef}
                className="hideScrollBar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5"
              >
                {messages.map((item) => (
                  <ChatMessage item={item} />
                ))}
              </div>
              <div className="sticky bottom-0 border-l">
                {selectedImage && (
                  <img
                    className="w-[5rem] h-[5rem] object-cover px-2"
                    src={selectedImage}
                    alt=""
                  />
                )}
                <div className="py-5 flex items-center justify-center space-x-5">
                  <input
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleCreateMessage(e.target.value);
                        setSelectedImage(null);
                      }
                    }}
                    className="bg-transparent border border-[#3b4054] rounded-full w-[90%] py-3 px-5"
                    placeholder="Please enter message"
                    type="text"
                  />
                  <input
                    className="hidden"
                    id="image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleSelectImage}
                  />
                  <label htmlFor="image-input">
                    <InsertPhotoIcon />
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full space-y-5 flex flex-col justify-center items-center">
              <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
              <p className="text-xl font-semibold">No chats are selected</p>
            </div>
          )}
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
