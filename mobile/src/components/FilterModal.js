import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MAKES, BODY_TYPES, FUEL_TYPES, TRANSMISSIONS } from '../data/vehicles';

const PRICE_TIERS = [
  { label: 'Any Price', value: 150000 },
  { label: 'Under $30k', value: 30000 },
  { label: 'Under $50k', value: 50000 },
  { label: 'Under $75k', value: 75000 },
  { label: 'Under $100k', value: 100000 },
];

export default function FilterModal({ visible, onClose, filters, onApplyFilters, onResetFilters }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleSelect = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const defaultFilters = {
      make: 'All Makes',
      bodyType: 'All Types',
      fuelType: 'All Fuels',
      transmission: 'All Transmissions',
      maxPrice: 150000,
    };
    setLocalFilters(defaultFilters);
    onResetFilters();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <Ionicons name="filter" size={20} color="#2563EB" />
              <Text style={styles.title}>Filter Inventory</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
            {/* Filter Section: Make */}
            <Text style={styles.sectionTitle}>Make / Brand</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillRow}>
              {MAKES.map(make => {
                const selected = localFilters.make === make;
                return (
                  <TouchableOpacity
                    key={make}
                    style={[styles.pill, selected && styles.pillActive]}
                    onPress={() => handleSelect('make', make)}
                  >
                    <Text style={[styles.pillText, selected && styles.pillTextActive]}>{make}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Filter Section: Body Type */}
            <Text style={styles.sectionTitle}>Body Type</Text>
            <View style={styles.wrapRow}>
              {BODY_TYPES.map(type => {
                const selected = localFilters.bodyType === type;
                return (
                  <TouchableOpacity
                    key={type}
                    style={[styles.pill, selected && styles.pillActive]}
                    onPress={() => handleSelect('bodyType', type)}
                  >
                    <Text style={[styles.pillText, selected && styles.pillTextActive]}>{type}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Filter Section: Fuel Type */}
            <Text style={styles.sectionTitle}>Fuel / Powertrain</Text>
            <View style={styles.wrapRow}>
              {FUEL_TYPES.map(fuel => {
                const selected = localFilters.fuelType === fuel;
                return (
                  <TouchableOpacity
                    key={fuel}
                    style={[styles.pill, selected && styles.pillActive]}
                    onPress={() => handleSelect('fuelType', fuel)}
                  >
                    <Text style={[styles.pillText, selected && styles.pillTextActive]}>{fuel}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Filter Section: Transmission */}
            <Text style={styles.sectionTitle}>Transmission</Text>
            <View style={styles.wrapRow}>
              {TRANSMISSIONS.map(trans => {
                const selected = localFilters.transmission === trans;
                return (
                  <TouchableOpacity
                    key={trans}
                    style={[styles.pill, selected && styles.pillActive]}
                    onPress={() => handleSelect('transmission', trans)}
                  >
                    <Text style={[styles.pillText, selected && styles.pillTextActive]}>{trans}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Filter Section: Max Price */}
            <Text style={styles.sectionTitle}>Maximum Price</Text>
            <View style={styles.wrapRow}>
              {PRICE_TIERS.map(tier => {
                const selected = localFilters.maxPrice === tier.value;
                return (
                  <TouchableOpacity
                    key={tier.label}
                    style={[styles.pill, selected && styles.pillActive]}
                    onPress={() => handleSelect('maxPrice', tier.value)}
                  >
                    <Text style={[styles.pillText, selected && styles.pillTextActive]}>{tier.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reset All</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeBtn: {
    padding: 4,
  },
  scrollArea: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginTop: 16,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pillRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  pillText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  applyButton: {
    flex: 2,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
