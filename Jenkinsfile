pipeline {
    agent any

    environment {
        DOCKERHUB_USER = credentials('dockerhub-username')
        DOCKERHUB_PASS = credentials('dockerhub-password')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/pavani-edirisinghe/CalmSpace.git'
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                sh '''
                echo "$DOCKERHUB_PASS" | docker login -u $DOCKERHUB_USER --password-stdin
                
                cd backend
                docker build -t pavaniedirisinghe/calmspace-backend:latest .
                docker push pavaniedirisinghe/calmspace-backend:latest
                
                cd ../frontend
                docker build -t pavaniedirisinghe/calmspace-frontend:latest .
                docker push pavaniedirisinghe/calmspace-frontend:latest
                '''
            }
        }

        stage('Deploy with Terraform') {
            steps {
                withAWS(credentials: 'aws-credentials', region: 'us-east-1') {
                    sh '''
                    cd /home/pavani/terraform-calmspace
                    
                    terraform init -upgrade
                    terraform apply -auto-approve
                    
                    PUBLIC_IP=$(terraform output -raw public_ip)
                    echo "PAVANI'S CALMSPACE IS NOW LIVE!"
                    echo "LIVE URL: http://$PUBLIC_IP:3000"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "FULL CI/CD PIPELINE 100% AUTOMATED"
            echo "Docker images pushed"
            echo "AWS deployed successfully"
            echo "Date: November 10, 2025"
        }
        failure {
            echo "Something tiny went wrong — just click Build Now again"
        }
    }
}