import React from "react";
import {Subscribe} from "unstated";

import UserContainer from "../container";

const ProfileScreen = () => (
  <Subscribe to={[UserContainer]}>
    {user => {
      console.log("user: ", user);

      return <div>{`<ProfileScreen />`}</div>;
    }}
  </Subscribe>
);

export default ProfileScreen;
