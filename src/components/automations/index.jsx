import React, {Component} from 'react';
import {compose} from 'recompose';
import './index.scss';
import {Button, Checkbox, Form, Grid, Header, Menu, Segment} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { SVG } from '@svgdotjs/svg.js'
import * as R from 'ramda';

import {
  AutomationFormContainer,
  DealActionsContainer,
  AutomationReplyFormContainer
} from "@containers";

import textIcon from './assets/text.png';
import emailIcon from './assets/email.png';
import statusChangeIcon from './assets/statuschange.png';
import whatsappIcon from './assets/whatsapp.png';
import blindCall from './assets/blindcall.png';
import settingIcon from './assets/settings.png';
import agentPushIcon from './assets/agentpush.png';
import addNew from './assets/addnew.png';
import AutomationModal from "../@common/modals/automation";
import AutomationReplyModal from "../@common/modals/automation_reply";
import {
  TYPE_BLIND_CALL,
  TYPE_EMAIL_MESSAGE,
  TYPE_LEAD_CHANGE_STATUS, TYPE_PUSH_NOTIFICATION,
  TYPE_SMS_MESSAGE
} from "../../@containers/forms/automation/actionTypes";
import {DealFormContainer} from "../../@containers";
import {ifElse} from "ramda";

const refSVGContainer = React.createRef();

class Campaigns extends Component {
  state = {
    isRoot: true,
    scale: 1,
    companyId: null,
    dealId: null,
    has_automation: null
  };

  draw;
  addVerticalButtonContainer;
  addHorizontalButtonContainer;
  addButtonHorizontal;

  createButtonAddVerticalAction(parent) {
    const addVerticalButtonContainer = this.draw.nested().width(60).height(60);
    const addButtonVertical = addVerticalButtonContainer.image(addNew, {cursor: 'pointer'}).dx(0).dy(0);

    addButtonVertical.on('mouseover', () => {
      addButtonVertical.dx(-62);
    });
    addButtonVertical.on('mouseout', () => {
      addButtonVertical.dx(62);
    });

    addButtonVertical.on('click', () => {
      this.props.loadForm({
        show: true,
        is_root: 1,
        id: null,
        object: null,
        parent_id: R.pathOr(null, ['id'], parent),
      });
    });

    return addVerticalButtonContainer;
  }

  createButtonAddHorizontalAction(parent) {
    const addHorizontalButtonContainer = this.draw.nested().width(60).height(60);
    const addButtonHorizontal = addHorizontalButtonContainer.image(addNew, {cursor: 'pointer' }).dx(0).dy(0);

    addButtonHorizontal.on('mouseover', () => {
      addButtonHorizontal.dx(-62);
    });
    addButtonHorizontal.on('mouseout', () => {
      addButtonHorizontal.dx(62);
    });

    addButtonHorizontal.on('click', () => {
      this.props.loadForm({ show: true, is_root: 0, id: null, object: null, parent_id: parent.id });
    });

    return addHorizontalButtonContainer;
  }

  drawHorizontalLine(draw) {
    draw.circle(10, { fill: '#9d9bb5' }).dy(25).dx(137);
    const line = draw.line(0, 0, 165, 0).move(147, 30)
    line.stroke({ color: '#9d9bb5', width: 2, linecap: 'round', dasharray: '4 7' });
  }

  drawVerticalLine(draw) {
    draw.circle(10, { fill: '#9d9bb5' }).dy(185).dx(91);
    const line = draw.line(0, 0, 0, 50).move(96, 190)
    line.stroke({ color: '#9d9bb5', width: 2, linecap: 'round' });
  }

  drawSvg() {
    this.draw.clear();
    this.draw.circle(10, { fill: '#9d9bb5' }).dy(0).dx(91);
    const line = this.draw.line(0, 0, 0, 50).move(96, 10)
    line.stroke({ color: '#9d9bb5', width: 2, linecap: 'round' });

    this.props.actions.forEach(action => {
      const y = (action.index === 0 ? 50 : action.index * (action.index > 1 ? 265 : 290));
      this.drawAction(action).dy(y).dx(0);

      if (this.checkIsAllowedForHorizontalActions(action) && action.children) {
        this.drawHorizontalActions(action.children, action);
      }

      if (this.checkIsAllowedForHorizontalActions(action) && action.children) {
        const lastAction = R.last(action.children);
        const x = ((lastAction.index ) * 240) + 297
        const y = (action.index > 1 ? 200 : 290);
        this.createButtonAddHorizontalAction(lastAction).dx(x).dy((action.index * y) || 50);
      } else if (action.is_root && this.checkIsAllowedForHorizontalActions(action)) {
        const y = action.index * (action.index > 1 ? 200 : 220);
        this.createButtonAddHorizontalAction(action).dy(y || 50).dx(297);
      }
    });

    const lastAction = R.last(this.props.actions);
    const y = (R.path(['index'], lastAction) !== undefined ? (R.path(['index'], lastAction) + 1) * 257 : 50);
    this.createButtonAddVerticalAction(lastAction).move(67, y);
  }

