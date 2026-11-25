pipeline {
    // Forces Jenkins to run this job on EC2-2 (Slave), not EC2-1 (Controller)
    agent { label 'linux-agent' }

    environment {
        PROD_HOST = '172.31.5.206'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Pulling latest code from GitHub...'
                checkout scm
            }
        }

        stage('Run Automated Tests') {
            steps {
                echo 'Running Makefile tests on Jenkins Agent...'
                sh 'make test'
            }
        }

        stage('Deploy to Production') {
            steps {
                echo "Deploying to Web-Prod (${PROD_HOST})..."
                sh "make deploy PROD_HOST=${PROD_HOST}"
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Loan Calculator is live.'
        }
        failure {
            echo 'Pipeline failed! Deployment blocked.'
        }
    }
}