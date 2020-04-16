import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DateHeader from './DateHeader';
import TextButton from './TextButton';
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import { addEntry } from '../actions';
import {
  getDailyReminderValue,
  getMetricMetaInfo,
  timeToString,
} from '../utils/helpers';
import { removeEntry, submitEntry } from '../utils/api';
import { purple, white } from '../utils/colors';

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };

  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] - getMetricMetaInfo(metric).step;

      return {
        ...state,
        [metric]: count < 0 ? 0 : count,
      };
    });
  };

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState((state) => {
      const count = state[metric] + step;

      return {
        ...state,
        [metric]: count > max ? max : count,
      };
    });
  };

  reset = () => {
    const key = timeToString();

    // update redux
    this.props.dispatch(
      addEntry({
        [key]: getDailyReminderValue(),
      })
    );

    // route to home

    // update to database
    removeEntry(key);
  };

  slide = (metric, value) => {
    this.setState((state) => ({
      [metric]: value,
    }));
  };

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    // update redux
    this.props.dispatch(
      addEntry({
        [key]: entry,
      })
    );

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }));

    // navigate to home

    // save to database
    submitEntry({ key, entry });

    // clear local notification
  };

  render() {
    const metaInfo = getMetricMetaInfo();

    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          {Platform.OS === 'ios' ? (
            <Ionicons name={'ios-happy'} size={100} />
          ) : (
            <Ionicons name={'md-happy'} size={100} />
          )}

          <Text>You already logged your information for today</Text>
          <TextButton style={{ padding: 10 }} onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key} style={styles.row}>
              {getIcon()}
              {type === 'slider' ? (
                <UdaciSlider
                  value={value}
                  onChange={(value) => this.slide(key, value)}
                  {...rest}
                />
              ) : (
                <UdaciStepper
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              )}
            </View>
          );
        })}

        <SubmitBtn onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    borderRadius: 2,
    height: 45,
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    padding: 10,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
});

function mapStateToProps(state) {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && state[key].today === undefined,
  };
}

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  );
}

export default connect(mapStateToProps)(AddEntry);
