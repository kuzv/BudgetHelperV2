import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import SettingsItem from './SettingsItem';
import { Moon, Sun, Smartphone } from 'lucide-react-native';

export default function ThemeSelector() {
  const { colors, theme, setTheme } = useTheme();

  return (
    <View>
      <SettingsItem
        icon={<Sun size={22} color={colors.text} />}
        title="Light"
        rightIcon={
          theme === 'light' && (
            <View style={[styles.checkmark, { backgroundColor: colors.primary }]} />
          )
        }
        onPress={() => setTheme('light')}
      />
      
      <SettingsItem
        icon={<Moon size={22} color={colors.text} />}
        title="Dark"
        rightIcon={
          theme === 'dark' && (
            <View style={[styles.checkmark, { backgroundColor: colors.primary }]} />
          )
        }
        onPress={() => setTheme('dark')}
      />
      
      <SettingsItem
        icon={<Smartphone size={22} color={colors.text} />}
        title="System"
        rightIcon={
          theme === 'system' && (
            <View style={[styles.checkmark, { backgroundColor: colors.primary }]} />
          )
        }
        onPress={() => setTheme('system')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});