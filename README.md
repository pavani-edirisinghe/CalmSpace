# CalmSpace - Online Counseling Booking System

CalmSpace is a full-stack web application designed to help users find professional counselors and book appointments easily. It features a secure authentication system, counselor profiles, and a robust booking management interface.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, CSS
* **Backend:** Node.js, Express.js
* **Database:** MySQL (Dockerized)
* **DevOps & Deployment:**
    * **Containerization:** Docker & Docker Hub
    * **CI/CD:** Jenkins (Automated Pipeline)
    * **Infrastructure:** AWS EC2 (Ubuntu Linux)
    * **IaC:** Terraform

---

## ✨ Features

* **User Authentication:** Secure Signup and Login functionality.
* **Browse Counselors:** View profiles of available professionals.
* **Appointment Booking:** (In Progress) Users can schedule sessions.
* **Responsive Design:** Works on mobile and desktop.
* **Containerized Architecture:** Fully dockerized for consistent deployment.

---

## 🏗️ Local Setup (Run with Docker)

You can run the entire application locally using Docker.

### **1. Clone the Repository**
```bash
git clone [https://github.com/pavani-edirisinghe/CalmSpace.git]
cd CalmSpace
```

### **2. Create a Network**
```bash
docker network create calmspace-net
```

### **3. Run the Database**
```bash
docker run -d \
  --name mysql_c \
  --network calmspace-net \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=calmspace_db \
  -v ./backend/init.sql:/docker-entrypoint-initdb.d/init.sql \
  mysql:8.0
```

### **4. Run the Backend**
```bash
docker run -d \
  --name backend \
  --network calmspace-net \
  -p 5000:5000 \
  -e DB_HOST=mysql_c \
  -e DB_USER=root \
  -e DB_PASSWORD=root \
  -e DB_NAME=calmspace_db \
  pavaniedirisinghe/calmspace-backend:latest \
  node Server.js
```

### **5. Run the Frontend**
```bash
docker run -d \
  --name frontend \
  --network calmspace-net \
  -p 3000:3000 \
  pavaniedirisinghe/calmspace-frontend:latest
```

Your app will be running at http://localhost:3000

---

## 📦 Deployment Pipeline
This project uses an automated CI/CD pipeline:

* **Code Push**: Code is pushed to GitHub.
* **Jenkins Build**: Jenkins detects changes, installs dependencies, and builds Docker images.
* **Docker Hub**: Optimized images are pushed to Docker Hub.
* **AWS Deploy**: Terraform provisions infrastructure, and the latest images are pulled and run on AWS EC2.

---

## 👤 Author
Pavani Edirisinghe<br>
GitHub: pavani-edirisinghe

