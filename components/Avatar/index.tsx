import * as React from 'react';
import { Avatar as Av } from 'react-native-paper';

interface AvatarProps {
  source?: any;
  icon?: string;
  label?: string;
  bgColor?: string;
  color?: string;
  style?: object;
}

// Usar parâmetros padrão diretamente na função
const Avatar = ({
  source = null,
  label = 'XD',
  bgColor = "#fff",
  color = "#333",
  style = {},
  ...props
}: AvatarProps) => {

  const detectTypeAvatar = () => {
    if (source) {
      return <Av.Image style={{ ...style, backgroundColor: bgColor }} source={source} {...props} />;
    } else if (props.icon) {
      return <Av.Icon style={{ ...style, backgroundColor: bgColor }} icon={props.icon} {...props} />;
    } else {
      return <Av.Text style={{ ...style, backgroundColor: bgColor }} label={label} {...props} />;
    }
  };

  return detectTypeAvatar();
};

export default Avatar;
