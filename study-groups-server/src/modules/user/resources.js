import axios from "axios";

const URL = "/api/login";

export default {
  login: ({email, password}) =>
    axios(`${URL}`, {
      params: {
        email,
        password
      }
    })
    .then(res => {
      console.log(res);
    }),
  update: data =>
    axios({
      data,
      url: URL,
      method: "PATCH",
    }),
};
