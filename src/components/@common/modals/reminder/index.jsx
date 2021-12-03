import React from 'react';
import { compose } from 'recompose';
import EntityModal from "../index";
import { MessagesContainer, ReminderFormContainer } from "@containers";
import ReminderForm from "components/@common/forms/reminder";

const ReminderModal = (props) => (<EntityModal {...{...props, Container: ReminderForm}} />);

export default compose(MessagesContainer, ReminderFormContainer)(ReminderModal);
