import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useToast } from '../context/ToastContext';

export default function ContactScreen({ onSubmitInquiry }) {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleCall = () => {
    Linking.openURL('tel:18005552739');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:concierge@apexmotors.luxury');
  };

  const handleMaps = (address) => {
    Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(address)}`);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      showToast('Please provide your name and phone number', 'error');
      return;
    }
    setSending(true);
    const newInquiry = {
      id: `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
      vehicleId: 'general-contact',
      vehicleTitle: 'General Showroom Inquiry',
      vehiclePrice: null,
      fullName: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      contactMethod: 'Phone',
      message: message.trim() || 'General inquiry regarding inventory and services.',
      visitDate: '',
      status: 'New',
      submittedAt: new Date().toISOString(),
    };

    try {
      await onSubmitInquiry(newInquiry);
      showToast('Message sent! An advisor will reach out shortly.', 'success');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (e) {
      showToast('Failed to send message', 'error');
    } finally {
      setSending(false);
    }
  };

  const showrooms = [
    {
      name: 'Apex Central Showroom',
      address: '100 Prestige Boulevard, Beverly Hills, CA 90210',
      hours: 'Mon-Sat: 9:00 AM - 8:00 PM | Sun: 10:00 AM - 6:00 PM',
      phone: '+1 (310) 555-0199',
    },
    {
      name: 'Apex Performance Vault',
      address: '450 Trackside Way, Miami, FL 33101',
      hours: 'Mon-Sat: 9:30 AM - 7:30 PM | Sun: Closed',
      phone: '+1 (305) 555-0284',
    },
    {
      name: 'Apex SUV Hub & Gallery',
      address: '800 North Michigan Ave, Chicago, IL 60611',
      hours: 'Mon-Sat: 10:00 AM - 8:00 PM | Sun: 11:00 AM - 5:00 PM',
      phone: '+1 (312) 555-0371',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.tag}>GET IN TOUCH</Text>
        <Text style={styles.title}>Private Client Concierge</Text>
        <Text style={styles.subtitle}>
          Connect directly with our senior automotive consultants for bespoke acquisitions and viewings.
        </Text>

        <View style={styles.quickContactRow}>
          <TouchableOpacity style={styles.quickContactBtn} onPress={handleCall}>
            <Ionicons name="call" size={18} color="#60A5FA" />
            <Text style={styles.quickContactText}>Call Concierge</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickContactBtn} onPress={handleEmail}>
            <Ionicons name="mail" size={18} color="#60A5FA" />
            <Text style={styles.quickContactText}>Email Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Showroom Locations */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Our Flagship Locations</Text>
        {showrooms.map((sr, idx) => (
          <View key={idx} style={styles.showroomCard}>
            <View style={styles.srHeader}>
              <MaterialCommunityIcons name="office-building" size={20} color="#0F172A" />
              <Text style={styles.srName}>{sr.name}</Text>
            </View>
            <Text style={styles.srAddress}>{sr.address}</Text>
            <Text style={styles.srHours}>{sr.hours}</Text>

            <View style={styles.srActions}>
              <TouchableOpacity
                style={styles.srActionBtn}
                onPress={() => handleMaps(sr.address)}
              >
                <Ionicons name="navigate-outline" size={14} color="#2563EB" />
                <Text style={styles.srActionText}>Directions</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.srActionBtn}
                onPress={() => Linking.openURL(`tel:${sr.phone.replace(/[^0-9+]/g, '')}`)}
              >
                <Ionicons name="call-outline" size={14} color="#059669" />
                <Text style={[styles.srActionText, { color: '#059669' }]}>{sr.phone}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Message Form */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Send an Inquiry</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Your Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Johnathan Smith"
            placeholderTextColor="#94A3B8"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="+1 (555) 000-0000"
            placeholderTextColor="#94A3B8"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="johnathan@example.com"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell us about the vehicle you are seeking or any questions..."
            placeholderTextColor="#94A3B8"
            multiline={true}
            numberOfLines={4}
            value={message}
            onChangeText={setMessage}
          />
        </View>

        <TouchableOpacity
          style={[styles.sendBtn, sending && styles.sendBtnDisabled]}
          onPress={handleSubmit}
          disabled={sending}
        >
          <Ionicons name="paper-plane" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.sendBtnText}>{sending ? 'Sending...' : 'Send Message'}</Text>
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
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 8,
    lineHeight: 18,
  },
  quickContactRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  quickContactBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  quickContactText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  section: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
  },
  showroomCard: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  srHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  srName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  srAddress: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 4,
  },
  srHours: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12,
  },
  srActions: {
    flexDirection: 'row',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 10,
  },
  srActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  srActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  formGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  sendBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  sendBtnDisabled: {
    opacity: 0.6,
  },
  sendBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
