import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { Calendar } from 'react-native-calendars';

function CalendarView() {
  const markedDates = {
    '2026-03-17': {
      selected: true,
    },
    '2026-03-18': {
      marked: true,
    },
    '2026-03-19': {
      marked: true,
    },
  };
  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedDates}
      renderArrow={direction => (
        <Text style={{ color: '#009688', fontSize: 18 }}>
          {direction === 'left' ? '‹' : '›'}
        </Text>
      )}
      theme={{
        selectedDayBackgroundColor: '#009688',
        arrowColor: '#009688',
        dotColor: '#009688',
        todayTextColor: '#009688',
      }}
    />
  );
}

export default CalendarView;

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});
