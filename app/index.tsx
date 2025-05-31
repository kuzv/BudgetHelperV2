import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useUser } from '@/context/UserContext';
import WelcomeScreen from '@/components/WelcomeScreen';

export default function Index() {
  const { currentUser } = useUser();

  // If user exists, redirect to budget page, otherwise show welcome screen
  if (currentUser) {
    return <Redirect href="/(tabs)" />;
  }

  return <WelcomeScreen />;
}