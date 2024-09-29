import {Text as T} from "react-native-paper";
//@ts-ignore
const Text = ({ children, ...props }) => {
    return <T {...props}>{children}</T>
}

export default Text;