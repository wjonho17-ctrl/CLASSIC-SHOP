# MongoDB Atlas Setup Instructions

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email and password
4. Create a free cluster

## Step 2: Create Database & User
1. In MongoDB Atlas, click on "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Username: `shopuser`
4. Password: Create a strong password (save it!)
5. Database User Privileges: "Built-in Role" > "Atlas Admin"
6. Click "Add User"

## Step 3: Get Connection String
1. Click on "Database" (left sidebar) > "Connect"
2. Click "Connect your application"
3. Choose "Node.js" driver
4. Copy the connection string
5. Replace `<password>` with your database user password
6. It will look like: `mongodb+srv://shopuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/classic-shop?retryWrites=true&w=majority`

## Step 4: Update .env File
1. Open `.env` file in the project
2. Replace the MONGODB_URI with your connection string:
```
MONGODB_URI=mongodb+srv://shopuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/classic-shop?retryWrites=true&w=majority
PORT=3000
```

## Step 5: Install Dependencies
Open PowerShell in your project folder and run:
```
npm install
```

## Step 6: Start Server
```
npm start
```

The server will run on http://localhost:3000

## Step 7: Open Store
- Open http://localhost:3000 in your browser
- Everything works the same, but data is now stored in MongoDB!

## Troubleshooting
- If connection fails, check your IP is whitelisted in MongoDB Atlas
- In MongoDB Atlas, go to Network Access > Add IP Address > Allow from anywhere (0.0.0.0/0)
