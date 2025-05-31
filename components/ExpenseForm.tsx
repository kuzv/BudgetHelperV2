import { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Animated, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';
import QuickExpenseButtons from './QuickExpenseButtons';
import { formatCurrency } from '@/utils/formatters';
import { Check } from 'lucide-react-native';

export default function ExpenseForm() {
  const [isVisible, setIsVisible] = useState(true);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addExpense, currentUser, getUserBudget } = useUser();
  const router = useRouter();
  const { colors, fonts } = useTheme();
  
  const budget = getUserBudget();
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  const handleQuickExpenseSelect = (expenseCategory: string) => {
    setCategory(expenseCategory);
    setDescription(expenseCategory);
  };

  const animateSuccess = () => {
    setIsSubmitting(true);
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsSubmitting(false);
      router.replace('/(tabs)');
    });
  };

  const handleSubmit = () => {
    const amountValue = parseFloat(amount);
    
    if (isNaN(amountValue) || amountValue <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid expense amount');
      return;
    }
    
    addExpense({
      amount: amountValue,
      description: description || category || 'Expense',
      category: category,
      date: new Date().toISOString(),
    });
    
    animateSuccess();
  };

  const buttonScale = buttonAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.95, 1],
  });

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
      >
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <QuickExpenseButtons 
            onSelect={handleQuickExpenseSelect} 
            selectedCategory={category}
          />
          
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text, fontFamily: fonts.semiBold }]}>
              Amount *
            </Text>
            <View style={[
              styles.amountInputContainer,
              { backgroundColor: colors.card, borderColor: colors.border }
            ]}>
              <Text style={[styles.currencySymbol, { color: colors.text, fontFamily: fonts.regular }]}>
                {currentUser?.currency.symbol}
              </Text>
              <TextInput
                style={[styles.amountInput, { color: colors.text, fontFamily: fonts.regular }]}
                placeholder="0.00"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.text, fontFamily: fonts.semiBold }]}>
              Description
            </Text>
            <TextInput
              style={[
                styles.input, 
                { backgroundColor: colors.card, color: colors.text, borderColor: colors.border, fontFamily: fonts.regular }
              ]}
              placeholder="What was this expense for?"
              placeholderTextColor={colors.textSecondary}
              value={description}
              onChangeText={setDescription}
            />
          </View>
          
          {budget && (
            <View style={styles.budgetInfo}>
              <Text style={[styles.budgetText, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
                Your remaining budget: {formatCurrency(budget.amount - budget.spent, currentUser?.currency)}
              </Text>
            </View>
          )}
          
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.primary }]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Check size={24} color={colors.white} />
              ) : (
                <Text style={[styles.submitButtonText, { color: colors.white, fontFamily: fonts.semiBold }]}>
                  Add Expense
                </Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 24,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    height: '100%',
    fontSize: 24,
  },
  input: {
    width: '100%',
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  budgetInfo: {
    marginBottom: 20,
  },
  budgetText: {
    fontSize: 14,
  },
  submitButton: {
    width: '100%',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 18,
  },
});