import {Container} from "unstated";

import api from "./resources";

export default class GroupContainer extends Container {
  state = {
    list: [],
    selected: null,
    syncing: false,
  };

  search = async (university, assignment) => {
    const list = await api.search(university, assignment);
    this.setState({list});
  };

  async fetch(id) {
    const selected = await api.fetch(id);

    this.setState({selected});
  }

  async create(data) {
    this.setState({syncing: true});

    const group = await api.create(data);

    this.setState(({list}) => ({
      list: list.concat(group),
      selected: group,
      syncing: false,
    }));

    return group;
  }

  update = async data => {
    const profile = await api.update(data);

    this.setState({profile});
  };

  join = async (user) => {
    this.setState(({selected}) => ({
      selected: {
        ...selected,
        participants: [
          ...selected.participants,
          user.id
        ]
      }
    }))
  }

  leave = async (id) => {
    this.setState(({selected}) => ({
      selected: {
        ...selected,
        participants: selected.participants.filter(userId => userId !== id)
      }
    }))
  }
}
