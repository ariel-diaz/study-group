/* eslint-disable */
import type {Container} from "unstated";

import React, {Component} from "react";
import connect from "unstated-connect";

import styled from "styled-components";
import {Pane, Text, Button, toaster} from "evergreen-ui";
import GroupContainer from "../container";
import UserContainer from "../../user/container";

import { formatDistance, format } from 'date-fns'
import {es} from 'date-fns/locale'

type Props = {
  containers: Array<Container>,
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 24px;
  .side-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 120%;
    margin-top: -100px;
    max-width: 210px;
    .university-image {
      width: 185px;
      height: 185px;
      border-radius: 100%;
      margin-bottom: 20px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 100%;
      }
    }
    button {
      width: 80%;
      justify-content: center;
      align-items: center;
      height: 50px;
      font-weight: bold;
      font-size: 16px;
      letter-spacing: 1.22px;
      text-align: center;
      text-transform: uppercase;
    }
    .participants {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      width: 100%;
      margin-top: 7px;
      height: 30px;
      .participant {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background: #c5bdbd;
        margin: 0 5px;
        animation: fadeIn 0.3s;
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      }
    }
    .lugar-title {
      display: block;
      margin-top: 20px;
    }
    p {
      font-size: 16px;
      color: #000000;
      letter-spacing: 0.42px;
      text-align: center;
      line-height: 22px;
      font-weight: bold;
      margin-top: 0;
    }
  }
  .main-content {
    margin-left: 55px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    h1 {
      margin: 0;
      font-weight: normal;
      font-size: 2rem;
    }
    span.sub-text {
      margin-bottom: 17px;
    }
    p {
      margin-top: 0;
      font-size: 16px;
      color: #000000;
      letter-spacing: 0.42px;
      line-height: 22px;
    }
    .map {
      width: 100%;
      height: 209px;
      margin-top: 20px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .sub-text {
    opacity: 0.52;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 16px;
    color: #000000;
    letter-spacing: 0.42px;
    text-align: center;
  }
`;

const defaultDescription =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien mauris, dapibus eu efficitur et, pharetra eget mauris. Pellentesque condimentum, arcu nec gravida pellentesque, nibh dolor scelerisque massa, ut ullamcorper lectus magna vel sapien.";

class DetailsScreen extends Component {
  props: Props;

  state = {
    joined: false,
  };

  async componentDidMount() {
    const {
      containers: [group],
      match,
    } = this.props;
    await group.fetch(match.params.id);
    console.log("test", this.props.containers[1]);
    // TODO: traer data de los participantes
  }

  isJoined = () => {
    const {
      containers: [group, user]
    } = this.props
    return group.state.selected.participants.some(participant => participant === user.state.profile.id)
  }

  joinGroup = () => {
    const {
      containers: [group, user],
      match,
    } = this.props;

    toaster.closeAll()
    const groupId = group.state.selected.id

    console.log('isJoined', this.isJoined())

    if (!this.isJoined()) {
      console.log('lets join')
      group.join(user.state.profile)
      toaster.success('Te uniste a este grupo de estudio con éxito')
    } else {
      console.log('chau')
      group.leave(user.state.profile.id)
      toaster.notify('Saliste del grupo')
    }
  }

  render() {
    const {
      containers: [group],
    } = this.props;
    const groupData = group.state.selected;
    if (groupData) {
      const {limit, participants, title, assignment, description, datetime} = groupData;
      const date = new Date(datetime)
      const distance = formatDistance(new Date(), date, { locale: es })
      const joined = this.state.joined;
      return (
        <Wrapper>
          <Pane
            elevation={1}
            float="left"
            width='80%'
            maxWidth={764}
            minHeight={515}
            padding={42}
            margin={24}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            display="flex"
            elevation={1}
            flexDirection="row"
            background='#fafafa'
            borderRadius={6}
          >
            <div className="side-info">
              <div className="university-image">
                <img
                  alt="UBA"
                  src="https://www.dc.uba.ar/Trash/eventos/icpc/2009/images/uba_logo.jpg"
                />
              </div>
              <Button onClick={this.joinGroup}
                      appearance={!this.isJoined() && 'primary'}
                      intent={!this.isJoined() ? 'success' : 'danger'}
                      marginBottom={20}
              >
                {!this.isJoined() ? "Unirse" : "Salir"}
              </Button>
              <span className="sub-text">
                QUEDAN {limit - participants.length} LUGARES
              </span>
              <div className="participants">
                {participants.map(participant => (
                  <div key={participant} className="participant" />
                ))}
              </div>
              <span className="sub-text lugar-title">LUGAR Y HORA</span>
              <p>
                Biblioteca de la FADU <br />
                {date.toLocaleString('es-ES')}
              </p>
            </div>
            <div className="main-content">
              <h1>{title}</h1>
              <span className="sub-text">
                {groupData.class || "clase x"} - en {distance}
              </span>
              <p>{description || defaultDescription}</p>
              <div className="map">
                <img
                  alt=""
                  src={require('../../../assets/map.png')}
                />
              </div>
            </div>
          </Pane>
        </Wrapper>
      );
    }
    return "";
  }
}

export default connect([GroupContainer, UserContainer])(DetailsScreen);
