import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useUser } from '@/context/UserContext';
import BudgetDisplay from '@/components/BudgetDisplay';
import RecentExpenses from '@/components/RecentExpenses';
import { useTheme } from '@/context/ThemeContext';
import EmptyBudgetState from '@/components/EmptyBudgetState';

export default function BudgetScreen() {
  const { currentUser, getUserBudget, getRecentExpenses } = useUser();
  const { colors, fonts } = useTheme();

  const budget = getUserBudget();
  const recentExpenses = getRecentExpenses(5); // Get 5 most recent expenses

  if (!budget || budget.amount === 0) {
    return <EmptyBudgetState />;
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.greeting, { color: colors.text, fontFamily: fonts.bold }]}>
        Hello, {currentUser?.name}!
      </Text>
      
      <BudgetDisplay budget={budget} />
      
      <View style={styles.recentContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.medium }]}>
          Recent Expenses
        </Text>
        <RecentExpenses expenses={recentExpenses} />
      </View>
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
  greeting: {
    fontSize: 24,
    marginBottom: 24,
  },
  recentContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
});