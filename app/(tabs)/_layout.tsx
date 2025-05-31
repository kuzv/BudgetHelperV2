import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Home, Settings } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#fff' : '#000';

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Home color={focused ? '#007AFF' : iconColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Settings color={focused ? '#007AFF' : iconColor} />
          ),
        }}
      />
    </Tabs>
  );
}