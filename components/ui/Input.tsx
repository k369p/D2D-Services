import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import Typography from '@/constants/Typography';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  style,
  secureTextEntry,
  showPasswordToggle = false,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: any) => {
    setIsFocused(false);
    rest.onBlur?.(e);
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const inputStyles = [
    styles.input,
    leftIcon && styles.inputWithLeftIcon,
    (rightIcon || showPasswordToggle) && styles.inputWithRightIcon,
    isFocused && styles.focusedInput,
    error && styles.errorInput,
    style,
  ];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={inputStyles}
          placeholderTextColor={Colors.neutral[400]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={showPasswordToggle ? !isPasswordVisible : secureTextEntry}
          {...rest}
        />
        {showPasswordToggle && (
          <TouchableOpacity 
            style={styles.rightIcon} 
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            {isPasswordVisible ? (
              <Eye size={20} color={Colors.neutral[500]} />
            ) : (
              <EyeOff size={20} color={Colors.neutral[500]} />
            )}
          </TouchableOpacity>
        )}
        {rightIcon && !showPasswordToggle && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {(error || helperText) && (
        <Text style={[styles.helperText, error ? styles.errorText : undefined]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.body2,
    marginBottom: Spacing.xs,
    color: Colors.neutral[800],
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.md,
    ...Typography.body1,
    color: Colors.neutral[900],
    backgroundColor: Colors.white,
  },
  inputWithLeftIcon: {
    paddingLeft: 48,
  },
  inputWithRightIcon: {
    paddingRight: 48,
  },
  leftIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
  },
  focusedInput: {
    borderColor: Colors.primary[500],
  },
  errorInput: {
    borderColor: Colors.error[500],
  },
  helperText: {
    ...Typography.caption,
    marginTop: Spacing.xs,
    color: Colors.neutral[600],
  },
  errorText: {
    color: Colors.error[500],
  },
});