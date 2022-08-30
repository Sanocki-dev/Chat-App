import React from "react";
import {
  FormControl,
  InputBase,
  InputLabel,
  styled,
  alpha,
  Box,
  useTheme,
} from "@mui/material";

const StyledInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2.5),
  // },
  // "& .MuiInputBase-input": {
    borderRadius: 6,
    position: "relative",
    backgroundColor:
      theme.palette.mode === "light"
        ? "#fcfcfb"
        : theme.palette.background.input,
    border: theme.palette.mode === "light" && "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 15px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.5)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const Input = (props) => {
  const { onSubmit, label, errorMessage, ...others } = props;
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleInput = (e) => {
    if (e.key === "Enter" && others.multiline) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel
        shrink
        sx={{
          color: others.error && "error.light",
          fontWeight: "600",
          pr:2,
          "&.Mui-focused": {
            color: others.error ? "error.main" : isDark ? "#fcfcfb" : "#202225",
          },
        }}
      >
        <Box
          sx={{
            textTransform: "uppercase",
            display: "inline-block",
            letterSpacing: 0.5,
            mr: 0.5,
          }}
        >
          {label}
        </Box>
        <Box fontWeight={400} display="inline-block" fontStyle="italic">
          {others.error && "- " + errorMessage}
        </Box>
      </InputLabel>
      <StyledInput onKeyDown={handleInput} {...others}>
        input
      </StyledInput>
    </FormControl>
  );
};

export default Input;
