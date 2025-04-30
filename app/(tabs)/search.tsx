import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Filter, X } from 'lucide-react-native';
import SearchBar from '@/components/ui/SearchBar';
import ServiceCard from '@/components/ui/ServiceCard';
import Header from '@/components/ui/Header';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';
import services from '@/data/services';

type FilterOption = {
  id: string;
  label: string;
};

const filters: { [key: string]: FilterOption[] } = {
  category: [
    { id: 'cleaning', label: 'Cleaning' },
    { id: 'plumbing', label: 'Plumbing' },
    { id: 'electrical', label: 'Electrical' },
    { id: 'beauty', label: 'Beauty' },
    { id: 'repair', label: 'Repair' },
    { id: 'painting', label: 'Painting' },
    { id: 'moving', label: 'Moving' },
    { id: 'gardening', label: 'Gardening' },
  ],
  priceRange: [
    { id: 'low', label: 'Under $50' },
    { id: 'medium', label: '$50 - $100' },
    { id: 'high', label: '$100 - $200' },
    { id: 'premium', label: 'Over $200' },
  ],
  rating: [
    { id: '4+', label: '4+ Stars' },
    { id: '3+', label: '3+ Stars' },
  ],
};

export default function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState(params.q?.toString() || '');
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
    category: [],
    priceRange: [],
    rating: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (type: string, id: string) => {
    setSelectedFilters(prev => {
      const currentFilters = [...prev[type]];
      const index = currentFilters.indexOf(id);
      
      if (index >= 0) {
        currentFilters.splice(index, 1);
      } else {
        currentFilters.push(id);
      }
      
      return {
        ...prev,
        [type]: currentFilters,
      };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      category: [],
      priceRange: [],
      rating: [],
    });
  };

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleServicePress = (id: string) => {
    router.push(`/service/${id}`);
  };

  const filteredServices = services.filter(service => {
    // Filter by search query
    if (searchQuery && !service.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (
      selectedFilters.category.length > 0 &&
      !selectedFilters.category.includes(service.category)
    ) {
      return false;
    }
    
    // Filter by price range
    if (selectedFilters.priceRange.length > 0) {
      const matchesPrice = selectedFilters.priceRange.some(range => {
        if (range === 'low') return service.price < 50;
        if (range === 'medium') return service.price >= 50 && service.price < 100;
        if (range === 'high') return service.price >= 100 && service.price < 200;
        if (range === 'premium') return service.price >= 200;
        return false;
      });
      
      if (!matchesPrice) return false;
    }
    
    // Filter by rating
    if (selectedFilters.rating.length > 0) {
      const matchesRating = selectedFilters.rating.some(rating => {
        if (rating === '4+') return service.rating >= 4;
        if (rating === '3+') return service.rating >= 3;
        return false;
      });
      
      if (!matchesRating) return false;
    }
    
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Search" />
      
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmit={handleSearch}
          />
          
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={24} color={Colors.neutral[800]} />
          </TouchableOpacity>
        </View>
        
        {showFilters && (
          <View style={styles.filtersContainer}>
            <View style={styles.filtersHeader}>
              <Text style={styles.filtersTitle}>Filters</Text>
              <TouchableOpacity onPress={clearFilters}>
                <Text style={styles.clearText}>Clear All</Text>
              </TouchableOpacity>
            </View>
            
            {Object.keys(filters).map(filterType => (
              <View key={filterType} style={styles.filterSection}>
                <Text style={styles.filterTypeTitle}>
                  {filterType === 'priceRange' ? 'Price Range' : 
                   filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </Text>
                <View style={styles.filterOptions}>
                  {filters[filterType].map(option => (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.filterOption,
                        selectedFilters[filterType].includes(option.id) && styles.selectedFilterOption,
                      ]}
                      onPress={() => toggleFilter(filterType, option.id)}
                    >
                      <Text 
                        style={[
                          styles.filterOptionText,
                          selectedFilters[filterType].includes(option.id) && styles.selectedFilterOptionText,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
        
        <Text style={styles.resultsText}>
          {filteredServices.length} {filteredServices.length === 1 ? 'result' : 'results'} found
        </Text>
        
        <FlatList
          data={filteredServices}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.servicesGrid}
          renderItem={({ item }) => (
            <View style={styles.serviceCardContainer}>
              <ServiceCard
                id={item.id}
                title={item.title}
                category={item.category}
                price={item.price}
                rating={item.rating}
                image={item.image}
                onPress={handleServicePress}
              />
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No services found matching your criteria</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    marginLeft: Spacing.sm,
    padding: Spacing.sm,
    backgroundColor: Colors.neutral[100],
    borderRadius: Spacing.borderRadiusMd,
  },
  filtersContainer: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  filtersTitle: {
    ...Typography.subtitle1,
    color: Colors.neutral[900],
  },
  clearText: {
    ...Typography.body2,
    color: Colors.primary[500],
  },
  filterSection: {
    marginBottom: Spacing.md,
  },
  filterTypeTitle: {
    ...Typography.subtitle2,
    color: Colors.neutral[800],
    marginBottom: Spacing.sm,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    backgroundColor: Colors.neutral[100],
    borderRadius: Spacing.borderRadiusFull,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  selectedFilterOption: {
    backgroundColor: Colors.primary[500],
  },
  filterOptionText: {
    ...Typography.caption,
    color: Colors.neutral[700],
  },
  selectedFilterOptionText: {
    color: Colors.white,
  },
  resultsText: {
    ...Typography.body2,
    color: Colors.neutral[600],
    marginBottom: Spacing.md,
  },
  servicesGrid: {
    paddingBottom: Spacing.xxl,
  },
  serviceCardContainer: {
    flex: 1,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
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