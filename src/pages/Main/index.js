import React, {useState, useEffect} from 'react';
import {Platform, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Imc from '../../components/main/Imc';

import Slider from '@react-native-community/slider';

import {storeImc, getClassification, calculate} from '../../services/imc';

import {
  purchased,
  requestPurschase,
  fetchAvailableProducts,
  purchaseUpdateSubscription,
} from '../../services/purchase';

import Colors from '../../styles/colors';

/* SÓ TEM ESSES 4 PRODUTOS DE EXEMPLO,
PORÉM SOMENTE O 'android.test.purchased
É POSSÍVEL FINALIZAR A COMPRA
*/
const itemSubs = Platform.select({
  android: [
    'android.test.purchased',
    'android.test.canceled',
    'android.test.refunded',
    'android.test.item_unavailable',
  ],
});

// ID DO PRODUTO EXEMPLO QUE DA PARA CONCRETIZAR A COMPRA
const defaultProductId = 'android.test.purchased';

const Main = ({navigation}) => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [imc, setImc] = useState(0);
  const [imcAvaliation, setImcAvaliation] = useState('Indeterminado');
  const [imcAvaliationColor, setImcAvaliationColor] = useState(Colors.carbon);

  useEffect(() => {
    fetchAvailableProducts(itemSubs);
  }, []);

  useEffect(() => {
    purchaseUpdateSubscription();
  }, []);

  const onRegisterClick = async () => {
    await storeImc({
      imc,
      classification: imcAvaliation,
      color: imcAvaliationColor,
      height,
      weight,
    });
    navigation.navigate('Historic');
  };

  const onHistoricPress = async () => {
    navigation.navigate('Historic');
  };

  const imcClassification = (val) => {
    const {classification, classificationColor} = getClassification(val);
    setImcAvaliation(classification);
    setImcAvaliationColor(classificationColor);
  };

  const imcCalculate = () => {
    const calculated = calculate(weight, height);
    setImc(calculated);
    imcClassification(calculated);
  };

  return (
    <View style={styles.container}>
      <Imc
        value={imc}
        avaliationColor={imcAvaliationColor}
        avaliation={imcAvaliation}
      />
      <Text style={styles.label}>Seu Peso</Text>
      <View style={styles.weightContainer}>
        <Text style={styles.sliderValue}>{weight} Kg</Text>
        <Slider
          style={{width: 279}}
          minimumValue={0}
          maximumValue={200}
          minimumTrackTintColor={Colors.blue}
          maximumTrackTintColor={Colors.black}
          thumbTintColor={Colors.blue}
          onValueChange={(v) => setWeight(v)}
          onSlidingComplete={(_) => imcCalculate()}
          value={weight}
          step={1}
        />
      </View>
      <Text style={styles.label}>Sua Altura</Text>
      <View style={styles.weightContainer}>
        <Text style={styles.sliderValue}>{height} m</Text>
        <Slider
          style={{width: 279}}
          minimumValue={0}
          maximumValue={2.5}
          minimumTrackTintColor={Colors.blue}
          maximumTrackTintColor={Colors.black}
          thumbTintColor={Colors.blue}
          onValueChange={(v) => setHeight(v.toFixed(2))}
          onSlidingComplete={(_) => imcCalculate()}
          value={parseFloat(height)}
          step={0.01}
        />
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={onRegisterClick}>
        <Text style={styles.registerButtonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onHistoricPress}>
        <Text style={styles.historicButtonText}>Histórico</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
  },
  label: {
    color: Colors.white,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.17,
    marginTop: 40,
  },
  weightContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginTop: 13,
    height: 75,
    width: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderValue: {
    fontSize: 37,
    color: Colors.champagneDark,
  },
  registerButton: {
    height: 75,
    width: 320,
    borderRadius: 12,
    marginTop: 54,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    color: Colors.white,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.17,
  },
  historicButtonText: {
    color: Colors.blue,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.17,
    fontStyle: 'italic',
    marginTop: 40,
  },
});

export default Main;
