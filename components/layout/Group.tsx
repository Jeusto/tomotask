import { getSpacing } from '../../utils/theme';

import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface GroupProps extends ViewProps {
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  grow?: boolean;
  noWrap?: boolean;
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  spacing?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Group: React.FC<GroupProps> = ({
  children,
  style,
  align = 'flex-start',
  grow = false,
  noWrap = false,
  justify = 'flex-start',
  spacing = 'md',
  ...props
}) => {
  const spacingStyle =
    typeof spacing === 'number'
      ? { marginHorizontal: spacing / 2 }
      : { marginHorizontal: getSpacing(spacing) };

  const customStyles = StyleSheet.create({
    group: {
      justifyContent: justify,
      alignItems: align,
      flexDirection: noWrap ? 'row' : 'row',
      flexGrow: grow ? 1 : 0,
    },
  });

  return (
    <View style={[baseStyles.group, customStyles.group, style]} {...props}>
      {React.Children.toArray(children).map((child, index) => {
        const isLast = index === React.Children.count(children) - 1;
        return (
          <React.Fragment key={index}>
            {child}
            {!noWrap && !isLast && <View style={spacingStyle} />}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const baseStyles = StyleSheet.create({
  group: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
