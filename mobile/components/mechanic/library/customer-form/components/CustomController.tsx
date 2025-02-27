import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
} from "react-native";
import {
  Controller,
  Control,
  FieldError,
  Path,
  FieldValues,
} from "react-hook-form";
import { Colors } from "@/constants/Colors";

export type capitalizeOptions =
  | "none"
  | "sentences"
  | "words"
  | "characters"
  | undefined;

interface Props<T extends FieldValues> {
  control?: Control<T>;
  error?: FieldError | undefined;
  placeholder: string;
  optional: boolean;
  name: Path<T>;
  keyboardType?: KeyboardTypeOptions | undefined;
  autoCapitalize?: capitalizeOptions;
  textStyle?: StyleProp<TextStyle>;
  multiline?: boolean;
  numberOfLines?: number;
}

export default function CustomController<T extends FieldValues>({
  control,
  error,
  placeholder,
  optional,
  name,
  keyboardType = "default",
  autoCapitalize = "sentences",
  textStyle = {},
  multiline = false,
  numberOfLines = 1,
}: Props<T>) {
  return (
    <>
      <Controller
        control={control}
        rules={optional ? {} : { required: "Polje je obvezno." }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, error && styles.inputError, textStyle]}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            numberOfLines={numberOfLines}
          />
        )}
        name={name}
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
    marginBottom: 15,
    paddingVertical: 8,
  },
  inputError: {
    borderBottomColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
});
