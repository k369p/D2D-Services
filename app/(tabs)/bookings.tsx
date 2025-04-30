import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, Calendar, MapPin, MessageCircle, CheckCircle, XCircle } from 'lucide-react-native';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';
import services from '@/data/services';
import providers from '@/data/providers';

// Mock booking data
const bookings = [
  {
    id: '1',
    serviceId: '1',
    providerId: '1',
    status: 'upcoming',
    date: '2025-05-20',
    time: '10:00 AM',
    address: '123 Main St, New York, NY',
    price: 120,
  },
  {
    id: '2',
    serviceId: '3',
    providerId: '3',
    status: 'upcoming',
    date: '2025-05-25',
    time: '2:00 PM',
    address: '456 Park Ave, New York, NY',
    price: 1200,
  },
  {
    id: '3',
    serviceId: '4',
    providerId: '4',
    status: 'completed',
    date: '2025-05-10',
    time: '11:30 AM',
    address: '789 Broadway, New York, NY',
    price: 75,
  },
  {
    id: '4',
    serviceId: '2',
    providerId: '2',
    status: 'cancelled',
    date: '2025-05-05',
    time: '3:00 PM',
    address: '101 5th Ave, New York, NY',
    price: 85,
  },
];

type BookingWithDetails = typeof bookings[0] & {
  service: typeof services[0];
  provider: typeof providers[0];
};

const enrichBookingsWithDetails = (): BookingWithDetails[] => {
  return bookings.map(booking => {
    const service = services.find(s => s.id === booking.serviceId) || services[0];
    const provider = providers.find(p => p.id === booking.providerId) || providers[0];
    return { ...booking, service, provider };
  });
};

export default function BookingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  
  const enrichedBookings = enrichBookingsWithDetails();
  const filteredBookings = enrichedBookings.filter(booking => booking.status === activeTab);

  const handleBookingPress = (id: string) => {
    router.push(`/booking/${id}`);
  };

  const handleMessagePress = (providerId: string) => {
    router.push(`/messages/${providerId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return Colors.primary[500];
      case 'completed':
        return Colors.success[500];
      case 'cancelled':
        return Colors.error[500];
      default:
        return Colors.neutral[500];
    }
  };

  const renderBookingCard = ({ item }: { item: BookingWithDetails }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => handleBookingPress(item.id)}
      activeOpacity={0.9}
    >
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.service.image }} style={styles.serviceImage} />
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{item.service.title}</Text>
          <Text style={styles.providerName}>{item.provider.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Calendar size={16} color={Colors.neutral[600]} />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Clock size={16} color={Colors.neutral[600]} />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <MapPin size={16} color={Colors.neutral[600]} />
          <Text style={styles.detailText} numberOfLines={1}>{item.address}</Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <Text style={styles.priceText}>${item.price}</Text>
        
        {item.status === 'upcoming' && (
          <View style={styles.actionButtons}>
            <Button
              title="Message"
              variant="outlined"
              size="small"
              leftIcon={<MessageCircle size={16} color={Colors.primary[500]} />}
              style={styles.messageButton}
              onPress={() => handleMessagePress(item.provider.id)}
            />
            <Button
              title="Cancel"
              variant="text"
              size="small"
              style={styles.cancelButton}
              onPress={() => console.log('Cancel booking')}
            />
          </View>
        )}
        
        {item.status === 'completed' && (
          <View style={styles.completedIcon}>
            <CheckCircle size={24} color={Colors.success[500]} />
          </View>
        )}
        
        {item.status === 'cancelled' && (
          <View style={styles.cancelledIcon}>
            <XCircle size={24} color={Colors.error[500]} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Bookings" />
      
      <View style={styles.content}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
          >
            <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'cancelled' && styles.activeTab]}
            onPress={() => setActiveTab('cancelled')}
          >
            <Text style={[styles.tabText, activeTab === 'cancelled' && styles.activeTabText]}>
              Cancelled
            </Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={filteredBookings}
          keyExtractor={item => item.id}
          renderItem={renderBookingCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No {activeTab} bookings</Text>
            </View>
          )}
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
  content: {
    flex: 1,
    paddingHorizontal: Spacing.screenPadding,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
    borderRadius: Spacing.borderRadiusMd,
    backgroundColor: Colors.neutral[100],
    padding: Spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: Spacing.borderRadiusMd,
  },
  activeTab: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    ...Typography.body2,
    color: Colors.neutral[600],
  },
  activeTabText: {
    color: Colors.primary[500],
    fontFamily: Typography.fontFamily.medium,
  },
  listContainer: {
    paddingBottom: Spacing.xxl,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.borderRadiusMd,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    padding: Spacing.md,
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: Spacing.borderRadiusMd,
  },
  serviceInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  serviceName: {
    ...Typography.subtitle1,
    color: Colors.neutral[900],
  },
  providerName: {
    ...Typography.body2,
    color: Colors.neutral[600],
    marginBottom: Spacing.xs,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.xs / 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: Spacing.borderRadiusFull,
  },
  statusText: {
    ...Typography.caption,
    fontFamily: Typography.fontFamily.medium,
  },
  bookingDetails: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  detailText: {
    ...Typography.body2,
    color: Colors.neutral[700],
    marginLeft: Spacing.sm,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  priceText: {
    ...Typography.subtitle1,
    color: Colors.neutral[900],
  },
  actionButtons: {
    flexDirection: 'row',
  },
  messageButton: {
    marginRight: Spacing.sm,
  },
  cancelButton: {
    paddingHorizontal: 0,
  },
  completedIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelledIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    ...Typography.body1,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
});