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

              # --- 4. Create docker-compose.yml ---
              cat <<EOT > docker-compose.yml
              version: '3.8'
              services:
                mysql:
                  image: mysql:8.0
                  container_name: mysql_c
                  restart: always                  # <--- KEEPS IT ALIVE
                  environment:
                    MYSQL_ROOT_PASSWORD: root123
                    MYSQL_DATABASE: calmspace_db
                  ports:
                    - "3306:3306"

                backend:
                  image: pavaniedirisinghe/calmspace-backend:latest
                  container_name: backend_c
                  restart: always                  # <--- KEEPS IT ALIVE
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
                  restart: always                  # <--- KEEPS IT ALIVE
                  ports:
                    - "3000:3000"
                  depends_on:
                    - backend
              EOT

              # --- 5. Start Everything ---
              docker compose up -d
              EOF

  tags = {
    Name = "CalmSpace-Server"
  }
}

output "website_url" {
  value = "http://${aws_instance.web_server.public_ip}:3000"
}