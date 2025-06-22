# Interactive Portfolio Website

A modern, animated portfolio website built with Next.js, designed for GitHub Pages hosting.

## Features

- 🎨 **Animated UI** - Smooth animations using Framer Motion
- 🤖 **Automated Messaging** - Interactive chat system with tailored messages for different audiences
- 📱 **Responsive Design** - Works perfectly on all devices
- 🚀 **GitHub Integration** - Automatically fetches and displays your repositories
- 🎯 **Audience Targeting** - Different message flows for employers, investors, and developers
- ⚡ **Static Export** - Optimized for GitHub Pages hosting

## Setup Instructions

1. **Clone and Install**
   \`\`\`bash
   git clone <your-repo-url>
   cd portfolio-website
   npm install
   \`\`\`

2. **Customize Your Information**
   - Replace `yourusername` in the GitHub API URL with your actual username
   - Update personal information in the hero section
   - Add your profile image to the public folder
   - Customize the automated messages in `messageFlows`

3. **Configure for GitHub Pages**
   - Update `basePath` and `assetPrefix` in `next.config.mjs` with your repository name
   - The format should be `/your-repo-name`

4. **Build and Deploy**
   \`\`\`bash
   npm run build
   \`\`\`

5. **GitHub Pages Setup**
   - Push your code to GitHub
   - Go to repository Settings > Pages
   - Set source to "Deploy from a branch"
   - Select "gh-pages" branch and "/ (root)" folder
   - Your site will be available at `https://yourusername.github.io/your-repo-name`

## Customization

### Automated Messages
Edit the `messageFlows` object to customize messages for different audiences:
- `employer`: Messages for potential employers
- `investor`: Messages for investors
- `general`: Messages for fellow developers

### Styling
The website uses Tailwind CSS with a dark theme. You can customize:
- Colors in the gradient backgrounds
- Animation timings in Framer Motion components
- Card layouts and spacing

### GitHub Integration
The site automatically fetches your repositories. You can:
- Adjust the number of repos shown by changing `per_page` parameter
- Filter repositories by adding query parameters to the API URL
- Customize the fallback demo data

## Technologies Used

- **Next.js 14** - React framework with static export
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **GitHub API** - Repository data fetching

## Performance

- Static site generation for fast loading
- Optimized images and assets
- Minimal JavaScript bundle
- Progressive enhancement for animations
