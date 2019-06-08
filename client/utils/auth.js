import { AsyncStorage } from "react-native";

let user = {};
let token = "";

const setUser = newUser => {
  user = newUser;
};

const getUser = () => user;

const loadUser = () =>
  AsyncStorage.getItem("user")
    .then(JSON.parse)
    .then(setUser);

const saveUser = userData =>
  AsyncStorage.setItem(
    "user",
    typeof userData === "string" ? userData : JSON.stringify(userData)
  )
    .then(loadUser)
    .then(setToken);

const setToken = () => {
  const tok = user.username + ":" + user.password;
  const hash = btoa(tok);
  token = "Basic " + hash;
};

const getToken = () => token;

export { setUser, getUser, loadUser, saveUser, getToken };
