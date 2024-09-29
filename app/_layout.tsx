import { Slot } from "expo-router";
import { SessionProvider, useSession } from "./ctx";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { Colors } from "@/constants/Colors";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import merge from 'deepmerge';
import { useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

export default function RootLayout() {

  //const colorScheme = useColorScheme();
  const { colorScheme } = useTheme();

  const paperTheme =
  colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}
