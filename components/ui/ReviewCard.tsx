import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Star } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

interface ReviewCardProps {
  userName: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export default function ReviewCard({
  userName,
  avatar,
  rating,
  date,
  comment,
}: ReviewCardProps) {
  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          color={Colors.accent[500]}
          fill={i < rating ? Colors.accent[500] : Colors.transparent}
          strokeWidth={1.5}
        />
      ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{userName.charAt(0)}</Text>
            </View>
          )}
          <View>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>{renderStars()}</View>
      </View>
      <Text style={styles.comment}>{comment}</Text>
    </View>
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Spacing.sm,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  avatarText: {
    ...Typography.subtitle1,
    color: Colors.primary[700],
  },
  userName: {
    ...Typography.subtitle2,
    color: Colors.neutral[900],
  },
  date: {
    ...Typography.caption,
    color: Colors.neutral[500],
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  comment: {
    ...Typography.body2,
    color: Colors.neutral[800],
  },
});