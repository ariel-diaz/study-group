import axios from "axios";

const URL = "/universities";

export default {
  fetch: () => axios(URL).then(result => result.data),
};
