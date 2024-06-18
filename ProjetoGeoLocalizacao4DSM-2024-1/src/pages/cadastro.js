import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nome, setNome] = useState('');

  const navigation = useNavigation();

  const handleCadastro = async () => {
    const user = {
      nome,
      password,
    };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    navigation.navigate('login');
  };

  const handleVoltar = () => {
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonVoltar} onPress={handleVoltar}>
        <Text style={styles.buttonTextVoltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0f7fa',
  },
  input: {
    borderWidth: 1,
    borderColor: '#0288d1',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonVoltar: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  buttonTextVoltar: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Cadastro;
