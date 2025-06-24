import React from 'react';
import { FigmaEmbed } from '@/components/design/FigmaEmbed';
import { FigmaSync } from '@/components/design/FigmaSync';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Upload, FileText } from 'lucide-react';

const DesignSystemPage = () => {
  // Get Figma file ID from environment or use placeholder
  const figmaFileId = process.env.FIGMA_FILE_ID;
  const hasConfiguredFigma = figmaFileId && figmaFileId !== 'YOUR_FIGMA_FILE_ID';

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Design System</h1>
        <p className="text-muted-foreground">
          Connect your Figma design file to maintain design consistency and sync design tokens.
        </p>
      </div>

      {/* Figma Setup Instructions */}
      {!hasConfiguredFigma && (
        <Card className="border-dashed border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Connect Your Figma File
            </CardTitle>
            <CardDescription>
              Follow these steps to connect your Figma design file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Get your Figma Access Token</h4>
                  <p className="text-sm text-muted-foreground">
                    Go to Figma → Account Settings → Personal Access Tokens and create a new token
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Get your Figma File ID</h4>
                  <p className="text-sm text-muted-foreground">
                    Copy the file ID from your Figma URL: figma.com/file/<strong>[FILE_ID]</strong>/...
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Update Environment Variables</h4>
                  <p className="text-sm text-muted-foreground">
                    Add FIGMA_ACCESS_TOKEN and FIGMA_FILE_ID to your .env file
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => window.open('https://www.figma.com/developers/api#authentication', '_blank')}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Figma API Docs
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('https://www.figma.com/settings', '_blank')}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Figma Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Figma Sync Component */}
      <FigmaSync 
        fileId={figmaFileId} 
        onSync={(tokens) => {
          console.log('Design tokens synced:', tokens);
        }}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Figma Design File
              {hasConfiguredFigma ? (
                <Badge variant="secondary">Connected</Badge>
              ) : (
                <Badge variant="outline">Not Connected</Badge>
              )}
            </CardTitle>
            <CardDescription>
              {hasConfiguredFigma 
                ? "Interactive view of your Figma design file"
                : "Connect your Figma file to view it here"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasConfiguredFigma ? (
              <FigmaEmbed 
                fileId={figmaFileId}
                title="Your Design System"
                className="min-h-[500px]"
              />
            ) : (
              <div className="min-h-[500px] border-2 border-dashed rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Connect your Figma file to see it here</p>
                </div>
              </div>
            )}
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