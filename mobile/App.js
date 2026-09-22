import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, BackHandler, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Header from './src/components/Header';
import InquiryModal from './src/components/InquiryModal';

import HomeScreen from './src/screens/HomeScreen';
import VehiclesScreen from './src/screens/VehiclesScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import AdminScreen from './src/screens/AdminScreen';
import AboutScreen from './src/screens/AboutScreen';
import ContactScreen from './src/screens/ContactScreen';

import { FavoritesProvider, useFavorites } from './src/context/FavoritesContext';
import { ToastProvider, useToast } from './src/context/ToastContext';

import {
  getStoredVehicles,
  saveVehicles,
  getStoredInquiries,
  saveInquiries
} from './src/data/vehicles';

function MainApp() {
  const { favoritesCount } = useFavorites();
  const { showToast } = useToast();

  const [vehicles, setVehicles] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Navigation State
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'vehicles' | 'favorites' | 'admin' | 'more'
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [moreSection, setMoreSection] = useState('about'); // 'about' | 'contact'

  // Inquiry Modal State
  const [inquiryVehicle, setInquiryVehicle] = useState(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    make: 'All Makes',
    bodyType: 'All Types',
    fuelType: 'All Fuels',
    transmission: 'All Transmissions',
    maxPrice: 150000,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Load Initial Data from AsyncStorage
  useEffect(() => {
    async function loadData() {
      try {
        const [vList, inqList] = await Promise.all([
          getStoredVehicles(),
          getStoredInquiries()
        ]);
        setVehicles(vList);
        setInquiries(inqList);
      } catch (e) {
        console.error("Failed to load initial data", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Hardware Back Button Handling for Android
  useEffect(() => {
    const onBackPress = () => {
      if (inquiryModalOpen) {
        setInquiryModalOpen(false);
        return true;
      }
      if (selectedVehicle) {
        setSelectedVehicle(null);
        return true;
      }
      if (activeTab !== 'home') {
        setActiveTab('home');
        return true;
      }
      return false; // Exit app
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backHandler.remove();
  }, [inquiryModalOpen, selectedVehicle, activeTab]);

  // Vehicle CRUD Handlers
  const handleAddVehicle = async (newVehicle) => {
    const updated = [newVehicle, ...vehicles];
    setVehicles(updated);
    await saveVehicles(updated);
  };

  const handleUpdateVehicle = async (id, updatedData) => {
    const updated = vehicles.map(v => v.id === id ? { ...v, ...updatedData } : v);
    setVehicles(updated);
    await saveVehicles(updated);
    if (selectedVehicle && selectedVehicle.id === id) {
      setSelectedVehicle({ ...selectedVehicle, ...updatedData });
    }
  };

  const handleDeleteVehicle = async (id) => {
    const updated = vehicles.filter(v => v.id !== id);
    setVehicles(updated);
    await saveVehicles(updated);
    if (selectedVehicle && selectedVehicle.id === id) {
      setSelectedVehicle(null);
    }
  };

  // Inquiry Handlers
  const handleSubmitInquiry = async (inquiryRecord) => {
    const updated = [inquiryRecord, ...inquiries];
    setInquiries(updated);
    await saveInquiries(updated);
  };

  const handleUpdateInquiryStatus = async (id, newStatus) => {
    const updated = inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i);
    setInquiries(updated);
    await saveInquiries(updated);
  };

  const handleDeleteInquiry = async (id) => {
    const updated = inquiries.filter(i => i.id !== id);
    setInquiries(updated);
    await saveInquiries(updated);
  };

  const handleOpenInquiry = (veh) => {
    setInquiryVehicle(veh);
    setInquiryModalOpen(true);
  };

  const handleViewDetails = (veh) => {
    setSelectedVehicle(veh);
  };

  const handleCategorySelect = (bodyType) => {
    setFilters(prev => ({ ...prev, bodyType }));
    setActiveTab('vehicles');
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: 'home', iconOutline: 'home-outline' },
    { id: 'vehicles', label: 'Inventory', icon: 'car-sport', iconOutline: 'car-sport-outline' },
    { id: 'favorites', label: 'Saved', icon: 'heart', iconOutline: 'heart-outline', badge: favoritesCount },
    { id: 'admin', label: 'Admin', icon: 'shield-checkmark', iconOutline: 'shield-checkmark-outline' },
    { id: 'more', label: 'More', icon: 'ellipsis-horizontal-circle', iconOutline: 'ellipsis-horizontal-circle-outline' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#090D16" />

      {/* Main Header */}
      {!selectedVehicle && (
        <Header
          onOpenFavorites={() => {
            setSelectedVehicle(null);
            setActiveTab('favorites');
          }}
        />
      )}

      {/* Content View */}
      <View style={styles.content}>
        {selectedVehicle ? (
          <DetailsScreen
            vehicle={selectedVehicle}
            onBack={() => setSelectedVehicle(null)}
            onInquire={handleOpenInquiry}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeScreen
                vehicles={vehicles}
                onNavigate={setActiveTab}
                onViewDetails={handleViewDetails}
                onInquire={handleOpenInquiry}
                onSelectCategory={handleCategorySelect}
              />
            )}

            {activeTab === 'vehicles' && (
              <VehiclesScreen
                vehicles={vehicles}
                onViewDetails={handleViewDetails}
                onInquire={handleOpenInquiry}
                filters={filters}
                setFilters={setFilters}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            )}

            {activeTab === 'favorites' && (
              <FavoritesScreen
                vehicles={vehicles}
                onViewDetails={handleViewDetails}
                onInquire={handleOpenInquiry}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'admin' && (
              <AdminScreen
                vehicles={vehicles}
                inquiries={inquiries}
                onAddVehicle={handleAddVehicle}
                onUpdateVehicle={handleUpdateVehicle}
                onDeleteVehicle={handleDeleteVehicle}
                onUpdateInquiryStatus={handleUpdateInquiryStatus}
                onDeleteInquiry={handleDeleteInquiry}
                onViewDetails={handleViewDetails}
              />
            )}

            {activeTab === 'more' && (
              <View style={styles.moreContainer}>
                {/* Secondary Tab Switcher - Aesthetic White Pill Active */}
                <View style={styles.moreSubNav}>
                  <TouchableOpacity
                    style={[styles.moreSubTab, moreSection === 'about' && styles.moreSubTabActive]}
                    onPress={() => setMoreSection('about')}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.moreSubTabText, moreSection === 'about' && styles.moreSubTabTextActive]}>
                      About Dealership
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.moreSubTab, moreSection === 'contact' && styles.moreSubTabActive]}
                    onPress={() => setMoreSection('contact')}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.moreSubTabText, moreSection === 'contact' && styles.moreSubTabTextActive]}>
                      Contact & Locations
                    </Text>
                  </TouchableOpacity>
                </View>

                {moreSection === 'about' ? (
                  <AboutScreen onNavigate={setActiveTab} />
                ) : (
                  <ContactScreen onSubmitInquiry={handleSubmitInquiry} />
                )}
              </View>
            )}
          </>
        )}
      </View>

      {/* Bottom Tab Navigation Bar - Selected in Pure White with frosted capsule */}
      {!selectedVehicle && (
        <View style={styles.tabBar}>
          {tabs.map(tab => {
            const isSelected = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={styles.tabItem}
                onPress={() => {
                  setSelectedVehicle(null);
                  setActiveTab(tab.id);
                }}
                activeOpacity={0.7}
              >
                <View style={[styles.tabCapsule, isSelected && styles.tabCapsuleActive]}>
                  <View style={{ position: 'relative' }}>
                    <Ionicons
                      name={isSelected ? tab.icon : tab.iconOutline}
                      size={20}
                      color={isSelected ? '#FFFFFF' : '#64748B'}
                    />
                    {tab.badge && tab.badge > 0 ? (
                      <View style={styles.tabBadge}>
                        <Text style={styles.tabBadgeText}>{tab.badge}</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={[styles.tabLabel, isSelected && styles.tabLabelActive]}>
                    {tab.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Inquiry Modal */}
      <InquiryModal
        visible={inquiryModalOpen}
        vehicle={inquiryVehicle}
        onClose={() => setInquiryModalOpen(false)}
        onSubmitInquiry={handleSubmitInquiry}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <ToastProvider>
          <MainApp />
        </ToastProvider>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090D16',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  content: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  tabBar: {
    height: 68,
    backgroundColor: '#090D16',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingBottom: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  tabCapsule: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  tabCapsuleActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  tabLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: '#FFFFFF', // Pure White selected state requested by user
    fontWeight: '800',
  },
  tabBadge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#F43F5E',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#090D16',
  },
  tabBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  moreContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  moreSubNav: {
    flexDirection: 'row',
    backgroundColor: '#090D16',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  moreSubTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  moreSubTabActive: {
    backgroundColor: '#FFFFFF', // Clean White selected item
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  moreSubTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
  },
  moreSubTabTextActive: {
    color: '#0F172A', // Dark text on white active pill
    fontWeight: '800',
  },
});
