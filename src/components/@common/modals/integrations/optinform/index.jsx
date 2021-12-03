import React from 'react';
import EntityModal from "../../index";
import { compose } from 'recompose';
import IntegrationOptinForm from "components/@common/forms/integrations/optinform";
import {OptinFormIntegrationContainer} from "@containers";

const ModalOptinFormIntegration = (props) =>
  (<EntityModal {...{...props, Container: IntegrationOptinForm }} />);

export default compose(OptinFormIntegrationContainer)(ModalOptinFormIntegration);