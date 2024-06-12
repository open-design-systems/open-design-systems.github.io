export interface Meta {
    name: string;
    description: string;
  }
  
  interface WithMeta {
    meta: Meta;
  }
  
  export interface DetailedColor {
    hex: string;
    rgba: {
      red: string;
      green: string;
      blue: string;
      alpha: string;
    };
  }
  
  export interface Color extends WithMeta {
    light: DetailedColor;
    dark: DetailedColor;
  }
  // TODO: Move to Number?
  export interface Typography extends WithMeta {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing: string;
  }
  
  export interface Spacing extends WithMeta {
    value: number;
  }
  
  export interface Surface extends WithMeta {
    borderColor: string;
    borderRadius: number;
    borderWidth: number;
    boxShadow: string;
    backgroundColor: string;
  }
  
  export interface Shadow extends WithMeta {
    elevation: string;
    shadowColor: string;
    shadowOpacity: number;
    shadowOffset: {
      width: number;
      height: number;
    };
    shadowRadius: number;
  }
  
  export interface PrimitiveBase extends WithMeta {
    type: "button" | "text";
  }
  
  export interface ButtonPrimitive extends PrimitiveBase {
    type: "button";
    surfaceId: string;
    typographyId: string;
    spacingId: string;
  }
  
  export interface TextPrimitive extends PrimitiveBase {
    type: "text";
    typographyId: string;
  }
  
  type Primitive = ButtonPrimitive | TextPrimitive;
  
  export interface DesignSystem {
    /**
     * Automatically generated unique identifier for each item.
     */
    id: string;
    meta: Meta;
    colors: {
      [colorName: string]: Color;
    };
    typography: {
      [typographyName: string]: Typography;
    };
    spacing: {
      [spacingName: string]: Spacing;
    };
    surface: {
      [surfaceName: string]: Surface;
    };
    shadows: {
      [shadowName: string]: Shadow;
    };
    primitives: {
      [primitiveName: string]: Primitive;
    };
  }
  