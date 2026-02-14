pipeline {
    agent any

    environment {
        // 1. DOCKER: Uses the "Username with password" credential we created
        DOCKER_CREDS = credentials('docker-hub-creds') 
        
        // 2. AWS: Uses the "Secret text" credentials we created
        // Terraform automatically looks for these exact variable names
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        AWS_DEFAULT_REGION = 'us-east-1'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/pavani-edirisinghe/CalmSpace.git'
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    // We use the simpler "withRegistry" which handles login/logout automatically
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-creds') {
                        
                        // Build & Push Backend
                        dir('backend') {
                            def backendImage = docker.build("pavaniedirisinghe/calmspace-backend:latest")
                            backendImage.push()
                        }

                        // Build & Push Frontend
                        dir('frontend') {
                            def frontendImage = docker.build("pavaniedirisinghe/calmspace-frontend:latest")
                            frontendImage.push()
                        }
                    }
                }
            }
        }

        stage('Deploy with Terraform') {
            steps {
                // FIX: We stay in the current directory ('.') instead of trying to cd to /home/pavani
                dir('.') { 
                    sh 'terraform init -upgrade'
                    sh 'terraform apply -auto-approve'
                    
                    // Save the IP to a file so we can see it clearly
                    sh 'terraform output -raw website_url > server_url.txt'
                    
                    // Print it to the logs
                    script {
                        def url = readFile('server_url.txt').trim()
                        echo "PAVANI'S CALMSPACE IS LIVE!"
                        echo "URL: ${url}"
                    }
                }
            }
        }
        
        // Optional: The Deployment stage (SSH) we discussed earlier can go here
    }

    post {
        success {
            echo "FULL CI/CD PIPELINE SUCCESSFUL"
        }
        failure {
            echo "Pipeline Failed. Check logs."
        }
    }
}