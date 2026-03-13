# QUICK START GUIDE - MongoDB Setup

## What I Did:
✅ Updated server.js to use MongoDB instead of SQLite
✅ Updated all HTML files to use API instead of localStorage
✅ Created .env file for configuration
✅ Ready for online database!

## Next Steps:

### 1. Create MongoDB Atlas Account (FREE)
- Go to: https://www.mongodb.com/cloud/atlas
- Click "Try Free"
- Sign up and create a free cluster
- Takes 5 minutes!

### 2. Get Your Connection String
- In MongoDB Atlas dashboard:
  - Click "Database" (left sidebar)
  - Click "Connect"
  - Choose "Connect your application"
  - Select "Node.js" driver
  - Copy the connection string
  - It will look like:
    ```
    mongodb+srv://shopuser:PASSWORD@cluster0.xxxxx.mongodb.net/classic-shop?retryWrites=true&w=majority
    ```

### 3. Update .env File
Edit `.env` file in your project folder:
```
MONGODB_URI=mongodb+srv://shopuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/classic-shop?retryWrites=true&w=majority
PORT=3000
```

### 4. Install Dependencies
Open PowerShell in your project folder and run:
```
npm install
```

### 5. Start Server
```
npm start
```

You should see: `Connected to MongoDB Atlas`

### 6. Open Store
Open your browser:
- http://localhost:3000

That's it! Everything now works with MongoDB online database!

## Important:
- Make sure MongoDB connection string is correct
- Check that IP is whitelisted (in MongoDB Atlas > Network Access)
- Products and orders now save ONLINE - not locally!
- Data persists even when you close browser

## Troubleshooting:
- **"Cannot connect to MongoDB"** → Check connection string in .env file
- **"Connection timeout"** → Add your IP to MongoDB Atlas Network Access (whitelist 0.0.0.0/0 for testing)
- **"npm command not found"** → Install Node.js from nodejs.org

---

Need help? See MONGODB_SETUP.md for detailed instructions!
