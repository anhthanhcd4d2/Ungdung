import { Image, Pressable, Text, View } from "react-native";
import React, {useRef, useState} from 'react';

interface contenBnt {
  name?: string;
  style?: object;
  styleName?: object;
  onPress: (callback: any) => void;
  image?: any;
  styleImage?: object;
}

function RenderBnt({
  onPress,
  name,
  style,
  styleName,
  image,
  styleImage,
}: contenBnt) {
  const [newStyle, setNewStyle] = useState(style);
  return (
    <Pressable
      onPressIn={() => {
        setNewStyle({
          ...style,
          opacity: 0.5,
        });
      }}
      style={newStyle}
      onPressOut={e => {
        setNewStyle({
          ...style,
          opacity: 1,
        });
        onPress(e);
      }}>
      {name &&
        <Text style={styleName}>{name}</Text> ||
        <Image source={image} style={styleName}/>
      }
    </Pressable>
  );
}

export default RenderBnt;
