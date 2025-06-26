declare module "react-native-config" {
  export interface NativeConfig {
    API_DEVELOPMENT_IP?: string;
    API_PORT?: string;
    EXPO_PUBLIC_API_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
