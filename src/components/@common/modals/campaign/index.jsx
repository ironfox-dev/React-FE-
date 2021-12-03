import React from 'react';
import { compose } from 'recompose';
import EntityModal from "../index";
import CampaignForm from "components/@common/forms/campaign";
import { AgentsContainer, CompaniesContainer, DealsContainer, CampaignFormContainer, MessagesContainer } from "@containers";

const CampaignModal = (props) => (<EntityModal {...{...props, Container: CampaignForm }} />);

export default compose(
  CampaignFormContainer,
  DealsContainer,
  CompaniesContainer,
  MessagesContainer,
  AgentsContainer)(CampaignModal);