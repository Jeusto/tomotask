import { View, StyleSheet, ViewProps } from 'react-native';

interface CenterProps extends ViewProps {
  children: React.ReactNode;
}

export const Center = ({ children, style, ...props }: CenterProps) => {
  return (
    <View style={[baseStyles.center, style]} {...props}>
      {children}
    </View>
  );
};

const baseStyles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
