import { EmojiEmotions, LocationOn, Send } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, Tooltip } from "@mui/material";
import React, { useState } from "react";
import EmojiPicker from "./EmojiPicker";
import Input from "./general/Input";

function MessageInput({ socket, shareLocation }) {
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const onSubmitHandler = (e) => {
    e?.preventDefault();
    if (input.trim().length === 0) return;
    socket.emit("sendMessage", input, (message) => {
      // console.log("The message was delivered!", message);
    });
    setShowEmoji(false);
    setInput("");
  };

  const onChangeHandler = (e) => {
    if (!e?.target) {
      setInput((current) => (current += e.native));
      return;
    }
    setInput(e.target.value);
  };

  return (
    <Box
      component={"form"}
      sx={{ overflow: "hidden" }}
      onSubmit={onSubmitHandler}
    >
      <EmojiPicker
        open={showEmoji}
        onSelect={onChangeHandler}
        onClose={() => setShowEmoji(false)}
      />
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
                onClick={() => setShowEmoji((cur) => !cur)}
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
                  onClick={shareLocation}
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
  );
}

export default MessageInput;
