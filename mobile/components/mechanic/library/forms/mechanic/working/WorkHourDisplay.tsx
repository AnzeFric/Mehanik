import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { WorkHour } from "@/interfaces/user";
import WorkHourItem from "./WorkHourItem";
import ThemedButton from "@/components/global/themed/ThemedButton";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";

interface Props {
  workingHours: Array<WorkHour>;
  setWorkingHours: (workingHours: Array<WorkHour>) => void;
}

export default function WorkHourDisplay({
  workingHours,
  setWorkingHours,
}: Props) {
  const { staticColors } = useAnimatedTheme();

  const updateWorkHourArray = (index: number, updatedItem: WorkHour) => {
    const newArray = workingHours.map((item, i) =>
      i === index ? updatedItem : item
    );
    setWorkingHours(newArray);
  };

  const addNewItem = () => {
    setWorkingHours([
      ...workingHours,
      {
        day: "pon",
        isOpen: true,
        shifts: [
          {
            start: "08:00",
            end: "16:00",
          },
        ],
      },
    ]);
  };

  const deleteItem = (deleteIndex: number) => {
    const newArr = workingHours.filter((_, index) => index !== deleteIndex);
    setWorkingHours(newArr);
  };

  return (
    <View style={styles.container}>
      {workingHours.map((item, index) => (
        <View style={{ flexDirection: "row" }} key={index}>
          <WorkHourItem
            workHour={item}
            setWorkHour={(updatedItem: WorkHour) =>
              updateWorkHourArray(index, updatedItem)
            }
          />
          <TouchableOpacity
            style={[
              styles.deleteButton,
              { backgroundColor: staticColors.destroyButton },
            ]}
            onPress={() => {
              deleteItem(index);
            }}
          >
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}
      <ThemedButton
        buttonType={"small"}
        buttonText={"+ Dodaj delovni čas"}
        onPress={addNewItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  itemContainer: {
    flexDirection: "row",
  },
  deleteButton: {
    paddingHorizontal: 5,
    borderRadius: 60,
    marginLeft: 20,
    alignSelf: "flex-start",
    marginTop: 15,
  },
  deleteButtonText: {
    fontWeight: "bold",
    color: "white",
    padding: 3,
  },
});
