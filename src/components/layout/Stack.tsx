import { theme } from '@/style/theme';

import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface StackProps extends ViewProps {
  align?: 'flex-start' | 'center' | 'flex-end';
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  spacing?: number | keyof typeof theme.spacing;
  children: React.ReactNode;
}

export const Stack = ({
  align = 'center',
  justify = 'flex-start',
  spacing = 'md',
  children,
  style,
  ...props
}: StackProps) => {
  const customStyles = StyleSheet.create({
    stack: {
      flexDirection: 'column',
      alignItems: align,
      justifyContent: justify,
    },
    item: {
      marginBottom:
        typeof spacing === 'number' ? spacing : theme.spacing[spacing],
    },
  });

  const items = React.Children.map(children, (child) => (
    <View style={customStyles.item}>{child}</View>
  ));

  return (
    <View style={[customStyles.stack, style]} {...props}>
      {items}
    </View>
  );
};
