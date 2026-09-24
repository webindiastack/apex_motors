import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ALL_REVIEWS } from '../data/reviews';

export default function ReviewsScreen({ onNavigate }) {
  const [selectedMake, setSelectedMake] = useState('All Makes');
  const [reviewsList, setReviewsList] = useState(ALL_REVIEWS);
  const [helpfulMap, setHelpfulMap] = useState({});

  // Review Submission Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCar, setNewCar] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [submittedToast, setSubmittedToast] = useState(false);

  const makes = ['All Makes', 'Porsche', 'BMW', 'Land Rover', 'Mercedes-Benz', 'Audi', 'Aston Martin'];

  const filteredReviews = reviewsList.filter(rev => {
    if (selectedMake === 'All Makes') return true;
    return rev.carMake.toLowerCase() === selectedMake.toLowerCase();
  });

  const toggleHelpful = (id) => {
    setHelpfulMap(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddReview = () => {
    if (!newAuthor.trim() || !newComment.trim()) return;

    const initials = newAuthor
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'CL';

    const newRev = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      avatar: initials,
      role: 'Verified Client',
      carMake: newCar.trim() ? newCar.split(' ')[0] : 'Luxury',
      carModel: newCar.trim() || 'Apex Luxury Vehicle',
      carYear: 2025,
      rating: newRating,
      title: newTitle.trim() || 'Exceptional Buying Experience',
      comment: newComment.trim(),
      date: 'Just now',
      location: 'Showroom Client',
      verified: true,
      helpfulCount: 1,
    };

    setReviewsList([newRev, ...reviewsList]);
    setModalOpen(false);
    setNewAuthor('');
    setNewCar('');
    setNewTitle('');
    setNewComment('');
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 3500);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Banner with 5-Star Prestige Header */}
      <View style={styles.header}>
        <View style={styles.tagBadge}>
          <Ionicons name="star" size={11} color="#F59E0B" style={{ marginRight: 4 }} />
          <Text style={styles.tagText}>VERIFIED CLIENT RATINGS</Text>
        </View>
        <Text style={styles.title}>Client Reviews & 5 Stars</Text>
        <Text style={styles.subtitle}>
          Read genuine feedback from verified owners and collectors across our luxury fleet.
        </Text>

        {/* Big Overall Rating Card */}
        <View style={styles.overallRatingCard}>
          <View style={styles.scoreRow}>
            <Text style={styles.bigScore}>5.0</Text>
            <View style={styles.starsColumn}>
              <View style={styles.fiveStarsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Ionicons key={s} name="star" size={18} color="#F59E0B" />
                ))}
              </View>
              <Text style={styles.ratingSubtext}>100% 5-Star Verified Ratings</Text>
            </View>
          </View>

          <View style={styles.statsDivider} />

          <View style={styles.ratingStatsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statBoxNum}>128+</Text>
              <Text style={styles.statBoxLabel}>Total Reviews</Text>
            </View>
            <View style={styles.statBoxDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statBoxNum}>100%</Text>
              <Text style={styles.statBoxLabel}>Recommendation</Text>
            </View>
            <View style={styles.statBoxDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statBoxNum}>160-Pt</Text>
              <Text style={styles.statBoxLabel}>Certified Fleet</Text>
            </View>
          </View>
        </View>

        {/* Write a Review Button */}
        <TouchableOpacity
          style={styles.writeReviewBtn}
          onPress={() => setModalOpen(true)}
          activeOpacity={0.85}
        >
          <Ionicons name="create-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.writeReviewBtnText}>Share Your 5-Star Experience</Text>
        </TouchableOpacity>
      </View>

      {/* Success Toast */}
      {submittedToast && (
        <View style={styles.toast}>
          <Ionicons name="checkmark-circle" size={18} color="#10B981" style={{ marginRight: 8 }} />
          <Text style={styles.toastText}>Thank you! Your 5-star review has been published.</Text>
        </View>
      )}

      {/* Brand Filters Scroll */}
      <View style={styles.filterSection}>
        <Text style={styles.filterHeader}>Filter Reviews by Make</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {makes.map(make => {
            const isSelected = selectedMake === make;
            return (
              <TouchableOpacity
                key={make}
                style={[styles.filterPill, isSelected && styles.filterPillActive]}
                onPress={() => setSelectedMake(make)}
                activeOpacity={0.75}
              >
                <Text style={[styles.filterPillText, isSelected && styles.filterPillTextActive]}>
                  {make}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Reviews List */}
      <View style={styles.listSection}>
        <View style={styles.listHeaderRow}>
          <Text style={styles.listTitle}>
            {selectedMake === 'All Makes' ? 'All Verified Reviews' : `${selectedMake} Reviews`}
          </Text>
          <Text style={styles.listCount}>({filteredReviews.length} Reviews)</Text>
        </View>

        {filteredReviews.map((rev) => {
          const isHelpful = helpfulMap[rev.id];
          const currentHelpful = rev.helpfulCount + (isHelpful ? 1 : 0);

          return (
            <View key={rev.id} style={styles.reviewCard}>
              {/* Author Row */}
              <View style={styles.authorRow}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{rev.avatar}</Text>
                </View>
                <View style={styles.authorMeta}>
                  <Text style={styles.authorName}>{rev.author}</Text>
                  <View style={styles.verifiedRow}>
                    <Ionicons name="checkmark-circle" size={12} color="#10B981" style={{ marginRight: 3 }} />
                    <Text style={styles.roleText}>{rev.role}</Text>
                  </View>
                </View>
                <Text style={styles.dateText}>{rev.date}</Text>
              </View>

              {/* 5 Stars Rating & Vehicle Tag */}
              <View style={styles.ratingCarRow}>
                <View style={styles.starsWrap}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Ionicons
                      key={s}
                      name="star"
                      size={15}
                      color={s <= rev.rating ? "#F59E0B" : "#CBD5E1"}
                    />
                  ))}
                  <Text style={styles.ratingScore}>{rev.rating}.0</Text>
                </View>
                <View style={styles.carBadge}>
                  <Ionicons name="car-sport" size={12} color="#2563EB" style={{ marginRight: 4 }} />
                  <Text style={styles.carBadgeText}>
                    {rev.carYear} {rev.carMake} {rev.carModel}
                  </Text>
                </View>
              </View>

              {/* Review Headline & Body */}
              <Text style={styles.reviewTitle}>"{rev.title}"</Text>
              <Text style={styles.commentText}>{rev.comment}</Text>

              {/* Review Footer */}
              <View style={styles.cardFooter}>
                <View style={styles.locationWrap}>
                  <Ionicons name="location-outline" size={12} color="#64748B" style={{ marginRight: 3 }} />
                  <Text style={styles.locationText}>{rev.location}</Text>
                </View>

                <TouchableOpacity
                  style={[styles.helpfulBtn, isHelpful && styles.helpfulBtnActive]}
                  onPress={() => toggleHelpful(rev.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={isHelpful ? "thumbs-up" : "thumbs-up-outline"}
                    size={13}
                    color={isHelpful ? "#2563EB" : "#64748B"}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={[styles.helpfulText, isHelpful && styles.helpfulTextActive]}>
                    Helpful ({currentHelpful})
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>

      {/* Review Submission Modal */}
      <Modal
        visible={modalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Write a Review</Text>
                <Text style={styles.modalSubtitle}>Rate your Apex Motors vehicle experience</Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalOpen(false)}
                style={styles.modalCloseBtn}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={20} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.modalForm}>
              {/* Star Rating Selector */}
              <Text style={styles.inputLabel}>Rating</Text>
              <View style={styles.starSelectorRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <TouchableOpacity
                    key={s}
                    onPress={() => setNewRating(s)}
                    style={styles.starTouch}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={s <= newRating ? "star" : "star-outline"}
                      size={28}
                      color="#F59E0B"
                    />
                  </TouchableOpacity>
                ))}
                <Text style={styles.starSelectorLabel}>{newRating}.0 Stars</Text>
              </View>

              {/* Full Name */}
              <Text style={styles.inputLabel}>Your Name *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. David Harrison"
                placeholderTextColor="#94A3B8"
                value={newAuthor}
                onChangeText={setNewAuthor}
              />

              {/* Vehicle Purchased */}
              <Text style={styles.inputLabel}>Vehicle Purchased / Driven</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Porsche 911 GT3 RS"
                placeholderTextColor="#94A3B8"
                value={newCar}
                onChangeText={setNewCar}
              />

              {/* Headline */}
              <Text style={styles.inputLabel}>Headline</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Best car buying experience ever"
                placeholderTextColor="#94A3B8"
                value={newTitle}
                onChangeText={setNewTitle}
              />

              {/* Review Text */}
              <Text style={styles.inputLabel}>Your Review *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Share your thoughts on the vehicle performance, dealership concierge, and delivery..."
                placeholderTextColor="#94A3B8"
                value={newComment}
                onChangeText={setNewComment}
                multiline
                numberOfLines={4}
              />

              {/* Submit Button */}
              <TouchableOpacity
                style={[
                  styles.submitBtn,
                  (!newAuthor.trim() || !newComment.trim()) && styles.submitBtnDisabled,
                ]}
                onPress={handleAddReview}
                disabled={!newAuthor.trim() || !newComment.trim()}
                activeOpacity={0.85}
              >
                <Text style={styles.submitBtnText}>Post 5-Star Review</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

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
    padding: 18,
    backgroundColor: '#090D16',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 6,
    marginBottom: 8,
  },
  tagText: {
    color: '#F59E0B',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 19,
    marginBottom: 16,
  },
  overallRatingCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    marginBottom: 14,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  bigScore: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  starsColumn: {
    justifyContent: 'center',
  },
  fiveStarsRow: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: 4,
  },
  ratingSubtext: {
    fontSize: 11.5,
    color: '#94A3B8',
    fontWeight: '600',
  },
  statsDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 12,
  },
  ratingStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statBoxNum: {
    fontSize: 16,
    fontWeight: '900',
    color: '#38BDF8',
  },
  statBoxLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 2,
  },
  statBoxDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  writeReviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 11,
    borderRadius: 12,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  writeReviewBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  toastText: {
    color: '#065F46',
    fontWeight: '700',
    fontSize: 12.5,
    flex: 1,
  },
  filterSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  filterScroll: {
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterPillActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  filterPillText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#475569',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },
  listSection: {
    paddingHorizontal: 16,
    gap: 12,
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  listCount: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13.5,
  },
  authorMeta: {
    flex: 1,
    marginLeft: 10,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  roleText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#059669',
  },
  dateText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  ratingCarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  starsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingScore: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#D97706',
    marginLeft: 4,
  },
  carBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  reviewTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    lineHeight: 19,
  },
  commentText: {
    fontSize: 12.5,
    color: '#475569',
    lineHeight: 18.5,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  locationWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  helpfulBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },
  helpfulBtnActive: {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
  helpfulText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '700',
  },
  helpfulTextActive: {
    color: '#2563EB',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
  },
  modalSubtitle: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalForm: {
    paddingVertical: 14,
  },
  inputLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#334155',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  starSelectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  starTouch: {
    padding: 2,
  },
  starSelectorLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#D97706',
    marginLeft: 6,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0F172A',
    marginBottom: 14,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  submitBtnDisabled: {
    backgroundColor: '#94A3B8',
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
});
