import { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';
import ExpenseItem from '@/components/ExpenseItem';
import EmptyState from '@/components/EmptyState';
import { formatCurrency } from '@/utils/formatters';

export default function HistoryScreen() {
  const { getAllExpenses, currentUser } = useUser();
  const { colors, fonts } = useTheme();
  const [filter, setFilter] = useState('all');
  
  const expenses = getAllExpenses();
  
  if (!expenses || expenses.length === 0) {
    return (
      <EmptyState
        icon="clock"
        title="No expense history"
        message="Your expenses will appear here once you start adding them."
      />
    );
  }

  // Calculate total spent
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text, fontFamily: fonts.bold }]}>
          Expense History
        </Text>
        <View style={styles.summaryContainer}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
            Total Spent:
          </Text>
          <Text style={[styles.summaryValue, { color: colors.expense, fontFamily: fonts.bold }]}>
            {formatCurrency(totalSpent, currentUser?.currency)}
          </Text>
        </View>
      </View>
      
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  summaryValue: {
    fontSize: 18,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});