import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Search, Bell, SprayCan as Spraycan, Wrench, Zap, Scissors, Hammer, PaintBucket, Truck, Flower } from 'lucide-react-native';
import SearchBar from '@/components/ui/SearchBar';
import CategoryCard from '@/components/ui/CategoryCard';
import ServiceCard from '@/components/ui/ServiceCard';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';
import categories from '@/data/categories';
import services from '@/data/services';

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const getCategoryIcon = (iconName: string) => {
    const iconProps = { size: 24, color: activeCategory ? Colors.white : Colors.primary[500] };
    
    switch (iconName) {
      case 'spraycan':
        return <Spraycan {...iconProps} />;
      case 'wrench':
        return <Wrench {...iconProps} />;
      case 'zap':
        return <Zap {...iconProps} />;
      case 'scissors':
        return <Scissors {...iconProps} />;
      case 'hammer':
        return <Hammer {...iconProps} />;
      case 'paintbrush':
        return <PaintBucket {...iconProps} />;
      case 'truck':
        return <Truck {...iconProps} />;
      case 'flower':
        return <Flower {...iconProps} />;
      default:
        return <Hammer {...iconProps} />;
    }
  };

  const filteredServices = activeCategory
    ? services.filter(service => service.category === activeCategory)
    : services;

  const handleServicePress = (id: string) => {
    router.push(`/service/${id}`);
  };

  const handleCategoryPress = (id: string) => {
    setActiveCategory(id === activeCategory ? '' : id);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  const handleViewAllServices = () => {
    router.push('/search');
  };

  const handleNotificationsPress = () => {
    // Navigate to notifications screen
    console.log('Notifications pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <MapPin size={18} color={Colors.primary[500]} />
            <Text style={styles.locationText}>New York, NY</Text>
          </View>
          <TouchableOpacity onPress={handleNotificationsPress}>
            <View style={styles.notificationIcon}>
              <Bell size={24} color={Colors.neutral[800]} />
              <View style={styles.notificationBadge} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Welcome Text */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Hello, Sarah 👋</Text>
          <Text style={styles.subtitleText}>What service do you need today?</Text>
        </View>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={handleSearch}
        />

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              id={category.id}
              title={category.title}
              icon={getCategoryIcon(category.iconName)}
              onPress={handleCategoryPress}
              isActive={category.id === activeCategory}
            />
          ))}
        </ScrollView>

        {/* Featured Services */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {activeCategory ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Services` : 'Featured Services'}
          </Text>
          <TouchableOpacity onPress={handleViewAllServices}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredServices.slice(0, 4)}
          keyExtractor={item => item.id}
          numColumns={2}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.serviceCardContainer}>
              <ServiceCard
                id={item.id}
                title={item.title}
                category={item.category}
                price={item.price}
                rating={item.rating}
                image={item.image}
                onPress={() => handleServicePress(item.id)}
              />
            </View>
          )}
        />

        {/* Promotion Banner */}
        <View style={styles.promotionBanner}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3768910/pexels-photo-3768910.jpeg' }}
            style={styles.promotionImage}
          />
          <View style={styles.promotionContent}>
            <Text style={styles.promotionTitle}>Get 20% Off</Text>
            <Text style={styles.promotionSubtitle}>On your first booking</Text>
            <Button
              title="Book Now"
              variant="secondary"
              size="small"
              onPress={() => console.log('Promotion clicked')}
            />
          </View>
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
    paddingHorizontal: Spacing.screenPadding,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...Typography.body1,
    color: Colors.neutral[800],
    marginLeft: Spacing.xs,
  },
  notificationIcon: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error[500],
  },
  welcomeContainer: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  welcomeText: {
    ...Typography.heading2,
    color: Colors.neutral[900],
  },
  subtitleText: {
    ...Typography.body1,
    color: Colors.neutral[600],
    marginTop: Spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.heading3,
    color: Colors.neutral[900],
  },
  viewAllText: {
    ...Typography.body2,
    color: Colors.primary[500],
  },
  categoriesContainer: {
    paddingRight: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '100%',
  },
  serviceCardContainer: {
    flex: 1,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  promotionBanner: {
    height: 180,
    borderRadius: Spacing.borderRadiusMd,
    overflow: 'hidden',
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
    position: 'relative',
  },
  promotionImage: {
    width: '100%',
    height: '100%',
  },
  promotionContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: Spacing.md,
    justifyContent: 'center',
  },
  promotionTitle: {
    ...Typography.heading2,
    color: Colors.white,
  },
  promotionSubtitle: {
    ...Typography.body1,
    color: Colors.white,
    marginBottom: Spacing.md,
  },
});