import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  Snackbar,
  Tooltip,
  Link,
  Stack,
  Typography,
  Paper,
  Alert,
  Button,
} from "@mui/material";
import { useSpring, animated } from "react-spring";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { LocationOn, Send, Close, EmojiEmotions } from "@mui/icons-material";

import "./Messages.css";
import { timeFormat } from "../utils/formatter";
import Input from "./general/Input";
import { grey } from "@mui/material/colors";

function Messages({ socket }) {
  const [messages, setMessages] = useState([]);
  const [roomData, setRoomData] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [scrollAlert, setScrollAlert] = useState(false);

  const scroll = useRef();

  const [alert, setAlert] = useState(false);
  const [input, setInput] = useState("");
  const AnimatedBox = animated(Box);

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((current) => [...current, { ...message }]);
    };

    const updateRoom = (data) => {
      setRoomData(data);
    };
    socket.on("message", messageListener);
    socket.on("roomData", updateRoom);

    return () => {
      socket.off("message", messageListener);
    };
  }, [socket]);

  useEffect(() => {
    // Makes sure there it is possible to scroll
    if (!(scroll.current.scrollHeight > scroll.current.clientHeight)) return;
    const newMessage = scroll.current.lastElementChild;
    const bottom =
      scroll.current.scrollHeight -
        scroll.current.scrollTop -
        newMessage?.offsetHeight -
        10 <=
      scroll.current.clientHeight;

    // Checks to see if the person is at the bottom of the chat otherwise dont scroll to the bottom
    if (bottom) {
      return scrollToBottom();
    }
    setScrollAlert(true);
  }, [messages, scrollAlert]);

  const scrollToBottom = (clicked) => {
    const newMessage = scroll.current?.lastElementChild;
    newMessage?.scrollIntoView({ behaviour: "smooth" });
  };

  const animatedProps = useSpring({
    opacity: showPicker ? 1 : 0,
    bottom: showPicker ? 100 : -100,
    config: { mass: 1, tension: 150 },
  });

  const onSubmitHandler = (e) => {
    e?.preventDefault();
    if (input.trim().length === 0) return;
    socket.emit("sendMessage", input);
    setShowPicker(false);
    setInput("");
  };

  const shareLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coords = `${latitude},${longitude}`;

        socket.emit("shareLocation", coords, (message) => {
          // console.log(message);
        });
      },
      () => {
        return setAlert(true);
      }
    );
  };

  const onChangeHandler = (e) => {
    if (!e?.target) {
      setInput((current) => (current += e.native));
      return;
    }

    setInput(e.target.value);
  };

  return (
    <Stack
      direction="row"
      height="100vh"
      overflow="hidden"
      boxSizing="border-box"
      pl={10}
      pt={3}
      bgcolor="background.darkest"
    >
      <Box
        sx={{
          width: "15%",
          bgcolor: "background.secondary",
          display: "flex",
          boxSizing: "border-box",
          flexDirection: "column",
          overflow: "hidden",
          borderTopLeftRadius: 12,
        }}
      >
        <Box
          component={Paper}
          elevation={3}
          sx={{
            px: 3,
            py: 2,
            bgcolor: "background.secondary",
            borderRadius: 0,
          }}
        >
          <Typography variant="h6" color="white">
            {roomData?.room}
          </Typography>
        </Box>
        <Box py={2} px={3}>
          {roomData?.users.map(({ user, id }, index) => (
            <Box
              pt={1}
              color="white"
              key={index}
              display="flex"
              alignItems="center"
            >
              <Box
                component="img"
                sx={{ height: 30, mr: 2 }}
                src={`https://avatars.dicebear.com/api/bottts/${id}.svg`}
                alt="avatar"
              />
              <Typography color="primary.main">{user}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "85%",
          bgcolor: "background.main",
          py: 3,
          px: 3,
        }}
      >
        <Box
          ref={scroll}
          sx={{
            width: "100%",
            flex: 1,
            boxSizing: "border-box",
            overflowY: "scroll",
            scrollBehavior: "smooth",
          }}
        >
          {messages?.map(({ id, user, text, createdAt, link }, index) => (
            <Fragment key={index}>
              <Box
                sx={{
                  mt: 0.5,
                  mb: 1,
                  width: "fit-content",
                  minWidth: 200,
                }}
              >
                <Stack color="white" direction={"row"}>
                  <Box
                    component="img"
                    sx={{ height: 30, mr: 2 }}
                    src={`https://avatars.dicebear.com/api/bottts/${id}.svg`}
                    alt="avatar"
                  />
                  <Stack>
                    <Box display="flex" alignItems="baseline">
                      <Typography
                        mr={1.5}
                        color="primary.main"
                        variant="subtitle1"
                        fontWeight="400"
                      >
                        {user}
                      </Typography>
                      <Typography variant="caption" color={grey[500]}>
                        {timeFormat(createdAt)}
                      </Typography>
                    </Box>
                    {link ? (
                      <Link
                        href={link}
                        underline="hover"
                        color="white"
                        target="_blank"
                      >
                        {text}
                      </Link>
                    ) : (
                      <Typography sx={{ wordBreak: "break-word" }}>
                        {text}
                      </Typography>
                    )}
                    <Snackbar
                      open={scrollAlert}
                      autoHideDuration={5000}
                      onClose={() => setScrollAlert(false)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      sx={{ bottom: "80px !important" }}
                    >
                      <Alert
                        icon={false}
                        sx={{ bgcolor: "background.darkest" }}
                        action={
                          <Button
                            onClick={() => {
                              scrollToBottom();
                              setScrollAlert(false);
                            }}
                            color="inherit"
                            size="small"
                          >
                            View
                          </Button>
                        }
                      >
                        You have a new message!
                      </Alert>
                    </Snackbar>
                  </Stack>
                </Stack>
              </Box>
            </Fragment>
          ))}
        </Box>
        <Box component={"form"} onSubmit={onSubmitHandler}>
          <Input
            onSubmit={onSubmitHandler}
            multiline
            value={input}
            onChange={onChangeHandler}
            startAdornment={
              <InputAdornment position="start">
                <Tooltip title="Send Emoji's">
                  <IconButton
                    color="secondary"
                    aria-label="send Emoji"
                    onClick={() => setShowPicker((cur) => !cur)}
                  >
                    <EmojiEmotions />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            }
            endAdornment={
              <>
                <InputAdornment position="start">
                  <Tooltip title="Share your location">
                    <IconButton
                      color="secondary"
                      edge="end"
                      aria-label="share location"
                      onClick={shareLocationHandler}
                    >
                      <LocationOn />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
                <InputAdornment position="end">
                  <Tooltip title="Send message">
                    <IconButton
                      color="primary"
                      type="submit"
                      aria-label="send message"
                    >
                      <Send />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              </>
            }
            placeholder="Message..."
          />
        </Box>
      </Box>
      <Snackbar
        open={alert}
        message="Unable to share your location."
        autoHideDuration={5000}
        onClose={() => setAlert(false)}
        action={
          <IconButton onClick={() => setAlert(false)}>
            <Close />
          </IconButton>
        }
      />
      {showPicker && (
        <AnimatedBox
          style={{ ...animatedProps }}
          sx={{
            position: "absolute",
            left: "10%",
            bgcolor: "#151617",
            p: 1,
            pt: 6,
            borderRadius: 2,
          }}
        >
          <IconButton
            onClick={() => setShowPicker(false)}
            sx={{ position: "absolute", top: 2, right: 5 }}
          >
            <Close />
          </IconButton>
          <Picker data={data} onEmojiSelect={onChangeHandler} />
        </AnimatedBox>
      )}
    </Stack>
  );
}

export default Messages;
