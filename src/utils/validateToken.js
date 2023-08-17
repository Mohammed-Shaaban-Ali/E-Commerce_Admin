const { token } = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const ConfigToken = {
  headers: {
    Authorization: `Bearer ${token}`,
    accept: "application/json",
  },
};
