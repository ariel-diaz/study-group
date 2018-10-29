import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Pane, Heading, Avatar, Pill, Paragraph, Text, Icon} from "evergreen-ui";

import {formatDistance} from "date-fns";
import {es} from "date-fns/locale";

const Card = styled.div`
  min-width: 800px;
  margin-bottom: 2em;
  padding: 1em;
  background: #f7f7f7;
  border: 1px solid #dcdcdc;
  font-family: "Open Sans", sans-serif;
  -webkit-box-shadow: 2px 3px 28px -6px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 3px 28px -6px rgba(0, 0, 0, 0.75);
  box-shadow: 2px 3px 28px -6px rgba(0, 0, 0, 0.75);
  transition: 0.3s ease-in-out;
  &:hover {
    box-shadow: 5px 8px 20px 0px rgba(0, 0, 0, 0.42);
  }
  header {
    border-bottom: 1px solid #b5b5b5;
    display: flex;
    justify-content: space-between;
    .nameandlimit {
      width: 99%;
      font-size: 16px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      font-weight: bold;
    }
  }
  section {
    display: flex;
    justify-content: space-between;
    .title {
      color: #2b2020;
      font-size: 14px;
    }
    p {
      display: flex;
      flex-direction: column;
    }
  }
`;

const GroupCard = ({group}) => (
  <Link to={`/groups/${group.id}`}>
    <Card elevation={1}>
      <Pane
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        marginBottom="8px"
      >
        <Heading size="800">{group.title}</Heading>
        <Pane alignItems="center" display="flex">
          <Pill display="inline-flex" marginRight={16}>
            {group.participants.length}/{group.limit}
          </Pill>
          {group.participants.map((_, i) => (
            <Avatar
              size={40}
              src={`https://randomuser.me/api/portraits/women/${i + 1}.jpg`}
            />
          ))}
        </Pane>
      </Pane>
      <Paragraph marginBottom="24px" size={400}>
        {group.description}
      </Paragraph>
      <Pane alignItems="center" display="flex" justifyContent="space-between">
        <Pane alignItems="center" display="flex">
          <Icon icon="time" marginRight="6px" />
          <Text size={400}>
            {"en"}{" "}
            {formatDistance(new Date(), new Date(group.datetime), {
              locale: es,
            })}
          </Text>
        </Pane>
        <Pane alignItems="center" display="flex">
          <Icon icon="geolocation" marginRight="6px" />
          <Text size={400}>{group.location}</Text>
        </Pane>
      </Pane>
    </Card>
  </Link>
);

export default GroupCard;
