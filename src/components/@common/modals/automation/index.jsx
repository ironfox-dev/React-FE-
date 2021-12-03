import React from 'react';
import { compose } from 'recompose';
import EntityModal from "../index";
import { AutomationFormContainer, LeadsContainer } from "@containers";
import AutomationForm from "components/@common/forms/automation";

const AutomationModal = (props) => (<EntityModal {...{...props, Container: AutomationForm, displayDeleteButton: true }} />);

export default compose(AutomationFormContainer, LeadsContainer)(AutomationModal);
