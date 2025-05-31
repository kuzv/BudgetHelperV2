import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Clock, CirclePlus as PlusCircle, ChartBar as BarChart } from 'lucide-react-native';

type EmptyStateProps = {
  icon: 'clock' | 'add' | 'chart';
  title: string;
  message: string;
};

export default function EmptyState({ icon, title, message }: EmptyStateProps) {
  const { colors, fonts } = useTheme();
  
  const getIcon = () => {
    switch (icon) {
      case 'clock':
        return <Clock size={48} color={colors.textSecondary} />;
      case 'add':
        return <PlusCircle size={48} color={colors.textSecondary} />;
      case 'chart':
        return <BarChart size={48} color={colors.textSecondary} />;
      default:
        return <Clock size={48} color={colors.textSecondary} />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>{getIcon()}</View>
        <Text style={[styles.title, { color: colors.text, fontFamily: fonts.bold }]}>
          {title}
        </Text>
        <Text style={[styles.message, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
          {message}
        </Text>
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
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});