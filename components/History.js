import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { addEntry, receiveEntries } from '../actions';
import { fetchCalendarResults } from '../utils/api';
import { getDailyReminderValue, timeToString } from '../utils/helpers';

class History extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    fetchCalendarResults()
      .then((entries) => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(
            addEntry({
              [timeToString]: getDailyReminderValue(),
            })
          );
        }
      });
  }

  render() {
    return (
      <View>
        <Text> {JSON.stringify(this.props)} </Text>
      </View>
    );
  }
}

function mapStateToProps(entries) {
  return { entries };
}

export default connect(mapStateToProps)(History);
