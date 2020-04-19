import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import UdaciFitnessCalendar from 'udacifitness-calendar';

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
              [timeToString()]: getDailyReminderValue(),
            })
          );
        }
      });
  }

  renderEmptyDate = (formattedDate) => (
    <View>
      <Text>No data for this day</Text>
    </View>
  );

  renderItem = (formattedDate, key, { today, ...metrics }) => (
    <View>
      {today ? (
        <Text>{JSON.stringify(today)}</Text>
      ) : (
        <Text>{JSON.stringify(metrics)}</Text>
      )}
    </View>
  );

  render() {
    const { entries } = this.props;

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    );
  }
}

function mapStateToProps(entries) {
  return { entries };
}

export default connect(mapStateToProps)(History);
