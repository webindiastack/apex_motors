import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function AboutScreen({ onNavigate }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Header */}
      <View style={styles.header}>
        <Text style={styles.tag}>ABOUT APEX MOTORS</Text>
        <Text style={styles.title}>Redefining Luxury Automotive Excellence</Text>
        <Text style={styles.subtitle}>
          Since 2012, Apex Motors has provided an uncompromising standard for curated pre-owned and new luxury automobiles.
        </Text>
      </View>

      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80' }}
        style={styles.bannerImage}
      />

      {/* Story Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Our Heritage</Text>
        <Text style={styles.paragraph}>
          Founded by passionate collectors and racing enthusiasts, Apex Motors was built on a single premise: acquiring an exceptional automobile should be as thrilling and refined as the machine itself.
        </Text>
        <Text style={styles.paragraph}>
          Every vehicle in our collection undergoes a stringent 160-point mechanical, cosmetic, and computer diagnostic evaluation before receiving the coveted Apex Certified seal.
        </Text>
      </View>

      {/* 3 Pillars */}
      <View style={styles.pillarSection}>
        <View style={styles.pillarCard}>
          <MaterialCommunityIcons name="speedometer" size={28} color="#2563EB" />
          <Text style={styles.pillarTitle}>Unmatched Performance</Text>
          <Text style={styles.pillarDesc}>
            From twin-turbo V8s to precision electric dual-motors, we only stock vehicles that ignite pure driving emotion.
          </Text>
        </View>

        <View style={styles.pillarCard}>
          <MaterialCommunityIcons name="shield-crown" size={28} color="#2563EB" />
          <Text style={styles.pillarTitle}>Certified Integrity</Text>
          <Text style={styles.pillarDesc}>
            Transparent vehicle history reports, clean titles, and comprehensive warranties on every pre-owned vehicle.
          </Text>
        </View>

        <View style={styles.pillarCard}>
          <MaterialCommunityIcons name="account-star" size={28} color="#2563EB" />
          <Text style={styles.pillarTitle}>Private Concierge</Text>
          <Text style={styles.pillarDesc}>
            Dedicated private client advisors, tailored bespoke financing options, and white-glove enclosed transport.
          </Text>
        </View>
      </View>

      {/* CTA Box */}
      <View style={styles.ctaBox}>
        <Text style={styles.ctaTitle}>Experience the Difference</Text>
        <Text style={styles.ctaSubtitle}>Visit our flagship showroom or arrange a VIP home test drive today.</Text>
        <TouchableOpacity style={styles.ctaBtn} onPress={() => onNavigate('vehicles')}>
          <Text style={styles.ctaBtnText}>Explore Available Inventory</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#0F172A',
    padding: 24,
    paddingTop: 28,
  },
  tag: {
    color: '#60A5FA',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 6,
    lineHeight: 28,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 8,
    lineHeight: 20,
  },
  bannerImage: {
    width: '100%',
    height: 200,
  },
  section: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 12,
  },
  pillarSection: {
    padding: 20,
    gap: 14,
  },
  pillarCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillarTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 8,
    marginBottom: 4,
  },
  pillarDesc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  ctaBox: {
    backgroundColor: '#0F172A',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  ctaTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  ctaSubtitle: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 18,
  },
  ctaBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  ctaBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
