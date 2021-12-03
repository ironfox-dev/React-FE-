import React from "react";
import * as R from "ramda";

export class CustomTooltip extends React.PureComponent {
  state = {
    currentDay: '',
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.currentDay !== this.props.label) {
      this.setState({
        currentDay: this.props.label,
      });
      this.props.onDisplay(this.props.payload);
    }
  }

  render() {
    return (<div>
      <label>{this.props.label}</label> <span
      className="graph-tooltip-value">{R.pathOr(0, [0, 'value'], this.props.payload)}</span>
    </div>);
  }
}