  checkIsAllowedForHorizontalActions(action) {
    return (action.type === TYPE_EMAIL_MESSAGE || action.type === TYPE_SMS_MESSAGE);
  }

  drawHorizontalActions(horizontalActions, parent) {
    const group = this.draw.nested();
    group.dx(0);
      horizontalActions.forEach(action => {
        const offsetOnY =  (parent.index === 0 ? 50 : parent.index * 290);
        const y = (parent.index > 1 ? parent.index * 200 : offsetOnY);
        this.drawAction(action, group).dy(y).dx(action.index * 240);
      });
      return group;
  }

  drawSmsSettingsButton(action, group) {
    group.text('on sms reply').fill({ color: '#666382' }).dy(0).dx(167);
    const onSmsReplySettingsButton = group.image(settingIcon)
    .width(34)
    .height(34)
    .attr('cursor', 'pointer')
    .attr('kid', action.id)
    .dy(-1)
    .dx(247);
    onSmsReplySettingsButton.on('click', () => {
      const action = this.props.getActionBy(onSmsReplySettingsButton.attr('kid'));
      this.props.loadAutomationReplyForm({ show: true, ...action });
    });
  }

  drawTextOnEmailOpen(group) {
    group.text('on email open').fill({ color: '#666382' }).dy(0).dx(167);
  }

  drawAction(action, groupParent) {
    const group = (groupParent ? groupParent.nested() : this.draw.nested());
    switch (action.type) {
      case TYPE_SMS_MESSAGE: {
        this.drawIcon(group, textIcon, action);
        group.text('Text message').fill({ color: '#3c3a4e' }).font({weight:'500'}).dy(80).dx(52);
        group.text('Wait 2 hrs and 30 mins').fill({ color: '#9d9bb5' }).font({weight:'500'}).center(97, 113);
        group.rect(180,40).fill('#fff').stroke('#dfdff0').center(97, 151).rx('20') ;
        const message = (action.object.message || '').slice(0, 17);
        group.text(`${message}...`).fill({ color: '#666382' }).center(97, 150);
        if (action.is_root) {
          this.drawSmsSettingsButton(action, group);
          this.drawHorizontalLine(group);
        }
        break;
      }
      case TYPE_EMAIL_MESSAGE: {
        this.drawIcon(group, emailIcon, action);
        group.text('E-mail').fill({ color: '#3c3a4e' }).font({weight:'500'}).dy(80).dx(75);
        group.text('Wait 2 hrs and 30 mins').fill({ color: '#9d9bb5' }).font({weight:'500'}).center(97, 113);
        group.rect(180,40).fill('#fff').stroke('#dfdff0').center(97, 151).rx('20') ;
        const message = (action.object.subject || '').slice(0, 19);
        group.text(`${message}...`).fill({ color: '#666382' }).center(97, 150);
        if (action.is_root) {
          this.drawTextOnEmailOpen(group);
          this.drawHorizontalLine(group);
        }
        break;
      }
      case TYPE_LEAD_CHANGE_STATUS: {
        this.drawIcon(group, statusChangeIcon, action);
        group.width(400)
        group.text('Change status').fill({ color: '#3c3a4e' }).font({weight:'500'}).dy(80).dx(50);
        group.text('Wait 2 hrs and 30 mins').fill({ color: '#9d9bb5' }).font({weight:'500'}).center(97, 113);
          group.rect(180,40).fill('#fff').stroke('#dfdff0').center(97, 151).rx('20') ;
        if (action.object) {
          if (action.object.status === 'VIEWED') {
            group.text('Follow-up').fill({ color: '#666382' }).center(97, 151);
          } else {
            group.text(action.object.status).fill({ color: '#666382' }).center(97, 151);
          }
        } else {
          group.text('None').fill({ color: '#666382' }).center(97, 151);
        }

        break;
      }
      case TYPE_BLIND_CALL: {
        this.drawIcon(group, blindCall, action);
        group.text('Blind Call').fill({ color: '#3c3a4e' }).font({weight:'500'}).dy(80).dx(63);
          group.text('Wait 2 hrs and 30 mins').fill({ color: '#9d9bb5' }).font({weight:'500'}).center(97, 113);
        break;
      }
      case TYPE_PUSH_NOTIFICATION: {
        this.drawIcon(group, agentPushIcon, action);
        group.text('Agent Notify').fill({ color: '#3c3a4e' }).font({weight:'500'}).dy(80).dx(55);
          group.text('Wait 2 hrs and 30 mins').fill({ color: '#9d9bb5' }).font({weight:'500'}).center(97, 113);
          group.rect(180,40).fill('#fff').stroke('#dfdff0').center(97, 151).rx('20') ;
        const message = (action.object.message || '').slice(0, 18);
        group.text(`${message}...`).fill({ color: '#666382' }).center(97, 150);

      }
      default:
    }
    if (action.is_root) {
      this.drawVerticalLine(group);
    }
    if (!action.is_root) {
      this.drawHorizontalLine(group);
    }
    return group;
  }

