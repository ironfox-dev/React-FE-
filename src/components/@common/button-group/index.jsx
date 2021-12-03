import React, { Component } from 'react';
import { compose } from 'redux';

// eslint-disable-next-line import/no-unresolved
import { ButtonGroupContainer } from '@containers';
import { Button } from 'semantic-ui-react';

// eslint-disable-next-line react/prefer-stateless-function
class ButtonGroup extends Component {
  state = {
    id: (Math.floor(Math.random() * (4000000 - 1000000 + 1)) + 1000000),
  };

  // eslint-disable-next-line react/sort-comp
  handleOnClick = () => {
    this.props.addActiveGroupButton(this.state.id);
  };

  componentDidMount() {
    document.addEventListener('mouseout', (e) => {
      // if (e.target.className.search(/button/gi) === -1) {
        // this.props.hideAll();
      // }
    });
    document.addEventListener('click', (e) => {
      // if (e.target.className && e.target.className.indexOf('custom-buttons') === -1) {
      //   this.props.hideAll();
      // }
      // e.stopImmediatePropagation();
    });
  }

  isActive = id => (!!this.props.buttonGroup[id]);

  render() {
    const { className } = this.props;
    return (
      <Button.Group
        className={`custom-buttons ${(className || '')} ${(this.isActive(this.state.id) ? 'active' : '')}`}
        onClick={this.handleOnClick}
      >
        { this.props.children }
      </Button.Group>
    );
  }
}

export default compose(ButtonGroupContainer)(ButtonGroup);
