import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../../../styles/colors';

const DayInfos = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.imcBorder, {borderColor: data.imcAvaliationColor}]}>
        <Text style={[styles.imcValue, {color: data.imcAvaliationColor}]}>
          {data.imc}
        </Text>
        <Text style={[styles.imcAvaliation, {color: data.imcAvaliationColor}]}>
          {data.imcAvaliation}
        </Text>
      </View>
      <View style={styles.labels}>
        <Text style={styles.dayLabel}>Dia {data.day}</Text>
        <Text style={styles.label}>{data.weight} Kg</Text>
        <Text style={styles.label}>{data.height} m</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 30,
  },
  imcBorder: {
    width: 180,
    height: 180,
    borderRadius: 150,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imcValue: {
    fontSize: 56,
    fontWeight: '300',
  },
  imcAvaliation: {
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
    width: 150,
  },
  labels: {
    justifyContent: 'center',
  },
  label: {
    color: Colors.white,
    fontSize: 40,
  },
  dayLabel: {
    color: Colors.asphaltDark,
    fontSize: 20,
    fontStyle: 'italic',
  },
});

export default DayInfos;
