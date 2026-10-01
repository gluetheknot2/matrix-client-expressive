import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  Stack,
  IconButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

export const ChatWindow = ({ room, messages = [], onSendMessage, onSendFile }) => {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!room) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'text.secondary'
        }}
      >
        <Typography variant="headlineSmall">
          Select a room to start chatting
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Room Header */}
      <Paper elevation={0} sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="titleLarge">{room.name}</Typography>
        {room.topic && (
          <Typography variant="bodySmall" color="textSecondary">
            {room.topic}
          </Typography>
        )}
      </Paper>

      {/* Messages */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <List>
          {messages.map((msg, idx) => (
            <ListItem key={idx} alignItems="flex-start">
              <Avatar sx={{ mr: 2 }}>
                {msg.sender?.charAt(0).toUpperCase()}
              </Avatar>
              <ListItemText
                primary={msg.sender}
                secondary={msg.body}
                primaryTypographyProps={{ variant: 'labelMedium' }}
                secondaryTypographyProps={{ variant: 'bodyMedium' }}
              />
              <Typography variant="caption" color="textSecondary" sx={{ ml: 2 }}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </Typography>
            </ListItem>
          ))}
        </List>
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input */}
      <Paper elevation={1} sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
              size="small"
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleSend}
              disabled={!messageText.trim()}
              sx={{ px: 3 }}
            >
              <SendIcon />
            </Button>
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton size="small" title="Attach file">
              <AttachFileIcon />
            </IconButton>
            <IconButton size="small" title="Add emoji">
              <EmojiEmotionsIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ChatWindow;
