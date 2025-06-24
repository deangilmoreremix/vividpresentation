import React from 'react';
import { FigmaEmbed } from '@/components/design/FigmaEmbed';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DesignSystemPage = () => {
  const figmaFileId = process.env.FIGMA_FILE_ID || 'YOUR_FIGMA_FILE_ID';

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Design System</h1>
        <p className="text-muted-foreground">
          View and interact with our Figma design system directly in the app.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Figma Design File
              <Badge variant="secondary">Live</Badge>
            </CardTitle>
            <CardDescription>
              Interactive view of our complete design system from Figma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FigmaEmbed 
              fileId={figmaFileId}
              title="Vivid Design System"
              className="min-h-[500px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Design Tokens</CardTitle>
            <CardDescription>
              Synchronized design tokens from Figma applied to our Tailwind config
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Colors</h4>
              <div className="flex space-x-2">
                <div className="w-8 h-8 rounded bg-primary"></div>
                <div className="w-8 h-8 rounded bg-secondary"></div>
                <div className="w-8 h-8 rounded bg-accent"></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Typography</h4>
              <div className="space-y-1">
                <p className="text-xs">Extra Small Text</p>
                <p className="text-sm">Small Text</p>
                <p className="text-base">Base Text</p>
                <p className="text-lg">Large Text</p>
                <p className="text-xl">Extra Large Text</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Spacing</h4>
              <div className="space-y-2">
                <div className="bg-primary/20 h-2 w-4"></div>
                <div className="bg-primary/20 h-2 w-8"></div>
                <div className="bg-primary/20 h-2 w-16"></div>
                <div className="bg-primary/20 h-2 w-32"></div>
              </div>
            </div>

            <Button className="w-full" variant="outline">
              Sync Design Tokens
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Component Library</CardTitle>
          <CardDescription>
            Components extracted from Figma and implemented in React
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Buttons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Form Elements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <input 
                  type="text" 
                  placeholder="Input field"
                  className="w-full p-2 border rounded"
                />
                <select className="w-full p-2 border rounded">
                  <option>Select option</option>
                </select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-1">
                  <a href="#" className="block p-2 hover:bg-accent rounded">Home</a>
                  <a href="#" className="block p-2 hover:bg-accent rounded">Dashboard</a>
                  <a href="#" className="block p-2 hover:bg-accent rounded">Settings</a>
                </nav>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DesignSystemPage;