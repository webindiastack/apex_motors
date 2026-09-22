import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

export default function VehicleCard({ vehicle, onViewDetails, onInquire }) {
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

  const badgeStyle = getBadgeStyle(vehicle.badge);
  const imageUrl = vehicle.images && vehicle.images[0]
    ? vehicle.images[0]
    : 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80';

  return (
    <View style={styles.cardContainer}>
      {/* Vehicle Image Header */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Gradient Shadow Overlay */}
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
          onPress={() => toggleFavorite(vehicle.id)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={18}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        {/* Location Pill */}
        <View style={styles.locationPill}>
          <Ionicons name="location-sharp" size={11} color="#60A5FA" style={{ marginRight: 4 }} />
          <Text style={styles.locationPillText} numberOfLines={1}>{vehicle.location || 'Apex Showroom'}</Text>
        </View>
      </View>

      {/* Card Content */}
      <View style={styles.content}>
        {/* Make & Year */}
        <View style={styles.brandRow}>
          <Text style={styles.makeLabel}>{vehicle.make}</Text>
          <Text style={styles.yearLabel}>{vehicle.year}</Text>
        </View>

        {/* Title & Price */}
        <View style={styles.titleRow}>
          <Text style={styles.titleText} numberOfLines={1}>
            {vehicle.model}
          </Text>
          <Text style={styles.priceText}>
            ${vehicle.price?.toLocaleString()}
          </Text>
        </View>

        {/* Specs Grid */}
        <View style={styles.specsGrid}>
          <View style={styles.specCell}>
            <MaterialCommunityIcons name="speedometer" size={15} color="#94A3B8" />
            <Text style={styles.specText}>{vehicle.mileage?.toLocaleString()} mi</Text>
          </View>
          <View style={styles.specCell}>
            <MaterialCommunityIcons name="gas-station" size={15} color="#94A3B8" />
            <Text style={styles.specText}>{vehicle.fuelType}</Text>
          </View>
          <View style={styles.specCell}>
            <MaterialCommunityIcons name="car-shift-pattern" size={15} color="#94A3B8" />
            <Text style={styles.specText}>{vehicle.transmission}</Text>
          </View>
          <View style={styles.specCell}>
            <FontAwesome5 name="car-side" size={12} color="#94A3B8" />
            <Text style={styles.specText}>{vehicle.bodyType}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.inquireButton}
            onPress={() => onInquire(vehicle)}
            activeOpacity={0.7}
          >
            <Text style={styles.inquireButtonText}>Quick Inquiry</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => onViewDetails(vehicle)}
            activeOpacity={0.8}
          >
            <Text style={styles.detailsButtonText}>View Details</Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" style={{ marginLeft: 5 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  imageContainer: {
    height: 205,
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
    backgroundColor: 'rgba(9, 13, 22, 0.22)',
  },
  badge: {
    position: 'absolute',
    top: 14,
    left: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  favoriteButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
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
    bottom: 12,
    left: 14,
    backgroundColor: 'rgba(9, 13, 22, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  locationPillText: {
    color: '#F1F5F9',
    fontSize: 11,
    fontWeight: '600',
  },
  content: {
    padding: 18,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  makeLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  yearLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#2563EB',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    gap: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
  },
  priceText: {
    fontSize: 19,
    fontWeight: '900',
    color: '#0F172A',
  },
  specsGrid: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
  },
  specCell: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  specText: {
    fontSize: 10.5,
    color: '#475569',
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 14,
    gap: 10,
  },
  inquireButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
  },
  inquireButtonText: {
    color: '#334155',
    fontWeight: '700',
    fontSize: 13,
  },
  detailsButton: {
    backgroundColor: '#090D16',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
