import axios from "axios";

const URL = "/api/universities";

export default {
  fetch: () => axios(URL).then(result => result.data),
};
