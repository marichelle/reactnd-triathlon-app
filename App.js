import React, { Component } from 'react';
import { View } from 'react-native';
import AddEntry from './components/AddEntry';

export default class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <View>
        <AddEntry />
      </View>
    );
  }
}
