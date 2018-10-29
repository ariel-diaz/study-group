import React from "react";
import {Subscribe} from "unstated";

import GroupContainer from "../container";

const ListScreen = () => (
  <Subscribe to={[GroupContainer]}>
    {group => {
      console.log("group: ", group);

      return <div>{`<ListScreen />`}</div>;
    }}
  </Subscribe>
);

export default ListScreen;
