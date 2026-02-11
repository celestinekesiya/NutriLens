# Food & Medical Nutrition Extractor 🍎🔬

A powerful AI-powered web application that analyzes food images to extract detailed nutritional information using Google's Gemini AI. Perfect for health enthusiasts, nutritionists, and anyone wanting to track their nutrition intake accurately.

## ✨ Features

### 🖼️ **Image Analysis**
- Upload food images in various formats (JPG, PNG, WebP)
- AI-powered food recognition and portion estimation
- Detailed nutritional breakdown for each identified food item

### 📊 **Comprehensive Nutrition Data**
- **Macronutrients**: Calories, Protein, Carbohydrates, Fat, Fiber
- **Visual Charts**: Interactive macro distribution pie charts
- **Portion Estimation**: AI estimates serving sizes automatically
- **Confidence Scoring**: AI confidence levels for analysis accuracy

### 📈 **Data Visualization**
- Interactive charts powered by Recharts
- Macro distribution visualization
- Nutrition summary cards with animated counters
- Clean, modern UI with Tailwind CSS

### 📱 **User Experience**
- **History Tracking**: Save and revisit past analyses
- **PDF Export**: Export nutrition reports as PDF documents
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Analysis**: Fast processing with loading indicators

### 🔧 **Advanced Features**
- **API Key Management**: Secure local storage of Gemini API keys
- **Error Handling**: Comprehensive error handling with user feedback
- **Retry Functionality**: Easy retry for failed analyses
- **Toast Notifications**: Real-time feedback for user actions

## 🛠️ Technologies Used

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.x
- **Charts**: Recharts
- **Icons**: Lucide React
- **PDF Generation**: jsPDF + jsPDF AutoTable
- **AI Service**: Google Gemini API
- **State Management**: React Hooks

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food-medicals-extractor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   > **Note**: You can also provide the API key directly in the app interface if you prefer not to use environment variables.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔑 API Key Setup

### Option 1: Environment Variable
Add your Gemini API key to the `.env` file as shown above.

### Option 2: In-App Configuration
1. Open the application
2. Click on the "API Key" button in the navigation
3. Enter your Gemini API key
4. The key will be securely stored in your browser's local storage

### Getting a Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Navigate to API keys section
4. Create a new API key
5. Copy and use the key in this application

## 💡 Usage

1. **Upload Image**: Click the upload area and select a food image
2. **Wait for Analysis**: The AI will analyze your image (usually takes 3-5 seconds)
3. **View Results**: See detailed nutritional breakdown and charts
4. **Export**: Save results as PDF or view in history
5. **Analyze More**: Upload another image or view past analyses

## 📁 Project Structure

```
src/
├── components/
│   ├── history/          # History tracking components
│   ├── layout/           # Navigation and footer
│   ├── results/          # Results display components
│   ├── sections/         # Landing page sections
│   ├── ui/               # Reusable UI components
│   └── upload/           # Image upload components
├── hooks/                # Custom React hooks
├── services/             # API and utility services
├── types/                # TypeScript type definitions
├── assets/               # Static assets
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## 🏗️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. **Components**: Add new components in the appropriate `components/` subdirectory
2. **Services**: Add new services in `src/services/`
3. **Types**: Update TypeScript types in `src/types/index.ts`
4. **Styling**: Use Tailwind CSS classes for consistent styling

### Code Quality

The project uses:
- **ESLint**: For code linting
- **TypeScript**: For type safety
- **Prettier**: For code formatting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔒 Privacy & Security

- API keys are stored locally in your browser
- No personal data is sent to external servers besides Google Gemini API
- Images are processed client-side before being sent for analysis
- All data remains in your browser's local storage

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the console for error messages
2. Ensure your Gemini API key is valid
3. Verify your internet connection
4. Try refreshing the page

## 🔮 Future Enhancements

- [ ] Support for meal planning
- [ ] Database integration for nutrition tracking
- [ ] Multiple language support
- [ ] Barcode scanning for packaged foods
- [ ] Recipe suggestions based on analyzed foods
- [ ] Integration with fitness trackers

---

Built with ❤️ by EagleSquads Team
