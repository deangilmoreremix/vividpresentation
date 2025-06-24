// Design tokens extracted from Figma
export const designTokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#3b82f6',
      600: '#2563eb',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      500: '#64748b',
      600: '#475569',
      900: '#0f172a',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      500: '#a855f7',
      600: '#9333ea',
      900: '#581c87',
    },
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Playfair Display', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
};

// Figma file configuration
export const figmaConfig = {
  // Replace with your actual Figma file ID from the URL
  // Example: if your URL is https://www.figma.com/file/ABC123/My-Design
  // then your fileId is "ABC123"
  fileId: process.env.FIGMA_FILE_ID || 'YOUR_FIGMA_FILE_ID',
  accessToken: process.env.FIGMA_ACCESS_TOKEN,
  apiUrl: 'https://api.figma.com/v1',
};

// Helper function to fetch Figma file data
export async function fetchFigmaFile(fileId: string) {
  if (!figmaConfig.accessToken) {
    throw new Error('Figma access token not configured');
  }

  const response = await fetch(`${figmaConfig.apiUrl}/files/${fileId}`, {
    headers: {
      'X-Figma-Token': figmaConfig.accessToken,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Figma file: ${response.statusText}`);
  }

  return response.json();
}

// Helper function to extract components from Figma
export async function fetchFigmaComponents(fileId: string) {
  if (!figmaConfig.accessToken) {
    throw new Error('Figma access token not configured');
  }

  const response = await fetch(`${figmaConfig.apiUrl}/files/${fileId}/components`, {
    headers: {
      'X-Figma-Token': figmaConfig.accessToken,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Figma components: ${response.statusText}`);
  }

  return response.json();
}