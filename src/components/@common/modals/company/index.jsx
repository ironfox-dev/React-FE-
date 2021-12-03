import React  from 'react';
import EntityModal from "../index";
import { compose } from 'recompose';
import { CompanyFormContainer, MessagesContainer } from "@containers";
import CompanyForm from "../../forms/company";

const CompanyModal = (props) => (<EntityModal {...{...props, Container: CompanyForm }} />);

export default compose(CompanyFormContainer, MessagesContainer)(CompanyModal);