import { StyleSheet, View, Text } from 'react-native';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';
import { Budget } from '@/types';
import { formatCurrency } from '@/utils/formatters';
import { VictoryPie } from 'victory-native';
import { DollarSign, TrendingUp, Wallet } from 'lucide-react-native';

type BudgetDisplayProps = {
  budget: Budget;
};

export default function BudgetDisplay({ budget }: BudgetDisplayProps) {
  const { currentUser, getTotalSpent } = useUser();
  const { colors, fonts } = useTheme();
  
  const totalSpent = getTotalSpent();
  const remaining = budget.amount - totalSpent;
  const spentPercentage = Math.min((totalSpent / budget.amount) * 100, 100);
  
  const getProgressColor = () => {
    if (spentPercentage >= 90) return colors.danger;
    if (spentPercentage >= 75) return colors.warning;
    return colors.success;
  };

  const chartData = [
    { x: 'Spent', y: totalSpent },
    { x: 'Remaining', y: Math.max(0, remaining) },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text, fontFamily: fonts.semiBold }]}>
        Monthly Overview
      </Text>

      <View style={styles.chartContainer}>
        <VictoryPie
          data={chartData}
          width={160}
          height={160}
          innerRadius={50}
          padding={0}
          colorScale={[getProgressColor(), colors.backgroundLight]}
          animate={{ duration: 1000 }}
          labels={() => null}
        />
        <View style={styles.centerStats}>
          <Text style={[styles.percentageText, { color: colors.text, fontFamily: fonts.bold }]}>
            {Math.round(spentPercentage)}%
          </Text>
          <Text style={[styles.percentageLabel, { color: colors.textSecondary, fontFamily: fonts.medium }]}>
            Used
          </Text>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
              <Wallet size={18} color={colors.primary} />
            </View>
            <View>
              <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
                Budget
              </Text>
              <Text style={[styles.statValue, { color: colors.text, fontFamily: fonts.bold }]}>
                {formatCurrency(budget.amount, currentUser?.currency)}
              </Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.iconContainer, { backgroundColor: colors.dangerLight }]}>
              <DollarSign size={18} color={colors.danger} />
            </View>
            <View>
              <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
                Spent
              </Text>
              <Text style={[styles.statValue, { color: colors.expense, fontFamily: fonts.bold }]}>
                {formatCurrency(totalSpent, currentUser?.currency)}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.statItem, styles.remainingItem]}>
          <View style={[styles.iconContainer, { backgroundColor: colors.success + '20' }]}>
            <TrendingUp size={18} color={colors.success} />
          </View>
          <View>
            <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
              Remaining
            </Text>
            <Text 
              style={[
                styles.statValue, 
                { 
                  color: remaining >= 0 ? colors.success : colors.danger,
                  fontFamily: fonts.bold
                }
              ]}
            >
              {formatCurrency(Math.abs(remaining), currentUser?.currency)}
            </Text>
          </View>
        </View>
      </View>
      
      {remaining <= (budget.amount * 0.1) && remaining > 0 && (
        <View style={[styles.warningBanner, { backgroundColor: colors.warningLight }]}>
          <Text style={[styles.warningText, { color: colors.warning, fontFamily: fonts.medium }]}>
            You're close to your budget limit!
          </Text>
        </View>
      )}
      
      {remaining < 0 && (
        <View style={[styles.warningBanner, { backgroundColor: colors.dangerLight }]}>
          <Text style={[styles.warningText, { color: colors.danger, fontFamily: fonts.medium }]}>
            You've exceeded your budget by {formatCurrency(Math.abs(remaining), currentUser?.currency)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  centerStats: {
    position: 'absolute',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 24,
  },
  percentageLabel: {
    fontSize: 12,
  },
  statsContainer: {
    gap: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  remainingItem: {
    marginTop: 4,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
  },
  statValue: {
    fontSize: 14,
  },
  warningBanner: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  warningText: {
    fontSize: 12,
  },
});