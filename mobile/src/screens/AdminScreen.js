import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Alert, FlatList, Image, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useToast } from '../context/ToastContext';
import { MAKES, BODY_TYPES, FUEL_TYPES, TRANSMISSIONS } from '../data/vehicles';

export default function AdminScreen({
  vehicles,
  inquiries,
  onAddVehicle,
  onUpdateVehicle,
  onDeleteVehicle,
  onUpdateInquiryStatus,
  onDeleteInquiry,
  onViewDetails
}) {
  const { showToast } = useToast();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('1234');
  const [showPassword, setShowPassword] = useState(true);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'inquiries'

  // Add/Edit Vehicle Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [make, setMake] = useState('BMW');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2024');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [fuelType, setFuelType] = useState('Petrol');
  const [transmission, setTransmission] = useState('Automatic');
  const [bodyType, setBodyType] = useState('Sedan');
  const [location, setLocation] = useState('Apex Central Showroom');
  const [badge, setBadge] = useState('Featured');
  const [images, setImages] = useState([]);

  // Stats
  const totalValuation = vehicles.reduce((sum, v) => sum + (v.price || 0), 0);
  const activeInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  const handleLogin = () => {
    const trimmed = passcode.trim();
    if (trimmed === 'admin' || trimmed === 'apex2026' || trimmed === '1234') {
      setIsAuthenticated(true);
      setAuthError('');
      setPasscode('1234');
      showToast('Authenticated as Dealership Administrator', 'success');
    } else {
      setAuthError('Invalid passcode. Try "1234" or "admin".');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('1234');
    setShowPassword(true);
    showToast('Admin Portal locked', 'info');
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setMake('BMW');
    setModel('');
    setYear('2024');
    setPrice('');
    setMileage('');
    setFuelType('Petrol');
    setTransmission('Automatic');
    setBodyType('Sedan');
    setLocation('Apex Central Showroom');
    setBadge('Featured');
    setImages([]);
    setModalOpen(true);
  };

  const handleOpenEdit = (v) => {
    setEditingId(v.id);
    setMake(v.make || 'BMW');
    setModel(v.model || '');
    setYear(String(v.year || 2024));
    setPrice(String(v.price || ''));
    setMileage(String(v.mileage || ''));
    setFuelType(v.fuelType || 'Petrol');
    setTransmission(v.transmission || 'Automatic');
    setBodyType(v.bodyType || 'Sedan');
    setLocation(v.location || 'Apex Central Showroom');
    setBadge(v.badge || 'Featured');
    const existingImages = Array.isArray(v.images) && v.images.length > 0
      ? [...v.images]
      : (v.imageUrl ? [v.imageUrl] : []);
    setImages(existingImages);
    setModalOpen(true);
  };

  const handlePickImages = async () => {
    try {
      if (Platform.OS !== 'web') {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
          showToast('Photo library permission is required to upload', 'error');
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        selectionLimit: 12,
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newUris = result.assets.map(a => a.uri).filter(Boolean);
        setImages(prev => [...prev, ...newUris]);
        showToast(
          newUris.length > 1
            ? `${newUris.length} photos added to vehicle`
            : 'Photo added to vehicle',
          'success'
        );
      }
    } catch (err) {
      console.error('Image picker error', err);
      showToast('Could not open photo gallery', 'error');
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetCoverImage = (index) => {
    if (index === 0) return;
    setImages(prev => {
      const target = prev[index];
      const rest = prev.filter((_, idx) => idx !== index);
      return [target, ...rest];
    });
    showToast('Set as main cover photo', 'info');
  };

  const handleClearAllImages = () => {
    setImages([]);
    showToast('All photos cleared', 'info');
  };

  const handleSaveVehicle = () => {
    if (!model.trim() || !price || !year) {
      showToast('Please fill out model, year, and price', 'error');
      return;
    }

    const vehicleData = {
      make,
      model: model.trim(),
      year: parseInt(year, 10) || 2024,
      price: parseInt(price, 10) || 0,
      mileage: parseInt(mileage, 10) || 0,
      fuelType,
      transmission,
      bodyType,
      location,
      badge,
      images: images.length > 0
        ? images
        : ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'],
    };

    if (editingId) {
      onUpdateVehicle(editingId, vehicleData);
      showToast('Vehicle updated successfully', 'success');
    } else {
      const newVehicle = {
        ...vehicleData,
        id: `veh-${Date.now().toString().slice(-4)}`,
        vin: `VIN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        stockNumber: `APX-${Math.floor(1000 + Math.random() * 9000)}`,
        description: `Exquisite luxury ${vehicleData.year} ${vehicleData.make} ${vehicleData.model}. Inspected and certified by Apex Motors.`,
      };
      onAddVehicle(newVehicle);
      showToast('New vehicle added to inventory', 'success');
    }
    setModalOpen(false);
  };

  const handleDeletePrompt = (id, title) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to remove ${title} from inventory?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            onDeleteVehicle(id);
            showToast('Vehicle deleted from inventory', 'info');
          }
        }
      ]
    );
  };

  const handleDeleteInquiryPrompt = (id) => {
    Alert.alert(
      "Delete Inquiry",
      "Are you sure you want to remove this customer inquiry?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            onDeleteInquiry(id);
            showToast('Inquiry removed', 'info');
          }
        }
      ]
    );
  };

  // PASSCODE LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <View style={styles.authContainer}>
        <View style={styles.authCard}>
          <View style={styles.authIconWrap}>
            <Ionicons name="lock-closed" size={32} color="#2563EB" />
          </View>
          <View style={styles.authBadge}>
            <Ionicons name="shield-checkmark" size={11} color="#2563EB" style={{ marginRight: 4 }} />
            <Text style={styles.authBadgeText}>DEALER ADMIN</Text>
          </View>
          <Text style={styles.authTitle}>Dealer Admin</Text>
          <Text style={styles.authSubtitle}>
            Enter admin passcode to unlock dealer inventory and lead management tools.
          </Text>

          {authError ? (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={16} color="#EF4444" style={{ marginRight: 6 }} />
              <Text style={styles.errorText}>{authError}</Text>
            </View>
          ) : null}

          {/* Prompt before the passcode: 1234 or admin */}
          <View style={styles.passcodePromptRow}>
            <Text style={styles.passcodePromptLabel}>Passcode:</Text>
            <TouchableOpacity
              onPress={() => setPasscode('1234')}
              activeOpacity={0.7}
              style={styles.quickChip}
            >
              <Text style={styles.quickChipText}>1234</Text>
            </TouchableOpacity>
            <Text style={styles.passcodeOrText}>or</Text>
            <TouchableOpacity
              onPress={() => setPasscode('admin')}
              activeOpacity={0.7}
              style={styles.quickChip}
            >
              <Text style={styles.quickChipText}>admin</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.passcodeInputWrap}>
            <Ionicons name="key-outline" size={18} color="#64748B" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.passcodeInput}
              placeholder="1234 or admin"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!showPassword}
              value={passcode}
              onChangeText={(text) => {
                setPasscode(text);
                if (authError) setAuthError('');
              }}
              onSubmitEditing={handleLogin}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 4 }}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.unlockBtn} onPress={handleLogin} activeOpacity={0.85}>
            <Ionicons name="shield-checkmark" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.unlockBtnText}>Unlock Admin Dashboard</Text>
          </TouchableOpacity>

          <View style={styles.hintWrap}>
            <Text style={styles.hintText}>
              Passcode: <Text style={{ fontWeight: '800', color: '#2563EB' }}>1234</Text> or <Text style={{ fontWeight: '800', color: '#2563EB' }}>admin</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Banner & Stats */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <View style={{ flex: 1 }}>
            <View style={styles.adminTagBadge}>
              <Ionicons name="shield-checkmark" size={11} color="#60A5FA" style={{ marginRight: 4 }} />
              <Text style={styles.adminTagBadgeText}>DEALER ADMIN</Text>
            </View>
            <Text style={styles.headerTitle}>Dealer Admin</Text>
            <Text style={styles.headerSub}>Inventory & VIP leads management</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.75}>
            <Ionicons name="lock-closed-outline" size={15} color="#EF4444" />
            <Text style={styles.logoutText}>Lock</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>{vehicles.length}</Text>
            <Text style={styles.statLabel}>Vehicles</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>${(totalValuation / 1000).toFixed(0)}k</Text>
            <Text style={styles.statLabel}>Valuation</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statVal, { color: '#60A5FA' }]}>{activeInquiriesCount}</Text>
            <Text style={styles.statLabel}>New Leads</Text>
          </View>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'inventory' && styles.tabBtnActive]}
            onPress={() => setActiveTab('inventory')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="car-sport"
              size={16}
              color={activeTab === 'inventory' ? '#2563EB' : '#94A3B8'}
            />
            <Text style={[styles.tabBtnText, activeTab === 'inventory' && styles.tabBtnTextActive]}>
              Inventory ({vehicles.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'inquiries' && styles.tabBtnActive]}
            onPress={() => setActiveTab('inquiries')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="mail-unread"
              size={16}
              color={activeTab === 'inquiries' ? '#2563EB' : '#94A3B8'}
            />
            <Text style={[styles.tabBtnText, activeTab === 'inquiries' && styles.tabBtnTextActive]}>
              Leads ({inquiries.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content by Tab */}
      {activeTab === 'inventory' ? (
        <View style={styles.tabContent}>
          <View style={styles.actionHeader}>
            <Text style={styles.listSectionTitle}>All Vehicles</Text>
            <TouchableOpacity style={styles.addBtn} onPress={handleOpenAdd}>
              <Ionicons name="add-circle" size={18} color="#FFFFFF" />
              <Text style={styles.addBtnText}>Add Vehicle</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={vehicles}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.adminVehicleRow}>
                <View style={styles.adminVehInfo}>
                  <Text style={styles.adminVehTitle}>{item.year} {item.make} {item.model}</Text>
                  <Text style={styles.adminVehMeta}>
                    ${item.price?.toLocaleString()} • {item.mileage?.toLocaleString()} mi • {item.bodyType}
                  </Text>
                </View>

                <View style={styles.adminActionBtns}>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => handleOpenEdit(item)}
                  >
                    <Ionicons name="create-outline" size={18} color="#2563EB" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.delBtn}
                    onPress={() => handleDeletePrompt(item.id, `${item.year} ${item.make} ${item.model}`)}
                  >
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 60 }}
          />
        </View>
      ) : (
        <View style={styles.tabContent}>
          <Text style={styles.listSectionTitle}>Customer Inquiries</Text>

          <FlatList
            data={inquiries}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const isNew = item.status === 'New';
              const isContacted = item.status === 'Contacted';
              return (
                <View style={styles.inquiryCard}>
                  <View style={styles.inquiryTopRow}>
                    <View>
                      <Text style={styles.inquiryName}>{item.fullName}</Text>
                      <Text style={styles.inquiryPhone}>{item.phone} • {item.email || 'No email'}</Text>
                    </View>
                    <View style={[styles.statusBadge, isNew && styles.statusBadgeNew, isContacted && styles.statusBadgeContacted]}>
                      <Text style={[styles.statusBadgeText, isNew && styles.statusBadgeTextNew]}>{item.status}</Text>
                    </View>
                  </View>

                  <Text style={styles.inquiryTargetCar}>
                    Requested: <Text style={{ fontWeight: '700' }}>{item.vehicleTitle}</Text>
                  </Text>

                  {item.message ? (
                    <Text style={styles.inquiryMsg} numberOfLines={2}>"{item.message}"</Text>
                  ) : null}

                  {item.visitDate ? (
                    <Text style={styles.inquiryDate}>Preferred Visit: {item.visitDate}</Text>
                  ) : null}

                  {/* Actions */}
                  <View style={styles.inquiryActions}>
                    <TouchableOpacity
                      style={styles.statusChangeBtn}
                      onPress={() => {
                        const next = item.status === 'New' ? 'Contacted' : item.status === 'Contacted' ? 'Closed' : 'New';
                        onUpdateInquiryStatus(item.id, next);
                        showToast(`Status updated to ${next}`, 'info');
                      }}
                    >
                      <Text style={styles.statusChangeText}>Mark {item.status === 'New' ? 'Contacted' : item.status === 'Contacted' ? 'Closed' : 'New'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.delInqBtn}
                      onPress={() => handleDeleteInquiryPrompt(item.id)}
                    >
                      <Ionicons name="trash-outline" size={16} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            contentContainerStyle={{ paddingBottom: 60 }}
          />
        </View>
      )}

      {/* Add / Edit Vehicle Modal */}
      <Modal visible={modalOpen} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBody}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editingId ? 'Edit Vehicle' : 'Add New Vehicle'}</Text>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Make</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', gap: 6 }}>
                  {MAKES.filter(m => m !== 'All Makes').map(m => (
                    <TouchableOpacity
                      key={m}
                      style={[styles.smallPill, make === m && styles.smallPillActive]}
                      onPress={() => setMake(m)}
                    >
                      <Text style={[styles.smallPillText, make === m && styles.smallPillTextActive]}>{m}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Model Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. M3 Competition, C300, 911"
                  value={model}
                  onChangeText={setModel}
                />
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>Year</Text>
                  <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    value={year}
                    onChangeText={setYear}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>Price ($)</Text>
                  <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    placeholder="45000"
                    value={price}
                    onChangeText={setPrice}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Mileage (Miles)</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  placeholder="12000"
                  value={mileage}
                  onChangeText={setMileage}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Body Type</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  {BODY_TYPES.filter(b => b !== 'All Types').map(b => (
                    <TouchableOpacity
                      key={b}
                      style={[styles.smallPill, bodyType === b && styles.smallPillActive]}
                      onPress={() => setBodyType(b)}
                    >
                      <Text style={[styles.smallPillText, bodyType === b && styles.smallPillTextActive]}>{b}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Badge / Status</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                  {['Featured', 'Hot Deal', 'New Arrival', 'Certified Pre-Owned'].map(b => (
                    <TouchableOpacity
                      key={b}
                      style={[styles.smallPill, badge === b && styles.smallPillActive]}
                      onPress={() => setBadge(b)}
                    >
                      <Text style={[styles.smallPillText, badge === b && styles.smallPillTextActive]}>{b}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formGroup}>
                <View style={styles.photoHeaderRow}>
                  <View>
                    <Text style={styles.formLabel}>Vehicle Photos ({images.length})</Text>
                    <Text style={styles.photoSubLabel}>Upload multiple photos • First photo is main cover</Text>
                  </View>
                  {images.length > 0 && (
                    <View style={{ flexDirection: 'row', gap: 6 }}>
                      <TouchableOpacity
                        style={styles.addMoreMiniBtn}
                        onPress={handlePickImages}
                        activeOpacity={0.8}
                      >
                        <Ionicons name="add-circle" size={14} color="#2563EB" />
                        <Text style={styles.addMoreMiniText}>Add Photos</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.clearMiniBtn}
                        onPress={handleClearAllImages}
                        activeOpacity={0.8}
                      >
                        <Ionicons name="trash-outline" size={14} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {images.length === 0 ? (
                  <TouchableOpacity
                    style={styles.uploadDropzone}
                    onPress={handlePickImages}
                    activeOpacity={0.75}
                  >
                    <View style={styles.uploadIconBadge}>
                      <Ionicons name="images" size={28} color="#2563EB" />
                    </View>
                    <Text style={styles.uploadPrimaryText}>Tap to Upload Multiple Photos</Text>
                    <Text style={styles.uploadSecondaryText}>
                      Select exterior, interior, engine & detail photos from device (JPG, PNG)
                    </Text>
                    <View style={styles.uploadBrowsePill}>
                      <Ionicons name="cloud-upload-outline" size={15} color="#2563EB" style={{ marginRight: 6 }} />
                      <Text style={styles.uploadBrowseText}>Select Multiple Photos</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.multiPhotosContainer}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.multiPhotosScroll}
                    >
                      {images.map((uri, idx) => {
                        const isCover = idx === 0;
                        return (
                          <View key={`${uri}-${idx}`} style={styles.photoCard}>
                            <Image source={{ uri }} style={styles.photoCardImg} resizeMode="cover" />

                            {/* Badge */}
                            <View style={[styles.photoCardBadge, isCover ? styles.photoCoverBadge : styles.photoOrderBadge]}>
                              <Ionicons
                                name={isCover ? "star" : "image-outline"}
                                size={10}
                                color={isCover ? "#F59E0B" : "#FFFFFF"}
                                style={{ marginRight: 3 }}
                              />
                              <Text style={[styles.photoBadgeText, isCover && styles.photoCoverText]}>
                                {isCover ? 'MAIN COVER' : `#${idx + 1}`}
                              </Text>
                            </View>

                            {/* Delete Button */}
                            <TouchableOpacity
                              style={styles.photoDeleteBtn}
                              onPress={() => handleRemoveImage(idx)}
                              activeOpacity={0.8}
                            >
                              <Ionicons name="close" size={13} color="#FFFFFF" />
                            </TouchableOpacity>

                            {/* Set as Cover Action */}
                            {!isCover && (
                              <TouchableOpacity
                                style={styles.setCoverBtn}
                                onPress={() => handleSetCoverImage(idx)}
                                activeOpacity={0.8}
                              >
                                <Ionicons name="star" size={10} color="#D97706" style={{ marginRight: 3 }} />
                                <Text style={styles.setCoverBtnText}>Set Cover</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        );
                      })}

                      {/* Add Another Photo Tile */}
                      <TouchableOpacity
                        style={styles.addPhotoCardTile}
                        onPress={handlePickImages}
                        activeOpacity={0.75}
                      >
                        <View style={styles.addTileIconCircle}>
                          <Ionicons name="add" size={22} color="#2563EB" />
                        </View>
                        <Text style={styles.addTileText}>Add More</Text>
                        <Text style={styles.addTileSub}>Photos</Text>
                      </TouchableOpacity>
                    </ScrollView>
                  </View>
                )}
              </View>

              <View style={{ height: 20 }} />
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveVehicle}>
                <Text style={styles.saveBtnText}>Save Vehicle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  authContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  authCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  authIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  authBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
    marginBottom: 8,
  },
  authBadgeText: {
    color: '#2563EB',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  authTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  authSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 14,
    width: '100%',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '600',
    flexShrink: 1,
  },
  passcodePromptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 8,
    gap: 6,
  },
  passcodePromptLabel: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#334155',
  },
  quickChip: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  quickChipText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },
  passcodeOrText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  passcodeInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    width: '100%',
    marginBottom: 16,
  },
  passcodeInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  unlockBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    width: '100%',
    paddingVertical: 13,
    borderRadius: 14,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  unlockBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  hintWrap: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    width: '100%',
    alignItems: 'center',
  },
  hintText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  header: {
    backgroundColor: '#090D16',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  adminTagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
    marginBottom: 4,
  },
  adminTagBadgeText: {
    color: '#38BDF8',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerSub: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statVal: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tabBtnActive: {
    backgroundColor: '#FFFFFF',
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  tabBtnTextActive: {
    color: '#2563EB',
    fontWeight: '800',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  adminVehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  adminVehInfo: {
    flex: 1,
  },
  adminVehTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  adminVehMeta: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  adminActionBtns: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 8,
  },
  editBtn: {
    padding: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  delBtn: {
    padding: 8,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
  },
  inquiryCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inquiryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  inquiryName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  inquiryPhone: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  statusBadgeNew: {
    backgroundColor: '#EFF6FF',
  },
  statusBadgeContacted: {
    backgroundColor: '#DBEAFE',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  statusBadgeTextNew: {
    color: '#2563EB',
  },
  inquiryTargetCar: {
    fontSize: 13,
    color: '#334155',
    marginBottom: 4,
  },
  inquiryMsg: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#64748B',
    marginBottom: 6,
  },
  inquiryDate: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
    marginBottom: 8,
  },
  inquiryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  statusChangeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
  },
  statusChangeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  delInqBtn: {
    padding: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'flex-end',
  },
  modalBody: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  formGroup: {
    marginTop: 12,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    color: '#0F172A',
  },
  smallPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  smallPillActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  smallPillText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  smallPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  saveBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  uploadDropzone: {
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#93C5FD',
    borderRadius: 16,
    paddingVertical: 22,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  uploadPrimaryText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  uploadSecondaryText: {
    fontSize: 11.5,
    color: '#64748B',
    marginBottom: 12,
    textAlign: 'center',
  },
  uploadBrowsePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  uploadBrowseText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '700',
  },
  photoHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  photoSubLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  addMoreMiniBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    gap: 4,
  },
  addMoreMiniText: {
    color: '#2563EB',
    fontSize: 11.5,
    fontWeight: '700',
  },
  clearMiniBtn: {
    backgroundColor: '#FEF2F2',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  multiPhotosContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
  },
  multiPhotosScroll: {
    gap: 10,
    alignItems: 'center',
    paddingVertical: 4,
  },
  photoCard: {
    width: 140,
    height: 125,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#090D16',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  photoCardImg: {
    width: '100%',
    height: '100%',
  },
  photoCardBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  photoCoverBadge: {
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.6)',
  },
  photoCoverText: {
    color: '#F59E0B',
    fontWeight: '800',
  },
  photoOrderBadge: {
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
  },
  photoBadgeText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  photoDeleteBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(239, 68, 68, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  setCoverBtn: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    right: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  setCoverBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0F172A',
  },
  addPhotoCardTile: {
    width: 110,
    height: 125,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#93C5FD',
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  addTileIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  addTileText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
  },
  addTileSub: {
    fontSize: 9.5,
    color: '#64748B',
    fontWeight: '600',
  },
});
