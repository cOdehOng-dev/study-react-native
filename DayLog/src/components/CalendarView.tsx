import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { Calendar } from 'react-native-calendars';
import { da } from 'date-fns/locale';

type Props = {
  markedDates: {
    [date: string]: {
      marked?: boolean;
    };
  };
  selectedDate: string;
  onSelectedDate: (date: string) => void;
};

function CalendarView({ markedDates, selectedDate, onSelectedDate }: Props) {
  const markedSelectedDate = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  };
  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedSelectedDate}
      onDayPress={day => {
        onSelectedDate(day.dateString);
      }}
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
