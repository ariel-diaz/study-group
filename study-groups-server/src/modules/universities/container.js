import {Container} from "unstated";

import api from "./resources";

export default class UniversityContainer extends Container {
  state = {
    list: [],
  };

  async fetch() {
    const list = await api.fetch();
    console.log(list);
    this.setState({list});
  }
}
