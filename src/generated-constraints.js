export const constraints = {
  blocked: (value, state) => {
    if (state.blocked === true && value !== true) return false;
    return true;
  },
  risk: (value, state) => {
    if (!["low","medium","high"].includes(value)) return false;
    if (state.blocked === true && value !== "low") return false;
    return true;
  },
  active: (value, state) => {
    if (state.blocked === true && value === true) return false;
    return true;
  },
};
