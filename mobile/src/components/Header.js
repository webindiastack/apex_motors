import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

export default function Header({ onOpenFavorites, title, showBack, onBack }) {
  const { favoritesCount } = useFavorites();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        {showBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <View style={styles.logoRow}>
            {/* Signature Emblem with Electric Blue Glow */}
            <View style={styles.logoBadge}>
              <MaterialCommunityIcons name="car-sports" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.brandTitleWrap}>
              <View style={styles.brandNameRow}>
                <Text style={styles.logoTextMain}>APEX</Text>
                <Text style={styles.logoTextAccent}>MOTORS</Text>
                <View style={styles.brandDot} />
              </View>
              <Text style={styles.logoSubtext}>PRESTIGE AUTOMOTIVE</Text>
            </View>
          </View>
        )}
        {showBack && title && (
          <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        )}
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          style={[styles.favoriteButton, favoritesCount > 0 && styles.favoriteButtonWithItems]}
          onPress={onOpenFavorites}
          activeOpacity={0.7}
        >
          <Ionicons
            name={favoritesCount > 0 ? "heart" : "heart-outline"}
            size={19}
            color={favoritesCount > 0 ? "#F43F5E" : "#94A3B8"}
          />
          {favoritesCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{favoritesCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 66,
    backgroundColor: '#090D16',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.07)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  brandTitleWrap: {
    justifyContent: 'center',
  },
  brandNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  logoTextMain: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.2,
  },
  logoTextAccent: {
    fontSize: 16,
    fontWeight: '900',
    color: '#3B82F6',
    letterSpacing: 1.2,
  },
  brandDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#38BDF8',
    marginLeft: 2,
  },
  logoSubtext: {
    fontSize: 8,
    color: '#64748B',
    letterSpacing: 1.8,
    fontWeight: '800',
    marginTop: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    flexShrink: 1,
    letterSpacing: 0.3,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    position: 'relative',
  },
  favoriteButtonWithItems: {
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    borderColor: 'rgba(244, 63, 94, 0.3)',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#F43F5E',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#090D16',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '900',
  },
});
