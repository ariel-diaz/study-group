// @flow

import type {Container} from "unstated";

import React from "react";
import {
  Pane,
  Button,
  Heading,
  TextInputField,
  SelectField,
  toaster,
} from "evergreen-ui";
import {Form, FormItem} from "react-local-form";
import connect from "unstated-connect";
import Wrapper from "../../../ui/Container";

import UniversityContainer from "../../universities/container";
import UserContainer from "../../user/container";
import GroupContainer from "../container";

type Props = {
  containers: Array<Container>,
  history: any,
};

const CreateScreen = ({
  containers: [university, group, user],
  history,
}: Props) => (
  <Pane appearance="tint1" height="100%" padding={24} width="100%">
    <Wrapper>
      <Heading color="white" marginY="24px" size={900}>
        Crear grupo
      </Heading>
      <Form
        render={({values, errors}) => {
          const universities = university.state.list;
          const selectedUniversity = universities.find(
            _university => _university.id === values.university
          );

          return (
            <Pane backgroundColor="white" elevation={1} padding={24}>
              <FormItem
                name="title"
                rules={[value => !value && "Este campo es requerido"]}
                validate={["mount", "change"]}
              >
                <TextInputField required label="Título" />
              </FormItem>
              <FormItem name="description" validate={["mount", "change"]}>
                <TextInputField label="Descripción" type="text" />
              </FormItem>
              <FormItem
                name="limit"
                rules={[value => !value && "Este campo es requerido"]}
                validate={["mount", "change"]}
              >
                <TextInputField required label="Plazas" type="number" />
              </FormItem>
              <FormItem
                name="location"
                rules={[value => !value && "Este campo es requerido"]}
                validate={["mount", "change"]}
              >
                <TextInputField required label="Ubicación" />
              </FormItem>
              <FormItem
                name="datetime"
                rules={[value => !value && "Este campo es requerido"]}
                validate={["mount", "change"]}
              >
                <TextInputField
                  required
                  label="Horario"
                  type="datetime-local"
                />
              </FormItem>
              <FormItem
                name="university"
                rules={[value => !value && "Este campo es requerido"]}
                validate={["mount", "change"]}
              >
                <SelectField required label="Universidad">
                  <option disabled value="">
                    Seleccione una universidad
                  </option>
                  {universities.map(_university => (
                    <option key={_university.id} value={_university.id}>
                      {_university.id}
                    </option>
                  ))}
                </SelectField>
              </FormItem>
              {selectedUniversity && (
                <FormItem
                  name="assignment"
                  rules={[value => !value && "Este campo es requerido"]}
                  validate={["mount", "change"]}
                >
                  <SelectField required label="Materia">
                    <option disabled value="">
                      Seleccione una universidad
                    </option>
                    {selectedUniversity.assignments.map(assignment => (
                      <option key={assignment} value={assignment}>
                        {assignment}
                      </option>
                    ))}
                  </SelectField>
                </FormItem>
              )}
              <Button
                disabled={Boolean(errors.length)}
                isLoading={group.state.syncing}
                type="submit"
              >
                Crear
              </Button>
            </Pane>
          );
        }}
        values={{
          university: "",
          assignment: "",
          participants: [user.state.profile],
        }}
        onSubmit={async ({values}) => {
          const data = await group.create(values);

          toaster.success("Tu grupo fue creado");

          history.push(`/groups/${data.id}`);
        }}
      />
    </Wrapper>
  </Pane>
);

export default connect([UniversityContainer, GroupContainer, UserContainer])(
  CreateScreen
);
