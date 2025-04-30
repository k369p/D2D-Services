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
import { Star, MapPin, Clock, Calendar, MessageCircle } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import ProviderCard from '@/components/ui/ProviderCard';
import ReviewCard from '@/components/ui/ReviewCard';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';
import services from '@/data/services';
import providers from '@/data/providers';
import reviews from '@/data/reviews';

export default function ServiceDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  const service = services.find(s => s.id === id) || services[0];
  const provider = providers.find(p => p.id === service.providerId) || providers[0];
  const serviceReviews = reviews.filter(r => r.serviceId === id);
  
  const handleBookService = () => {
    router.push(`/booking/new?serviceId=${service.id}`);
  };
  
  const handleProviderPress = (providerId: string) => {
    router.push(`/provider/${providerId}`);
  };
  
  const handleMessagePress = (providerId: string) => {
    router.push(`/messages/${providerId}`);
  };
  
  const toggleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Service Details" showBackButton />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: service.image }} style={styles.image} />
        
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.category}>{service.category.charAt(0).toUpperCase() + service.category.slice(1)}</Text>
            <View style={styles.ratingContainer}>
              <Star size={18} color={Colors.accent[500]} fill={Colors.accent[500]} />
              <Text style={styles.rating}>{service.rating.toFixed(1)}</Text>
              <Text style={styles.reviewCount}>({service.numberOfRatings})</Text>
            </View>
          </View>
          
          <Text style={styles.title}>{service.title}</Text>
          <Text style={styles.price}>${service.price}</Text>
          
          <Text style={styles.description}>{service.description}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Service Provider</Text>
          <ProviderCard
            id={provider.id}
            name={provider.name}
            avatar={provider.avatar}
            profession={provider.profession}
            rating={provider.rating}
            totalJobs={provider.totalJobs}
            onPress={handleProviderPress}
            onMessagePress={handleMessagePress}
          />
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Reviews</Text>
          
          {(showAllReviews ? serviceReviews : serviceReviews.slice(0, 2)).map(review => (
            <ReviewCard
              key={review.id}
              userName={review.userName}
              avatar={review.avatar}
              rating={review.rating}
              date={review.date}
              comment={review.comment}
            />
          ))}
          
          {serviceReviews.length > 2 && (
            <TouchableOpacity 
              style={styles.showMoreButton}
              onPress={toggleShowAllReviews}
            >
              <Text style={styles.showMoreText}>
                {showAllReviews ? 'Show Less' : `Show All (${serviceReviews.length})`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Book Now"
          variant="primary"
          size="large"
          fullWidth
          onPress={handleBookService}
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
    paddingBottom: Spacing.xxl + 60, // Extra padding for the footer
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: Colors.neutral[200],
  },
  infoContainer: {
    padding: Spacing.screenPadding,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  category: {
    ...Typography.subtitle2,
    color: Colors.primary[500],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...Typography.subtitle2,
    color: Colors.neutral[900],
    marginLeft: Spacing.xs,
  },
  reviewCount: {
    ...Typography.body2,
    color: Colors.neutral[600],
    marginLeft: Spacing.xs / 2,
  },
  title: {
    ...Typography.heading2,
    color: Colors.neutral[900],
    marginBottom: Spacing.sm,
  },
  price: {
    ...Typography.heading3,
    color: Colors.neutral[900],
    marginBottom: Spacing.md,
  },
  description: {
    ...Typography.body1,
    color: Colors.neutral[700],
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral[200],
    marginVertical: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.heading3,
    color: Colors.neutral[900],
    marginBottom: Spacing.md,
  },
  showMoreButton: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  showMoreText: {
    ...Typography.subtitle2,
    color: Colors.primary[500],
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