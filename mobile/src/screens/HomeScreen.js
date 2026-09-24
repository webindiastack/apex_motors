import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, Animated, TouchableOpacity, Platform, Image, Easing } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import VehicleCard from '../components/VehicleCard';

// 3 Curated Luxury Vehicles: Range Rover, BMW, and the Iconic Black Car Background
const SLIDESHOW_IMAGES = [
  {
    id: 'range-rover',
    name: 'Range Rover',
    url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=82',
  },
  {
    id: 'bmw',
    name: 'BMW',
    url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=82',
  },
  {
    id: 'black-car',
    name: 'Black Car',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=82',
  },
];

export default function HomeScreen({ vehicles, onNavigate, onViewDetails, onInquire, onSelectCategory }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [baseImageUrl, setBaseImageUrl] = useState(SLIDESHOW_IMAGES[0].url);
  const [overlayImageUrl, setOverlayImageUrl] = useState(SLIDESHOW_IMAGES[0].url);

  // Animated opacity for the top dissolve layer (0 -> 1)
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const currentSlideRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const targetImageRef = useRef(SLIDESHOW_IMAGES[0].url);
  const timerRef = useRef(null);

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

  // When baseImageUrl updates in the DOM, safely reset overlay opacity with zero flicker
  useEffect(() => {
    if (baseImageUrl === targetImageRef.current) {
      overlayOpacity.setValue(0);
      isTransitioningRef.current = false;
    }
  }, [baseImageUrl, overlayOpacity]);

  // Smooth Cross-Fade Dissolve Transition
  const transitionToSlide = (targetIndex) => {
    if (targetIndex === currentSlideRef.current || isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    const nextItem = SLIDESHOW_IMAGES[targetIndex];
    targetImageRef.current = nextItem.url;

    // Load next image onto the top overlay layer
    setOverlayImageUrl(nextItem.url);
    setActiveSlideIndex(targetIndex);
    overlayOpacity.setValue(0);

  // Silky smooth 1800ms slow-motion cross-dissolve directly on top of the solid base layer
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 1800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: Platform.OS !== 'web',
    }).start(({ finished }) => {
      if (finished) {
        currentSlideRef.current = targetIndex;
        // Promote next image to the base layer; useEffect will then silently reset overlayOpacity
        setBaseImageUrl(nextItem.url);
      }
    });
  };

  // Auto-play slideshow at a relaxed, slow luxury pace (every 7 seconds)
  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        const next = (currentSlideRef.current + 1) % SLIDESHOW_IMAGES.length;
        transitionToSlide(next);
      }, 7000);
    };

    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Manual dot tap with seamless dissolve
  const handleSelectSlide = (targetIndex) => {
    if (targetIndex === currentSlideRef.current || isTransitioningRef.current) return;

    if (timerRef.current) clearInterval(timerRef.current);
    transitionToSlide(targetIndex);

    timerRef.current = setInterval(() => {
      const next = (currentSlideRef.current + 1) % SLIDESHOW_IMAGES.length;
      transitionToSlide(next);
    }, 7000);
  };

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
      {/* Hero Banner with Smooth Cross-Fade Background Images */}
      <View style={styles.heroContainer}>
        {/* Layer 1: Solid Base Image (Underneath, never dips into darkness) */}
        <Image
          source={{ uri: baseImageUrl }}
          style={styles.heroBackgroundImage}
          resizeMode="cover"
        />

        {/* Layer 2: Incoming Dissolve Image (Physically on top in JSX, smoothly fades in) */}
        <Animated.Image
          source={{ uri: overlayImageUrl }}
          style={[
            styles.heroBackgroundImage,
            { opacity: overlayOpacity }
          ]}
          resizeMode="cover"
        />

        {/* Ambient Dark Gradient Wash for text readability */}
        <View style={styles.ambientBottomWash} />

        {/* Original Content Overlay */}
        <View style={styles.heroOverlay}>
          {/* Ambient Fleet Tag */}
          <View style={styles.heroBadge}>
            <Ionicons name="sparkles" size={12} color="#60A5FA" style={{ marginRight: 5 }} />
            <Text style={styles.heroBadgeText}>APEX MOTORS 2026 FLEET COLLECTION</Text>
          </View>

          {/* Original Clean Heading */}
          <Text style={styles.heroTitle}>
            Find Your <Text style={styles.heroHighlight}>Perfect Vehicle</Text>
          </Text>

          {/* Original Subtitle */}
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

          {/* Subtle Slide Indicator Dots for Range Rover, BMW, and Black Car */}
          <View style={styles.dotsRow}>
            {SLIDESHOW_IMAGES.map((_, idx) => {
              const isActive = activeSlideIndex === idx;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.dot, isActive && styles.dotActive]}
                  onPress={() => handleSelectSlide(idx)}
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
          <Text style={[styles.statNumber, { color: '#38BDF8' }]}>4.9★</Text>
          <Text style={styles.statLabel}>Client Rating</Text>
        </View>
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
    height: 430,
    backgroundColor: '#090D16',
    position: 'relative',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  heroBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  ambientBottomWash: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 280,
    backgroundColor: 'rgba(9, 13, 22, 0.45)',
  },
  heroOverlay: {
    backgroundColor: 'transparent',
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 22,
    zIndex: 10,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(37, 99, 235, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.4)',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroBadgeText: {
    color: '#93C5FD',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    lineHeight: 34,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  heroHighlight: {
    color: '#38BDF8',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  heroSubtitle: {
    color: '#F1F5F9',
    fontSize: 13,
    marginTop: 8,
    lineHeight: 19,
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  heroActionRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  heroPrimaryBtn: {
    flex: 1.4,
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
  },
  heroPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  heroSecondaryBtn: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
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
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
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
  },
  statsRibbon: {
    flexDirection: 'row',
    backgroundColor: '#090D16',
    marginHorizontal: 16,
    marginTop: -16,
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
});
