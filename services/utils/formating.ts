export const formatNumber = (value: number, format?: Intl.LocalesArgument) => {
  return value.toLocaleString(format);
}