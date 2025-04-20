#!/usr/bin/env bash
set -e

# Create directory structure
mkdir -p frontend/public
mkdir -p frontend/src/assets/images
mkdir -p frontend/src/assets/styles
mkdir -p frontend/src/components/common
mkdir -p frontend/src/components/ui
mkdir -p frontend/src/pages/auth
mkdir -p frontend/src/pages/borrower
mkdir -p frontend/src/pages/lender
mkdir -p frontend/src/pages/admin
mkdir -p frontend/src/pages/home
mkdir -p frontend/src/pages/notifications
mkdir -p frontend/src/pages/profile
mkdir -p frontend/src/features/auth
mkdir -p frontend/src/features/items
mkdir -p frontend/src/features/borrowRequests
mkdir -p frontend/src/features/users
mkdir -p frontend/src/services
mkdir -p frontend/src/contexts
mkdir -p frontend/src/routes
mkdir -p frontend/src/theme
mkdir -p frontend/src/types
mkdir -p frontend/src/utils

# Create public files
touch frontend/public/index.html \
      frontend/public/favicon.ico

# Create global styles
touch frontend/src/assets/styles/globals.css

# Create common components
touch frontend/src/components/common/Header.tsx \
      frontend/src/components/common/Footer.tsx \
      frontend/src/components/common/ProtectedRoute.tsx

# Create UI wrappers
touch frontend/src/components/ui/Button.tsx \
      frontend/src/components/ui/TextField.tsx \
      frontend/src/components/ui/Dialog.tsx

# Create pages
touch frontend/src/pages/auth/LoginPage.tsx \
      frontend/src/pages/auth/RegisterPage.tsx

touch frontend/src/pages/borrower/SearchItemsPage.tsx \
      frontend/src/pages/borrower/ItemDetailPage.tsx \
      frontend/src/pages/borrower/BorrowRequestPage.tsx

touch frontend/src/pages/lender/ListItemsPage.tsx \
      frontend/src/pages/lender/LenderProfilePage.tsx

touch frontend/src/pages/admin/DashboardPage.tsx \
      frontend/src/pages/admin/ManageUsersPage.tsx \
      frontend/src/pages/admin/ManageListingsPage.tsx \
      frontend/src/pages/admin/ReportsPage.tsx

touch frontend/src/pages/home/HomePage.tsx
touch frontend/src/pages/notifications/NotificationsPage.tsx
touch frontend/src/pages/profile/ProfilePage.tsx
touch frontend/src/pages/NotFoundPage.tsx

# Create feature hooks/slices
touch frontend/src/features/auth/useAuth.ts \
      frontend/src/features/auth/authSlice.ts

touch frontend/src/features/items/useItems.ts \
      frontend/src/features/items/itemsSlice.ts

touch frontend/src/features/borrowRequests/useBorrowRequests.ts \
      frontend/src/features/borrowRequests/borrowRequestsSlice.ts

touch frontend/src/features/users/useUsers.ts \
      frontend/src/features/users/usersSlice.ts

# Create services
touch frontend/src/services/api.ts \
      frontend/src/services/authService.ts \
      frontend/src/services/itemService.ts \
      frontend/src/services/borrowRequestService.ts \
      frontend/src/services/userService.ts

# Create context, routes, theme, types, utils
touch frontend/src/contexts/AuthContext.tsx
touch frontend/src/routes/AppRoutes.tsx
touch frontend/src/theme/theme.ts
touch frontend/src/types/api.d.ts
touch frontend/src/utils/validators.ts \
      frontend/src/utils/formatters.ts

# Create app entry files
touch frontend/src/App.tsx \
      frontend/src/main.tsx \
      frontend/src/vite-env.d.ts

# Create root config files for the frontend
touch frontend/.env \
      frontend/.gitignore \
      frontend/package.json \
      frontend/tsconfig.json \
      frontend/vite.config.ts \
      frontend/README.md
