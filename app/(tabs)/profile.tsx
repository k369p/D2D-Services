import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Camera 
} from 'lucide-react-native';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

const profileSections = [
  {
    id: 'personal',
    title: 'Personal Information',
    icon: <User size={20} color={Colors.primary[500]} />,
    route: '/profile/personal',
  },
  {
    id: 'address',
    title: 'Saved Addresses',
    icon: <MapPin size={20} color={Colors.primary[500]} />,
    route: '/profile/addresses',
  },
  {
    id: 'payment',
    title: 'Payment Methods',
    icon: <CreditCard size={20} color={Colors.primary[500]} />,
    route: '/profile/payment',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: <Bell size={20} color={Colors.primary[500]} />,
    route: '/profile/notifications',
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: <HelpCircle size={20} color={Colors.primary[500]} />,
    route: '/profile/help',
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  
  const handleLogout = () => {
    router.replace('/(auth)/welcome');
  };
  
  const navigateTo = (route: string) => {
    router.push(route);
  };
  
  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' }} 
              style={styles.profileImage} 
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Sarah Williams</Text>
            <Text style={styles.profileEmail}>sarah.williams@example.com</Text>
            <Text style={styles.profilePhone}>(123) 456-7890</Text>
          </View>
          
          <Button
            title="Edit Profile"
            variant="outlined"
            size="small"
            onPress={handleEditProfile}
          />
        </View>
        
        <View style={styles.sectionsContainer}>
          {profileSections.map(section => (
            <TouchableOpacity
              key={section.id}
              style={styles.sectionItem}
              onPress={() => navigateTo(section.route)}
            >
              <View style={styles.sectionLeft}>
                <View style={styles.sectionIcon}>{section.icon}</View>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <ChevronRight size={20} color={Colors.neutral[400]} />
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={Colors.error[500]} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary[500],
    borderRadius: 24,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  profileName: {
    ...Typography.heading3,
    color: Colors.neutral[900],
  },
  profileEmail: {
    ...Typography.body2,
    color: Colors.neutral[600],
    marginTop: Spacing.xs,
  },
  profilePhone: {
    ...Typography.body2,
    color: Colors.neutral[600],
    marginTop: Spacing.xs / 2,
  },
  sectionsContainer: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.borderRadiusMd,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: Spacing.xl,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: Spacing.md,
  },
  sectionTitle: {
    ...Typography.body1,
    color: Colors.neutral[800],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
  },
  logoutText: {
    ...Typography.subtitle1,
    color: Colors.error[500],
    marginLeft: Spacing.sm,
  },
  versionText: {
    ...Typography.caption,
    color: Colors.neutral[500],
    textAlign: 'center',
  },
});