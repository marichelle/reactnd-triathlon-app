import React from 'react';
import { Slider, Text, View } from 'react-native';

export default function UdaciSlider({ max, step, unit, value, onChange }) {
  return (
    <View>
      <Slider
        minimumValue={0}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onChange}
      />
      <Text>
        {value} {unit}
      </Text>
    </View>
  );
}
