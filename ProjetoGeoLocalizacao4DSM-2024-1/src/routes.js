import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Livro from './pages/livro'
import AddLivro from './pages/addLivro'

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={Login}
            options={{
              title: 'LOGIN',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#0288d1',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: '#fff',
              },
            }}
          />
          <Stack.Screen
            name="livro"
            component={Livro}
            options={{
              title: 'Livros',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#0288d1',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: '#fff',
              },
            }}
          />
        <Stack.Screen
          name="cadastro"
          component={Cadastro}
          options={{
            title: 'Cadastrar',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#0288d1',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
            },
          }}
        />
        <Stack.Screen
          name="addLivro"
          component={AddLivro}
          options={{
            title: 'Adicionar Livro',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#0288d1',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
