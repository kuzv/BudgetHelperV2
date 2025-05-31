import { ShoppingBag, Utensils, Chrome as Home, Car, Bus, Smile, Briefcase, Heart, ShoppingCart, Zap, Droplets, Wifi, DollarSign } from 'lucide-react-native';

export const getCategoryIcon = (category?: string) => {
  switch (category) {
    case 'Groceries':
      return ShoppingCart;
    case 'Restaurant':
      return Utensils;
    case 'Rent':
      return Home;
    case 'Transport':
      return Bus;
    case 'Car':
      return Car;
    case 'Shopping':
      return ShoppingBag;
    case 'Entertainment':
      return Smile;
    case 'Healthcare':
      return Heart;
    case 'Work':
      return Briefcase;
    case 'Electricity':
      return Zap;
    case 'Water':
      return Droplets;
    case 'Internet':
      return Wifi;
    default:
      return DollarSign;
  }
};