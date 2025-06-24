"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FigmaSyncProps {
  fileId?: string;
  onSync?: (tokens: any) => void;
}

export function FigmaSync({ fileId, onSync }: FigmaSyncProps) {
  const [figmaUrl, setFigmaUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const extractFileIdFromUrl = (url: string): string | null => {
    const match = url.match(/figma\.com\/file\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  const handleSync = async () => {
    setIsLoading(true);
    setSyncStatus('idle');

    try {
      const extractedFileId = figmaUrl ? extractFileIdFromUrl(figmaUrl) : fileId;
      
      if (!extractedFileId) {
        throw new Error('Invalid Figma URL or File ID');
      }

      // Simulate API call to sync design tokens
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock design tokens response
      const mockTokens = {
        colors: {
          primary: '#3b82f6',
          secondary: '#64748b',
          accent: '#a855f7',
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
          fontSize: {
            sm: '14px',
            base: '16px',
            lg: '18px',
          },
        },
        spacing: {
          sm: '8px',
          md: '16px',
          lg: '24px',
        },
      };

      setSyncStatus('success');
      onSync?.(mockTokens);
      
      toast({
        title: "Design tokens synced!",
        description: "Your Figma design tokens have been successfully imported.",
      });

    } catch (error) {
      setSyncStatus('error');
      toast({
        title: "Sync failed",
        description: "Failed to sync design tokens from Figma. Please check your file URL and access token.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = () => {
    switch (syncStatus) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = () => {
    switch (syncStatus) {
      case 'success':
        return <Badge variant="default" className="bg-green-500">Synced</Badge>;
      case 'error':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Not Synced</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Figma Integration
          {getStatusBadge()}
        </CardTitle>
        <CardDescription>
          Sync design tokens from your Figma file to maintain design consistency
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="figma-url">Figma File URL</Label>
          <Input
            id="figma-url"
            placeholder="https://www.figma.com/file/your-file-id/..."
            value={figmaUrl}
            onChange={(e) => setFigmaUrl(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Paste your Figma file URL to extract design tokens
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            onClick={handleSync}
            disabled={isLoading || (!figmaUrl && !fileId)}
            className="flex items-center gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {getStatusIcon()}
            Sync Design Tokens
          </Button>

          {figmaUrl && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => window.open(figmaUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>

        {syncStatus !== 'idle' && (
          <div className="p-4 rounded border bg-muted/50">
            <p className="text-sm">
              {syncStatus === 'success' 
                ? 'Design tokens have been successfully synced and applied to your Tailwind configuration.'
                : 'Failed to sync design tokens. Please check your Figma file URL and ensure you have the correct access permissions.'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}