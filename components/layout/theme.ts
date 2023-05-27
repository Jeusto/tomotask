export function getSpacing(
  value: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
): number {
  switch (value) {
    case 'xs':
      return 4;
    case 'sm':
      return 8;
    case 'md':
      return 16;
    case 'lg':
      return 24;
    case 'xl':
      return 32;
    default:
      return value;
  }
}
