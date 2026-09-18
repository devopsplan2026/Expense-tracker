pipeline {
    agent any

    stages {

        stage('Clone Code') {
            steps {
                git url: 'https://github.com/your-repo/expense-tracker.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t expense-tracker:${BUILD_NUMBER} .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-cred',
                        usernameVariable: 'USERNAME',
                        passwordVariable: 'PASSWORD'
                    )
                ]) {
                    sh '''
                        docker login -u $USERNAME -p $PASSWORD

                        docker tag expense-tracker:${BUILD_NUMBER} $USERNAME/expense-tracker:${BUILD_NUMBER}

                        docker push $USERNAME/expense-tracker:${BUILD_NUMBER}

                        docker logout
                    '''
                }
            }
        }
    }
}