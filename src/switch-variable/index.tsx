/* eslint-disable @typescript-eslint/ban-types */
export default <T extends unknown>(obj: {
  /**
   * 默认变量
   */
  default?: T extends object ? Partial<T> : T;
  [key: string]: (T extends object ? Partial<T> : T) | undefined;
}) => (v: keyof typeof obj) => {
  const defaultValue = obj['default'];
  const value = obj[v] || defaultValue;
  if (typeof value === 'object' && typeof defaultValue === 'object') {
    Object.keys(defaultValue as any).forEach(key => {
      if ((value as any)[key] === undefined) {
        (value as any)[key] = (defaultValue as any)[key];
      }
    });
  }
  return value as T;
};
