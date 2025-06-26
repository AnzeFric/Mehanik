declare module "react-native-config" {
  export interface NativeConfig {
    EXPO_PUBLIC_API_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
