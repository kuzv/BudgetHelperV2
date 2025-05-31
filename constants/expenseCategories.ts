import { Chrome as Home, Zap, Bus, Utensils, Wifi, ShoppingCart, ShoppingBag, Droplets, Flame } from 'lucide-react-native';
import { categoryColors } from './Colors';

export const expenseCategories = [
  {
    name: 'Rent / Mortgage',
    icon: Home,
    color: categoryColors.blue,
  },
  {
    name: 'Electricity',
    icon: Zap,
    color: categoryColors.yellow,
  },
  {
    name: 'Transportation',
    icon: Bus,
    color: categoryColors.green,
  },
  {
    name: 'Food / Drinks',
    icon: Utensils,
    color: categoryColors.orange,
  },
  {
    name: 'Internet',
    icon: Wifi,
    color: categoryColors.purple,
  },
  {
    name: 'Groceries',
    icon: ShoppingCart,
    color: categoryColors.pink,
  },
  {
    name: 'Shopping',
    icon: ShoppingBag,
    color: categoryColors.red,
  },
  {
    name: 'Water',
    icon: Droplets,
    color: categoryColors.blue,
  },
  {
    name: 'Gas',
    icon: Flame,
    color: categoryColors.orange,
  },
];