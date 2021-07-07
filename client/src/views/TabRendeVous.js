import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Table,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { edit_rdv } from "redux/actions/rdvAction";
import { minHours, minDateMonth } from "../components/Utils/DateServices";
import RowTableRDV from "../components/Table/RowTableRDV";

export const TabRendeVous = ({ listRdv }) => {
  const [state, setState] = useState({
    focused: "",
    addModalEntreprise: false,
    isloading: true,
    searchTerm: "",
  });
  const onFocus = () => {
    setState((prevState) => {
      return { ...prevState, focused: "input-group-focus" };
    });
  };
  const onBlur = () => {
    setState((prevState) => {
      return { ...prevState, focused: "" };
    });
  };
  const handleSearch = (e) => {
    let value = e.target.value;
    setState((prevState) => {
      return {
        ...prevState,
        searchTerm: value,
      };
    });
  };

  return (
    <>
      <Col md="5" className="my-3">
        <InputGroup className={state.focused}>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="tim-icons icon-zoom-split" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type="text"
            placeholder="Rechercher une entreprise"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleSearch}
          />
        </InputGroup>
      </Col>
      <Table className="tablesorter" responsive>
        <thead className="text-primary">
          <tr>
            <th></th>
            <th>Nom</th>
            <th>Date</th>
            <th className="text-center">Heure</th>
            <th className="text-center">Ville</th>
            <th className="text-center">Statut</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listRdv
            .filter((item) => {
              return (
                item.nom
                  .toLowerCase()
                  .includes(state.searchTerm.toLowerCase()) ||
                item.ville
                  .toLowerCase()
                  .includes(state.searchTerm.toLowerCase())
              );
            })
            .map((item) => (
              <RowTableRDV key={item.id} data={item} />
            ))}
        </tbody>
      </Table>
    </>
  );
};

const mapStateToProps = (state) => ({
  listRdv: state.rdvReducer.dataCollection,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TabRendeVous);
