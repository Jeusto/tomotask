import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface CenterProps extends ViewProps {
  children: React.ReactNode;
}

export const Center: React.FC<CenterProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <View style={[baseStyles.center, style]} {...props}>
      {children}
    </View>
  );
};

const baseStyles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
