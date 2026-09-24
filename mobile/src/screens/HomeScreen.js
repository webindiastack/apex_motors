import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import VehicleCard from '../components/VehicleCard';
import { ALL_REVIEWS } from '../data/reviews';

// 3 Curated Luxury Fleet Cover Vehicles
const SLIDESHOW_IMAGES = [
  {
    id: 'range-rover',
    name: 'Range Rover Sport',
    tagline: 'Supercharged V8 • Flagship Luxury SUV',
    badge: 'FLAGSHIP SUV',
    accent: '#38BDF8',
    url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=82',
  },
  {
    id: 'bmw',
    name: 'BMW M5 Competition',
    tagline: '617 HP • High-Performance Twin-Turbo V8',
    badge: 'M PERFORMANCE',
    accent: '#60A5FA',
    url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=82',
  },
  {
    id: 'porsche',
    name: 'Porsche Panamera Turbo',
    tagline: 'Twin-Turbo V8 • Prestige Grand Tourer',
    badge: 'PRESTIGE GT',
    accent: '#F43F5E',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=82',
  },
];

export default function HomeScreen({ vehicles, onNavigate, onViewDetails, onInquire, onSelectCategory }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlideRef = useRef(0);

  // Animated opacity values for seamless cross-fade between slides
  const fadeAnims = useRef(
    SLIDESHOW_IMAGES.map((_, i) => new Animated.Value(i === 0 ? 1 : 0))
  ).current;

  // Smooth Cross-Fade Transition
  const transitionToSlide = (targetIndex) => {
    if (targetIndex === activeSlideRef.current) return;
    activeSlideRef.current = targetIndex;
    setActiveSlideIndex(targetIndex);

    Animated.parallel(
      fadeAnims.map((anim, i) =>
        Animated.timing(anim, {
          toValue: i === targetIndex ? 1 : 0,
          duration: 1000,
          useNativeDriver: Platform.OS !== 'web',
        })
      )
    ).start();
  };

  // Preload all 3 images in browser / native memory immediately
  useEffect(() => {
    SLIDESHOW_IMAGES.forEach(slide => {
      Image.prefetch(slide.url);
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        const img = new window.Image();
        img.src = slide.url;
      }
    });
  }, []);

  // Auto-play slideshow every 9s with gentle cross-fade
  useEffect(() => {
    const timer = setInterval(() => {
      const next = (activeSlideRef.current + 1) % SLIDESHOW_IMAGES.length;
      transitionToSlide(next);
    }, 9000);

    return () => clearInterval(timer);
  }, []);

  const featuredVehicles = vehicles.filter(v => v.badge === 'Featured' || v.badge === 'Hot Deal').slice(0, 4);
  const newArrivals = vehicles.filter(v => v.badge === 'New Arrival').slice(0, 2);

  const categories = [
    { label: 'All Inventory', icon: 'car-sport-outline', filter: 'All Types', count: vehicles.length },
    { label: 'Luxury Sedans', icon: 'car-outline', filter: 'Sedan', count: vehicles.filter(v => v.bodyType === 'Sedan').length },
    { label: '4x4 & SUVs', icon: 'car', filter: 'SUV', count: vehicles.filter(v => v.bodyType === 'SUV').length },
    { label: 'Sports Coupes', icon: 'speedometer-outline', filter: 'Coupe', count: vehicles.filter(v => v.bodyType === 'Coupe').length },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Banner with Full Height Cross-Fade Background Images */}
      <View style={styles.heroContainer}>
        {/* Full-bleed background images with cross-fade */}
        {SLIDESHOW_IMAGES.map((slide, idx) => (
          <Animated.Image
            key={slide.id}
            source={{ uri: slide.url }}
            style={[
              styles.heroBgImage,
              {
                opacity: fadeAnims[idx],
                zIndex: activeSlideIndex === idx ? 2 : 1,
              },
              Platform.OS === 'web' && {
                transition: 'opacity 1s ease-in-out',
              },
            ]}
            resizeMode="cover"
          />
        ))}

        {/* Top Vignette Shadow */}
        <LinearGradient
          colors={['rgba(9, 13, 22, 0.75)', 'transparent']}
          style={styles.topShadow}
          pointerEvents="none"
        />

        {/* Bottom Ambient Dark Shadow for maximum text readability */}
        <LinearGradient
          colors={['transparent', 'rgba(9, 13, 22, 0.4)', 'rgba(9, 13, 22, 0.88)', '#090D16']}
          style={styles.bottomShadow}
          pointerEvents="none"
        />

        {/* Text Written Directly On Top Of Background Image */}
        <View style={styles.heroOverlay}>
          {/* Ambient Fleet Tag */}
          <View style={styles.heroBadge}>
            <Ionicons name="sparkles" size={11} color="#60A5FA" style={{ marginRight: 5 }} />
            <Text style={styles.heroBadgeText}>APEX MOTORS 2026 FLEET COLLECTION</Text>
          </View>

          {/* Clean Heading */}
          <Text style={styles.heroTitle}>
            Find Your <Text style={styles.heroHighlight}>Perfect Vehicle</Text>
          </Text>

          {/* Subtitle */}
          <Text style={styles.heroSubtitle}>
            Browse hand-inspected luxury sedans, sports coupes, and high-performance SUVs with certified nationwide warranty.
          </Text>

          {/* Action Buttons */}
          <View style={styles.heroActionRow}>
            <TouchableOpacity
              style={styles.heroPrimaryBtn}
              onPress={() => onNavigate('vehicles')}
              activeOpacity={0.85}
            >
              <Text style={styles.heroPrimaryText}>Explore Full Inventory</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.heroSecondaryBtn}
              onPress={() => onInquire(null)}
              activeOpacity={0.85}
            >
              <Text style={styles.heroSecondaryText}>Inquire</Text>
            </TouchableOpacity>
          </View>

          {/* Clean Indicator Dots Only */}
          <View style={styles.dotsRow}>
            {SLIDESHOW_IMAGES.map((_, idx) => {
              const isActive = activeSlideIndex === idx;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.dot, isActive && styles.dotActive]}
                  onPress={() => transitionToSlide(idx)}
                  activeOpacity={0.8}
                />
              );
            })}
          </View>
        </View>
      </View>

      {/* Luxury Stats Ticker Ribbon */}
      <View style={styles.statsRibbon}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>150+</Text>
          <Text style={styles.statLabel}>Verified Cars</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>160-Pt</Text>
          <Text style={styles.statLabel}>Certified</Text>
        </View>
        <View style={styles.statDivider} />
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => onNavigate('reviews')}
          activeOpacity={0.75}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <Ionicons name="star" size={15} color="#F59E0B" />
            <Text style={[styles.statNumber, { color: '#F59E0B' }]}>4.9</Text>
          </View>
          <Text style={styles.statLabel}>4.9 Stars Reviews</Text>
        </TouchableOpacity>
      </View>

      {/* Category Pills */}
      <View style={styles.categorySection}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionHeaderTitle}>Curated Categories</Text>
          <Text style={styles.sectionSubHeader}>Select to filter</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((cat, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.categoryCard}
              onPress={() => {
                onSelectCategory(cat.filter);
                onNavigate('vehicles');
              }}
              activeOpacity={0.75}
            >
              <View style={styles.categoryIconWrap}>
                <Ionicons name={cat.icon} size={22} color="#2563EB" />
              </View>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
              <Text style={styles.categoryCount}>{cat.count} Available</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Vehicles Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTag}>HANDPICKED COLLECTION</Text>
            <Text style={styles.sectionTitle}>Featured Vehicles</Text>
          </View>
          <TouchableOpacity
            style={styles.viewAllBtn}
            onPress={() => onNavigate('vehicles')}
            activeOpacity={0.7}
          >
            <Text style={styles.viewAllText}>View All ({vehicles.length})</Text>
            <Ionicons name="chevron-forward" size={14} color="#2563EB" />
          </TouchableOpacity>
        </View>

        <View style={styles.gridRow}>
          {featuredVehicles.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onViewDetails={onViewDetails}
              onInquire={onInquire}
            />
          ))}
        </View>
      </View>

      {/* 5-Star Reviews & Client Testimonials Section - Left to Right Scroll */}
      <View style={styles.reviewsHomeSection}>
        <View style={styles.reviewsHomeHeaderRow}>
          <View style={{ flex: 1 }}>
            <View style={styles.reviewsHomeTagBadge}>
              <Ionicons name="star" size={11} color="#F59E0B" style={{ marginRight: 4 }} />
              <Text style={styles.reviewsHomeTagText}>5-STAR CLIENT EXPERIENCES</Text>
            </View>
            <Text style={styles.reviewsHomeSectionTitle}>Client Reviews & Ratings</Text>
            <Text style={styles.reviewsHomeSectionSub}>Verified owner feedback across our entire luxury fleet</Text>
          </View>

          <TouchableOpacity
            style={styles.reviewsHomeSummaryBadge}
            onPress={() => onNavigate('reviews')}
            activeOpacity={0.8}
          >
            <View style={styles.reviewsHomeScoreRow}>
              <Text style={styles.reviewsHomeScoreNumber}>5.0</Text>
              <View style={styles.reviewsHomeMiniStars}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Ionicons key={s} name="star" size={11} color="#F59E0B" />
                ))}
              </View>
            </View>
            <Text style={styles.reviewsHomeCountText}>128+ verified reviews ›</Text>
          </TouchableOpacity>
        </View>

        {/* Left to Right Horizontal Scroll of Reviews */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.reviewsHomeScroll}
        >
          {ALL_REVIEWS.map((rev) => (
            <View key={rev.id} style={styles.reviewHomeCard}>
              {/* User Row */}
              <View style={styles.revHomeUserRow}>
                <View style={styles.revHomeAvatarCircle}>
                  <Text style={styles.revHomeAvatarInitials}>{rev.avatar}</Text>
                </View>
                <View style={styles.revHomeUserMeta}>
                  <Text style={styles.revHomeAuthorName}>{rev.author}</Text>
                  <View style={styles.revHomeVerifiedPill}>
                    <Ionicons name="checkmark-circle" size={11} color="#10B981" style={{ marginRight: 3 }} />
                    <Text style={styles.revHomeRoleText}>{rev.role}</Text>
                  </View>
                </View>
                <Text style={styles.revHomeDate}>{rev.date}</Text>
              </View>

              {/* 5 Gold Stars & Car Model */}
              <View style={styles.revHomeStarModelRow}>
                <View style={styles.revHomeStarsWrap}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Ionicons key={s} name="star" size={13} color="#F59E0B" />
                  ))}
                </View>
                <View style={styles.revHomeCarBadge}>
                  <Ionicons name="car-sport" size={11} color="#2563EB" style={{ marginRight: 4 }} />
                  <Text style={styles.revHomeCarText} numberOfLines={1}>
                    {rev.carYear} {rev.carMake} {rev.carModel}
                  </Text>
                </View>
              </View>

              {/* Review Headline & Comment */}
              <Text style={styles.revHomeTitle} numberOfLines={1}>
                "{rev.title}"
              </Text>
              <Text style={styles.revHomeComment} numberOfLines={3}>
                {rev.comment}
              </Text>

              {/* Footer */}
              <View style={styles.revHomeFooterRow}>
                <View style={styles.revHomeLocationRow}>
                  <Ionicons name="location-outline" size={11} color="#64748B" style={{ marginRight: 2 }} />
                  <Text style={styles.revHomeLocationText}>{rev.location}</Text>
                </View>
                <View style={styles.revHomeVerifiedTag}>
                  <Ionicons name="shield-checkmark" size={10} color="#059669" style={{ marginRight: 3 }} />
                  <Text style={styles.revHomeVerifiedText}>Verified Handover</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Why Apex Motors Banner - Ultra Premium Dark Cockpit Style */}
      <View style={styles.guaranteeBanner}>
        <View style={styles.guaranteeHeader}>
          <View style={styles.guaranteeTagBadge}>
            <Text style={styles.guaranteeTag}>THE APEX PROMISE</Text>
          </View>
          <Text style={styles.guaranteeTitle}>Uncompromising Luxury Standards</Text>
          <Text style={styles.guaranteeSubtitle}>
            Every vehicle is vetted with extreme precision so you drive away with complete peace of mind.
          </Text>
        </View>

        <View style={styles.featureGrid}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconWrap}>
              <MaterialCommunityIcons name="shield-check" size={24} color="#38BDF8" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureHeading}>160-Point Certified Inspection</Text>
              <Text style={styles.featureSub}>Engine, transmission, electrical systems, and structural integrity checked by master mechanics.</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconWrap}>
              <MaterialCommunityIcons name="certificate" size={24} color="#38BDF8" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureHeading}>Clean Title & CARFAX Guarantee</Text>
              <Text style={styles.featureSub}>Full vehicle history verification, accident-free records, and transparent buyback guarantee.</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconWrap}>
              <MaterialCommunityIcons name="truck-fast" size={24} color="#38BDF8" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureHeading}>White-Glove Enclosed Transport</Text>
              <Text style={styles.featureSub}>Direct nationwide climate-controlled enclosed delivery straight to your driveway.</Text>
            </View>
          </View>
        </View>
      </View>

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionTag}>JUST ARRIVED</Text>
              <Text style={styles.sectionTitle}>New Arrivals</Text>
            </View>
          </View>

          <View style={styles.gridRow}>
            {newArrivals.map(vehicle => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onViewDetails={onViewDetails}
                onInquire={onInquire}
              />
            ))}
          </View>
        </View>
      )}

      {/* Bottom Spacing */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  heroContainer: {
    width: '100%',
    height: 480,
    backgroundColor: '#090D16',
    position: 'relative',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  heroBgImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topShadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 110,
    zIndex: 10,
    ...(Platform.OS === 'web' ? {
      background: 'linear-gradient(to bottom, rgba(9, 13, 22, 0.75) 0%, transparent 100%)',
    } : {}),
  },
  bottomShadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 320,
    zIndex: 10,
    ...(Platform.OS === 'web' ? {
      background: 'linear-gradient(to top, #090D16 0%, rgba(9, 13, 22, 0.88) 45%, rgba(9, 13, 22, 0.4) 75%, transparent 100%)',
    } : {}),
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 22,
    zIndex: 20,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(37, 99, 235, 0.18)',
    borderColor: 'rgba(59, 130, 246, 0.45)',
    borderWidth: 1,
    paddingHorizontal: 11,
    paddingVertical: 4.5,
    borderRadius: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  heroBadgeText: {
    color: '#93C5FD',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 27,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    lineHeight: 33,
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    ...(Platform.OS === 'web' ? {
      textShadow: '0 2px 10px rgba(0,0,0,0.95), 0 4px 20px rgba(0,0,0,0.85)',
    } : {}),
  },
  heroHighlight: {
    color: '#38BDF8',
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    ...(Platform.OS === 'web' ? {
      textShadow: '0 2px 10px rgba(0,0,0,0.95), 0 0 20px rgba(56,189,248,0.5)',
    } : {}),
  },
  heroSubtitle: {
    color: '#E2E8F0',
    fontSize: 12.5,
    marginTop: 7,
    lineHeight: 18.5,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
    ...(Platform.OS === 'web' ? {
      textShadow: '0 1px 8px rgba(0,0,0,0.9)',
    } : {}),
  },
  heroActionRow: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 12,
  },
  heroPrimaryBtn: {
    flex: 1.35,
    backgroundColor: '#2563EB',
    paddingVertical: 13,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  heroPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  heroSecondaryBtn: {
    flex: 0.9,
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSecondaryText: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 13,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 7,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
  },
  dotActive: {
    width: 24,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 3,
  },
  statsRibbon: {
    flexDirection: 'row',
    backgroundColor: '#090D16',
    marginHorizontal: 16,
    marginTop: -18,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  statLabel: {
    fontSize: 9.5,
    color: '#94A3B8',
    marginTop: 2,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  categorySection: {
    paddingVertical: 22,
    paddingLeft: 20,
  },
  sectionTitleRow: {
    marginBottom: 14,
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.2,
  },
  sectionSubHeader: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18,
    marginRight: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minWidth: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  categoryCount: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 14,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionTag: {
    color: '#2563EB',
    fontSize: 10.5,
    fontWeight: '900',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.2,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingBottom: 2,
  },
  viewAllText: {
    color: '#2563EB',
    fontWeight: '800',
    fontSize: 13,
  },
  guaranteeBanner: {
    backgroundColor: '#090D16',
    marginHorizontal: 16,
    marginVertical: 24,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  guaranteeHeader: {
    marginBottom: 18,
  },
  guaranteeTagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  guaranteeTag: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  guaranteeTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  guaranteeSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  featureGrid: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureHeading: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  featureSub: {
    color: '#94A3B8',
    fontSize: 11.5,
    marginTop: 3,
    lineHeight: 16,
  },
  // Reviews Section Styles
  reviewsHomeSection: {
    marginBottom: 28,
  },
  reviewsHomeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 14,
    gap: 12,
  },
  reviewsHomeTagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
  reviewsHomeTagText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#D97706',
    letterSpacing: 0.5,
  },
  reviewsHomeSectionTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  reviewsHomeSectionSub: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
  },
  reviewsHomeSummaryBadge: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  reviewsHomeScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reviewsHomeScoreNumber: {
    fontSize: 17,
    fontWeight: '900',
    color: '#0F172A',
  },
  reviewsHomeMiniStars: {
    flexDirection: 'row',
    gap: 1.5,
  },
  reviewsHomeCountText: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  reviewsHomeScroll: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 4,
  },
  reviewHomeCard: {
    width: 290,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  revHomeUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  revHomeAvatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  revHomeAvatarInitials: {
    color: '#F8FAFC',
    fontWeight: '800',
    fontSize: 13,
  },
  revHomeUserMeta: {
    flex: 1,
    marginLeft: 10,
  },
  revHomeAuthorName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  revHomeVerifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  revHomeRoleText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#059669',
  },
  revHomeDate: {
    fontSize: 10.5,
    color: '#94A3B8',
    fontWeight: '500',
  },
  revHomeStarModelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 9,
  },
  revHomeStarsWrap: {
    flexDirection: 'row',
    gap: 2,
  },
  revHomeCarBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '55%',
  },
  revHomeCarText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  revHomeTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
    lineHeight: 17,
  },
  revHomeComment: {
    fontSize: 11.5,
    color: '#475569',
    lineHeight: 16.5,
    marginBottom: 10,
  },
  revHomeFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
  },
  revHomeLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  revHomeLocationText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  revHomeVerifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  revHomeVerifiedText: {
    fontSize: 9.5,
    color: '#059669',
    fontWeight: '700',
  },
});
