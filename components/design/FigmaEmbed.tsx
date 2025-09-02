import React, { useState, useEffect } from 'react';
import { generateFigmaEmbedUrl, fetchFigmaFile, extractFigmaPages } from '@/lib/figma-utils';
import { AlertCircle, ExternalLink, ChevronDown, Loader2, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FigmaEmbedProps {
  fileId: string;
  nodeId?: string;
  title?: string;
  className?: string;
}

export const FigmaEmbed: React.FC<FigmaEmbedProps> = ({
  fileId,
  nodeId,
  title = "Figma Design",
  className = ""
}) => {
  const [hasError, setHasError] = useState(false);

  if (!fileId) {
    return (
      <div className={`flex items-center justify-center border-2 border-dashed rounded-lg ${className}`}>
        <p className="text-muted-foreground">No Figma file ID provided</p>
      </div>
    );
  }

  const embedUrl = generateFigmaEmbedUrl(fileId, nodeId, title);
  const fileUrl = `https://www.figma.com/design/${fileId}${nodeId ? `?node-id=${encodeURIComponent(nodeId)}` : ''}`;

  const handleIframeError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg ${className} space-y-4`}>
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <div className="text-center space-y-2">
          <p className="text-muted-foreground font-medium">Unable to load Figma file</p>
          <p className="text-sm text-muted-foreground">
            Make sure your Figma file is set to "Anyone with the link can view" in sharing settings.
          </p>
          <Button
            variant="outline"
            onClick={() => window.open(fileUrl, '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Open in Figma
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full rounded-lg border"
        allowFullScreen
        onError={handleIframeError}
        onLoad={() => setHasError(false)}
      />
    </div>
  );
};

// New component to display all Figma pages
interface FigmaPagesViewerProps {
  fileId: string;
  className?: string;
}

export const FigmaPagesViewer: React.FC<FigmaPagesViewerProps> = ({
  fileId,
  className = ""
}) => {
  const [pages, setPages] = useState<Array<{ id: string; name: string; type: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPageId, setSelectedPageId] = useState<string>("");
  const [viewMode, setViewMode] = useState<"embed" | "list">("embed");

  useEffect(() => {
    const loadFigmaPages = async () => {
      try {
        setLoading(true);
        const accessToken = process.env.FIGMA_ACCESS_TOKEN;
        if (!accessToken) {
          throw new Error("Figma access token not found");
        }

        const figmaData = await fetchFigmaFile(fileId, accessToken);
        const extractedPages = extractFigmaPages(figmaData);
        setPages(extractedPages);

        // Set first page as default
        if (extractedPages.length > 0) {
          setSelectedPageId(extractedPages[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load Figma pages");
      } finally {
        setLoading(false);
      }
    };

    if (fileId) {
      loadFigmaPages();
    }
  }, [fileId]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center ${className} min-h-[400px]`}>
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading Figma pages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center ${className} min-h-[400px] space-y-4`}>
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <div className="text-center space-y-2">
          <p className="text-muted-foreground font-medium">Failed to load Figma pages</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  const selectedPage = pages.find(page => page.id === selectedPageId);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header with controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Grid className="h-5 w-5" />
              Figma Pages Viewer
              <Badge variant="secondary">{pages.length} pages</Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "embed" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("embed")}
              >
                Embed View
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                List View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Select value={selectedPageId} onValueChange={setSelectedPageId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a page" />
                </SelectTrigger>
                <SelectContent>
                  {pages.map((page) => (
                    <SelectItem key={page.id} value={page.id}>
                      {page.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedPage && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`https://www.figma.com/design/${fileId}?node-id=${selectedPage.id}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in Figma
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Content area */}
      {viewMode === "embed" && selectedPage ? (
        <FigmaEmbed
          fileId={fileId}
          nodeId={selectedPage.id}
          title={selectedPage.name}
          className="min-h-[600px]"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pages.map((page, index) => (
                <Card
                  key={page.id}
                  className={`cursor-pointer transition-colors hover:bg-accent ${
                    selectedPageId === page.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedPageId(page.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{page.name}</p>
                        <p className="text-sm text-muted-foreground">Page {index + 1}</p>
                      </div>
                      <Badge variant="outline">{page.type}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};