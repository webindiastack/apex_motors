import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFavorites } from '../context/FavoritesContext';
import { ALL_REVIEWS } from '../data/reviews';

export default function DetailsScreen({ vehicle, onBack, onInquire }) {
  const insets = useSafeAreaInsets();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!vehicle) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>No vehicle selected</Text>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>Back to Inventory</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const favorite = isFavorite(vehicle.id);
  const images = vehicle.images && vehicle.images.length > 0
    ? vehicle.images
    : ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'];

  const handleCall = () => {
    Linking.openURL('tel:18005552739');
  };

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

  return (
    <View style={styles.container}>
      {/* Top Floating Nav Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navIconBtn} onPress={onBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>{vehicle.year} {vehicle.make} {vehicle.model}</Text>
        <TouchableOpacity style={styles.navIconBtn} onPress={() => toggleFavorite(vehicle.id)} activeOpacity={0.7}>
          <Ionicons name={favorite ? "heart" : "heart-outline"} size={22} color={favorite ? "#F43F5E" : "#0F172A"} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {/* Gallery */}
        <View style={styles.galleryContainer}>
          <Image
            source={{ uri: images[activeImageIndex] || images[0] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          {images.length > 1 && (
            <View style={styles.thumbRow}>
              {images.map((img, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.thumbWrap, activeImageIndex === idx && styles.thumbWrapActive]}
                  onPress={() => setActiveImageIndex(idx)}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: img }} style={styles.thumbImage} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Title & Price Header */}
        <View style={styles.detailsHeader}>
          <View style={styles.badgeRow}>
            {vehicle.badge && (
              <View style={[styles.badge, { backgroundColor: badgeStyle.bg }]}>
                <Text style={[styles.badgeText, { color: badgeStyle.text }]}>{vehicle.badge}</Text>
              </View>
            )}
            <Text style={styles.stockText}>Stock #{vehicle.stockNumber || 'APX-SPEC'}</Text>
          </View>

          <Text style={styles.titleText}>{vehicle.year} {vehicle.make} {vehicle.model}</Text>
          <Text style={styles.priceText}>${vehicle.price?.toLocaleString()}</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={15} color="#2563EB" />
            <Text style={styles.locationText}>{vehicle.location || 'Apex Central Showroom'}</Text>
          </View>
        </View>

        {/* Quick Specs Strip */}
        <View style={styles.quickSpecs}>
          <View style={styles.quickSpecItem}>
            <MaterialCommunityIcons name="speedometer" size={20} color="#2563EB" />
            <Text style={styles.quickSpecVal}>{vehicle.mileage?.toLocaleString()} mi</Text>
            <Text style={styles.quickSpecLabel}>Mileage</Text>
          </View>
          <View style={styles.quickSpecItem}>
            <MaterialCommunityIcons name="gas-station" size={20} color="#2563EB" />
            <Text style={styles.quickSpecVal}>{vehicle.fuelType}</Text>
            <Text style={styles.quickSpecLabel}>Fuel Type</Text>
          </View>
          <View style={styles.quickSpecItem}>
            <MaterialCommunityIcons name="car-shift-pattern" size={20} color="#2563EB" />
            <Text style={styles.quickSpecVal}>{vehicle.transmission}</Text>
            <Text style={styles.quickSpecLabel}>Transmission</Text>
          </View>
          <View style={styles.quickSpecItem}>
            <FontAwesome5 name="car-side" size={16} color="#2563EB" />
            <Text style={styles.quickSpecVal}>{vehicle.bodyType}</Text>
            <Text style={styles.quickSpecLabel}>Body</Text>
          </View>
        </View>

        {/* Key Highlights / Cockpit KPI Grid */}
        {vehicle.keySpecs && (
          <View style={styles.cardSection}>
            <Text style={styles.sectionHeader}>Performance Highlights</Text>
            <View style={styles.kpiGrid}>
              {Object.entries(vehicle.keySpecs).map(([key, val]) => (
                <View key={key} style={styles.kpiCard}>
                  <Text style={styles.kpiLabel}>{key.toUpperCase()}</Text>
                  <Text style={styles.kpiVal}>{val}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Detailed Specs Grid */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionHeader}>Technical Specifications</Text>
          <View style={styles.specsGrid}>
            <View style={styles.specCell}>
              <Text style={styles.specCellLabel}>Engine</Text>
              <Text style={styles.specCellVal}>{vehicle.engine || 'High-Output Performance'}</Text>
            </View>
            <View style={styles.specCell}>
              <Text style={styles.specCellLabel}>Horsepower</Text>
              <Text style={styles.specCellVal}>{vehicle.horsepower || 'Factory Spec'}</Text>
            </View>
            <View style={styles.specCell}>
              <Text style={styles.specCellLabel}>Drivetrain</Text>
              <Text style={styles.specCellVal}>{vehicle.drivetrain || 'All-Wheel Drive'}</Text>
            </View>
            <View style={styles.specCell}>
              <Text style={styles.specCellLabel}>Exterior Color</Text>
              <Text style={styles.specCellVal}>{vehicle.exteriorColor || 'Premium Finish'}</Text>
            </View>
            <View style={styles.specCell}>
              <Text style={styles.specCellLabel}>Interior Color</Text>
              <Text style={styles.specCellVal}>{vehicle.interiorColor || 'Luxury Leather'}</Text>
            </View>
            <View style={styles.specCell}>
              <Text style={styles.specCellLabel}>VIN Identifier</Text>
              <Text style={styles.specCellVal}>{vehicle.vin || 'Available upon request'}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionHeader}>Vehicle Overview</Text>
          <Text style={styles.descriptionText}>
            {vehicle.description || 'Experience ultimate luxury and refined engineering with this exceptional automobile.'}
          </Text>
        </View>

        {/* Features Checklist */}
        {vehicle.features && (
          <View style={styles.cardSection}>
            <Text style={styles.sectionHeader}>Equipped Luxury Features</Text>
            {Object.entries(vehicle.features).map(([cat, items]) => (
              <View key={cat} style={{ marginBottom: 14 }}>
                <Text style={styles.featureCategory}>{cat.toUpperCase()}</Text>
                {items.map((feat, i) => (
                  <View key={i} style={styles.featRow}>
                    <Ionicons name="shield-checkmark" size={16} color="#2563EB" />
                    <Text style={styles.featText}>{feat}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* All Cars Client Reviews - Left to Right Scroll with Stars */}
        <View style={styles.reviewsCardSection}>
          <View style={styles.reviewsHeaderRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.reviewsTagBadge}>
                <Ionicons name="shield-checkmark" size={12} color="#2563EB" style={{ marginRight: 4 }} />
                <Text style={styles.reviewsTagText}>VERIFIED OWNER RATINGS</Text>
              </View>
              <Text style={styles.reviewsTitle}>Client Reviews</Text>
              <Text style={styles.reviewsSubtitle}>Verified owner experiences across all models</Text>
            </View>

            <View style={styles.ratingSummaryBadge}>
              <View style={styles.ratingNumberRow}>
                <Text style={styles.ratingScoreNumber}>4.9</Text>
                <View style={styles.miniStarsWrap}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Ionicons key={s} name="star" size={10} color="#F59E0B" />
                  ))}
                </View>
              </View>
              <Text style={styles.ratingCountText}>128+ verified ratings</Text>
            </View>
          </View>

          {/* Left to Right Horizontal Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.reviewsScrollWrap}
          >
            {ALL_REVIEWS.map((rev) => (
              <View key={rev.id} style={styles.reviewCard}>
                {/* User Row */}
                <View style={styles.revUserRow}>
                  <View style={styles.revAvatarCircle}>
                    <Text style={styles.revAvatarInitials}>{rev.avatar}</Text>
                  </View>
                  <View style={styles.revUserMeta}>
                    <Text style={styles.revAuthorName}>{rev.author}</Text>
                    <View style={styles.revVerifiedPill}>
                      <Ionicons name="checkmark-circle" size={11} color="#10B981" style={{ marginRight: 3 }} />
                      <Text style={styles.revRoleText}>{rev.role}</Text>
                    </View>
                  </View>
                  <Text style={styles.revDate}>{rev.date}</Text>
                </View>

                {/* Car Badge */}
                <View style={styles.revCarPill}>
                  <Ionicons name="car-sport" size={12} color="#2563EB" style={{ marginRight: 5 }} />
                  <Text style={styles.revCarName}>{rev.carYear} {rev.carMake} {rev.carModel}</Text>
                </View>

                {/* Star Rating with Gold Stars */}
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name="star"
                      size={15}
                      color={star <= rev.rating ? "#F59E0B" : "#CBD5E1"}
                      style={{ marginRight: 2 }}
                    />
                  ))}
                  <Text style={styles.starsScoreVal}>{rev.rating}.0</Text>
                </View>

                {/* Headline & Review Content */}
                <Text style={styles.revHeadline}>{rev.title}</Text>
                <Text style={styles.revCommentBody} numberOfLines={4}>
                  "{rev.comment}"
                </Text>

                {/* Card Footer: Location & Helpful Tag */}
                <View style={styles.revCardFooter}>
                  <View style={styles.revLocationRow}>
                    <Ionicons name="location-outline" size={12} color="#64748B" style={{ marginRight: 3 }} />
                    <Text style={styles.revLocationText}>{rev.location}</Text>
                  </View>
                  <View style={styles.revHelpfulWrap}>
                    <Ionicons name="thumbs-up-outline" size={11} color="#64748B" style={{ marginRight: 4 }} />
                    <Text style={styles.revHelpfulText}>{rev.helpfulCount} helpful</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Bottom space */}
        <View style={{ height: 160 + (insets?.bottom || 0) }} />
      </ScrollView>

      {/* Fixed Sticky Action Bar */}
      <View style={[
        styles.stickyFooter,
        {
          paddingBottom: Platform.OS === 'web'
            ? 'calc(36px + env(safe-area-inset-bottom, 0px))'
            : Math.max((insets?.bottom || 0) + 26, 38),
          paddingTop: 16,
        }
      ]}>
        <TouchableOpacity style={styles.callDealerBtn} onPress={handleCall} activeOpacity={0.7}>
          <Ionicons name="call-outline" size={20} color="#0F172A" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.inquireActionBtn} onPress={() => onInquire(vehicle)} activeOpacity={0.85}>
          <Ionicons name="chatbubbles-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.inquireActionText}>Inquire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    position: 'relative',
    overflow: 'hidden',
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 12,
  },
  backBtn: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  navBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  navIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  navTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  scrollArea: {
    flex: 1,
  },
  galleryContainer: {
    backgroundColor: '#090D16',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: 280,
  },
  thumbRow: {
    flexDirection: 'row',
    padding: 12,
    gap: 10,
    backgroundColor: '#090D16',
  },
  thumbWrap: {
    width: 68,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  thumbWrapActive: {
    borderColor: '#38BDF8',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  detailsHeader: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4.5,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  stockText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  titleText: {
    fontSize: 23,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  priceText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#2563EB',
    marginBottom: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: '#64748B',
  },
  quickSpecs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginTop: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  quickSpecItem: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  quickSpecVal: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 4,
  },
  quickSpecLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  cardSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  kpiCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  kpiLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  kpiVal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  specsGrid: {
    gap: 12,
  },
  specCell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  specCellLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  specCellVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    maxWidth: '60%',
    textAlign: 'right',
  },
  descriptionText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },
  featureCategory: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
    marginBottom: 6,
    letterSpacing: 0.7,
  },
  featRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 5,
  },
  featText: {
    fontSize: 13,
    color: '#334155',
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 38,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
    ...(Platform.OS === 'web' ? {
      position: 'fixed',
    } : {}),
  },
  callDealerBtn: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  inquireActionBtn: {
    flex: 1,
    backgroundColor: '#2563EB',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  inquireActionText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  reviewsCardSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 20,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  reviewsHeaderRow: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  reviewsTagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  reviewsTagText: {
    color: '#2563EB',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.2,
  },
  reviewsSubtitle: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
  },
  ratingSummaryBadge: {
    backgroundColor: '#090D16',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  ratingNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingScoreNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  miniStarsWrap: {
    flexDirection: 'row',
    gap: 1,
  },
  ratingCountText: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '600',
    marginTop: 2,
  },
  reviewsScrollWrap: {
    paddingLeft: 18,
    paddingRight: 8,
    gap: 12,
  },
  reviewCard: {
    width: 290,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  revUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  revAvatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  revAvatarInitials: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  revUserMeta: {
    flex: 1,
  },
  revAuthorName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  revVerifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  revRoleText: {
    fontSize: 10,
    color: '#059669',
    fontWeight: '700',
  },
  revDate: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },
  revCarPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  revCarName: {
    color: '#334155',
    fontSize: 11,
    fontWeight: '700',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsScoreVal: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D97706',
    marginLeft: 6,
  },
  revHeadline: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 5,
    lineHeight: 18,
  },
  revCommentBody: {
    fontSize: 11.5,
    color: '#475569',
    lineHeight: 17,
    marginBottom: 12,
  },
  revCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  revLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  revLocationText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  revHelpfulWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  revHelpfulText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
});
