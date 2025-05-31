import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import SettingsSection from '@/components/SettingsSection';
import ThemeSelector from '@/components/ThemeSelector';
import AccountSettings from '@/components/AccountSettings';
import BudgetSettings from '@/components/BudgetSettings';
import AboutSection from '@/components/AboutSection';

export default function SettingsScreen() {
  const { colors, fonts } = useTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: colors.text, fontFamily: fonts.bold }]}>
        Settings
      </Text>
      
      <SettingsSection title="Account">
        <AccountSettings />
      </SettingsSection>
      
      <SettingsSection title="Budget">
        <BudgetSettings />
      </SettingsSection>
      
      <SettingsSection title="Appearance">
        <ThemeSelector />
      </SettingsSection>
      
      <SettingsSection title="About">
        <AboutSection />
      </SettingsSection>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
});