import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAVED_ADDRESSES_INITIAL } from '../data/products';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load saved user or fallback to nocturnal persona
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('after9_user');
      return saved ? JSON.parse(saved) : {
        name: 'Aryan Sharma',
        phone: '+91 98765 43210',
        email: 'aryan.sharma@kp3.edu.in',
        avatar: '🌙',
        nightTagline: 'Late Night Coder & Nocturnal Craver',
        deliveryInstructions: 'Call upon arrival at gate. Do not ring bell after midnight.',
        dietaryPreference: 'all', // 'veg' | 'egg' | 'all'
        walletBalance: 250,
        isLoggedIn: true,
      };
    } catch {
      return {
        name: 'Aryan Sharma',
        phone: '+91 98765 43210',
        email: 'aryan.sharma@kp3.edu.in',
        avatar: '🌙',
        nightTagline: 'Late Night Coder & Nocturnal Craver',
        deliveryInstructions: 'Call upon arrival at gate. Do not ring bell after midnight.',
        dietaryPreference: 'all',
        walletBalance: 250,
        isLoggedIn: true,
      };
    }
  });

  // Saved Addresses State
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('after9_addresses');
      return saved ? JSON.parse(saved) : SAVED_ADDRESSES_INITIAL;
    } catch {
      return SAVED_ADDRESSES_INITIAL;
    }
  });

  const [activeAddress, setActiveAddress] = useState(() => {
    return addresses.find((a) => a.isDefault) || addresses[0];
  });

  // Global Modals State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isRefundsModalOpen, setIsRefundsModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalTab, setInfoModalTab] = useState('manifesto');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('after9_user', JSON.stringify(user));
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('after9_addresses', JSON.stringify(addresses));
    } catch {}
  }, [addresses]);

  const login = (phone, name = 'Night Owl') => {
    setUser({
      name: name || 'Night Owl Resident',
      phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@after9.in`,
      avatar: '🦉',
      nightTagline: 'Verified Greater Noida Night Owl',
      deliveryInstructions: 'Call upon arrival at gate. Open-box inspection on doorstep.',
      dietaryPreference: 'all',
      walletBalance: 250,
      isLoggedIn: true,
    });
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser({
      name: '',
      phone: '',
      email: '',
      avatar: '👤',
      nightTagline: '',
      deliveryInstructions: '',
      dietaryPreference: 'all',
      walletBalance: 0,
      isLoggedIn: false,
    });
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  const addAddress = (newAddr) => {
    const item = {
      ...newAddr,
      id: `addr-${Date.now()}`,
      isDefault: addresses.length === 0,
    };
    setAddresses((prev) => [item, ...prev]);
    setActiveAddress(item);
  };

  const removeAddress = (id) => {
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      if (activeAddress?.id === id && filtered.length > 0) {
        setActiveAddress(filtered[0]);
      }
      return filtered;
    });
  };

  const selectAddress = (addr) => {
    setActiveAddress(addr);
    setIsAddressModalOpen(false);
  };

  const openInfoModal = (tab = 'manifesto') => {
    setInfoModalTab(tab);
    setIsInfoModalOpen(true);
  };

  const openProductDetail = (product) => {
    setSelectedProductDetail(product);
  };

  const closeProductDetail = () => {
    setSelectedProductDetail(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfile,
        addresses,
        activeAddress,
        addAddress,
        removeAddress,
        selectAddress,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAddressModalOpen,
        setIsAddressModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isOrdersModalOpen,
        setIsOrdersModalOpen,
        isNotificationsModalOpen,
        setIsNotificationsModalOpen,
        isRefundsModalOpen,
        setIsRefundsModalOpen,
        isHelpModalOpen,
        setIsHelpModalOpen,
        isInfoModalOpen,
        setIsInfoModalOpen,
        infoModalTab,
        openInfoModal,
        isShareModalOpen,
        setIsShareModalOpen,
        isAboutModalOpen,
        setIsAboutModalOpen,
        isFilterModalOpen,
        setIsFilterModalOpen,
        selectedProductDetail,
        openProductDetail,
        closeProductDetail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
