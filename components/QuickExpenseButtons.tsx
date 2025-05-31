import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { expenseCategories } from '@/constants/expenseCategories';

type QuickExpenseButtonsProps = {
  onSelect: (category: string) => void;
  selectedCategory: string;
};

export default function QuickExpenseButtons({ onSelect, selectedCategory }: QuickExpenseButtonsProps) {
  const { colors, fonts } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text, fontFamily: fonts.semiBold }]}>
        Categories
      </Text>
      
      <View style={styles.grid}>
        {expenseCategories.map((category) => {
          const isSelected = category.name === selectedCategory;
          
          return (
            <TouchableOpacity
              key={category.name}
              style={[
                styles.categoryButton,
                { 
                  backgroundColor: isSelected ? category.color : colors.backgroundLight,
                  borderColor: isSelected ? category.color : colors.border,
                }
              ]}
              onPress={() => onSelect(category.name)}
            >
              <category.icon 
                size={18}
                color={isSelected ? colors.white : category.color}
              />
              <Text 
                style={[
                  styles.categoryText, 
                  { 
                    color: isSelected ? colors.white : colors.text,
                    fontFamily: fonts.medium
                  }
                ]}
                numberOfLines={1}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: '30%',
    maxWidth: '47%',
  },
  categoryText: {
    fontSize: 12,
    marginLeft: 6,
    flex: 1,
  },
});