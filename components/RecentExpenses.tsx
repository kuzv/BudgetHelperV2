import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Expense } from '@/types';
import ExpenseItem from './ExpenseItem';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

type RecentExpensesProps = {
  expenses: Expense[];
};

export default function RecentExpenses({ expenses }: RecentExpensesProps) {
  const { colors, fonts } = useTheme();
  const router = useRouter();

  if (!expenses || expenses.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.emptyText, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
          No recent expenses to show
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
        Recent Expenses
      </Text>
      
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem expense={item} showDelete={false} />
        )}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />
      
      {expenses.length > 0 && (
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => router.push('/(tabs)/history')}
        >
          <Text style={[styles.viewAllText, { color: colors.primary, fontFamily: fonts.medium }]}>
            View All Expenses
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
  emptyContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
  },
  listContent: {
    gap: 8,
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  viewAllText: {
    fontSize: 14,
  },
});