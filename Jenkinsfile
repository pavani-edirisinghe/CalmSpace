// FINAL JENKINSFILE — COPY-PASTE THIS INTO YOUR REPO ROOT
pipeline {
    agent any
    environment {
        DOCKERHUB_USER = credentials('dockerhub-username')
        DOCKERHUB_PASS = credentials('dockerhub-password')
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
    }
    post {
        success {
            echo "PAVANI'S DOCKER IMAGES ARE LIVE ON DOCKER HUB!"
            echo "Backend: https://hub.docker.com/r/pavaniedirisinghe/calmspace-backend"
            echo "Frontend: https://hub.docker.com/r/pavaniedirisinghe/calmspace-frontend"
            echo "Now run: cd ~/terraform-calmspace && terraform apply"
        }
    }
}