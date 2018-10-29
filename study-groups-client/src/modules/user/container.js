import {Container} from "unstated";

import api from "./resources";

export default class UserContainer extends Container {
  state = {
    profile: {},
  };

  async login({email, password}) {
    const profile = await api.login({email, password});

    this.setState({profile});
    this.persist(profile);
  }

   restore() {
    const session = localStorage.getItem("session");

    if (session) {
      console.log(session)

      const user = JSON.parse(session);
      this.login(user);
    }
  }

  persist = user => {
    user && localStorage.setItem("session", JSON.stringify(user));
  };

  async update(data) {
    const profile = await api.update(data);

    this.setState({profile});
  }
}
