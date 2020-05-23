export const createUserName = () => {
  return Date.now().toString(36);
};

export const uniquePollId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
