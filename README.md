# 🚀 EarnLearn - Learning Earning Platform

A beautiful, modern web platform where users can **Learn**, **Earn**, and **Play**! Complete tasks, play games, refer friends, and withdraw real money.

## ✨ Features

### 1. **User Authentication**
   - Easy registration and login
   - Firebase authentication (secure)
   - One account per device

### 2. **📋 Tasks**
   - Multiple tasks with different difficulty levels
   - Earn ₹50-₹300 per task
   - Categories: Surveys, Videos, Content, Community, Education
   - Track completion progress

### 3. **💰 Wallet System**
   - View current balance
   - Request withdrawals anytime
   - Bank account or UPI transfers
   - Transaction history
   - Minimum withdrawal: ₹100

### 4. **🏆 Leaderboards**
   - **Referral Leaderboard**: Top referrers ranked
   - **Work Leaderboard**: Top earners ranked
   - Monthly rewards for top performers
   - Your personal ranking and progress

### 5. **👥 Referral Program**
   - Unique referral code per user
   - Earn ₹10 per successful referral
   - Share via WhatsApp or other platforms
   - Bonus tiers (5, 10, 20+ referrals)
   - One device per referral

### 6. **🎮 Games**
   - Number Guess
   - Memory Match
   - Tap Speed
   - Word Puzzle
   - Win daily rewards (5 plays/day)
   - Up to ₹300 per game

### 7. **Beautiful UI**
   - Modern gradient design
   - Responsive (mobile, tablet, desktop)
   - Colorful and engaging interface
   - Smooth animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Deployment**: Vercel
- **Storage**: Firebase Storage

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd EarnLearn
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create Firestore Database
5. Copy your Firebase configuration

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Add your Firebase credentials:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── login/route.ts
│   │   │       └── register/route.ts
│   │   ├── dashboard/
│   │   │   ├── games/page.tsx
│   │   │   ├── leaderboard/page.tsx
│   │   │   ├── referral/page.tsx
│   │   │   ├── tasks/page.tsx
│   │   │   ├── wallet/page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── config/
│   │   └── firebase.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   └── lib/
│       └── firebase.ts
├── public/
├── package.json
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── README.md
```

## 🎯 Usage

### Register a New Account
1. Go to `/register`
2. Enter name, email, and password
3. Click "Register"
4. You'll be redirected to the dashboard

### Complete Tasks
1. Click "Tasks" in the dashboard
2. Browse available tasks
3. Click "Start Task" to begin
4. Complete the task
5. Earn reward automatically

### Withdraw Money
1. Go to "Wallet"
2. Click "Request Withdrawal"
3. Enter amount (₹100 minimum)
4. Enter bank account or UPI ID
5. Submit request

### Invite Friends
1. Go to "Referral"
2. Copy your unique referral code
3. Share with friends
4. Earn ₹10 per successful signup

### Play Games
1. Go to "Games"
2. Select a game
3. Play and win rewards
4. Up to 5 games per day

## 🎨 Color Scheme

- **Primary**: Indigo (#6366f1)
- **Secondary**: Pink (#ec4899)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🚀 Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy

```bash
npx vercel
```

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_FIREBASE_API_KEY | Your Firebase API key |
| NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN | Firebase auth domain |
| NEXT_PUBLIC_FIREBASE_PROJECT_ID | Your project ID |
| NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET | Firebase storage bucket |
| NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | Messaging sender ID |
| NEXT_PUBLIC_FIREBASE_APP_ID | Firebase app ID |
| NEXT_PUBLIC_FIREBASE_DATABASE_URL | Realtime database URL |

## 🤝 Contributing

Contributions are welcome! Feel free to fork this project and submit pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Firebase Connection Issues
- Check if Firebase credentials are correct
- Ensure Firebase project is active
- Verify network connection

### Games Not Loading
- Clear browser cache
- Refresh the page
- Check console for errors

### Withdrawal Issues
- Verify your bank account/UPI ID
- Ensure you have sufficient balance
- Check withdrawal status in transaction history

## 📞 Support

For support, email support@earnlearn.com or open an issue on GitHub.

## 🙏 Acknowledgments

- Built with Next.js and React
- Styled with Tailwind CSS
- Powered by Firebase
- Deployed on Vercel

---

**Made with ❤️ for the learning community**
