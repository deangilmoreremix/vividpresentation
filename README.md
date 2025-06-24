# Vivid - AI PPT Generator

A powerful AI-powered presentation generator built with Next.js, featuring design system integration with Figma.

## 🚀 Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo>
   cd vivid
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   - Database URL
   - OpenAI API Key
   - Figma Access Token (optional)
   - Figma File ID (optional)

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## 🎨 Figma Integration

### Setup Figma Connection

1. **Get your Figma Access Token:**
   - Go to [Figma Account Settings](https://www.figma.com/settings)
   - Navigate to "Personal Access Tokens"
   - Generate a new token
   - Add it to your `.env` file as `FIGMA_ACCESS_TOKEN`

2. **Get your Figma File ID:**
   - Open your Figma file
   - Copy the file ID from the URL: `https://www.figma.com/file/{FILE_ID}/...`
   - Add it to your `.env` file as `FIGMA_FILE_ID`

3. **Access the Design System:**
   - Navigate to `/design` in your app
   - Use the Figma Sync component to connect your file
   - View your Figma file directly in the app

### Environment Variables for Figma

```env
# Figma Integration
FIGMA_ACCESS_TOKEN="your_figma_access_token_here"
FIGMA_FILE_ID="your_figma_file_id_here"
```

### Features

- **Live Figma Embedding**: View your Figma designs directly in the app
- **Design Token Sync**: Automatically sync colors, typography, and spacing from Figma
- **Component Library**: Extract and implement Figma components in React
- **Design System Documentation**: Maintain design consistency across your project

## 📁 Project Structure

```
├── app/
│   ├── (protected)/
│   │   ├── (pages)/
│   │   │   ├── (dashboardPages)/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── create-page/
│   │   │   │   ├── design/          # Figma integration page
│   │   │   │   ├── templates/
│   │   │   │   └── settings/
├── components/
│   ├── design/                      # Figma-related components
│   │   ├── FigmaEmbed.tsx
│   │   ├── FigmaSync.tsx
│   │   └── FigmaPrototype.tsx
│   ├── global/
│   └── ui/
├── lib/
│   ├── design-tokens.ts             # Figma design tokens
│   ├── figma-integration.ts         # Figma API integration
│   └── figma-utils.ts              # Figma utility functions
└── docs/
    └── design-system.md             # Design system documentation
```

## 🛠 Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Database**: PostgreSQL + Prisma
- **AI**: OpenAI API
- **Design**: Figma API Integration
- **State Management**: Zustand
- **Authentication**: Clerk (configurable)

## 📚 Documentation

- [Design System Integration](./docs/design-system.md)
- [Figma API Documentation](https://www.figma.com/developers/api)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.