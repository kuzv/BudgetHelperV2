import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Budget, Expense, CurrencyOption } from '@/types';
import { generateId } from '@/utils/helpers';

type UserContextType = {
  users: User[];
  currentUser: User | null;
  createUser: (name: string, currency: CurrencyOption) => string;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  setCurrentUser: (userId: string) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'userId'>) => void;
  deleteExpense: (expenseId: string) => void;
  purgeUserData: (userId: string) => void;
  getUserBudget: () => Budget | null;
  updateBudget: (amount: number) => void;
  getAllExpenses: () => Expense[];
  getRecentExpenses: (count: number) => Expense[];
  getTotalSpent: () => number;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await AsyncStorage.getItem('users');
        const budgetData = await AsyncStorage.getItem('budgets');
        const expenseData = await AsyncStorage.getItem('expenses');
        const currentUserId = await AsyncStorage.getItem('currentUserId');
        
        if (userData) setUsers(JSON.parse(userData));
        if (budgetData) setBudgets(JSON.parse(budgetData));
        if (expenseData) setExpenses(JSON.parse(expenseData));
        
        if (currentUserId && userData) {
          const parsedUsers = JSON.parse(userData);
          const user = parsedUsers.find((u: User) => u.id === currentUserId);
          if (user) setCurrentUserState(user);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('users', JSON.stringify(users));
        await AsyncStorage.setItem('budgets', JSON.stringify(budgets));
        await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
        await AsyncStorage.setItem('currentUserId', currentUser?.id || '');
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    
    saveData();
  }, [users, budgets, expenses, currentUser]);

  const createUser = (name: string, currency: CurrencyOption): string => {
    const newUser: User = {
      id: generateId(),
      name,
      currency,
    };
    
    setUsers(prevUsers => [...prevUsers, newUser]);
    setCurrentUserState(newUser);
    return newUser.id;
  };

  const updateUser = (user: User) => {
    setUsers(prevUsers => 
      prevUsers.map(u => (u.id === user.id ? user : u))
    );
    
    if (currentUser?.id === user.id) {
      setCurrentUserState(user);
    }
  };

  const deleteUser = (userId: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    setBudgets(prevBudgets => prevBudgets.filter(budget => budget.userId !== userId));
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.userId !== userId));
    
    if (currentUser?.id === userId) {
      const remainingUsers = users.filter(user => user.id !== userId);
      if (remainingUsers.length > 0) {
        setCurrentUserState(remainingUsers[0]);
      } else {
        setCurrentUserState(null);
      }
    }
  };

  const purgeUserData = (userId: string) => {
    setBudgets(prevBudgets => prevBudgets.filter(budget => budget.userId !== userId));
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.userId !== userId));
  };

  const setCurrentUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUserState(user);
    }
  };

  const addExpense = (expenseData: Omit<Expense, 'id' | 'userId'>) => {
    if (!currentUser) return;
    
    const newExpense: Expense = {
      id: generateId(),
      userId: currentUser.id,
      ...expenseData,
    };
    
    setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
    
    const userBudget = budgets.find(b => b.userId === currentUser.id);
    if (userBudget) {
      const updatedBudget = {
        ...userBudget,
        spent: userBudget.spent + expenseData.amount,
      };
      
      setBudgets(prevBudgets => 
        prevBudgets.map(b => (b.id === userBudget.id ? updatedBudget : b))
      );
    }
  };

  const deleteExpense = (expenseId: string) => {
    if (!currentUser) return;
    
    const expense = expenses.find(e => e.id === expenseId);
    if (!expense) return;
    
    setExpenses(prevExpenses => prevExpenses.filter(e => e.id !== expenseId));
    
    const userBudget = budgets.find(b => b.userId === currentUser.id);
    if (userBudget) {
      const updatedBudget = {
        ...userBudget,
        spent: userBudget.spent - expense.amount,
      };
      
      setBudgets(prevBudgets => 
        prevBudgets.map(b => (b.id === userBudget.id ? updatedBudget : b))
      );
    }
  };

  const getUserBudget = (): Budget | null => {
    if (!currentUser) return null;
    
    const userBudget = budgets.find(b => b.userId === currentUser.id);
    
    if (!userBudget) {
      return {
        id: '',
        userId: currentUser.id,
        amount: 0,
        spent: 0,
      };
    }
    
    return userBudget;
  };

  const updateBudget = (amount: number) => {
    if (!currentUser) return;
    
    const existingBudget = budgets.find(b => b.userId === currentUser.id);
    
    if (existingBudget) {
      const updatedBudget = { ...existingBudget, amount };
      
      setBudgets(prevBudgets => 
        prevBudgets.map(b => (b.id === existingBudget.id ? updatedBudget : b))
      );
    } else {
      const newBudget: Budget = {
        id: generateId(),
        userId: currentUser.id,
        amount,
        spent: 0,
      };
      
      setBudgets(prevBudgets => [...prevBudgets, newBudget]);
    }
  };

  const getAllExpenses = (): Expense[] => {
    if (!currentUser) return [];
    
    return expenses
      .filter(e => e.userId === currentUser.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getRecentExpenses = (count: number): Expense[] => {
    return getAllExpenses().slice(0, count);
  };

  const getTotalSpent = (): number => {
    if (!currentUser) return 0;
    
    return expenses
      .filter(e => e.userId === currentUser.id)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        createUser,
        updateUser,
        deleteUser,
        setCurrentUser,
        addExpense,
        deleteExpense,
        purgeUserData,
        getUserBudget,
        updateBudget,
        getAllExpenses,
        getRecentExpenses,
        getTotalSpent,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};