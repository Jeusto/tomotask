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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
