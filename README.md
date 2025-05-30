# Blogi Project Setup

## Install dependencies:

```bash
npm install
```

## Set up environment variables

(See Environment Variables section below)

## Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory with these variables:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blogi?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=30d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Next.js
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

---

## Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Create a new upload preset:

   - **Settings → Upload → Upload presets**
   - **Name:** `blogi_uploads`
   - **Signing mode:** `Unsigned`
   - **Format:** `WebP auto`
   - **Quality:** `auto`

3. Note your cloud name, API key, and API secret.

---

## Project Structure

```
blogi/
├── app/                   # Next.js app router
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Protected routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
├── config/                # Configuration files
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── models/                # MongoDB models
├── public/                # Static assets
├── styles/                # Global styles
├── types/                 # TypeScript types
├── .env.example           # Environment variables example
├── next.config.js         # Next.js config
└── package.json           # Project dependencies
```

---

## API Documentation

### Authentication

| Endpoint             | Method | Description       | Request Body                    |
| -------------------- | ------ | ----------------- | ------------------------------- |
| `/api/auth/register` | POST   | Register new user | `{ username, email, password }` |
| `/api/auth/login`    | POST   | Login user        | `{ email, password }`           |
| `/api/auth/me`       | GET    | Get current user  | Requires JWT                    |

### Posts

| Endpoint          | Method | Description         | Query Parameters    |
| ----------------- | ------ | ------------------- | ------------------- |
| `/api/posts`      | GET    | Get paginated posts | `page, limit, sort` |
| `/api/posts`      | POST   | Create new post     | Requires JWT        |
| `/api/posts/[id]` | GET    | Get single post     | -                   |
| `/api/posts/[id]` | PUT    | Update post         | Requires JWT        |
| `/api/posts/[id]` | DELETE | Delete post         | Requires JWT        |

### Search

| Endpoint      | Method | Description  | Query Parameters   |
| ------------- | ------ | ------------ | ------------------ |
| `/api/search` | GET    | Search posts | `q` (search query) |

---

## Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Create a new project in [Vercel](https://vercel.com)
3. Connect your GitHub repository
4. Add environment variables
5. Deploy!

### Other Platforms

For other platforms like Netlify or AWS Amplify, ensure you:

- Set up a MongoDB Atlas database
- Configure all environment variables
- Set the correct build command:

```bash
npm run build
```

---

## Screenshots

![Login Page](/1.png)
![Register Page](/2.png)

### Authentication Flow

- **Login Page** (Light Mode)
- **Registration Page**

### Post Management

- **Create Post** (Post Creation Interface)
- **Post View** (Single Post View)

### UI Features

- **Dark Mode** (Homepage in Dark Mode)
- **Mobile View** (Responsive Mobile Layout)

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch:

```bash
git checkout -b feature/your-feature
```

3. Commit your changes:

```bash
git commit -m 'Add some feature'
```

4. Push to the branch:

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---
