import { Box, Link, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

import Avatar from "./general/Avatar";
import { timeFormat } from "../utils/formatter";

function Message({ id, user, createdAt, link, text }) {
  return (
    <Box
      sx={{
        mb: 1,
        minWidth: 200,
        minHeight: 50,
      }}
    >
      <Stack color="white" direction={"row"}>
        <Avatar id={id} />
        <Stack sx={{ ml: 2 }}>
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
            <Link href={link} underline="hover" color="white" target="_blank">
              {text}
            </Link>
          ) : (
            <Typography sx={{ wordBreak: "break-word" }}>{text}</Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default Message;
