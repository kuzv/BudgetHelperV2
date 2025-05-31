import { Tabs } from 'expo-router';
import { Chrome as Home, CirclePlus as PlusCircle, Clock, Settings } from 'lucide-react-native';
import { useColorScheme, Platform, View, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.tabIconDefault,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            height: Platform.select({ 
              ios: 88,
              android: 64,
              default: 60 
            }),
            paddingBottom: Platform.select({ 
              ios: 34,
              android: 12,
              default: 16 
            }),
            paddingTop: 8,
          },
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
    paddingTop: Platform.OS === 'android' ? 24 : 0, // Add padding for Android status bar
  },
});