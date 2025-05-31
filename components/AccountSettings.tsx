import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import SettingsItem from './SettingsItem';
import { ChevronRight, LogOut, CircleUser as UserCircle, Trash2, Coins } from 'lucide-react-native';
import CurrencySelector from './CurrencySelector';
import { CurrencyOption } from '@/types';

export default function AccountSettings() {
  const { colors, fonts } = useTheme();
  const { currentUser, updateUser, users, setCurrentUser, deleteUser, purgeUserData } = useUser();
  const router = useRouter();

  const [showNameEdit, setShowNameEdit] = useState(false);
  const [newName, setNewName] = useState(currentUser?.name || '');

  const [showCurrencyEdit, setShowCurrencyEdit] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(
    currentUser?.currency || { code: 'USD', symbol: '$' }
  );

  const handleSaveName = () => {
    if (newName.trim()) {
      updateUser({ ...currentUser!, name: newName.trim() });
      setShowNameEdit(false);
    }
  };

  const handleSaveCurrency = () => {
    updateUser({ ...currentUser!, currency: selectedCurrency });
    setShowCurrencyEdit(false);
  };

  const handleSwitchAccount = () => {
    const otherUsers = users.filter(user => user.id !== currentUser?.id);
    
    if (otherUsers.length === 0) {
      Alert.alert('No other accounts', 'There are no other accounts to switch to.');
      return;
    }

    setCurrentUser(otherUsers[0].id);
  };

  const handlePurgeData = () => {
    Alert.alert(
      'Delete History',
      'This will delete all your expenses. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            if (currentUser) {
              purgeUserData(currentUser.id);
              Alert.alert('History Deleted', 'All your expenses have been deleted.');
            }
          } 
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete this account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            if (currentUser) {
              deleteUser(currentUser.id);
              router.replace('/');
            }
          } 
        }
      ]
    );
  };

  return (
    <View>
      {!showNameEdit ? (
        <SettingsItem
          icon={<UserCircle size={22} color={colors.text} />}
          title="Name"
          value={currentUser?.name}
          onPress={() => setShowNameEdit(true)}
        />
      ) : (
        <View style={styles.editContainer}>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: colors.backgroundLight, 
                color: colors.text,
                borderColor: colors.border,
                fontFamily: fonts.regular
              }
            ]}
            value={newName}
            onChangeText={setNewName}
            autoFocus
          />
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.border }]}
              onPress={() => {
                setNewName(currentUser?.name || '');
                setShowNameEdit(false);
              }}
            >
              <Text style={[styles.buttonText, { color: colors.text, fontFamily: fonts.medium }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleSaveName}
            >
              <Text style={[styles.buttonText, { color: colors.white, fontFamily: fonts.medium }]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {!showCurrencyEdit ? (
        <SettingsItem
          icon={<Coins size={22} color={colors.text} />}
          title="Currency"
          value={`${currentUser?.currency.symbol} ${currentUser?.currency.code}`}
          onPress={() => setShowCurrencyEdit(true)}
        />
      ) : (
        <View style={styles.editContainer}>
          <CurrencySelector
            selectedCurrency={selectedCurrency}
            onSelect={setSelectedCurrency}
          />
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.border }]}
              onPress={() => {
                setSelectedCurrency(currentUser?.currency || { code: 'USD', symbol: '$' });
                setShowCurrencyEdit(false);
              }}
            >
              <Text style={[styles.buttonText, { color: colors.text, fontFamily: fonts.medium }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleSaveCurrency}
            >
              <Text style={[styles.buttonText, { color: colors.white, fontFamily: fonts.medium }]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {users.length > 1 && (
        <SettingsItem
          icon={<LogOut size={22} color={colors.text} />}
          title="Switch Account"
          rightIcon={<ChevronRight size={20} color={colors.textSecondary} />}
          onPress={handleSwitchAccount}
        />
      )}

      <SettingsItem
        icon={<Trash2 size={22} color={colors.warning} />}
        title="Delete History"
        titleStyle={{ color: colors.warning }}
        onPress={handlePurgeData}
      />
      
      <SettingsItem
        icon={<Trash2 size={22} color={colors.danger} />}
        title="Delete Account"
        titleStyle={{ color: colors.danger }}
        onPress={handleDeleteAccount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  editContainer: {
    padding: 16,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 14,
  },
});