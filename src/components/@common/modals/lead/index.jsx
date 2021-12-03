import React from 'react';
import EntityModal from "../index";
import { compose } from 'recompose';
import {
  CompaniesContainer, DealsContainer, MessagesContainer, LeadFormContainer,
  LeadsContainer, ProfileContainer
} from "@containers";
import LeadForm from "../../forms/lead";

const LeadModal = (props) => (<EntityModal {...{...props, Container: LeadForm }} />);

export default compose(ProfileContainer, LeadFormContainer, MessagesContainer, LeadsContainer, CompaniesContainer, DealsContainer)(LeadModal);