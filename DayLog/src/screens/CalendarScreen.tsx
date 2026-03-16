import React, { useContext, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import CalendarView from '../components/CalendarView';
import LogContext from '../contexts/LogContext';
import { format, formatDate } from 'date-fns';
import { tr } from 'date-fns/locale';
import FeedList from '../components/FeedList';

function CalendarScreen() {
  const { logs } = useContext(LogContext);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const markedDates = useMemo(() => {
    return logs.reduce((acc, current) => {
      const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
      acc[formattedDate] = { marked: true };
      return acc;
    }, {});
  }, [logs]);

  const filteredLogs = logs.filter(
    log => format(new Date(log.date), 'yyyy-MM-dd') === selectedDate,
  );
  return (
    <FeedList
      logs={filteredLogs}
      ListHeaderComponent={
        <CalendarView
          markedDates={markedDates}
          selectedDate={selectedDate}
          onSelectedDate={setSelectedDate}
        />
      }
    />
  );
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
