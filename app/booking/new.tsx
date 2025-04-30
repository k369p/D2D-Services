import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  SafeAreaView 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, Clock, MapPin, CreditCard } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';
import services from '@/data/services';
import providers from '@/data/providers';

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

// Current date + 1 day
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// Generate dates for the next 7 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 1; i <= 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  
  return dates;
};

const formatDate = (date: Date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = days[date.getDay()];
  const dayNum = date.getDate();
  return { day, dayNum };
};

const savedAddresses = [
  { id: '1', title: 'Home', address: '123 Main St, New York, NY 10001', isDefault: true },
  { id: '2', title: 'Work', address: '456 Park Ave, New York, NY 10022', isDefault: false },
];

const paymentMethods = [
  { id: '1', type: 'card', last4: '4242', brand: 'Visa', isDefault: true },
  { id: '2', type: 'card', last4: '1234', brand: 'Mastercard', isDefault: false },
];

export default function BookingScreen() {
  const router = useRouter();
  const { serviceId } = useLocalSearchParams();
  
  const [selectedDate, setSelectedDate] = useState(tomorrow);
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);
  
  const service = services.find(s => s.id === serviceId) || services[0];
  const provider = providers.find(p => p.id === service.providerId) || providers[0];
  
  const dates = generateDates();
  
  const handleConfirmBooking = () => {
    // Simulate booking process
    setTimeout(() => {
      router.replace('/booking/confirmation');
    }, 1000);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Book Service" showBackButton />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.serviceCard}>
          <Image source={{ uri: service.image }} style={styles.serviceImage} />
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.providerName}>{provider.name}</Text>
            <Text style={styles.servicePrice}>${service.price}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesContainer}
          >
            {dates.map((date, index) => {
              const { day, dayNum } = formatDate(date);
              const isSelected = date.toDateString() === selectedDate.toDateString();
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.dateItem, isSelected && styles.selectedDateItem]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={[styles.dayText, isSelected && styles.selectedText]}>
                    {day}
                  </Text>
                  <Text style={[styles.dayNumText, isSelected && styles.selectedText]}>
                    {dayNum}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {timeSlots.map((time, index) => {
              const isSelected = time === selectedTime;
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.timeItem, isSelected && styles.selectedTimeItem]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[styles.timeText, isSelected && styles.selectedText]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Address</Text>
          {savedAddresses.map(address => {
            const isSelected = address.id === selectedAddress.id;
            
            return (
              <TouchableOpacity
                key={address.id}
                style={[styles.addressItem, isSelected && styles.selectedAddressItem]}
                onPress={() => setSelectedAddress(address)}
              >
                <View style={styles.addressHeader}>
                  <Text style={styles.addressTitle}>{address.title}</Text>
                  {address.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>Default</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.addressText}>{address.address}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add New Address</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map(payment => {
            const isSelected = payment.id === selectedPayment.id;
            
            return (
              <TouchableOpacity
                key={payment.id}
                style={[styles.paymentItem, isSelected && styles.selectedPaymentItem]}
                onPress={() => setSelectedPayment(payment)}
              >
                <View style={styles.paymentInfo}>
                  <CreditCard size={24} color={Colors.neutral[700]} />
                  <Text style={styles.paymentText}>
                    {payment.brand} •••• {payment.last4}
                  </Text>
                </View>
                {payment.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add New Payment Method</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>${service.price}</Text>
        </View>
        <Button
          title="Confirm Booking"
          variant="primary"
          size="large"
          style={styles.confirmButton}
          onPress={handleConfirmBooking}
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
    paddingBottom: Spacing.xxxl + 60, // Extra padding for the footer
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
    marginBottom: Spacing.xs,
  },
  providerName: {
    ...Typography.body2,
    color: Colors.neutral[600],
    marginBottom: Spacing.sm,
  },
  servicePrice: {
    ...Typography.heading3,
    color: Colors.neutral[900],
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.subtitle1,
    color: Colors.neutral[900],
    marginBottom: Spacing.md,
  },
  datesContainer: {
    paddingRight: Spacing.lg,
  },
  dateItem: {
    width: 60,
    height: 80,
    borderRadius: Spacing.borderRadiusMd,
    backgroundColor: Colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  selectedDateItem: {
    backgroundColor: Colors.primary[500],
  },
  dayText: {
    ...Typography.body2,
    color: Colors.neutral[700],
  },
  dayNumText: {
    ...Typography.subtitle1,
    color: Colors.neutral[900],
    marginTop: Spacing.xs,
  },
  selectedText: {
    color: Colors.white,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
  },
  timeItem: {
    width: '30%',
    borderRadius: Spacing.borderRadiusMd,
    backgroundColor: Colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    margin: '1.5%',
  },
  selectedTimeItem: {
    backgroundColor: Colors.primary[500],
  },
  timeText: {
    ...Typography.body2,
    color: Colors.neutral[700],
  },
  addressItem: {
    backgroundColor: Colors.neutral[100],
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  selectedAddressItem: {
    backgroundColor: Colors.primary[50],
    borderWidth: 1,
    borderColor: Colors.primary[500],
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  addressTitle: {
    ...Typography.subtitle2,
    color: Colors.neutral[900],
  },
  defaultBadge: {
    backgroundColor: Colors.primary[100],
    borderRadius: Spacing.borderRadiusFull,
    paddingVertical: 2,
    paddingHorizontal: Spacing.sm,
  },
  defaultText: {
    ...Typography.caption,
    color: Colors.primary[700],
  },
  addressText: {
    ...Typography.body2,
    color: Colors.neutral[700],
  },
  addButton: {
    padding: Spacing.sm,
    alignItems: 'center',
  },
  addButtonText: {
    ...Typography.body2,
    color: Colors.primary[500],
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  selectedPaymentItem: {
    backgroundColor: Colors.primary[50],
    borderWidth: 1,
    borderColor: Colors.primary[500],
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    ...Typography.body1,
    color: Colors.neutral[900],
    marginLeft: Spacing.md,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    marginRight: Spacing.md,
  },
  totalLabel: {
    ...Typography.body2,
    color: Colors.neutral[600],
  },
  totalPrice: {
    ...Typography.heading3,
    color: Colors.neutral[900],
  },
  confirmButton: {
    flex: 1,
  },
});