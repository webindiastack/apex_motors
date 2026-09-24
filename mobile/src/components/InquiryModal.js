import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TextInput, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useToast } from '../context/ToastContext';

export default function InquiryModal({ visible, vehicle, onClose, onSubmitInquiry }) {
  const { showToast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactMethod, setContactMethod] = useState('Phone');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!fullName.trim() || !phone.trim()) {
      showToast('Please provide your name and phone number', 'error');
      return;
    }

    setSubmitting(true);
    const newInquiry = {
      id: `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
      vehicleId: vehicle ? vehicle.id : 'general',
      vehicleTitle: vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'General Inquiry',
      vehiclePrice: vehicle ? vehicle.price : null,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      contactMethod,
      message: message.trim() || 'I am interested in this vehicle and would like to arrange a test drive.',
      status: 'New',
      submittedAt: new Date().toISOString(),
    };

    try {
      await onSubmitInquiry(newInquiry);
      showToast('Inquiry submitted successfully! Our advisor will contact you.', 'success');
      // Reset Form
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
      onClose();
    } catch (e) {
      showToast('Failed to submit inquiry. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Vehicle Inquiry</Text>
              <Text style={styles.subtitle}>Send your inquiry or question to our advisors</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
            {/* Vehicle preview if available */}
            {vehicle && (
              <View style={styles.vehiclePreview}>
                <Image
                  source={{ uri: vehicle.images?.[0] || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80' }}
                  style={styles.vehicleThumb}
                />
                <View style={styles.vehicleDetails}>
                  <Text style={styles.vehicleTitle} numberOfLines={1}>
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </Text>
                  <Text style={styles.vehiclePrice}>${vehicle.price?.toLocaleString()}</Text>
                  <Text style={styles.vehicleLocation} numberOfLines={1}>{vehicle.location}</Text>
                </View>
              </View>
            )}

            {/* Inputs */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Johnathan Smith"
                placeholderTextColor="#94A3B8"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Phone Number <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={styles.input}
                  placeholder="+1 (555) 000-0000"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="john@example.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Contact Mode</Text>
              <View style={styles.contactRow}>
                {['Phone', 'Email', 'WhatsApp'].map(method => {
                  const selected = contactMethod === method;
                  return (
                    <TouchableOpacity
                      key={method}
                      style={[styles.methodBtn, selected && styles.methodBtnActive]}
                      onPress={() => setContactMethod(method)}
                    >
                      <Text style={[styles.methodText, selected && styles.methodTextActive]}>{method}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Special Requests / Questions</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Ask about financing, trade-in value, or specific options..."
                placeholderTextColor="#94A3B8"
                multiline={true}
                numberOfLines={3}
                value={message}
                onChangeText={setMessage}
              />
            </View>
          </ScrollView>

          {/* Footer Submit */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={submitting}
              activeOpacity={0.8}
            >
              <Ionicons name="paper-plane" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.submitButtonText}>
                {submitting ? 'Submitting...' : 'Inquire'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  scrollArea: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  vehiclePreview: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    alignItems: 'center',
  },
  vehicleThumb: {
    width: 60,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  vehicleDetails: {
    flex: 1,
  },
  vehicleTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  vehiclePrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2563EB',
  },
  vehicleLocation: {
    fontSize: 11,
    color: '#64748B',
  },
  inputGroup: {
    marginBottom: 14,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  required: {
    color: '#EF4444',
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
    height: 70,
    textAlignVertical: 'top',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 8,
  },
  methodBtn: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  methodBtnActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  methodText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  methodTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  submitButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
