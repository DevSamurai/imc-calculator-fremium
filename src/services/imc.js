import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from '../vendors/moment';

import Colors from '../styles/colors';

export const storeImc = async (data) => {
  try {
    let historicData = await AsyncStorage.getItem('@historicImc');
    const key = moment().format('YYYY-MM-DD');

    if (historicData) {
      historicData = JSON.parse(historicData);
      historicData[key] = data;
      await AsyncStorage.setItem('@historicImc', JSON.stringify(historicData));
      return;
    }

    const newHistoricData = {[key]: data};
    await AsyncStorage.setItem('@historicImc', JSON.stringify(newHistoricData));
  } catch (e) {
    Alert.alert('Erro ao registrar o imc no histórico', e.message);
  }
};

export const getHistoric = async () => {
  const historicData = await AsyncStorage.getItem('@historicImc');

  return JSON.parse(historicData);
};

export const getClassification = (val) => {
  let classification = 'Indeterminado';
  let classificationColor = Colors.carbon;
  switch (true) {
    case val === 0:
      classification = 'Indeterminado';
      classificationColor = Colors.carbon;
      break;
    case val < 18.5:
      classification = 'Magreza';
      classificationColor = Colors.yellow;
      break;
    case val < 25:
      classification = 'Normal';
      classificationColor = Colors.green;
      break;
    case val < 30:
      classification = 'Sobrepeso';
      classificationColor = Colors.orange;
      break;
    case val < 35:
      classification = 'Obesidade';
      classificationColor = Colors.orangeDark;
      break;
    case val < 40:
      classification = 'Obesidade severa';
      classificationColor = Colors.red;
      break;
    case val >= 40:
      classification = 'Obesidade mórbida';
      classificationColor = Colors.redDark;
      break;
  }

  return {classification, classificationColor};
};

export const calculate = (weight, height) => {
  let calculated = Math.round(weight / (height * height));
  calculated = isFinite(calculated) ? calculated : 0;
  return calculated;
};
