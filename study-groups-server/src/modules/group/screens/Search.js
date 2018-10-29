import React, {Component} from "react";
import {Combobox, Pane, Text} from "evergreen-ui";
import connect from "unstated-connect";
import GroupCard from "./GroupCard";
import Container from "../../../ui/Container";
import UniversityContainer from "../../universities/container";
import GroupContainer from "../container";

class Search extends Component {
  state = {
    university: "",
    assignment: "",
  };

  handleUniversityChange = university => {
    this.setState(prevState => ({
      university,
      assignment:
        university !== prevState.university ? "" : prevState.assignment,
    }));
  };

  handleAssignmentChange = assignment => {
    const {university} = this.state;
    const {
      containers: [, groupContainer],
    } = this.props;

    this.setState({
      assignment,
    });
    groupContainer.search(university, assignment);
  };

  render() {
    const {
      containers: [universityContainer, groupContainer],
    } = this.props;
    const {university, assignment} = this.state;

    const universities = universityContainer.state.list;
    const assignments = university
      ? universities.find(u => u.id === university).assignments
      : [];

    return (
      <Pane width="100%">
        <Pane background="#192a3a" paddingY="30px">
          <Container>
            <Pane display="flex" justifyContent="center">
            {universities}
              {/* <Combobox
                height={40}
                items={universities.map(u => u.description)}
                placeholder="Universidad"
                selectedItem={university}
                onChange={this.handleUniversityChange}
              />
              <Pane width="20px" />
              <Combobox
                height={40}
                items={assignments}
                placeholder="Materia"
                selectedItem={assignment}
                onChange={this.handleAssignmentChange}
              /> */}
            </Pane>
          </Container>
        </Pane>
        <Pane>
          <Container>
            <Pane paddingY="30px">
              {/* eslint-disable-next-line no-nested-ternary */}
              {!university || !assignment ? (
                <Text color="white">
                  Seleccione una universidad y materia para buscar.
                </Text>
              ) : groupContainer.state.list.length === 0 ? (
                <Text color="white">No hay resultados para tu busqueda.</Text>
              ) : (
                groupContainer.state.list.map(currentGroup => (
                  <GroupCard group={currentGroup} />
                ))
              )}
            </Pane>
          </Container>
        </Pane>
      </Pane>
    );
  }
}

export default connect([UniversityContainer, GroupContainer])(Search);
