import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  const handleRegister = () => {
    router.push('/(auth)/register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3760609/pexels-photo-3760609.jpeg' }}
            style={styles.image}
          />
          <View style={styles.logoOverlay}>
            <Text style={styles.logoText}>D2D</Text>
            <Text style={styles.logoSubtext}>Door2Door Services</Text>
          </View>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Professional Services</Text>
          <Text style={styles.title}>At Your Doorstep</Text>
          <Text style={styles.subtitle}>
            Find trusted professionals for all your home service needs in just a few taps.
          </Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          title="Log In"
          variant="primary"
          size="large"
          fullWidth
          style={styles.button}
          onPress={handleLogin}
        />
        <Button
          title="Create Account"
          variant="outlined"
          size="large"
          fullWidth
          style={styles.button}
          onPress={handleRegister}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
  },
  logoContainer: {
    width: '100%',
    height: 300,
    borderRadius: Spacing.borderRadiusLg,
    overflow: 'hidden',
    marginBottom: Spacing.xxl,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  logoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 80,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.white,
    textAlign: 'center',
  },
  logoSubtext: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.white,
    textAlign: 'center',
  },
  textContainer: {
    width: '100%',
    marginBottom: Spacing.xxl,
  },
  title: {
    ...Typography.heading1,
    color: Colors.neutral[900],
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.body1,
    color: Colors.neutral[600],
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.xxl,
  },
  button: {
    marginBottom: Spacing.md,
  },
});