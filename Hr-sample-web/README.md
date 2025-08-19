# HR Management App

A modern, user-friendly web application for managing candidates, employees, companies, departments, and salaries. Built with Angular and Angular Material, this app provides a seamless experience for HR teams to handle all core HR operations efficiently.

---

## 🚀 Project Overview

The **HR Management App** is designed to streamline HR processes, including:
- Candidate tracking
- Employee management
- Company and department organization
- Salary management

This project is ideal for learning Angular best practices, form handling, CRUD operations, and modular app architecture.

---

## ✨ Features
- **Dashboard** for quick HR insights
- **CRUD** operations for Candidates, Employees, Companies, Departments, and Salaries
- **Reactive Forms** with validation
- **Material Design** UI components
- **In-memory API** for easy local development
- **Search, filter, and list views** for all entities
- **Edit and create** forms with robust validation

---

## 🛠️ Tech Stack
- **Angular** 8+
- **Angular Material**
- **RxJS**
- **TypeScript**
- **In-memory Web API** (for mock backend)

---

## 📦 Folder Structure
```
Hr-sample-web/
├── src/
│   ├── app/
│   │   ├── components/         # Feature components (forms, lists)
│   │   ├── models/             # TypeScript interfaces for data models
│   │   ├── services/           # Data and business logic services
│   │   ├── directives/         # Custom directives
│   │   └── ...
│   ├── assets/                 # Static assets
│   ├── environments/           # Environment configs
│   └── ...
├── angular.json                # Angular CLI config
├── package.json                # Project dependencies
└── ...
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v10+ recommended)
- npm (v6+)

### Installation
```bash
cd Hr-sample-web
npm install
```

### Running the App
```bash
npm start
```
Visit [http://localhost:4200](http://localhost:4200) in your browser.

---

## 📚 Usage
- Use the navigation menu to access Candidates, Employees, Companies, Departments, and Salaries.
- Add, edit, or delete records using the provided forms and lists.
- All data is stored in-memory (no backend required).

---

## 👩‍💻 Development
- Generate new components/services using Angular CLI:
  ```bash
  ng generate component my-component
  ng generate service my-service
  ```
- Update models in `src/app/models/` as needed.
- Services in `src/app/services/` handle all data operations.

---

## 🧪 Testing
- Run unit tests:
  ```bash
  npm test
  ```
- Run end-to-end tests:
  ```bash
  npm run e2e
  ```

---

## 🤝 Contributing
Contributions are welcome! Please fork the repo and submit a pull request.

---

## 📄 License
This project is licensed under the MIT License.
