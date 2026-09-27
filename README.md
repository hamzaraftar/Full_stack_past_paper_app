# 📚 PaperVault — Past Paper Sharing Platform

PaperVault is a full-stack web application that allows students to **upload, view, and download past papers** in one place.

Students can upload papers with information such as title, university, and subject. All users can view and download available papers, while only the student who uploaded a paper can delete it. Each student also has a profile page where they can view their uploaded papers.

## 🚀 Features

* 📤 Upload past papers
* 📄 View available past papers
* ⬇️ Download papers
* 👤 User authentication
* 🔐 Owner-based authorization
* 🗑️ Only the uploader can delete their papers
* 👨‍🎓 Student profile page
* 📚 View all papers uploaded by the logged-in student
* 📝 Store paper information such as title, university, and subject
* 🔗 RESTful API using Django REST Framework

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3

### Backend

* Python
* Django
* Django REST Framework

### Database

* SQLite

### API Testing

* Postman

## 🏗️ Project Structure

```text
PaperVault/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── manage.py
│   ├── app/
│   └── requirements.txt
│
└── README.md
```

## 🔐 Authorization

PaperVault uses authentication and permission-based access control.

* Any authenticated student can upload a paper.
* Students can view and download papers uploaded by other students.
* Only the student who uploaded a paper can delete it.
* Users can view their own uploaded papers from their profile.

For example:

```text
Student A → uploads Paper 1
Student B → can view/download Paper 1
Student B → cannot delete Paper 1
Student A → can delete Paper 1
```

## 📡 API

The backend provides RESTful APIs for:

* User registration and authentication
* User profile information
* Paper creation
* Paper listing
* Paper details
* Paper deletion
* File upload and download

Example paper response:

```json
{
    "id": 1,
    "title": "Data Structure",
    "university": "Virtual University of Pakistan",
    "subject": "Computer Science",
    "file": "/papers/data-structure.pdf",
    "uploaded_at": "2026-09-22T14:22:53Z"
}
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/papervault.git
cd papervault
```

### 2. Backend Setup

```bash
cd backend

python -m venv venv
```

Activate the virtual environment.

**Windows:**

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start the Django server:

```bash
python manage.py runserver
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will then run on the local development server.

## 🧪 API Testing

API endpoints can be tested using **Postman**.

You can test:

* User registration
* Login/authentication
* Paper upload
* Paper listing
* Paper download
* Paper deletion
* User profile

For file uploads, use `multipart/form-data`.

## 📸 Screenshots

Add screenshots of your application here:

```text
### Home Page
<img width="1600" height="777" alt="image" src="https://github.com/user-attachments/assets/ca5ed852-5702-4182-8191-dba576046276" />


### Papers Page
<img width="1589" height="779" alt="image" src="https://github.com/user-attachments/assets/02c0575c-52d9-46bb-987b-ff04251e041e" />


### Upload Paper
<img width="1588" height="771" alt="image" src="https://github.com/user-attachments/assets/b770735a-44d2-430a-a627-1043bb7a77b7" />


### Student Profile
<img width="1589" height="781" alt="image" src="https://github.com/user-attachments/assets/76fc3134-3cf2-404e-9b30-ff092b081b60" />

```

## 🎯 Future Improvements

Some planned improvements include:

* 🔎 Search papers by title or subject
* 🏫 Filter papers by university
* 📑 Filter papers by subject
* 📅 Filter papers by year
* ❤️ Favorite/bookmark papers
* 📊 Paper download statistics
* 👤 Improved student profiles
* ☁️ Cloud-based file storage

## 👨‍💻 Author

**Hamza**

Built as a full-stack web development project to practice **React.js, Django, Django REST Framework, authentication, authorization, REST APIs, and file management**.
