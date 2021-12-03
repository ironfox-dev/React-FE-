import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './index.scss';
import { Button } from 'semantic-ui-react';

export default class DatePickerSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }
  getInitialState() {
    return {
      from: null,
      to: null,
      enteredTo: null, // Keep track of the last day for mouseEnter.
    };
  }
  isSelectingFirstDay(from, to, day) {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  }
  handleDayClick(day) {
    const { from, to } = this.state;
    if (from && to && day >= from && day <= to) {
      this.handleResetClick();
      return;
    }
    if (this.isSelectingFirstDay(from, to, day)) {

      if (typeof this.props.onChangeDateFrom === 'function') {
        this.props.onChangeDateFrom(day);
      }

      this.setState({
        from: day,
        to: null,
        enteredTo: null,
      });
    } else {
      if (typeof this.props.onChangeDateTo === 'function') {
        this.props.onChangeDateTo(day);
      }

      this.setState({
        to: day,
        enteredTo: day,
      });
    }
  }
  handleDayMouseEnter(day) {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
      });
    }
  }
  handleResetClick() {
    this.setState(this.getInitialState());
    if (typeof this.props.onRestDate === 'function') {
      this.props.onRestDate();
    }
  }

  componentWillMount() {
    this.setState({
      from: this.props.from,
      to: this.props.to,
      enteredTo: this.props.to,
    });
  }

  render() {
    const { from, to, enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = { before: this.state.from };
    const selectedDays = [from, { from, to: enteredTo }];
    return (
      <div className='freshappDatepicker'>
        <DayPicker
          className="Range"
          numberOfMonths={2}
          month={from}
          selectedDays={selectedDays}
          disabledDays={disabledDays}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
        />
        <div>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
          to &&
          `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
          {from &&
          to && (
            <Button onClick={this.handleResetClick}>
              Reset
            </Button>
          )}
        </div>
      </div>
    );
  }
}
