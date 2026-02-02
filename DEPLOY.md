# Blog Demo Deployment

## Deploy to Vercel

### Option 1: Vercel CLI (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Option 2: GitHub + Vercel Dashboard
1. Push this code to GitHub:
```bash
git remote add origin https://github.com/taiyanliu9999/aws.git
git push -u origin main
# Enter your GitHub credentials when prompted
```

2. Go to https://vercel.com
3. Click "Add New Project"
4. Import your GitHub repository
5. Deploy!

### Option 3: Vercel for GitHub
1. Install Vercel GitHub App: https://github.com/apps/vercel
2. Select this repository
3. Automatic deploy on push!

## Project Structure
```
aws/
├── index.html          # Homepage
├── admin.html          # Admin page
├── css/
│   └── style.css       # Retro-futuristic design
├── js/
│   └── app.js          # Frontend logic
├── data/
│   └── posts.json      # Content storage
└── README.md           # This file
```

## Notes
- This is a static site (HTML/CSS/JS)
- No server-side code needed
- Content is stored in JSON file
- For production, consider using a real backend/API
