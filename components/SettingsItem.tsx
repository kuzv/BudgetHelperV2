import { StyleSheet, View, Text, TouchableOpacity, TextStyle } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ReactNode } from 'react';

type SettingsItemProps = {
  icon?: ReactNode;
  title: string;
  value?: string;
  rightIcon?: ReactNode;
  onPress?: () => void;
  titleStyle?: TextStyle;
};

export default function SettingsItem({
  icon,
  title,
  value,
  rightIcon,
  onPress,
  titleStyle,
}: SettingsItemProps) {
  const { colors, fonts } = useTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.leftContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[
          styles.title, 
          { color: colors.text, fontFamily: fonts.medium },
          titleStyle
        ]}>
          {title}
        </Text>
      </View>
      
      <View style={styles.rightContainer}>
        {value && (
          <Text style={[styles.value, { color: colors.textSecondary, fontFamily: fonts.regular }]}>
            {value}
          </Text>
        )}
        {rightIcon && rightIcon}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  title: {
    fontSize: 16,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    marginRight: 8,
  },
});