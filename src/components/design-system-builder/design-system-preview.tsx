import { useWatch } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import z from "zod";
import {
  primitiveButtonSchema,
  primitiveTextSchema,
  primitivesSchema,
} from "./form-schema";
import { useTheme } from "../theme-provider";
import { Color, Meta } from "open-design-system.schema";

function findInArray(arr: Array<{ meta: Meta }>, value: string): any | undefined {
  return arr.find(({ meta }) => meta.id === value);
}

function resolveColors(colors: Array<Color>, theme: 'light' | 'dark', value: string) {
  const color = findInArray(colors, value);

  return color?.[theme]?.hex;
}
function PrimitiveButton({
  primitive,
}: {
  primitive: z.infer<typeof primitiveButtonSchema>;
}) {
  const surfaces = useWatch({
    name: "surface",
  });
  const typographies = useWatch({
    name: "typography",
  });
  const spacings = useWatch({
    name: "spacing",
  });
  const colors = useWatch({
    name: "colors",
  });

  const { theme, getThemeScheme } = useTheme();
  const surface = findInArray(surfaces, primitive.surfaceId);
  const typography = findInArray(typographies, primitive.typographyId);
  const spacing = findInArray(spacings, primitive.spacingId);

  return (
    <Button
      style={{
        padding: spacing?.value,
        fontSize: typography?.fontSize,
        borderColor: resolveColors(colors, getThemeScheme(theme), surface?.borderColor),
        backgroundColor: resolveColors(colors, getThemeScheme(theme), surface?.backgroundColor),
      }}
    >
      Button Example
    </Button>
  );
}

type PrimitiveTextProps = {
  primitive: z.infer<typeof primitiveTextSchema>;
};
function PrimitiveText({ primitive }: PrimitiveTextProps) {
  const typographies = useWatch({
    name: "typography",
  });
  const typography = findInArray(typographies, primitive.typographyId);

  return (
    <div
      style={{
        fontSize: typography?.fontSize,
        fontWeight: typography?.fontWeight,
        lineHeight: typography?.lineHeight,
      }}
    >
      Text Example
    </div>
  );
}

export function DesignSystemPreview() {
  const designSystem = useWatch();
  return (
    <div className="grid gap-6 grid-cols-4 p-4 justify-center">
      {designSystem.primitives?.map((primitive: z.infer<typeof primitivesSchema>) => {
        return (
          <div className="flex" key={primitive.meta?.id}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>{primitive.meta?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{primitive.meta?.description}</p>
                {primitive.type === "button" && (
                  <PrimitiveButton primitive={primitive} />
                )}
                {primitive.type === "text" && (
                  <PrimitiveText primitive={primitive} />
                )}
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
