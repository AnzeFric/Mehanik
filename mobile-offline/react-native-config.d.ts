declare module "react-native-config" {
  export interface NativeConfig {
    EXPO_PUBLIC_AUTO_MECHANIC?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
