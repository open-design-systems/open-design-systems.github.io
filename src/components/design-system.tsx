import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { DesignSystemForm } from "./design-system-builder/form"
import { useState } from "react";
import type { DesignSystem } from "open-design-system.schema";

import openDesingSystem from '@/components/design-system-builder/open-design-system.json'


export function DesignSystem() {
  const [designSystem, setDesignSystem] = useState(openDesingSystem);

  const handleFormSubmit = (values) => {
    setDesignSystem(values);
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-[1fr_2fr]">
      <div className="border-r bg-gray-100/40 p-6 dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Customize</h2>
            <p className="text-gray-500 dark:text-gray-400">Adjust the settings to preview your changes.</p>
          </div>
          <div className="flex-1 space-y-6 overflow-auto">
            <DesignSystemForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
      <Tabs defaultValue="demo">
          <TabsList className="flex p-1 bg-gray-100/40 dark:bg-gray-800/40">
            <TabsTrigger value="demo">
              Demo
            </TabsTrigger>
            <TabsTrigger value="design-system">
              Open Design System
            </TabsTrigger>
          </TabsList>
            <TabsContent value="demo">
              {/*<div className="grid gap-6">
              {designSystem && designSystem.primitives && Object.keys(designSystem.primitives).map((key) => {
              const primitive = designSystem.primitives[key];
              
              // const surface = designSystem.surface?.[primitive.surfaceId];
              const typography = designSystem.typography?.[primitive.typographyId];
              const spacing = designSystem.spacing?.[primitive.spacingId];

              return (
                <Card key={key} className="shadow-lg" style={{ borderRadius: surface?.borderRadius, backgroundColor: surface?.backgroundColor }}>
                  <CardHeader>
                    <CardTitle style={{ fontSize: typography?.fontSize, fontWeight: typography?.fontWeight, lineHeight: typography?.lineHeight }}>
                      {primitive.meta.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{primitive.meta.description}</p>
                    {primitive.type === 'button' && (
                      <Button style={{ padding: spacing?.value, fontSize: typography?.fontSize }}>
                        Button Example
                      </Button>
                    )}
                    {primitive.type === 'text' && (
                      <div style={{ fontSize: typography?.fontSize, fontWeight: typography?.fontWeight, lineHeight: typography?.lineHeight }}>
                        Text Example
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>*/}
            </TabsContent>
            <TabsContent value="design-system">
              <pre className="bg-gray-100 p-4 rounded-lg">
                {JSON.stringify(designSystem, null, 2)}
              </pre>
            </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
