import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Expense } from '@/types';
import { useUser } from '@/context/UserContext';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { getCategoryIcon } from '@/utils/categoryIcons';
import { Trash2 } from 'lucide-react-native';

type ExpenseItemProps = {
  expense: Expense;
  showDelete?: boolean;
};

export default function ExpenseItem({ expense, showDelete = true }: ExpenseItemProps) {
  const { colors, fonts } = useTheme();
  const { currentUser, deleteExpense } = useUser();
  
  const CategoryIcon = getCategoryIcon(expense.category);

  const handleDelete = () => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteExpense(expense.id)
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.iconContainer}>
        <CategoryIcon size={20} color={colors.text} />
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={[styles.description, { color: colors.text, fontFamily: fonts.medium }]}>
          {expense.description}
        </Text>
        <Text style={[styles.date, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
          {formatDate(expense.date)}
        </Text>
      </View>
      
      <View style={styles.rightContainer}>
        <Text style={[styles.amount, { color: colors.expense, fontFamily: fonts.bold }]}>
          {formatCurrency(expense.amount, currentUser?.currency)}
        </Text>
        
        {showDelete && (
          <TouchableOpacity
            onPress={handleDelete}
            style={[styles.deleteButton, { backgroundColor: colors.dangerLight }]}
          >
            <Trash2 size={14} color={colors.danger} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amount: {
    fontSize: 14,
  },
  deleteButton: {
    padding: 6,
    borderRadius: 6,
  },
});