import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import Calendar from '../../components/historic/Calendar';
import DayInfos from '../../components/historic/DayInfos';

import moment from '../../vendors/moment';
import Colors from '../../styles/colors';

import {getAllMarkedDates, getDayInfos} from '../../services/calendar';

const Historic = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [dayInfos, setDayInfos] = useState({
    imc: 0,
    imcAvaliation: 'Indeterminado',
    imcAvaliationColor: Colors.carbon,
    day: moment().format('D'),
    weight: '',
    height: '',
  });

  useEffect(() => {
    const loadMonthMarkedDates = async () => {
      setMarkedDates(await getAllMarkedDates());
    };

    loadMonthMarkedDates();
  }, []);

  useEffect(() => {
    const loadDayInfos = async () => {
      const dayInfosResponse = await getDayInfos();
      setDayInfos(dayInfosResponse);
    };

    loadDayInfos();
  }, []);

  return (
    <View style={styles.container}>
      <Calendar markedDates={markedDates} setDayInfos={setDayInfos} />
      <DayInfos data={dayInfos} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Historic;
