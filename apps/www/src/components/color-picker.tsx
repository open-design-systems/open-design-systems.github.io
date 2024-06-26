import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import React, { useEffect, useMemo, useRef } from "react";
import { HexAlphaColorPicker } from "react-colorful";

extend([namesPlugin]);

type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
};

const CustomPicker = ({ color, ...rest }: ColorPickerProps) => {
  const rgbaString = useMemo(() => {
    return color?.startsWith("#") ? color : colord(color).toHex();
  }, [color]);

  return <HexAlphaColorPicker color={rgbaString} {...rest} />;
};

export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [color, setColor] = React.useState(props.color);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setColor(props.color);
  }, [props.color]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-8 h-8 rounded-sm cursor-pointer border"
      style={{ backgroundColor: color }}
      onClick={() => {
        setVisible(true);
      }}
    >
      {visible && (
        <div className="absolute top-0 right-[-210px] z-10">
          <CustomPicker
            color={props.color}
            onChange={(color) => {
              setColor(color);
              props.onChange && props.onChange(color);
            }}
          />
        </div>
      )}
    </div>
  );
};
