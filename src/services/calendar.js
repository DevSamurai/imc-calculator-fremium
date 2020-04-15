import {LocaleConfig} from 'react-native-calendars';

import moment from '../vendors/moment';
import {getHistoric} from './imc';

export const defineLocales = () => {
  LocaleConfig.locales.pt = {
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dec',
    ],
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sabado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    today: "Hoje'Hoje",
  };
};

export const defaultLocale = (locale = 'pt') => {
  LocaleConfig.defaultLocale = locale;
};

export const getMonthMarkedDates = async (date) => {
  const formatDate = moment(date).format('YYYY-MM-DD');
  const prefix = formatDate.substr(0, 7);
  const historicData = await getHistoric();
  let result = {};
  if (historicData) {
    for (let index = 1; index < 32; index++) {
      const key = `${prefix}-${('0' + index).slice(-2)}`;
      const element = historicData[key];
      if (element) {
        result[key] = {
          customStyles: {
            container: {
              backgroundColor: element.color,
            },
          },
        };
      }
    }
  }
  return result;
};

export const getAllMarkedDates = async () => {
  const historicData = await getHistoric();
  let result = {};
  if (historicData) {
    Object.entries(historicData).forEach(([key, value]) => {
      result[key] = {
        customStyles: {
          container: {
            backgroundColor: value.color,
          },
        },
      };
    });
  }
  return result;
};

export const getDayInfos = async (date) => {
  const formatDate = moment(date).format('YYYY-MM-DD');
  const historicData = await getHistoric();
  let result = {};
  if (historicData && historicData[formatDate]) {
    result = {
      imc: historicData[formatDate].imc,
      imcAvaliation: historicData[formatDate].classification,
      imcAvaliationColor: historicData[formatDate].color,
      day: moment(formatDate).format('DD'),
      weight: historicData[formatDate].weight,
      height: historicData[formatDate].height,
    };
  }
  return result;
};
