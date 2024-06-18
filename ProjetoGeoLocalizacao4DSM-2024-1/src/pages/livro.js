import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Livro = ({ navigation }) => {
  const [livros, setLivros] = useState([]);

  const carregarLivros = async () => {
    try {
      const livros = JSON.parse(await AsyncStorage.getItem('livros')) || [];
      setLivros(livros);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao carregar os livros.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarLivros();
    }, [])
  );

  const handleExcluirLivro = async (id) => {
    Alert.alert(
      'Excluir Livro',
      'Você tem certeza que deseja excluir este livro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const livrosAtualizados = livros.filter((livro) => livro.id !== id);
              setLivros(livrosAtualizados);
              await AsyncStorage.setItem('livros', JSON.stringify(livrosAtualizados));
              Alert.alert('Sucesso', 'Livro excluído com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Ocorreu um erro ao excluir o livro.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.details}>Autor: {item.autor}</Text>
      <Text style={styles.details}>Descrição: {item.descricao}</Text>
      <Text style={styles.details}>Ano de Publicação: {item.anoPublicacao}</Text>
      <Text style={styles.details}>Gênero: {item.genero}</Text>
      <Button title="Excluir" onPress={() => handleExcluirLivro(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={livros}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('addLivro')}
      >
        <Text style={styles.addButtonText}>Cadastrar Novo Livro</Text>
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
  item: {
    borderWidth: 1,
    borderColor: '#0288d1',
    padding: 16,
    marginVertical: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0288d1',
  },
  details: {
    fontSize: 15,
    marginTop: 4,
    color: '#0288d1',
  },
  addButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 16,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});


export default Livro;
