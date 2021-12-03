import React from 'react';
import EntityModal from "../index";
import { compose } from 'recompose';
import {CompaniesContainer, MessagesContainer, DealFormContainer, ProfileContainer} from "@containers";
import DealForm from "components/@common/forms/deal";

const DealModal = (props) => (<EntityModal {...{...props, Container: DealForm }} />);

export default compose(ProfileContainer, MessagesContainer, CompaniesContainer, DealFormContainer)(DealModal);