import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { DesignSystemForm } from "./design-system-builder/form"

export function DesignSystem() {
  return (
    <div className="grid min-h-screen w-full grid-cols-[1fr_2fr]">
      <div className="border-r bg-gray-100/40 p-6 dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Customize</h2>
            <p className="text-gray-500 dark:text-gray-400">Adjust the settings to preview your changes.</p>
          </div>
          <div className="flex-1 space-y-6 overflow-auto">
            <DesignSystemForm />
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
              <div className="grid gap-6">
                <Card
                  className="shadow-[px px px px ]"
                  style={{
                    borderRadius: "px",
                    margin: "px",
                    padding: "px",
                  }}
                >
                  <CardHeader>
                    <CardTitle
                      className="text-[${$('font-size')}px] font-[${$(
                        'font-weight'
                      )}] leading-[${$('line-height')}] tracking-[${$(
                        'letter-spacing'
                      )}em]"
                      style={{
                        color: "",
                      }}
                    >
                      Card Title
                    </CardTitle>
                  </CardHeader>
                  <CardContent
                    className="text-[${$('font-size')}px] font-[${$(
                      'font-weight'
                    )}] leading-[${$('line-height')}] tracking-[${$(
                      'letter-spacing'
                    )}em]"
                    style={{
                      color: "",
                    }}
                  >
                    This is a card with customizable styles.
                  </CardContent>
                </Card>
                <Button
                  className="shadow-[px px px px ]"
                  style={{
                    backgroundColor: "",
                    borderRadius: "px",
                    color: "",
                    fontSize: "px",
                    fontWeight: "",
                    letterSpacing: "em",
                    lineHeight: "",
                    margin: "px",
                    padding: "px px",
                  }}
                >
                  Customizable Button
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="design-system">
              <pre className="bg-gray-100 p-4 rounded-lg">
                {JSON.stringify({}, null, 2)}
              </pre>
            </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
