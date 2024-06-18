import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddLivro = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [genero, setGenero] = useState('');

  const handleCadastroLivro = async () => {
    if (titulo === '' || autor === '' || descricao === '' || anoPublicacao === '' || genero === '') {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    try {
      const livros = JSON.parse(await AsyncStorage.getItem('livros')) || [];
      const novoLivro = { id: Date.now().toString(), titulo, autor, descricao, anoPublicacao, genero };
      livros.push(novoLivro);
      await AsyncStorage.setItem('livros', JSON.stringify(livros));
      Alert.alert('Sucesso', 'Livro cadastrado com sucesso!');
      setTitulo('');
      setAutor('');
      setDescricao('');
      setAnoPublicacao('');
      setGenero('');

      navigation.navigate('livro', { novoLivroCadastrado: true });
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o livro.');
    }
  };

  const handleVoltar = () => {
    navigation.navigate('livro');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Autor:</Text>
      <TextInput
        style={styles.input}
        value={autor}
        onChangeText={setAutor}
      />

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Ano de Publicação:</Text>
      <TextInput
        style={styles.input}
        value={anoPublicacao}
        onChangeText={setAnoPublicacao}
        keyboardType='numeric'
      />

      <Text style={styles.label}>Gênero:</Text>
      <TextInput
        style={styles.input}
        value={genero}
        onChangeText={setGenero}
      />

      <TouchableOpacity style={styles.buttonCadastrar} onPress={handleCadastroLivro}>
        <Text style={styles.buttonText}>Cadastrar Livro</Text>
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
    padding: 16,
    backgroundColor: '#e0f7fa',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#0288d1',
  },
  input: {
    borderWidth: 1,
    borderColor: '#0288d1',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  buttonCadastrar: {
    backgroundColor: '#4caf50',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  buttonVoltar: {
    backgroundColor: '#f44336',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    width: '100%',
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

export default AddLivro;
