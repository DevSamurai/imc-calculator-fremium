import React from 'react';
import {StyleSheet} from 'react-native';

import {Calendar as RNCalendars} from 'react-native-calendars';

import {getDayInfos} from '../../../services/calendar';

import Colors from '../../../styles/colors';

const Calendar = ({markedDates, setDayInfos}) => {
  return (
    <RNCalendars
      style={styles.container}
      theme={{
        calendarBackground: Colors.asphaltDark,
        monthTextColor: Colors.white,
        arrowColor: Colors.white,
        dayTextColor: Colors.white,
        todayTextColor: Colors.white,
      }}
      markingType={'custom'}
      markedDates={markedDates}
      onDayPress={async (day) => {
        console.log('selected day', day);
        const dayInfosResponse = await getDayInfos(day.dateString);
        setDayInfos(dayInfosResponse);
      }}
      monthFormat={'MMM, yyyy'}
      onMonthChange={(month) => {
        console.log('month changed', month);
        setDayInfos({
          imc: 0,
          imcAvaliation: 'Indeterminado',
          imcAvaliationColor: Colors.carbon,
          day: '',
          weight: '',
          height: '',
        });
      }}
      hideExtraDays={true}
      firstDay={1}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.champagneDark,
    height: 370,
    width: 350,
    backgroundColor: Colors.asphaltDark,
  },
});

export default Calendar;
