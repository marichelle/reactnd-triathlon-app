import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';

export default function UdaciStepper({
  max,
  step,
  unit,
  value,
  onIncrement,
  onDecrement,
}) {
  return (
    <View>
      <View>
        <TouchableOpacity onPress={onDecrement}>
          <FontAwesome name="minus" size={30} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onIncrement}>
          <FontAwesome name="plus" size={30} color={'black'} />
        </TouchableOpacity>
      </View>
      <Text>{value}</Text>
      <Text>{unit}</Text>
    </View>
  );
}
