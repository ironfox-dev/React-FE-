import React from 'react';
import { compose } from 'recompose';
import EntityModal from "../index";
import { AutomationReplyFormContainer, LeadsContainer } from "@containers";
import AutomationReplyForm from "components/@common/forms/automation_reply";

const AutomationReplyModal = (props) => (<EntityModal {...{...props, Container: AutomationReplyForm }} />);

export default compose(AutomationReplyFormContainer, LeadsContainer)(AutomationReplyModal);
