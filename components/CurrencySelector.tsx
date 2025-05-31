import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { CurrencyOption } from '@/types';
import { ChevronDown } from 'lucide-react-native';
import { currencies } from '@/constants/currencies';

type CurrencySelectorProps = {
  selectedCurrency: CurrencyOption;
  onSelect: (currency: CurrencyOption) => void;
};

export default function CurrencySelector({ selectedCurrency, onSelect }: CurrencySelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors, fonts } = useTheme();

  const handleSelect = (currency: CurrencyOption) => {
    onSelect(currency);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.selector,
          { backgroundColor: colors.card, borderColor: colors.border }
        ]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.selectedCurrency}>
          <Text style={[styles.currencySymbol, { color: colors.text, fontFamily: fonts.regular }]}>
            {selectedCurrency.symbol}
          </Text>
          <Text style={[styles.currencyCode, { color: colors.text, fontFamily: fonts.regular }]}>
            {selectedCurrency.code}
          </Text>
        </View>
        <ChevronDown size={20} color={colors.text} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.text, fontFamily: fonts.bold }]}>
              Select Currency
            </Text>
            
            <FlatList
              data={currencies}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.currencyItem,
                    selectedCurrency.code === item.code && {
                      backgroundColor: colors.primaryLight,
                    }
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[styles.currencyItemSymbol, { color: colors.text, fontFamily: fonts.regular }]}>
                    {item.symbol}
                  </Text>
                  <Text style={[styles.currencyItemCode, { color: colors.text, fontFamily: fonts.medium }]}>
                    {item.code}
                  </Text>
                </TouchableOpacity>
              )}
              style={styles.list}
            />
            
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.border }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.closeButtonText, { color: colors.text, fontFamily: fonts.medium }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  selectedCurrency: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 16,
    marginRight: 8,
  },
  currencyCode: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 16,
    padding: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    maxHeight: 300,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  currencyItemSymbol: {
    fontSize: 16,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  currencyItemCode: {
    fontSize: 16,
  },
  closeButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  closeButtonText: {
    fontSize: 16,
  },
});