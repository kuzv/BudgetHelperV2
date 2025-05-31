import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import { ChartBar as BarChart } from 'lucide-react-native';

export default function EmptyBudgetState() {
  const { colors, fonts } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <BarChart size={64} color={colors.textSecondary} />
        
        <Text style={[styles.title, { color: colors.text, fontFamily: fonts.bold, marginTop: 24 }]}>
          Set up your budget
        </Text>
        
        <Text style={[styles.message, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
          You haven't set a budget yet. Create a budget to start tracking your expenses.
        </Text>
        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/(tabs)/settings')}
        >
          <Text style={[styles.buttonText, { color: colors.white, fontFamily: fonts.medium }]}>
            Set Budget
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});