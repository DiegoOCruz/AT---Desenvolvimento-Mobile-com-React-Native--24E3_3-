import { Grid, Menu, TopBar } from "@/components";
import { useTheme } from "../hooks/useTheme";
import { router } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function SettingsScreen() {
  const { toggleTheme, colorScheme } = useTheme();
  const tema = colorScheme;
  return (
    <Grid>
      <TopBar title="Configurações" back={true} menu={false} />
      <View style={{ margin: 16 }}>
        <Button icon="repeat" mode="outlined" onPress={toggleTheme}>
          {colorScheme === "light" ? "Dark" : "Light"} Theme
        </Button>
      </View>
    </Grid>
  );
}
