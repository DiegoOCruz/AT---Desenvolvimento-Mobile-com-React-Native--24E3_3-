import {Appbar} from "react-native-paper";
import {router} from "expo-router";
import { useTheme } from "@/hooks/useTheme";

const AppBar = (props: any) => {
    const theme = useTheme();

    return <Appbar.Header
                style={{
                    backgroundColor: theme.colorScheme === "dark" ? "#121212" : "#f6f6f6",
                }}
            >
                {
                    props.back ? <Appbar.BackAction onPress={() => router.back()}/> : null
                }
                <Appbar.Content {...props}/>
                <Appbar.Action
                    {...props}
                />
            </Appbar.Header>
}

export default AppBar;