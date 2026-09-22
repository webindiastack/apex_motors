import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Toast({ visible, message, type = 'success', onHide }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, message, onHide]);

  if (!visible) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';

  return (
    <View style={styles.container}>
      <View style={[
        styles.toastCard,
        isSuccess && styles.successCard,
        isError && styles.errorCard
      ]}>
        <Ionicons
          name={isSuccess ? "checkmark-circle" : isError ? "alert-circle" : "information-circle"}
          size={20}
          color={isSuccess ? "#10B981" : isError ? "#EF4444" : "#38BDF8"}
          style={styles.icon}
        />
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    zIndex: 9999,
    alignItems: 'center',
  },
  toastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#334155',
    maxWidth: '100%',
  },
  successCard: {
    borderColor: '#10B981',
  },
  errorCard: {
    borderColor: '#EF4444',
  },
  icon: {
    marginRight: 10,
  },
  messageText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
  },
});
