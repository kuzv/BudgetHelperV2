import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import SettingsItem from './SettingsItem';
import { DollarSign } from 'lucide-react-native';
import { formatCurrency } from '@/utils/formatters';

export default function BudgetSettings() {
  const { colors, fonts } = useTheme();
  const { currentUser, getUserBudget, updateBudget } = useUser();
  
  const budget = getUserBudget();
  
  const [showBudgetEdit, setShowBudgetEdit] = useState(false);
  const [newBudgetAmount, setNewBudgetAmount] = useState(
    budget ? budget.amount.toString() : ''
  );

  const handleSaveBudget = () => {
    const amount = parseFloat(newBudgetAmount);
    if (!isNaN(amount) && amount > 0) {
      updateBudget(amount);
      setShowBudgetEdit(false);
    }
  };

  return (
    <View>
      <SettingsItem
        icon={<DollarSign size={22} color={colors.text} />}
        title="Monthly Budget"
        value={budget ? formatCurrency(budget.amount, currentUser?.currency) : 'Not set'}
        onPress={() => setShowBudgetEdit(true)}
      />
      <Modal
        visible={showBudgetEdit}
        animationType="slide"
        transparent={true}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.editContainer}>
              <View style={[
                styles.amountInputContainer,
                { backgroundColor: colors.backgroundLight, borderColor: colors.border }
              ]}>
                <Text style={[styles.currencySymbol, { color: colors.text, fontFamily: fonts.regular }]}>
                  {currentUser?.currency.symbol}
                </Text>
                <TextInput
                  style={[styles.amountInput, { color: colors.text, fontFamily: fonts.regular }]}
                  placeholder="0.00"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="numeric"
                  value={newBudgetAmount}
                  onChangeText={setNewBudgetAmount}
                  autoFocus
                />
              </View>
              
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.border }]}
                  onPress={() => {
                    setNewBudgetAmount(budget ? budget.amount.toString() : '');
                    setShowBudgetEdit(false);
                  }}
                >
                  <Text style={[styles.buttonText, { color: colors.text, fontFamily: fonts.medium }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.primary }]}
                  onPress={handleSaveBudget}
                >
                  <Text style={[styles.buttonText, { color: colors.white, fontFamily: fonts.medium }]}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
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
  editContainer: {
    padding: 16,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 20,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    height: '100%',
    fontSize: 20,
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