import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';
import { CurrencyOption } from '@/types';
import CurrencySelector from './CurrencySelector';
import { DollarSign } from 'lucide-react-native';

export default function WelcomeScreen() {
  const [name, setName] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>({
    code: 'USD',
    symbol: '$'
  });
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budget, setBudget] = useState('');
  const { createUser, users, setCurrentUser } = useUser();
  const router = useRouter();
  const { colors, fonts } = useTheme();

  const handleContinue = () => {
    if (name.trim()) {
      setShowBudgetModal(true);
    }
  };

  const handleFinish = () => {
    if (name.trim() && budget) {
      createUser(name, selectedCurrency);
      router.replace('/(tabs)');
    }
  };

  const handleSelectExistingAccount = (userId: string) => {
    setCurrentUser(userId);
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.animationContainer}>
          <DollarSign size={64} color={colors.primary} />
        </View>
        
        <Text style={[styles.title, { color: colors.text, fontFamily: fonts.bold }]}>
          Budget Helper
        </Text>
        
        <Text style={[styles.subtitle, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
          Budgeting for real life, made easy
        </Text>
        
        {!showAccountSelector ? (
          <View style={styles.formContainer}>
            <Text style={[styles.label, { color: colors.text, fontFamily: fonts.medium }]}>
              Your Name
            </Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderColor: colors.border,
                  fontFamily: fonts.regular
                }
              ]}
              placeholder="Enter your name"
              placeholderTextColor={colors.textSecondary}
              value={name}
              onChangeText={setName}
            />
            
            <Text style={[styles.label, { color: colors.text, fontFamily: fonts.medium, marginTop: 16 }]}>
              Currency
            </Text>
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onSelect={setSelectedCurrency}
            />
            
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleContinue}
              disabled={!name.trim()}
            >
              <Text style={[styles.buttonText, { color: colors.white, fontFamily: fonts.medium }]}>
                Continue
              </Text>
            </TouchableOpacity>
            
            {users.length > 0 && (
              <TouchableOpacity
                style={styles.switchAccount}
                onPress={() => setShowAccountSelector(true)}
              >
                <Text style={[styles.switchAccountText, { color: colors.primary, fontFamily: fonts.medium }]}>
                  Switch to an existing account
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.accountsContainer}>
            <Text style={[styles.label, { color: colors.text, fontFamily: fonts.medium }]}>
              Select an Account
            </Text>
            
            {users.map(user => (
              <TouchableOpacity
                key={user.id}
                style={[
                  styles.accountItem, 
                  { backgroundColor: colors.card, borderColor: colors.border }
                ]}
                onPress={() => handleSelectExistingAccount(user.id)}
              >
                <Text style={[styles.accountName, { color: colors.text, fontFamily: fonts.medium }]}>
                  {user.name}
                </Text>
                <Text style={[styles.accountCurrency, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
                  {user.currency.code}
                </Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary, marginTop: 20 }]}
              onPress={() => setShowAccountSelector(false)}
            >
              <Text style={[styles.buttonText, { color: colors.white, fontFamily: fonts.medium }]}>
                Create New Account
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal
          visible={showBudgetModal}
          transparent={true}
          animationType="slide"
        >
          <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
            <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
              <Text style={[styles.modalTitle, { color: colors.text, fontFamily: fonts.bold }]}>
                Set Monthly Budget
              </Text>
              
              <Text style={[styles.modalSubtitle, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
                Enter your monthly budget to get started
              </Text>

              <View style={[
                styles.budgetInputContainer,
                { backgroundColor: colors.card, borderColor: colors.border }
              ]}>
                <Text style={[styles.currencySymbol, { color: colors.text }]}>
                  {selectedCurrency.symbol}
                </Text>
                <TextInput
                  style={[styles.budgetInput, { color: colors.text }]}
                  placeholder="0.00"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="numeric"
                  value={budget}
                  onChangeText={setBudget}
                  autoFocus
                />
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: colors.border }]}
                  onPress={() => setShowBudgetModal(false)}
                >
                  <Text style={[styles.modalButtonText, { color: colors.text }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: colors.primary }]}
                  onPress={handleFinish}
                  disabled={!budget}
                >
                  <Text style={[styles.modalButtonText, { color: colors.white }]}>
                    Get Started
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  animationContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    fontSize: 16,
  },
  switchAccount: {
    marginTop: 16,
    alignItems: 'center',
  },
  switchAccountText: {
    fontSize: 16,
  },
  accountsContainer: {
    width: '100%',
    maxWidth: 400,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  accountName: {
    fontSize: 16,
  },
  accountCurrency: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  budgetInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  currencySymbol: {
    fontSize: 24,
    marginRight: 8,
  },
  budgetInput: {
    flex: 1,
    fontSize: 24,
    height: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});