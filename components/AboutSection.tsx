import { StyleSheet, View, Text, Linking } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import SettingsItem from './SettingsItem';
import { Github, Info, Mail } from 'lucide-react-native';

export default function AboutSection() {
  const { colors, fonts } = useTheme();

  return (
    <View>
      <SettingsItem
        icon={<Info size={22} color={colors.text} />}
        title="Version"
        value="1.0.0"
      />
      
      <SettingsItem
        icon={<Github size={22} color={colors.text} />}
        title="Source Code"
        onPress={() => Linking.openURL('https://github.com/yourusername/budget-helper')}
      />
      
      <SettingsItem
        icon={<Mail size={22} color={colors.text} />}
        title="Contact Us"
        onPress={() => Linking.openURL('mailto:support@budgethelper.app')}
      />
      
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
          Budget Helper © 2025
        </Text>
        <Text style={[styles.tagline, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
          Spend smart, save more
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});