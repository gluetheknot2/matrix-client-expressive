import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { FAB, ListItem, useTheme, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatListScreen = () => {
  const theme = useTheme();
  const [rooms] = useState([
    { id: '1', name: 'General', unread: 3, lastMessage: 'Hey everyone!' },
    { id: '2', name: 'Random', unread: 0, lastMessage: 'That\'s cool' },
    { id: '3', name: 'Dev', unread: 5, lastMessage: 'Checking the build...' },
  ]);

  const renderRoom = ({ item }: any) => (
    <ListItem
      title={item.name}
      description={item.lastMessage}
      left={() => (
        <MaterialCommunityIcons
          name="chat-outline"
          size={40}
          color={theme.colors.primary}
          style={{ marginRight: 12 }}
        />
      )}
      right={() =>
        item.unread > 0 ? (
          <View
            style={[
              styles.badge,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
              {item.unread}
            </Text>
          </View>
        ) : null
      }
      onPress={() => Alert.alert('Opening', `Chat: ${item.name}`)}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={renderRoom}
      />
      <FAB
        icon="plus"
        style={[
          styles.fab,
          { backgroundColor: theme.colors.primary },
        ]}
        onPress={() => Alert.alert('New Chat', 'Create or find a room')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ChatListScreen;
