pipeline {
    agent any

    environment {
        // Your Docker Hub Username
        DOCKER_HUB_REPO = 'pavaniedirisinghe'
        
        // AWS Credentials (Make sure these IDs match what you created in Jenkins)
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        AWS_DEFAULT_REGION = 'us-east-1'
    }

    stages {
        stage('Checkout') {
            steps {
                // Get code from your GitHub
                git branch: 'master', url: 'https://github.com/pavani-edirisinghe/CalmSpace.git'
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-creds') {
                        // Build Backend
                        def backendImage = docker.build("${DOCKER_HUB_REPO}/calmspace-backend:latest", "./backend")
                        backendImage.push()

                        // Build Frontend
                        def frontendImage = docker.build("${DOCKER_HUB_REPO}/calmspace-frontend:latest", "./frontend")
                        frontendImage.push()
                    }
                }
            }
        }

        // 👇 THIS IS THE PART YOU ARE ADDING/FIXING 👇
        stage('Deploy with Terraform') {
            steps {
                dir('.') { // Runs in the root folder (where main.tf is)
                    
                    // Initialize Terraform
                    sh 'terraform init'
                    
                    // Apply changes (Create/Update server)
                    sh 'terraform apply -auto-approve'
                    
                    // Save the URL for the next stage
                    sh 'terraform output -raw website_url > server_url.txt'
                }
            }
        }
        // 👆 END OF FIX 👆

        stage('Deploy/Update Server') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    script {
                        // Read the server URL from the file created in the previous step
                        def server_url = sh(script: "cat server_url.txt", returnStdout: true).trim()
                        
                        // Clean up the URL to get just the IP (removes http:// and :3000)
                        def server_ip = server_url.replace("http://", "").replace(":3000", "")
                        
                        echo "Deploying to ${server_ip}..."

                        // SSH into the server and force an update
                        // We use StrictHostKeyChecking=no to avoid the "yes/no" prompt
                        sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@${server_ip} '
                                cd /home/ubuntu/calmspace
                                sudo docker compose down
                                sudo docker compose pull
                                sudo docker compose up -d
                            '
                        """
                    }
                }
            }
        }
    }
}