# 👨‍🍳 Aipron

**Your AI-powered cooking assistant** — get personalized recipes, step-by-step guidance, and smart kitchen help, all in one place.

![AIpron Banner](https://img.shields.io/badge/AI-Powered-orange?style=for-the-badge&logo=openai)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-green?style=for-the-badge)

---

## 🍽️ What is AIpron?

AIpron is an intelligent cooking assistant that helps home cooks and culinary enthusiasts:

- Generate personalized recipes based on ingredients you already have
- Follow step-by-step cooking guidance with real-time tips
- Substitute ingredients on the fly
- Scale recipes up or down automatically
- Discover meals based on dietary preferences, allergies, or cuisine style

Whether you're a beginner fumbling through your first stir-fry or a seasoned cook looking for inspiration, AIpron has you covered.

---

## ✨ Features

- **🧠 AI Recipe Generation** — Describe what you're craving or what's in your fridge and get a tailored recipe instantly
- **🔄 Ingredient Substitution** — Out of an ingredient? AIpron suggests smart swaps that won't ruin the dish
- **📏 Serving Scaler** — Automatically adjusts ingredient quantities for any number of servings
- **⏱️ Cooking Timers** — Built-in step timers to keep you on track
- **🥗 Dietary Filters** — Supports vegan, vegetarian, gluten-free, keto, halal, and more
- **🌍 Cuisine Explorer** — Browse recipes by cuisine — Italian, Thai, Mexican, Japanese, and beyond
- **📖 Pantry Mode** — Input what you have at home and get recipe suggestions with zero waste
- **💬 Conversational Interface** — Ask follow-up questions mid-recipe, just like talking to a real chef

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ (or Python 3.10+ if using the Python version)
- An API key from [Anthropic](https://www.anthropic.com) or [OpenAI](https://platform.openai.com)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/aipron.git
cd aipron

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Configuration

Open `.env` and add your credentials:

```env
ANTHROPIC_API_KEY=your_api_key_here
# or
OPENAI_API_KEY=your_api_key_here

APP_PORT=3000
```

### Run the App

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Visit `http://localhost:3000` to start cooking! 🍳

---

## 🗂️ Project Structure

```
aipron/
├── src/
│   ├── components/        # UI components
│   ├── pages/             # App pages/routes
│   ├── services/          # AI service integrations
│   ├── utils/             # Helper functions (scaling, parsing, etc.)
│   └── prompts/           # AI prompt templates
├── public/                # Static assets
├── tests/                 # Unit and integration tests
├── .env.example           # Environment variable template
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

| Layer       | Technology              |
|-------------|------------------------|
| Frontend    | React / Next.js         |
| Backend     | Node.js / Express       |
| AI Engine   | Claude (Anthropic) API  |
| Database    | PostgreSQL / Supabase   |
| Styling     | Tailwind CSS            |
| Deployment  | Vercel / Railway        |

---

## 📸 Screenshots

> _Add your screenshots here once the UI is ready!_

```
[App Screenshot Placeholder]
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get involved:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please check the [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📋 Roadmap

- [ ] Voice-guided cooking mode
- [ ] Meal planning & grocery list generation
- [ ] Community recipe sharing
- [ ] Nutrition tracking and macros
- [ ] Integration with smart appliances (Instant Pot, Thermomix)
- [ ] Mobile app (iOS & Android)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Anthropic](https://www.anthropic.com) for Claude AI
- The open-source cooking and recipe communities
- Everyone who loves food and thinks AI can make the kitchen more fun

---

<p align="center">Made with ❤️ and a dash of 🌶️ by the AIpron team</p>
