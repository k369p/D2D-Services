import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  ImageSourcePropType 
} from 'react-native';
import { Star } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

interface ServiceCardProps {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  onPress: (id: string) => void;
}

export default function ServiceCard({
  id,
  title,
  category,
  price,
  rating,
  image,
  onPress,
}: ServiceCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => onPress(id)}
    >
      <Image 
        source={{ uri: image }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${price}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color={Colors.accent[500]} fill={Colors.accent[500]} />
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.borderRadiusMd,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: Colors.neutral[200],
  },
  content: {
    padding: Spacing.md,
  },
  category: {
    ...Typography.caption,
    color: Colors.primary[500],
    marginBottom: Spacing.xs,
  },
  title: {
    ...Typography.subtitle1,
    color: Colors.neutral[900],
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    ...Typography.subtitle1,
    color: Colors.neutral[900],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...Typography.body2,
    color: Colors.neutral[700],
    marginLeft: Spacing.xs,
  },
});