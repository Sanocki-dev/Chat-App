import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Close } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useSpring, animated } from "react-spring";

function EmojiPicker({ open, onSelect, onClose }) {
  const AnimatedBox = animated(Box);

  const animatedProps = useSpring({
    opacity: open ? 1 : 0,
    // zIndex: open ? 100 : -10,
    // delay:1000,
    bottom: open ? 100 : -500,
    config: { mass: 1, tension: 150, duration: 500 },
  });

  return (
    <AnimatedBox
      style={{ ...animatedProps }}
      sx={{
        bgcolor:'background.darkest',
        zIndex: 100,
        position: "absolute",
        left: "10%",
        // bgcolor: "#151617",
        p: 1,
        pt: 6,
        borderRadius: 2,
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 2, right: 5 }}
      >
        <Close />
      </IconButton>
      <Picker data={data} onEmojiSelect={onSelect} />
    </AnimatedBox>
  );
}

export default EmojiPicker;
