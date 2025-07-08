# 🏭 Warehouse Management Dashboard

This is a **React + Redux** based single-page application that allows users to **view, filter, and edit warehouse information**.

---

## 🚀 Features

### 🔎 Warehouse Listing Page

- Search warehouses by name
- Filter by:
  - City
  - Cluster
  - Minimum available space
- Click on a warehouse name to open its details

### 🛠️ Details Page

- View warehouse details
- Toggle `Edit` mode to:
  - Update name, city, cluster, space available, and live status
  - Add custom key-value fields to a warehouse

---

## 🧩 Tech Stack

- **React** (Functional Components + Hooks)
- **Redux Toolkit** (for state management)
- **React Router DOM** (for routing)
- **Plain CSS** (for styling)

---

## 🧪 Functionalities Covered

| Criteria                        | Implemented |
| ------------------------------- | ----------- |
| Warehouse Listing               | ✅ Yes      |
| Search by Warehouse Name        | ✅ Yes      |
| City and Cluster Filters        | ✅ Yes      |
| Minimum Space Filter            | ✅ Yes      |
| Clickable Warehouse Detail Page | ✅ Yes      |
| Edit Functionality              | ✅ Yes      |
| Add Custom Fields               | ✅ Yes      |

---

## 🖼️ Screenshots

### 📋 Listing Page

- Filters on top
- Clean grid-style cards
- Clicking a name redirects to `/warehouse/:id`

### ✏️ Edit Mode

- Edit inputs enabled after clicking “Edit”
- Add dynamic custom fields
- Save updates via Redux

---

## 📦 Installation & Running

1. **Clone the repo**

```bash
git clone https://github.com/praveen00219/Warehouse-Management-App.git
cd warehouse-dashboard
npm install
npm run dev
```

---

## 💡 Learnings

- Handling dynamic form fields (custom fields)
- Conditional rendering using isEditing toggle
- Combining Redux filter state with derived UI data
- Managing real-time state updates with useSelector + useDispatch

---

#### 🛠️ Author - Praveen
