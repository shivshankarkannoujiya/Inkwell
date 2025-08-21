# ✍️ Inkwell - Blog Publishing API with Admin Approval Flow

## 📖 Project Overview

**Inkwell** is a robust RESTful API built with **Express.js** that provides a complete backend solution for a blogging platform. It implements a key feature: **content moderation** with an **admin approval workflow**. Users can create blog posts, but they must be reviewed and approved by an administrator before they become publicly visible.

This project showcases professional backend development practices, including:
- **Role-Based Access Control (RBAC)** to differentiate between regular users and administrators.
- **JWT (JSON Web Token)** for secure authentication.
- An **API Key system** for enhanced security.
- **Modular and production-ready code structure**.
- Comprehensive **CRUD (Create, Read, Update, Delete)** operations for posts and categories.

---

## ✨ Features

### 🔐 Authentication & Authorization
- **User Registration & Login**: Users can sign up and log in with credentials.
- **Role Assignment**: Differentiates between `user` and `admin` roles, granting access to specific routes.
- **JWT Protection**: Secure middleware for all private routes.
- **API Key System**: An additional layer of security, required for all private endpoints.

### 📝 Blog Post Management
- **Status Workflow**: Posts transition through `pending`, `approved`, and `rejected` statuses. Only `approved` posts are public.
- **CRUD Operations**:
  - `POST /posts`: Create a new post (defaults to `pending`).
  - `GET /posts`: Publicly list all `approved` posts.
  - `PUT /posts/:id`: Edit a post (only by the author, and if not yet approved).
  - `DELETE /posts/:id`: Delete a post (only by the author, and if not yet approved).

### 🔎 Admin Review & Approval
- `GET /admin/posts`: Lists all posts with a `pending` status.
- `PUT /admin/posts/:id/approve`: Approves a post, making it public.
- `PUT /admin/posts/:id/reject`: Rejects a post. The author can then edit and resubmit it.

### 🏷️ Categories
- **Admin-only Access**: Administrators can create new categories.
- **Public List**: All users can view the list of available categories.

---

## 🏗️ Tech Stack

- **Backend Framework**: Express.js
- **Database**: [Specify your database, e.g., PostgreSQL, MongoDB, etc.]
- **Authentication**: `jsonwebtoken`, `bcrypt`
- **Dependency Management**: `npm` or `pnpm`

---

## 📊 Database Schema

The API is built on the following relational tables to manage data and relationships:

| Table | Description |
| :--- | :--- |
| **`users`** | Stores user credentials, roles, and other profile information. |
| **`api_keys`** | Manages API keys for secure access. |
| **`posts`** | Contains blog post content, author ID, and approval status. |
| **`categories`** | Stores different categories for blog posts. |
| **`post_reviews`** | (Bonus) An audit trail for all admin actions on posts. |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- [Your Database]

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/](https://github.com/)[shivshankarkannoujiya]/inkwell.git
    cd inkwell
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Set up environment variables. Create a `.env` file in the root directory with the following:
    ```env
    PORT=3000
    DATABASE_URL="your_database_connection_string"
    JWT_SECRET="a_strong_secret_key"
    API_KEY_SECRET="another_strong_key"
    ```
4.  Start the server:
    ```bash
    pnpm run dev
    ```
The API will be running at `http://localhost:3000`.

---

## 📄 License

This project is licensed under the [Specify your license, e.g., MIT License].
