import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { addressService } from '../services/addressService';

const AuthContext = createContext();

const INITIAL_EMPTY_USER = {
  name: '',
  phone: '',
  email: '',
  avatar: '👤',
  nightTagline: '',
  deliveryInstructions: '',
  dietaryPreference: 'all',
  walletBalance: 0,
  isLoggedIn: false,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('after9_user');
      return saved ? JSON.parse(saved) : INITIAL_EMPTY_USER;
    } catch {
      return INITIAL_EMPTY_USER;
    }
  });

  // Saved Addresses State
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('after9_addresses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeAddress, setActiveAddress] = useState(() => {
    return addresses.find((a) => a.isDefault) || addresses[0] || null;
  });

  // Global Modals State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
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

  const openLoginModal = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('after9_user', JSON.stringify(user));
    } catch { }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('after9_addresses', JSON.stringify(addresses));
    } catch { }
  }, [addresses]);

  // Sync profile & addresses from backend if user is logged in
  useEffect(() => {
    if (user?.isLoggedIn) {
      authService.getProfile()
        .then((profile) => {
          if (profile) {
            setUser((prev) => ({
              ...prev,
              name: profile.name || prev.name,
              phone: profile.phone || prev.phone,
              email: profile.email || prev.email,
              avatarUrl: profile.avatarUrl || prev.avatarUrl,
            }));
            if (profile.addresses && profile.addresses.length > 0) {
              setAddresses(profile.addresses);
              const def = profile.addresses.find((a) => a.isDefault) || profile.addresses[0];
              setActiveAddress(def);
            }
          }
        })
        .catch(() => {});

      addressService.listAddresses()
        .then((res) => {
          const list = Array.isArray(res) ? res : res?.data || [];
          if (list.length > 0) {
            setAddresses(list);
            const def = list.find((a) => a.isDefault) || list[0];
            setActiveAddress(def);
          }
        })
        .catch(() => {});
    }
  }, [user?.isLoggedIn]);

  const login = (phone, name = 'Night Owl') => {
    setUser({
      name: name || 'Night Owl Resident',
      phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@after9.in`,
      avatar: '🦉',
      nightTagline: 'Greater Noida Night Owl',
      deliveryInstructions: 'Call upon arrival at gate. Open-box inspection on doorstep.',
      dietaryPreference: 'all',
      walletBalance: 0,
      isLoggedIn: true,
    });
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    authService.logout().catch(() => { });
    setUser(INITIAL_EMPTY_USER);
    setAddresses([]);
    setActiveAddress(null);
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
    if (user.isLoggedIn) {
      authService.updateProfile(updatedFields).catch(() => { });
    }
  };

  const addAddress = async (newAddr) => {
    let item = {
      ...newAddr,
      id: `addr-${Date.now()}`,
      isDefault: addresses.length === 0,
    };

    if (user?.isLoggedIn) {
      try {
        const saved = await addressService.createAddress({
          label: newAddr.type || 'Home',
          addressLine1: newAddr.sector || newAddr.flatNo || 'Pari Chowk Hub',
          addressLine2: newAddr.flatNo ? `Flat/Room: ${newAddr.flatNo}` : undefined,
          landmark: newAddr.landmark || undefined,
          city: 'Greater Noida',
          pincode: '201310',
          latitude: 28.4744,
          longitude: 77.504,
          isDefault: addresses.length === 0,
        });
        if (saved) item = saved;
      } catch (err) {
        console.warn('Backend address save notice:', err?.message || err);
      }
    }

    setAddresses((prev) => [item, ...prev]);
    setActiveAddress(item);
  };

  const removeAddress = async (id) => {
    if (user?.isLoggedIn && id && !id.startsWith('addr-')) {
      addressService.deleteAddress(id).catch(() => {});
    }
    setAddresses((prev) => {
      const filtered = prev.filter((a) => a.id !== id);
      if (activeAddress?.id === id) {
        setActiveAddress(filtered[0] || null);
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
        authMode,
        setAuthMode,
        openLoginModal,
        openSignupModal,
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
