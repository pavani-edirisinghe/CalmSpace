pipeline {
    agent any
    environment {
        DOCKERHUB_USER = credentials('dockerhub-username')
        DOCKERHUB_PASS = credentials('dockerhub-password')
    }
    stages {
        stage('Checkout') {
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
        stage('Deploy to AWS') {
            steps {
                withAWS(credentials: 'aws-credentials', region: 'us-east-1') {
                    sh '''
                    cd terraform-calmspace
                    terraform init
                    terraform apply -auto-approve
                    PUBLIC_IP=$(terraform output -raw public_ip)
                    echo "PAVANI'S CALMSPACE IS LIVE AT: http://$PUBLIC_IP:3000"
                    '''
                }
            }
        }
    }
    post {
        success {
            script {
                def ip = sh(script: "cd terraform-calmspace && terraform output -raw public_ip", returnStdout: true).trim()
                echo "CALMSPACE IS AUTOMATICALLY DEPLOYED!"
                echo "LIVE AT: http://${ip}:3000"
            }
        }
    }
}