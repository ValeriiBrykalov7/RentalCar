# RentalCar

RentalCar is a frontend web application for a car rental service. The app lets
users browse a catalog of rental cars, filter cars by brand, price, and mileage,
view detailed car information, and send a booking request.

## Features

- Home page with a hero section and catalog navigation.
- Catalog page with server-hydrated initial car list.
- Filtering by car brand, rental price, and mileage.
- Infinite loading with a `Load more` button.
- Car cards with image, price, location, company, type, and mileage.
- Car details page with specifications, rental conditions, features, and image.
- Booking request form with validation and toast notifications.
- Custom dropdown fields based on `react-select`.
- Responsive UI styling with Tailwind CSS and reusable global classes.
- Custom 404 page.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- Formik
- Yup
- Axios
- React Hot Toast

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd RentalCar
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=https://car-rental-api.goit.study
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Builds the application for production.

```bash
npm run start
```

Starts the production server after build.

```bash
npm run lint
```

Runs ESLint checks.

## Project Structure

```txt
app/            Next.js routes, layouts, API routes, and global styles
components/     UI components grouped by feature
lib/            API clients, helpers, and constants
public/         Static assets
types/          Shared TypeScript types
```

## Author

Valerii Brykalov
