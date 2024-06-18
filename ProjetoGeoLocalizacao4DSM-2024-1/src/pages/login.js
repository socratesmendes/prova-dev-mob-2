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

const Login = () => {
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    const user = await AsyncStorage.getItem('user');
    if (!user) {
      alert('Nenhum usuário cadastrado');
      return;
    }
    const userJson = JSON.parse(user);
    if (userJson.nome === nome && userJson.password === password) {
      navigation.navigate('livro');
    } else {
      alert('E-mail ou senha inválidos');
    }
  };

  const handleCadastro = () => {
    navigation.navigate('cadastro');
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
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.btnEntrar} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnCadastrar} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
    marginVertical: 10,
    width: '80%',
    backgroundColor: '#ffffff',
  },
  btnEntrar: {
    backgroundColor: '#4caf50',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnCadastrar: {
    backgroundColor: '#0288d1',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonTextVoltar: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Login;
