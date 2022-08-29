const { default: axios } = require("axios");
const { request } = require("express");

const users = [];

// Adds user to a room
const addUser = ({ id, user, room }) => {
  // Clean the data
  const userCheck = user.trim().toLowerCase();
  const roomCheck = room.trim().toLowerCase();

  // Validate the data
  if (!userCheck || !roomCheck) {
    return {
      error: "User and room are required!",
    };
  }

  // Check for existing user in a room
  // const existingUser = users.find(
  //   (find) => find.room === room && find.user === user
  // );

  // // Validate username
  // if (existingUser) {
  //   return {
  //     error: "Username already taken!",
  //   };
  // }

  // Stores the user
  const newUser = { id, user, room };
  users.push(newUser);
  return { newUser };
};

const removeUser = (id) => {
  const index = users.findIndex((find) => find.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((find) => find.id === id);

const getUsersInRoom = (room) => users.filter((find) => find.room === room);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
