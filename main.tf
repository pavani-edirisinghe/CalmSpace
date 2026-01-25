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
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  key_name      = "calmspace-new-key" 
  security_groups = [aws_security_group.calmspace_sg.name]

  user_data = <<-EOF
    #!/bin/bash
    apt-get update
    apt-get install -y docker.io docker-compose-v2
    systemctl start docker
    systemctl enable docker
    usermod -aG docker ubuntu
    mkdir -p /home/ubuntu/calmspace
    
    # We create the docker-compose.yml dynamically on the server
    cat <<EOT >> /home/ubuntu/calmspace/docker-compose.yml
    version: '3.8'
    services:
      mysql:
        image: mysql:8.4
        container_name: mysql_c
        restart: always
        environment:
          MYSQL_ROOT_PASSWORD: root123
          MYSQL_DATABASE: calmspace_db
        ports:
          - "3307:3306"
        volumes:
          - db_data:/var/lib/mysql
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
        command: sh -c "sleep 10 && node Server.js"

      frontend:
        image: pavaniedirisinghe/calmspace-frontend:latest
        container_name: frontend_c
        restart: always
        ports:
          - "3000:3000"
        depends_on:
          - backend
    
    volumes:
      db_data:
    EOT

    # Create the init.sql file
    cat <<EOT >> /home/ubuntu/calmspace/init.sql
    CREATE DATABASE IF NOT EXISTS calmspace_db;
    USE calmspace_db;
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('student', 'counsellor') DEFAULT 'student',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS appointments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      counsellor_id INT NOT NULL,
      appointment_date VARCHAR(50) NOT NULL,
      time_slot VARCHAR(50) NOT NULL,
      status VARCHAR(20) DEFAULT 'confirmed',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (counsellor_id) REFERENCES users(id)
    );
    EOT

    # Start the app
    cd /home/ubuntu/calmspace
    docker compose up -d
  EOF

  tags = {
    Name = "CalmSpace-Server"
  }
}

output "website_url" {
  value = "http://${aws_instance.web_server.public_ip}:3000"
}