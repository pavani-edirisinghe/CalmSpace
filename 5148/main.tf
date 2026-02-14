provider "aws" {
  region = "us-east-1"
}

# 1. Security Group
resource "aws_security_group" "calmspace_sg" {
  name        = "calmspace_sg"
  description = "Allow Web and SSH traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 2. Get Ubuntu Image
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

# 3. Create EC2 Instance
resource "aws_instance" "web_server" {
  ami             = data.aws_ami.ubuntu.id
  instance_type   = "t3.micro"
  key_name        = "calmspace-new-key" 
  security_groups = [aws_security_group.calmspace_sg.name]

  user_data = <<-EOF
              #!/bin/bash
              
              # --- 1. Create 2GB Swap Memory (Prevent Crashes) ---
              fallocate -l 2G /swapfile
              chmod 600 /swapfile
              mkswap /swapfile
              swapon /swapfile
              echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab

              # --- 2. Install Docker ---
              apt-get update
              apt-get install -y docker.io docker-compose-v2

              # --- 3. Create Project Directory ---
              mkdir -p /home/ubuntu/calmspace
              cd /home/ubuntu/calmspace

              # --- 4. Create the Database Initialization File ---
              # This file contains the SQL code you provided.
              cat <<'SQL_END' > init.sql
              CREATE DATABASE IF NOT EXISTS calmspace_db;
              USE calmspace_db;

              CREATE TABLE IF NOT EXISTS appointments (
                id int(11) NOT NULL AUTO_INCREMENT,
                user_id int(11) NOT NULL,
                counsellor_id int(11) NOT NULL,
                appointment_date varchar(20) NOT NULL,
                time_slot varchar(50) NOT NULL,
                status varchar(20) DEFAULT 'confirmed',
                created_at timestamp NOT NULL DEFAULT current_timestamp(),
                PRIMARY KEY (id)
              );

              CREATE TABLE IF NOT EXISTS counsellor_availability (
                id int(11) NOT NULL AUTO_INCREMENT,
                counsellor_id int(11) NOT NULL,
                day_of_week enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') DEFAULT NULL,
                PRIMARY KEY (id)
              );

              CREATE TABLE IF NOT EXISTS counsellor_profiles (
                id int(11) NOT NULL AUTO_INCREMENT,
                user_id int(11) DEFAULT NULL,
                name varchar(100) DEFAULT NULL,
                profession varchar(100) DEFAULT NULL,
                bio text DEFAULT NULL,
                PRIMARY KEY (id),
                UNIQUE KEY user_id (user_id)
              );

              CREATE TABLE IF NOT EXISTS time_slots (
                id int(11) NOT NULL AUTO_INCREMENT,
                availability_id int(11) NOT NULL,
                start_time time NOT NULL,
                end_time time NOT NULL,
                PRIMARY KEY (id)
              );

              CREATE TABLE IF NOT EXISTS users (
                id int(11) NOT NULL AUTO_INCREMENT,
                name varchar(100) NOT NULL,
                email varchar(100) NOT NULL,
                password varchar(255) NOT NULL,
                role enum('user','counsellor') NOT NULL,
                created_at timestamp NOT NULL DEFAULT current_timestamp(),
                PRIMARY KEY (id),
                UNIQUE KEY email (email)
              );
              
              -- Add Foreign Keys
              ALTER TABLE appointments ADD CONSTRAINT appointments_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id);
              ALTER TABLE appointments ADD CONSTRAINT appointments_ibfk_2 FOREIGN KEY (counsellor_id) REFERENCES users (id);
              ALTER TABLE counsellor_availability ADD CONSTRAINT counsellor_availability_ibfk_1 FOREIGN KEY (counsellor_id) REFERENCES users (id) ON DELETE CASCADE;
              ALTER TABLE counsellor_profiles ADD CONSTRAINT counsellor_profiles_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
              ALTER TABLE time_slots ADD CONSTRAINT time_slots_ibfk_1 FOREIGN KEY (availability_id) REFERENCES counsellor_availability (id) ON DELETE CASCADE;
              SQL_END

              # --- 5. Create docker-compose.yml ---
              cat <<EOT > docker-compose.yml
              version: '3.8'
              services:
                mysql:
                  image: mysql:8.0
                  container_name: mysql_c
                  restart: always
                  environment:
                    MYSQL_ROOT_PASSWORD: root123
                    MYSQL_DATABASE: calmspace_db
                  ports:
                    - "3306:3306"
                  volumes:
                    # This line tells MySQL to run our SQL file on startup!
                    - ./init.sql:/docker-entrypoint-initdb.d/init.sql

                backend:
                  image: pavaniedirisinghe/calmspace-backend:latest
                  container_name: backend_c
                  restart: always
                  depends_on:
                    - mysql
                  environment:
                    DB_HOST: mysql
                    DB_USER: root
                    DB_PASSWORD: root123
                    DB_NAME: calmspace_db
                  ports:
                    - "5000:5000"
                  command: sh -c "sleep 15 && node Server.js"

                frontend:
                  image: pavaniedirisinghe/calmspace-frontend:latest
                  container_name: frontend_c
                  restart: always
                  ports:
                    - "3000:3000"
                  depends_on:
                    - backend
              EOT

              # --- 6. Start Everything ---
              docker compose up -d
              EOF

  tags = {
    Name = "CalmSpace-Server"
  }
}

output "website_url" {
  value = "http://${aws_instance.web_server.public_ip}:3000"
}