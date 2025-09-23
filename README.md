# SM Supports Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, and TailwindCSS. This project replicates the look and feel of huly.io while showcasing SM Supports' services and projects.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, TailwindCSS, Framer Motion
- **Responsive Design**: Mobile-first approach with perfect responsiveness
- **Performance Optimized**: Fast loading times and smooth animations
- **SEO Ready**: Built-in SEO optimization and meta tags
- **Accessibility**: WCAG 2.1 AA compliant
- **Dark Mode Support**: Automatic dark mode detection
- **Component Library**: Reusable UI components with consistent design

## 📋 Sections

- **Hero**: Eye-catching introduction with clear CTAs
- **Services**: Comprehensive service offerings with detailed descriptions
- **Work Together**: Collaboration process and communication approach
- **Code & Delivery**: Development workflow and quality assurance
- **Knowledge Base**: Documentation and resource showcase
- **Case Studies**: Portfolio projects with detailed case studies
- **Testimonials**: Client feedback and reviews
- **FAQ**: Common questions and answers
- **Footer**: Contact information and additional links

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Custom component library
- **Database**: Prisma + PostgreSQL (planned)
- **Authentication**: NextAuth.js (planned)
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sm-supports-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components (Header, Footer)
│   └── sections/         # Page sections
├── lib/                  # Utility functions
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🎨 Design System

The project uses a comprehensive design system with:

- **Color Tokens**: CSS variables for consistent theming
- **Typography**: Inter font family with proper scale
- **Spacing**: Consistent spacing system
- **Components**: Reusable UI components
- **Animations**: Smooth transitions and micro-interactions

## 📱 Responsive Breakpoints

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### TailwindCSS Configuration

The project includes a custom TailwindCSS configuration with:
- Custom color palette
- Typography scale
- Animation utilities
- Component variants

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📈 Performance

- Lighthouse Score: 90+
- Core Web Vitals: Good
- First Contentful Paint: < 2.5s
- Largest Contentful Paint: < 2.5s

## 🔒 Security

- HTTPS enforcement
- Content Security Policy
- XSS protection
- CSRF protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: hello@smsupports.com
- **Website**: https://smsupports.com
- **GitHub**: https://github.com/smsupports

## 🙏 Acknowledgments

- Design inspiration from huly.io
- Icons from Lucide React
- Fonts from Google Fonts
- Community contributors and feedback

---

Built with ❤️ by SM Supports
