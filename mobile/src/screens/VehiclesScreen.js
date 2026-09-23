import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VehicleCard from '../components/VehicleCard';
import FilterModal from '../components/FilterModal';
import { MAKES } from '../data/vehicles';

export default function VehiclesScreen({
  vehicles,
  onViewDetails,
  onInquire,
  filters,
  setFilters,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy
}) {
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  // Quick brand shortcuts
  const popularMakes = ["All Makes", "BMW", "Mercedes-Benz", "Porsche", "Audi", "Tesla", "Toyota"];

  // Compute active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.make !== 'All Makes') count++;
    if (filters.bodyType !== 'All Types') count++;
    if (filters.fuelType !== 'All Fuels') count++;
    if (filters.transmission !== 'All Transmissions') count++;
    if (filters.maxPrice < 150000) count++;
    return count;
  }, [filters]);

  // Filtered & Sorted list
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      // Search term
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const title = `${v.year} ${v.make} ${v.model}`.toLowerCase();
        if (!title.includes(query) && !v.exteriorColor?.toLowerCase().includes(query)) {
          return false;
        }
      }
      // Make
      if (filters.make !== 'All Makes' && v.make !== filters.make) return false;
      // Body Type
      if (filters.bodyType !== 'All Types' && v.bodyType !== filters.bodyType) return false;
      // Fuel Type
      if (filters.fuelType !== 'All Fuels' && v.fuelType !== filters.fuelType) return false;
      // Transmission
      if (filters.transmission !== 'All Transmissions' && v.transmission !== filters.transmission) return false;
      // Max Price
      if (v.price > filters.maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'mileage') return a.mileage - b.mileage;
      // newest
      return b.year - a.year;
    });
  }, [vehicles, searchTerm, filters, sortBy]);

  const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low', value: 'price-low' },
    { label: 'Price: High', value: 'price-high' },
    { label: 'Lowest Miles', value: 'mileage' },
  ];

  return (
    <View style={styles.container}>
      {/* Search & Filter Header Bar */}
      <View style={styles.searchBarRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={17} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search make, model, or year..."
            placeholderTextColor="#94A3B8"
            value={searchTerm}
            onChangeText={setSearchTerm}
            clearButtonMode="while-editing"
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={() => setSearchTerm('')} style={{ padding: 4 }}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[styles.filterBtn, activeFilterCount > 0 && styles.filterBtnActive]}
          onPress={() => setFilterModalOpen(true)}
          activeOpacity={0.8}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={activeFilterCount > 0 ? "#FFFFFF" : "#0F172A"}
          />
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Quick Brand Filter Horizontal Strip */}
      <View style={styles.quickBrandContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickBrandScroll}>
          {popularMakes.map(m => {
            const isSelected = filters.make === m;
            return (
              <TouchableOpacity
                key={m}
                style={[styles.quickBrandChip, isSelected && styles.quickBrandChipActive]}
                onPress={() => setFilters(prev => ({ ...prev, make: m }))}
                activeOpacity={0.7}
              >
                <Text style={[styles.quickBrandText, isSelected && styles.quickBrandTextActive]}>
                  {m}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Sort Pills Row */}
      <View style={styles.sortRow}>
        <Text style={styles.resultsCount}>
          Showing <Text style={styles.bold}>{filteredVehicles.length}</Text> Vehicles
        </Text>

        <View style={styles.sortPills}>
          {sortOptions.map(opt => {
            const active = sortBy === opt.value;
            return (
              <TouchableOpacity
                key={opt.value}
                style={[styles.sortPill, active && styles.sortPillActive]}
                onPress={() => setSortBy(opt.value)}
                activeOpacity={0.7}
              >
                <Text style={[styles.sortPillText, active && styles.sortPillTextActive]}>{opt.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Inventory FlatList */}
      <FlatList
        data={filteredVehicles}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <VehicleCard
            vehicle={item}
            onViewDetails={onViewDetails}
            onInquire={onInquire}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconWrap}>
              <Ionicons name="car-outline" size={42} color="#94A3B8" />
            </View>
            <Text style={styles.emptyTitle}>No Vehicles Found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search criteria or resetting filters.
            </Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => {
                setSearchTerm('');
                setFilters({
                  make: 'All Makes',
                  bodyType: 'All Types',
                  fuelType: 'All Fuels',
                  transmission: 'All Transmissions',
                  maxPrice: 150000,
                });
              }}
            >
              <Text style={styles.resetBtnText}>Clear All Filters</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={setFilters}
        onResetFilters={() => setFilters({
          make: 'All Makes',
          bodyType: 'All Types',
          fuelType: 'All Fuels',
          transmission: 'All Transmissions',
          maxPrice: 150000,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  searchBarRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    gap: 10,
    backgroundColor: '#FFFFFF',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  filterBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  filterBtnActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#2563EB',
    borderRadius: 9,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  filterBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  quickBrandContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  quickBrandScroll: {
    paddingHorizontal: 16,
  },
  quickBrandChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  quickBrandChipActive: {
    backgroundColor: '#090D16',
    borderColor: '#090D16',
  },
  quickBrandText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  quickBrandTextActive: {
    color: '#FFFFFF',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F8FAFC',
  },
  resultsCount: {
    fontSize: 12,
    color: '#64748B',
  },
  bold: {
    fontWeight: '800',
    color: '#0F172A',
  },
  sortPills: {
    flexDirection: 'row',
    gap: 6,
  },
  sortPill: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sortPillActive: {
    backgroundColor: '#090D16',
    borderColor: '#090D16',
  },
  sortPillText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  sortPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  resetBtn: {
    marginTop: 18,
    backgroundColor: '#2563EB',
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 12,
  },
  resetBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
