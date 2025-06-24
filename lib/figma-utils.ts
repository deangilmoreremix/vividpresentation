// Utility functions to help work with your Figma file

export interface FigmaConfig {
  fileId: string;
  accessToken?: string;
}

// Extract Figma file ID from various URL formats
export function extractFigmaFileId(url: string): string | null {
  const patterns = [
    /figma\.com\/file\/([a-zA-Z0-9]+)/,
    /figma\.com\/proto\/([a-zA-Z0-9]+)/,
    /figma\.com\/design\/([a-zA-Z0-9]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

// Validate Figma file URL
export function isValidFigmaUrl(url: string): boolean {
  return extractFigmaFileId(url) !== null;
}

// Generate embed URL for Figma file
export function generateFigmaEmbedUrl(fileId: string, nodeId?: string): string {
  const baseUrl = 'https://www.figma.com/embed';
  const fileUrl = `https://www.figma.com/file/${fileId}`;
  
  let embedUrl = `${baseUrl}?embed_host=share&url=${encodeURIComponent(fileUrl)}`;
  
  if (nodeId) {
    embedUrl += `&node-id=${encodeURIComponent(nodeId)}`;
  }
  
  return embedUrl;
}

// Generate Figma file URL
export function generateFigmaFileUrl(fileId: string, nodeId?: string): string {
  let url = `https://www.figma.com/file/${fileId}`;
  
  if (nodeId) {
    url += `?node-id=${encodeURIComponent(nodeId)}`;
  }
  
  return url;
}

// Extract design tokens from Figma node
export function extractColorsFromFigmaNode(node: any): Record<string, string> {
  const colors: Record<string, string> = {};
  
  if (node.fills) {
    node.fills.forEach((fill: any, index: number) => {
      if (fill.type === 'SOLID' && fill.color) {
        const { r, g, b, a = 1 } = fill.color;
        const red = Math.round(r * 255);
        const green = Math.round(g * 255);
        const blue = Math.round(b * 255);
        
        const colorName = node.name || `color-${index}`;
        colors[colorName] = a === 1 
          ? `rgb(${red}, ${green}, ${blue})`
          : `rgba(${red}, ${green}, ${blue}, ${a})`;
      }
    });
  }
  
  return colors;
}

// Helper to organize your Figma file structure
export const FigmaFileStructure = {
  // Common page names in design systems
  pages: {
    designSystem: 'Design System',
    components: 'Components',
    tokens: 'Design Tokens',
    colors: 'Colors',
    typography: 'Typography',
    spacing: 'Spacing',
  },
  
  // Common frame/component naming conventions
  frames: {
    colors: {
      primary: 'Primary Colors',
      secondary: 'Secondary Colors',
      accent: 'Accent Colors',
      neutral: 'Neutral Colors',
    },
    typography: {
      headings: 'Headings',
      body: 'Body Text',
      captions: 'Captions',
    },
    components: {
      buttons: 'Buttons',
      cards: 'Cards',
      forms: 'Form Elements',
      navigation: 'Navigation',
    },
  },
};

// Sample function to guide users on organizing their Figma file
export const FigmaOrganizationTips = {
  structure: [
    'Create a "Design System" page for all your tokens',
    'Organize colors in clear groups (Primary, Secondary, etc.)',
    'Use consistent naming conventions for components',
    'Create component variants for different states',
    'Use auto-layout for responsive components',
  ],
  
  naming: [
    'Use descriptive names: "Button/Primary/Default" instead of "Button 1"',
    'Follow a hierarchy: Component/Variant/State',
    'Keep names consistent across similar components',
    'Use clear color names: "Primary Blue" not "Blue 1"',
  ],
  
  tokens: [
    'Group related colors together',
    'Create text styles for typography',
    'Use effect styles for shadows and blurs',
    'Document spacing values in a dedicated frame',
  ],
};