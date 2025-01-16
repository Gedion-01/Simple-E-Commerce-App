# Simple E-Commerce App

This is a simple e-commerce application built with PHP Laravel for the backend and Next.js for the frontend.

## Prerequisites

- **Backend Requirements:**

  - PHP >= 8.0
  - Composer
  - PostgreSQL or MySQL

- **Frontend Requirements:**
  - Node.js >= 14.x
  - npm or yarn

## Installation

### Backend (Laravel)

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Gedion-01/Simple-E-Commerce-App.git
   cd ecommerce-app/Backend/ecommerce-app
   ```

2. **Install dependencies:**

   ```sh
   composer install
   ```

3. **Copy the example environment file and configure the environment variables:**

   ```sh
   cp .env.example .env
   ```

   Update the `.env` file with your database credentials, application URL, and other necessary configurations.

4. **Generate the application key:**

   ```sh
   php artisan key:generate
   ```

5. **Run the database migrations and seeders:**

   ```sh
   php artisan migrate --seed
   ```

6. **Start the Laravel development server:**

   ```sh
   php artisan serve
   ```

   The backend will be accessible at [http://localhost:8000](http://localhost:8000).

### Frontend (Next.js)

1. **Navigate to the frontend directory:**

   ```sh
   cd ../../Frontend/ecommerce-app-frontend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Copy the example environment file and configure the environment variables:**

   ```sh
   cp .env.sample .env.local
   ```

   Update the `.env.local` file with your backend API URL and Cloudinary credentials.

   Example:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   NEXT_PUBLIC_CLOUDINARY_PRESET=your_unsigned_preset
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   ```

4. **Run the Next.js development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

   The frontend will be accessible at [http://localhost:3000](http://localhost:3000).

## Cloudinary Integration

This project uses Cloudinary for image uploads with an unsigned preset for simplicity. Ensure you configure the following:

- Create an unsigned upload preset in your Cloudinary dashboard.
- Add the preset name and your Cloudinary cloud name to the `.env.local`

## Database Seeding

After setting up the database, you need to run the seeders to populate the database with initial data:

```sh
php artisan db:seed
```

This will seed the database with the necessary data for categories and role entities.

## Usage

- **Backend:** The Laravel backend will be running at [http://localhost:8000](http://localhost:8000).
- **Frontend:** The Next.js frontend will be running at [http://localhost:3000](http://localhost:3000).
