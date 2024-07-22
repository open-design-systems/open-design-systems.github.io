import { useWatch } from "react-hook-form";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColorRefSchema } from "@opends/schema/src/schemas/ref";
import {
  Meta,
  Primitives,
  Colors,
  Surfaces,
  Spacings,
  Typographies,
} from "@opends/schema";

function findInArray<RefObject extends { meta: Meta.MetaSchema }>(
  arr: Array<RefObject>,
  value: string,
): RefObject | undefined {
  return arr.find(({ meta }) => meta.id === value);
}

function resolveColors(
  colors: Array<Colors.ColorTypeObjectSchema>,
  theme: "light" | "dark",
  value: ColorRefSchema | undefined,
) {
  if (value === undefined) {
    return undefined;
  }
  const color = findInArray(colors, value.$ref);

  return color?.[theme]?.hex;
}
function PrimitiveButton({
  primitive,
}: {
  primitive: Primitives.ButtonTypeSchema;
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
  const surface = findInArray<Surfaces.SurfaceTypeObjectSchema>(
    surfaces,
    primitive.surfaceId.$ref,
  );
  const typography = findInArray<Typographies.TypographyTypeObjectSchema>(
    typographies,
    primitive.typographyId.$ref,
  );
  const spacing = findInArray<Spacings.SpacingTypeObjectSchema>(
    spacings,
    primitive.spacingId.$ref,
  );

  return (
    <Button
      style={{
        padding: spacing?.value,
        fontSize: typography?.fontSize,
        borderColor: resolveColors(
          colors,
          getThemeScheme(theme),
          surface?.borderColor,
        ),
        backgroundColor: resolveColors(
          colors,
          getThemeScheme(theme),
          surface?.backgroundColor,
        ),
        color: resolveColors(
          colors,
          getThemeScheme(theme) === "light" ? "dark" : "light",
          surface?.backgroundColor,
        ),
      }}
    >
      Button Example
    </Button>
  );
}

type PrimitiveTextProps = {
  primitive: Primitives.TextTypeSchema;
};
function PrimitiveText({ primitive }: PrimitiveTextProps) {
  const typographies = useWatch({
    name: "typography",
  });
  const typography = findInArray<Typographies.TypographyTypeObjectSchema>(
    typographies,
    primitive.typographyId.$ref,
  );

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
      {designSystem.primitives?.map(
        (primitive: Primitives.PrimitivesTypeObjectSchema) => {
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
        },
      )}
    </div>
  );
}
