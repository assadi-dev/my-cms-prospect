import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
} from "reactstrap";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import listWeek from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import ModalAddEvent from "components/Modal/ModalAddEvent";
import TabRendeVous from "./TabRendeVous";
import { connect } from "react-redux";
import { minDateMonthReverse, minHours } from "components/Utils/DateServices";
import {
  set_modal_addRdv,
  set_modal_editRdv,
} from "redux/actions/modalStateAction";
import ModalEditEvent from "components/Modal/ModalEditEvent";

const Calendar = ({ listRdv, eventsData, set_modal_addRdv, modalState }) => {
  const [state, setState] = useState({
    alert: null,
    addEventModal: false,
    dateSelect: null,
    hTabs: "ht1",
    isLoading: true,
  });

  useEffect(() => {}, [listRdv.isLoading]);

  const showDataEvent = (arg) => {
    alert(arg.event.id);
  };

  const addRDV = (info) => {
    if (typeof info.dateStr === "string") {
      setState((prevState) => {
        return {
          ...prevState,
          dateSelect: info.dateStr,
        };
      });
    }
    showAddEventModal();
  };

  const showAddEventModal = () => {
    set_modal_addRdv(!modalState);
  };

  return (
    <>
      <div className="content">
        <Row>
          <Nav pills className="nav-pills-info mx-auto mb-3">
            <NavItem>
              <NavLink
                className={state.hTabs === "ht1" ? "active" : ""}
                onClick={() => setState({ hTabs: "ht1" })}
                style={{ cursor: "pointer" }}
              >
                Tableau
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={state.hTabs === "ht2" ? "active" : ""}
                onClick={() => setState({ hTabs: "ht2" })}
                style={{ cursor: "pointer" }}
              >
                Calendrier
              </NavLink>
            </NavItem>
          </Nav>
        </Row>
        <Row>
          <Col md="10" className="mx-auto">
            <Card className="mt-3">
              <CardBody>
                <TabContent activeTab={state.hTabs} className="tab-space">
                  <TabPane tabId="ht1">
                    <TabRendeVous />
                  </TabPane>
                  <TabPane tabId="ht2">
                    <FullCalendar
                      selectable={true}
                      height="500px"
                      weekends={false}
                      nowIndicator={true}
                      plugins={[dayGridPlugin, interactionPlugin, listWeek]}
                      themeSystem="bootstrap"
                      initialView="dayGridMonth"
                      editable={true}
                      dayCellClassNames="dayCalendar"
                      dayHeaderClassNames="dayCalendar"
                      locale="fr"
                      dayMaxEventRows={2}
                      eventClassNames="dayCalendar"
                      eventClick={showDataEvent}
                      events={eventsData}
                      dateClick={addRDV}
                      moreLinkText="Afficher"
                      moreLinkClassNames="moreLinkClass"
                      headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth dayGridWeek",
                      }}
                      buttonText={{
                        today: "Aujourd'hui",
                        month: "Mois",
                        week: "Semaine",
                      }}
                      eventTimeFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }}
                    />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        isOpen={modalState}
        modalClassName="modal-black"
        toggle={showAddEventModal}
      >
        <ModalHeader
          className="justify-content-center"
          toggle={showAddEventModal}
        >
          <>
            <span className="modal-title">Ajouter un rendez vous</span>
          </>
        </ModalHeader>
        <ModalBody>
          <ModalAddEvent dateSelect={state.dateSelect} />
        </ModalBody>
      </Modal>
      <ModalEditEvent />
    </>
  );
};

const mapStateToProps = (state) => ({
  listRdv: state.rdvReducer.dataCollection,
  modalState: state.modalStateReducer.addRdv,
  eventsData: state.rdvReducer.dataCollection.map((item) => {
    return {
      id: item.id,
      title: item.nom,
      date: minDateMonthReverse(item.date) + " " + minHours(item.date),
      color: item.color,
    };
  }),
});

const mapDispatchToProps = { set_modal_addRdv };

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
