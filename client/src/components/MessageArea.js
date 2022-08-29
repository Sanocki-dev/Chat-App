import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

import NewMessageAlert from "./NewMessageAlert";
import Message from "./Message";

function MessageArea({ messages }) {
  const [scrollAlert, setScrollAlert] = useState(false);

  const scroll = useRef();

  useEffect(() => {
    // Makes sure there it is possible to scroll
    if (!(scroll.current.scrollHeight > scroll.current.clientHeight)) return;
    const newMessage = scroll.current.lastElementChild;
    const bottom =
      scroll.current.scrollHeight -
        scroll.current.scrollTop -
        newMessage?.offsetHeight -
        200 <=
      scroll.current.clientHeight;

    // Checks to see if the person is at the bottom of the chat otherwise dont scroll to the bottom
    if (bottom) {
      return scrollToBottom();
    }
    setScrollAlert(true);
  }, [messages, scrollAlert]);

  const scrollToBottom = () => {
    const newMessage = scroll.current?.lastElementChild;

    newMessage?.scrollIntoView({
      behaviour: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  return (
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
      <NewMessageAlert
        open={scrollAlert}
        onClose={() => setScrollAlert(false)}
        onClick={scrollToBottom}
      />
      {messages?.map((message, index) => (
        <Message {...message} key={index} />
      ))}
    </Box>
  );
}

export default MessageArea;
