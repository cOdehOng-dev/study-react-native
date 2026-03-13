import React from 'react';
import { StyleSheet } from 'react-native';
import CalendarView from '../components/CalendarView';

function CalendarScreen() {
  return <CalendarView />;
}

export default CalendarScreen;

const styles = StyleSheet.create({
  block: {},
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
  },
});
