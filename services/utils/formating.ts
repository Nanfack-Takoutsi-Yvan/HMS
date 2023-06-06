const formatNumber = (value: number, format?: Intl.LocalesArgument): string =>
  value.toLocaleString(format)

export default formatNumber
