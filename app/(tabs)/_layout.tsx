import { Tabs } from 'expo-router';
import { Chrome as Home, CirclePlus as PlusCircle, Clock, Settings } from 'lucide-react-native';
import { useColorScheme, Platform, View, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  const getTabBarStyle = () => {
    const baseStyle = {
      backgroundColor: colors.background,
      borderTopColor: colors.border,
      borderTopWidth: 1,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    };

    if (Platform.OS === 'android') {
      return {
        ...baseStyle,
        height: 64,
        paddingBottom: 12,
        paddingTop: 8,
      };
    }

    if (Platform.OS === 'ios') {
      return {
        ...baseStyle,
        height: 88,
        paddingBottom: Math.max(insets.bottom, 20),
        paddingTop: 8,
      };
    }

    return {
      ...baseStyle,
      height: 60,
      paddingBottom: 16,
      paddingTop: 8,
    };
  };

  return (
    <View style={[
      styles.container,
      { 
        paddingTop: Platform.OS === 'android' ? insets.top : 0,
        backgroundColor: colors.background
      }
    ]}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.tabIconDefault,
          tabBarStyle: getTabBarStyle(),
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerSafeAreaInsets: { top: Platform.OS === 'android' ? 16 : 0 },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Budget',
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="add-expense"
          options={{
            title: 'Add Expense',
            tabBarIcon: ({ color, size }) => <PlusCircle size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});