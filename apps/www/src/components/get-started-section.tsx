import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const GetStartedSection = () => {
  return (
    <section className="p-2">
      <h2 className="text-center text-2xl font-semibold text-foreground">
        Get Started right now
      </h2>
      <div className="mt-4">
        <div className="text-center">
          <Button asChild size="lg" className="mr-4">
            <a href="#editor">Go to Editor</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/open-design-systems/open-design-systems.github.io/tree/main/packages/schema">
              Checkout the schema
            </a>
          </Button>
          <h3 className="text-xl m-4">
            Or install the Open Design System to your project
          </h3>
        </div>
        <Tabs defaultValue="npm" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="npm">Install Web</TabsTrigger>
            <TabsTrigger value="maven">Install Android</TabsTrigger>
            <TabsTrigger disabled value="ios">
              Install iOS 🔜
            </TabsTrigger>
          </TabsList>
          <TabsContent value="npm">
            <div className="rounded-lg border p-6 space-y-4">
              <p className="text-lg">Install the Tailwind Plugin</p>
              <pre className="bg-muted rounded-md p-4 text-sm">
                <code className="language-bash">
                  npm install -D @opends/tailwind
                </code>
              </pre>
              <p className="text-lg">
                Then add the plugin to your{" "}
                <span className="bg-secondary font-bold p-1 md">
                  tailwind.config.js
                </span>{" "}
                file:
              </p>
              <pre className="bg-muted rounded-md p-4 text-sm">
                <code className="language-json">
                  {`
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    theme: {
      // ...
    },
    plugins: [
      require('@opends/tailwind'),
      // ...
    ],
  }
                    `}
                </code>
              </pre>

              <p className="text-xl font-bold">
                For more details please visit the{" "}
                <span className="bg-secondary font-bold p-1 md">
                  @opends/tailwind
                </span>{" "}
                <a
                  href="https://www.npmjs.com/package/@opends/tailwind"
                  className="underline hover:font-semibold hover:text-primary-foreground hover:bg-primary hover:md hover:p-1"
                >
                  documentation
                </a>
                .
              </p>
            </div>
          </TabsContent>
          <TabsContent value="maven">
            <div className="rounded-lg border p-6 space-y-4">
              <p className="text-lg">Install</p>
              <p>
                <span className="bg-secondary font-bold p-1 md">
                  OpenDSAndroid
                </span>{" "}
                is available trough jitpack, so we need to add it to the
                project:
              </p>
              <p>
                1. Open you{" "}
                <span className="bg-secondary font-bold p-1 md">
                  settings.gradle
                </span>{" "}
                or{" "}
                <span className="bg-secondary font-bold p-1 md">
                  settings.gradle.kts
                </span>{" "}
                and make sure that the repositories section contains jitpack
              </p>
              <pre className="bg-muted rounded-md py-1 px-4 text-sm">
                <code className="language-kotlin">
                  {`
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        mavenCentral()
        maven { url "https://www.jitpack.io" }
    }
}
    `}
                </code>
              </pre>
              <p>
                2. Go to your desired module{" "}
                <span className="bg-secondary font-bold p-1 md">
                  build.gradle
                </span>{" "}
                and import{" "}
                <span className="bg-secondary font-bold p-1 md">
                  OpenDSAndroid
                </span>
              </p>
              <pre className="bg-muted rounded-md py-1 px-4 text-sm">
                <code className="language-kotlin">
                  {`
dependencies {
    implementation("open-design-systems:OpenDSAndroid:<VERSION>")
}
    `}
                </code>
              </pre>

              <p className="text-xl font-bold">
                For more details please visit the{" "}
                <span className="bg-secondary font-bold p-1 md">
                  OpenDSAndroid
                </span>{" "}
                <a
                  href="https://github.com/open-design-systems/OpenDSAndroid"
                  className="underline hover:font-semibold hover:text-primary-foreground hover:bg-primary hover:md hover:p-1"
                >
                  documentation
                </a>
                .
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
