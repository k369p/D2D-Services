import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle, Calendar, Clock, MapPin, CreditCard } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

export default function BookingConfirmationScreen() {
  const router = useRouter();
  
  // Mock confirmation data
  const confirmation = {
    bookingId: 'BK-123456',
    serviceTitle: 'House Deep Cleaning',
    serviceImage: '',
    providerName: 'Emma Johnson',
    providerAvatar: '',
    date: 'May 20, 2025',
    time: '10:00 AM',
    address: '123 Main St, New York, NY 10001',
    payment: {
      method: 'Visa •••• 4242',
      total: 120,
    },
  };
  
  const handleViewBooking = () => {
    router.push('/(tabs)/bookings');
  };
  
  const handleBackToHome = () => {
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Booking Confirmed" showBackButton />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.successContainer}>
          <View style={styles.checkCircle}>
            <CheckCircle size={48} color={Colors.white} fill={Colors.success[500]} />
          </View>
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.bookingId}>Booking ID: {confirmation.bookingId}</Text>
        </View>
        
        <View style={styles.serviceCard}>
          <Image source={{ uri: confirmation.serviceImage }} style={styles.serviceImage} />
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceTitle}>{confirmation.serviceTitle}</Text>
            <View style={styles.providerContainer}>
              <Image source={{ uri: confirmation.providerAvatar }} style={styles.providerAvatar} />
              <Text style={styles.providerName}>{confirmation.providerName}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Booking Details</Text>
          
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}>
              <Calendar size={20} color={Colors.primary[500]} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{confirmation.date}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}>
              <Clock size={20} color={Colors.primary[500]} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{confirmation.time}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}>
              <MapPin size={20} color={Colors.primary[500]} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{confirmation.address}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}>
              <CreditCard size={20} color={Colors.primary[500]} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Payment</Text>
              <Text style={styles.detailValue}>{confirmation.payment.method}</Text>
            </View>
          </View>
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>${confirmation.payment.total}</Text>
          </View>
        </View>
        
        <View style={styles.message}>
          <Text style={styles.messageText}>
            We've sent a confirmation email with all the details to your registered email address.
          </Text>
        </View>
        
        <View style={styles.buttonsContainer}>
          <Button
            title="View Booking"
            variant="primary"
            size="large"
            fullWidth
            style={styles.viewButton}
            onPress={handleViewBooking}
          />
          <Button
            title="Back to Home"
            variant="outlined"
            size="large"
            fullWidth
            style={styles.homeButton}
            onPress={handleBackToHome}
          />
        </View>
      </ScrollView>
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
    paddingBottom: Spacing.xxxl,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.success[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  successTitle: {
    ...Typography.heading2,
    color: Colors.neutral[900],
    marginBottom: Spacing.xs,
  },
  bookingId: {
    ...Typography.body1,
    color: Colors.neutral[600],
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: Spacing.lg,
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: Spacing.borderRadiusMd,
  },
  serviceInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  serviceTitle: {
    ...Typography.subtitle1,
    color: Colors.neutral[900],
    marginBottom: Spacing.md,
  },
  providerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: Spacing.xs,
  },
  providerName: {
    ...Typography.body2,
    color: Colors.neutral[700],
  },
  detailsCard: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: Spacing.xl,
  },
  detailsTitle: {
    ...Typography.subtitle1,
    color: Colors.neutral[900],
    marginBottom: Spacing.lg,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: Spacing.borderRadiusMd,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  detailContent: {
    flex: 1,
    justifyContent: 'center',
  },
  detailLabel: {
    ...Typography.caption,
    color: Colors.neutral[600],
    marginBottom: Spacing.xs / 2,
  },
  detailValue: {
    ...Typography.body1,
    color: Colors.neutral[900],
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  totalLabel: {
    ...Typography.subtitle2,
    color: Colors.neutral[700],
  },
  totalValue: {
    ...Typography.heading3,
    color: Colors.neutral[900],
  },
  message: {
    marginBottom: Spacing.xl,
  },
  messageText: {
    ...Typography.body2,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
  buttonsContainer: {
    marginBottom: Spacing.lg,
  },
  viewButton: {
    marginBottom: Spacing.md,
  },
  homeButton: {
    // Additional styling if needed
  },
});