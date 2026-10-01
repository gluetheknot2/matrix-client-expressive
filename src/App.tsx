import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSettings } from './store/settings';
import { createMaterial3Theme } from './theme/material3';
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';

import LoginScreen from './screens/LoginScreen';
import ChatListScreen from './screens/ChatListScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { settings } = useSettings();

  const isDark = settings.theme === 'dark';
  const theme = isDark ? MD3DarkTheme : MD3LightTheme;

  if (!isLoggedIn) {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />
        </PaperProvider>
      </SafeAreaProvider>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'Chats') {
                    iconName = focused ? 'chat-multiple' : 'chat-multiple-outline';
                  } else if (route.name === 'Contacts') {
                    iconName = focused ? 'contacts' : 'contacts';
                  } else if (route.name === 'Profile') {
                    iconName = focused ? 'account-circle' : 'account-circle-outline';
                  } else if (route.name === 'Settings') {
                    iconName = focused ? 'cog' : 'cog-outline';
                  }

                  return (
                    <MaterialCommunityIcons
                      name={iconName}
                      size={size}
                      color={color}
                    />
                  );
                },
                tabBarActiveTintColor: '#6750A4',
                tabBarInactiveTintColor: 'gray',
                headerShown: true,
                headerTintColor: '#6750A4',
              })}
            >
              <Tab.Screen
                name="Chats"
                component={ChatListScreen}
                options={{ title: 'Messages' }}
              />
              <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profile' }}
              />
              <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: 'Settings' }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