  drawIcon(group, icon, action) {
    const iconButton = group.image(icon, { kid: action.id, cursor: 'pointer' }).dx(67);
    iconButton.on('click', () => {
      const action = this.props.getActionBy(iconButton.attr('kid'));
      this.props.loadForm({ show: true, ...action });
    });
  }

  scaleUp = () => {
    const scale = this.state.scale + 0.1;
    this.setState({
      scale,
    })
    this.draw.attr({
      transform: `matrix(${scale},0,0,${scale}, 0, 0)`
    });
  }

  scaleDown = () => {
    const scale = this.state.scale - 0.1;
    this.setState({
      scale,
    })
    this.draw.attr({
      transform: `matrix(${scale},0,0,${scale}, 0, 0)`
    });
  }

  componentDidMount() {
    const {companyId, dealId} = this.props.match.params;
    this.setState({
      companyId,
      dealId,
    });

    this.props.fetchDealActions(dealId);
    this.props.fetchDeal(dealId);

    this.draw = SVG().addTo(refSVGContainer.current).size('100%' , '100%');
    this.draw = this.draw.group();
    this.drawSvg();
  }

  componentDidUpdate(prevProp, prevState) {
    if (JSON.stringify(prevProp.actionsOriginal) !== JSON.stringify(this.props.actionsOriginal)) {
      this.drawSvg();
    }

    if (this.props.deal.has_automation !== undefined && !this.state.has_automation && this.state.has_automation === null) {
      this.setState({
        has_automation: this.props.deal.has_automation,
      })
    }
  }

  onChangeAutomation = (e, checkbox) => {
    const { deal } = this.props;
    this.setState({
      has_automation: checkbox.checked,
    });
    this.props.saveFormDeal({ ...deal, has_automation: +checkbox.checked });
    this.props.fetchDeal(deal.dealId);
  };

  render() {
    const { dealId, has_automation } = this.state;
    const { deal } = this.props;

    return (
      <div className='Automations'>
          <Segment attached='top'>
        <AutomationModal dealId={dealId} />
        <AutomationReplyModal dealId={dealId} />
        <Grid columns={2}>
          <Grid.Column>
            <Header floated='left' as='h1'>Automations</Header>
              <Header floate='left' as='h3'>Campaign name goes here</Header>
          </Grid.Column>
          <Grid.Column>
            <Menu secondary>
              <Menu.Menu position='right'>
                  <div className="buttonsToScale">
                      <Button color=""  className="small-transparent" onClick={this.scaleUp} labelPosition='left'><i
                          aria-hidden="true" className="flaticon stroke zoom-in-1  icon"></i></Button>
                      <Button color=""  className="small-transparent" onClick={this.scaleDown} labelPosition='left'><i
                          aria-hidden="true" className="flaticon stroke zoom-2  icon"></i></Button>
                  </div>
                  <Link to={`/deals/${dealId}/integrations`} >
                  <Button color='teal' content='Integrations' labelPosition='left'/>
                </Link>
                {
                  deal.has_automation !== undefined && (
                    <Checkbox
                      label=""
                      name="has_automation"
                      checked={!!has_automation}
                      toggle
                      onChange={this.onChangeAutomation}
                    />
                  )
                }

              </Menu.Menu>
            </Menu>
          </Grid.Column>
        </Grid>
        <div ref={refSVGContainer} className="automation-container">
          &nbsp;
        </div>
          </Segment>
      </div>
    );
  }
}

export default compose(
  DealFormContainer,
  AutomationReplyFormContainer,
  AutomationFormContainer,
  DealActionsContainer,
)(Campaigns);
