const generateMessage = (user, text, link = undefined) => {
  return {
    user,
    text,
    createdAt: new Date().getTime(),
    link,
  };
};

module.exports = { generateMessage };
