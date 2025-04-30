import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

interface CategoryCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  onPress: (id: string) => void;
  isActive?: boolean;
}

export default function CategoryCard({
  id,
  title,
  icon,
  onPress,
  isActive = false,
}: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.activeContainer]}
      activeOpacity={0.7}
      onPress={() => onPress(id)}
    >
      <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
        {icon}
      </View>
      <Text style={[styles.title, isActive && styles.activeTitle]} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 84,
    paddingVertical: Spacing.sm,
  },
  activeContainer: {
    // Active state styling
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: Spacing.borderRadiusFull,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  activeIconContainer: {
    backgroundColor: Colors.primary[500],
  },
  title: {
    ...Typography.caption,
    color: Colors.neutral[700],
    textAlign: 'center',
  },
  activeTitle: {
    color: Colors.primary[700],
    fontFamily: Typography.fontFamily.medium,
  },
});