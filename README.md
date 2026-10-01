# Matrix Client - Expressive

A modern, feature-rich Matrix client built with React and Material 3 Expressive design system. Includes end-to-end encryption support, credential backup/restore, and extensive customization options.

## Features

✨ **Design**
- Material 3 Expressive design tokens and components
- Light/Dark theme support with auto detection
- Responsive layout for desktop and mobile
- Customizable font sizes and compact mode

🔐 **Security & Credentials**
- AES encryption for credential storage
- Secure master password protection
- Backup/restore encrypted credentials
- Device-based token management
- Optional end-to-end encryption

💬 **Chat Features**
- Real-time messaging
- Room management
- User presence indicators
- Read receipts
- Typing indicators
- File sharing support
- Emoji picker

⚙️ **Settings**
- Theme customization
- Notification preferences
- Privacy controls
- Sync intervals
- Message history limits
- Proxy support

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/gluetheknot2/matrix-client-expressive.git
cd matrix-client-expressive

# Install dependencies
npm install

# Run development server
npm run dev
```

The client will open at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## Configuration

### Credential Storage

The app uses encrypted credential storage with the following flow:

1. **Master Password**: Set during login to encrypt all credentials
2. **Encryption**: Uses AES encryption (CryptoJS)
3. **Storage**: Credentials stored in browser's localStorage
4. **Backup**: Export encrypted vault as JSON file
5. **Restore**: Import previously exported backup

### Settings

All settings are persisted to localStorage and include:

```javascript
{
  theme: 'light' | 'dark' | 'auto',
  fontSize: 'small' | 'normal' | 'large',
  compactMode: boolean,
  showOnlineStatus: boolean,
  encryptionEnabled: boolean,
  autoLogin: boolean,
  syncInterval: number (ms),
  messageLimit: number,
  typingIndicators: boolean,
  readReceipts: boolean,
  notificationsEnabled: boolean,
  notificationSound: boolean,
  language: string,
  trayMinimize: boolean,
  startMinimized: boolean,
  enableSpellcheck: boolean,
  proxyEnabled: boolean,
  proxyUrl: string
}
```

## Project Structure

```
src/
├── components/          # React components
│   ├── LoginForm.jsx   # Login interface
│   ├── ChatWindow.jsx  # Main chat view
│   └── SettingsPanel.jsx # Settings dialog
├── theme/
│   └── material3.js    # Material 3 theme config
├── utils/
│   └── credentials.js  # Credential manager & encryption
├── store/
│   └── settings.js     # Settings store (Zustand)
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Credential Management API

### Initialize

```javascript
import { CredentialManager } from './utils/credentials';

const manager = new CredentialManager(masterPassword);
```

### Save Credentials

```javascript
manager.saveCredentials(
  'https://matrix.org',
  '@user:matrix.org',
  'access_token_here',
  'DEVICE_ID',
  'optional_pickle_key'
);
```

### Retrieve Credentials

```javascript
const credentials = manager.getCredentials('https://matrix.org');
```

### Backup & Restore

```javascript
// Export backup
const backup = manager.exportBackup();
fs.writeFileSync('backup.json', backup);

// Import backup
const backupData = fs.readFileSync('backup.json', 'utf-8');
manager.importBackup(backupData);
```

### List & Delete

```javascript
// List all homeservers
const servers = manager.listHomeservers();

// Delete specific credentials
manager.deleteCredentials('https://matrix.org');

// Clear all
manager.clearAll();
```

## Settings Store API

```javascript
import { useSettings } from './store/settings';

function MyComponent() {
  const { settings, setSetting, updateSettings } = useSettings();
  
  // Get single setting
  const theme = settings.theme;
  
  // Set single setting
  setSetting('theme', 'dark');
  
  // Update multiple settings
  updateSettings({ theme: 'dark', fontSize: 'large' });
}
```

## Material 3 Expressive Design

The client uses Material 3 Expressive design tokens including:

- **Color System**: Primary, secondary, tertiary, error, and neutral palettes
- **Typography**: 13 type scales from display to label
- **Shapes**: Small (8dp), medium (12dp), large (16dp) corner radii
- **Elevation**: Material 3 shadow system
- **Motion**: Smooth transitions and animations

## Environment Variables

Create a `.env` file for optional configuration:

```env
VITE_DEFAULT_HOMESERVER=https://matrix.org
VITE_SYNC_INTERVAL=3000
VITE_MESSAGE_LIMIT=50
```

## Development

### Hot Module Replacement
The dev server supports HMR for fast development iteration.

### Linting

```bash
npm run lint
```

### Type Checking

Uses TypeScript strict mode for type safety.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+

## Security Considerations

1. **Master Password**: Never share or commit your master password
2. **localStorage**: Credentials are encrypted before storage, but localStorage is not immune to XSS attacks
3. **HTTPS**: Always use HTTPS in production
4. **Device ID**: Unique per device for tracking encryption sessions
5. **Backup Files**: Encrypted but should be stored securely

## Troubleshooting

### Credentials not saving
- Ensure master password is set before login
- Check browser's localStorage is enabled
- Verify encryption password is correct

### Theme not applying
- Clear localStorage and reload
- Check system theme settings
- Verify Material 3 theme is properly initialized

### Settings reset
- Settings are stored in localStorage
- Clearing browser data will reset them
- Export settings before clearing data

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - See LICENSE file for details

## Resources

- [Matrix Protocol](https://matrix.org)
- [Material Design 3](https://m3.material.io)
- [Matrix JS SDK](https://github.com/matrix-org/matrix-js-sdk)
- [React Documentation](https://react.dev)
- [MUI Documentation](https://mui.com)

## Support

For issues, questions, or suggestions:
- Create an issue on GitHub
- Check existing documentation
- Review Material 3 design guidelines

---

**Built with ❤️ for secure, beautiful communication**
