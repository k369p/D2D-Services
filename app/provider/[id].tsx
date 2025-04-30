import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Star, MapPin, Clock, Calendar, MessageCircle, Briefcase } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import ServiceCard from '@/components/ui/ServiceCard';
import ReviewCard from '@/components/ui/ReviewCard';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';
import providers from '@/data/providers';
import services from '@/data/services';
import reviews from '@/data/reviews';

export default function ProviderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'services' | 'reviews'>('services');
  
  const provider = providers.find(p => p.id === id) || providers[0];
  const providerServices = services.filter(s => provider.services.includes(s.id));
  const providerReviews = reviews.filter(r => r.providerId === id);
  
  const handleServicePress = (serviceId: string) => {
    router.push(`/service/${serviceId}`);
  };
  
  const handleMessagePress = () => {
    router.push(`/messages/${provider.id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Service Provider" showBackButton />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <Image source={{ uri: provider.avatar }} style={styles.profileImage} />
          
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{provider.name}</Text>
            <Text style={styles.profession}>{provider.profession}</Text>
            
            <View style={styles.ratingContainer}>
              <Star size={16} color={Colors.accent[500]} fill={Colors.accent[500]} />
              <Text style={styles.rating}>{provider.rating.toFixed(1)}</Text>
              <View style={styles.jobsContainer}>
                <Briefcase size={14} color={Colors.neutral[600]} />
                <Text style={styles.jobs}>{provider.totalJobs} jobs</Text>
              </View>
            </View>
            
            <View style={styles.locationContainer}>
              <MapPin size={14} color={Colors.neutral[600]} />
              <Text style={styles.location}>{provider.location}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.description}>{provider.description}</Text>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'services' && styles.activeTab]}
            onPress={() => setActiveTab('services')}
          >
            <Text style={[styles.tabText, activeTab === 'services' && styles.activeTabText]}>
              Services
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
              Reviews ({providerReviews.length})
            </Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === 'services' && (
          <View style={styles.servicesContainer}>
            {providerServices.map(service => (
              <View key={service.id} style={styles.serviceCardWrapper}>
                <ServiceCard
                  id={service.id}
                  title={service.title}
                  category={service.category}
                  price={service.price}
                  rating={service.rating}
                  image={service.image}
                  onPress={handleServicePress}
                />
              </View>
            ))}
          </View>
        )}
        
        {activeTab === 'reviews' && (
          <View style={styles.reviewsContainer}>
            {providerReviews.map(review => (
              <ReviewCard
                key={review.id}
                userName={review.userName}
                avatar={review.avatar}
                rating={review.rating}
                date={review.date}
                comment={review.comment}
              />
            ))}
            
            {providerReviews.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No reviews yet</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Message"
          variant="primary"
          size="large"
          fullWidth
          leftIcon={<MessageCircle size={20} color={Colors.white} />}
          onPress={handleMessagePress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.screenPadding,
    paddingBottom: Spacing.xxl + 60, // Extra padding for the footer
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: Spacing.lg,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    ...Typography.heading3,
    color: Colors.neutral[900],
    marginBottom: Spacing.xs,
  },
  profession: {
    ...Typography.subtitle2,
    color: Colors.neutral[700],
    marginBottom: Spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  rating: {
    ...Typography.body2,
    color: Colors.neutral[900],
    marginLeft: Spacing.xs,
    marginRight: Spacing.md,
  },
  jobsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobs: {
    ...Typography.body2,
    color: Colors.neutral[700],
    marginLeft: Spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    ...Typography.body2,
    color: Colors.neutral[700],
    marginLeft: Spacing.xs,
  },
  description: {
    ...Typography.body1,
    color: Colors.neutral[700],
    marginBottom: Spacing.xl,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
    marginBottom: Spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary[500],
  },
  tabText: {
    ...Typography.subtitle2,
    color: Colors.neutral[600],
  },
  activeTabText: {
    color: Colors.primary[500],
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
  },
  serviceCardWrapper: {
    width: '50%',
    paddingHorizontal: Spacing.xs,
    marginBottom: Spacing.md,
  },
  reviewsContainer: {
    marginBottom: Spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    ...Typography.body1,
    color: Colors.neutral[600],
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    padding: Spacing.screenPadding,
  },
});