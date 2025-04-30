import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Star, MessageCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

interface ProviderCardProps {
  id: string;
  name: string;
  avatar: string;
  profession: string;
  rating: number;
  totalJobs: number;
  onPress: (id: string) => void;
  onMessagePress: (id: string) => void;
}

export default function ProviderCard({
  id,
  name,
  avatar,
  profession,
  rating,
  totalJobs,
  onPress,
  onMessagePress,
}: ProviderCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => onPress(id)}
    >
      <View style={styles.header}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.profession}>{profession}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color={Colors.accent[500]} fill={Colors.accent[500]} />
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
            <Text style={styles.totalJobs}>({totalJobs} jobs)</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.messageButton}
          onPress={() => onMessagePress(id)}
        >
          <MessageCircle size={20} color={Colors.primary[500]} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    ...Typography.subtitle1,
    color: Colors.neutral[900],
  },
  profession: {
    ...Typography.body2,
    color: Colors.neutral[600],
    marginBottom: Spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...Typography.body2,
    color: Colors.neutral[900],
    marginLeft: Spacing.xs,
    marginRight: Spacing.xs,
  },
  totalJobs: {
    ...Typography.caption,
    color: Colors.neutral[500],
  },
  messageButton: {
    padding: Spacing.sm,
  },
});