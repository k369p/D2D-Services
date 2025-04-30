import { TextStyle } from 'react-native';

type FontWeight = 'normal' | 'medium' | 'bold';

interface TypographyStyles {
  fontFamily: {
    [key in FontWeight]: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
  lineHeight: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
  heading1: TextStyle;
  heading2: TextStyle;
  heading3: TextStyle;
  heading4: TextStyle;
  subtitle1: TextStyle;
  subtitle2: TextStyle;
  body1: TextStyle;
  body2: TextStyle;
  button: TextStyle;
  caption: TextStyle;
  overline: TextStyle;
}

const Typography: TypographyStyles = {
  fontFamily: {
    normal: 'Inter-Regular',
    medium: 'Inter-Medium',
    bold: 'Inter-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 30,
    xxl: 36,
    xxxl: 48,
  },
  heading1: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    lineHeight: 48,
  },
  heading2: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    lineHeight: 36,
  },
  heading3: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    lineHeight: 30,
  },
  heading4: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    lineHeight: 28,
  },
  subtitle1: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
  },
  subtitle2: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 20,
  },
  body1: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  overline: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
};

export default Typography;