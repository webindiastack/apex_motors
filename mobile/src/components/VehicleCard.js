import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

export default function VehicleCard({ vehicle, onViewDetails, onInquire, style }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(vehicle.id);

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'Featured':
        return { bg: '#2563EB', text: '#FFFFFF' };
      case 'New Arrival':
        return { bg: '#059669', text: '#FFFFFF' };
      case 'Certified Pre-Owned':
        return { bg: '#D97706', text: '#FFFFFF' };
      case 'Hot Deal':
        return { bg: '#E11D48', text: '#FFFFFF' };
      default:
        return { bg: '#1E293B', text: '#F8FAFC' };
    }
  };

  const getOptimizedUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=75';
    if (url.includes('unsplash.com')) {
      return url.replace(/w=\d+/, 'w=600').replace(/q=\d+/, 'q=75');
    }
    return url;
  };

  const badgeStyle = getBadgeStyle(vehicle.badge);
  const rawImageUrl = vehicle.images && vehicle.images[0]
    ? vehicle.images[0]
    : 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=75';
  const imageUrl = getOptimizedUrl(rawImageUrl);

  return (
    <TouchableOpacity
      style={[styles.cardContainer, style]}
      onPress={() => onViewDetails(vehicle)}
      activeOpacity={0.92}
    >
      {/* Vehicle Image Header */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Gradient Overlay */}
        <View style={styles.imageOverlay} />

        {/* Status Badge */}
        {vehicle.badge && (
          <View style={[styles.badge, { backgroundColor: badgeStyle.bg }]}>
            <Text style={[styles.badgeText, { color: badgeStyle.text }]}>{vehicle.badge}</Text>
          </View>
        )}

        {/* Favorite Heart Button */}
        <TouchableOpacity
          style={[styles.favoriteButton, favorite && styles.favoriteButtonActive]}
          onPress={(e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            toggleFavorite(vehicle.id);
          }}
          activeOpacity={0.8}
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={14}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        {/* Location Pill */}
        <View style={styles.locationPill}>
          <Ionicons name="location-sharp" size={9.5} color="#60A5FA" style={{ marginRight: 3 }} />
          <Text style={styles.locationPillText} numberOfLines={1}>{vehicle.location || 'Apex Showroom'}</Text>
        </View>
      </View>

      {/* Card Content */}
      <View style={styles.content}>
        {/* Make & Year */}
        <View style={styles.brandRow}>
          <Text style={styles.makeLabel} numberOfLines={1}>{vehicle.make}</Text>
          <Text style={styles.yearLabel}>{vehicle.year}</Text>
        </View>

        {/* Title */}
        <Text style={styles.titleText} numberOfLines={1}>
          {vehicle.model}
        </Text>

        {/* Price */}
        <Text style={styles.priceText}>
          ${vehicle.price?.toLocaleString()}
        </Text>

        {/* Specs Pill Row */}
        <View style={styles.specsGrid}>
          <View style={styles.specCell}>
            <MaterialCommunityIcons name="speedometer" size={12} color="#64748B" />
            <Text style={styles.specText} numberOfLines={1}>{vehicle.mileage?.toLocaleString()} mi</Text>
          </View>
          <View style={styles.specCell}>
            <MaterialCommunityIcons name="gas-station" size={12} color="#64748B" />
            <Text style={styles.specText} numberOfLines={1}>{vehicle.fuelType}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.inquireButton}
            onPress={(e) => {
              if (e && e.stopPropagation) e.stopPropagation();
              onInquire(vehicle);
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="chatbubbles-outline" size={13} color="#2563EB" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.detailsButton}
            onPress={(e) => {
              if (e && e.stopPropagation) e.stopPropagation();
              onViewDetails(vehicle);
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.detailsButtonText}>Details</Text>
            <Ionicons name="arrow-forward" size={11} color="#FFFFFF" style={{ marginLeft: 3 }} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    minWidth: '47%',
    maxWidth: '50%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  imageContainer: {
    height: 142,
    width: '100%',
    position: 'relative',
    backgroundColor: '#090D16',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 13, 22, 0.1)',
  },
  badge: {
    position: 'absolute',
    top: 7,
    left: 7,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeText: {
    fontSize: 8.5,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  favoriteButton: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(9, 13, 22, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  favoriteButtonActive: {
    backgroundColor: '#F43F5E',
    borderColor: '#F43F5E',
  },
  locationPill: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    right: 6,
    backgroundColor: 'rgba(9, 13, 22, 0.85)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  locationPillText: {
    color: '#F1F5F9',
    fontSize: 9.5,
    fontWeight: '600',
    flex: 1,
  },
  content: {
    padding: 10,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  makeLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    flex: 1,
  },
  yearLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#2563EB',
  },
  titleText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  priceText: {
    fontSize: 14.5,
    fontWeight: '900',
    color: '#2563EB',
    marginBottom: 6,
  },
  specsGrid: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 8,
    justifyContent: 'space-around',
  },
  specCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  specText: {
    fontSize: 9.5,
    color: '#475569',
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
    gap: 6,
  },
  inquireButton: {
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 8,
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.2)',
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#090D16',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11.5,
  },
});
