const generateMessage = ({ id, user, text, link = undefined }) => {
  return {
    id,
    user,
    text,
    createdAt: new Date().getTime(),
    link,
  };
};

module.exports = { generateMessage };
