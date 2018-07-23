pipeline{
    agent {
        label 'host'
    }
    stages {
        stage('checkout') {
            steps {
                git url: 'https://github.com/jiramot/postman_runner_jenkins.git'
            }
        }
        stage('run'){
            steps{
                sh 'newman run postman.postman_collection.json --reporters cli,html,junit --reporter-junit-export reports/xml/report.xml --reporter-html-export reports/html/index.html'
            }
        }
    }
    post{
        always{
            publishHTML (target: [
                  allowMissing: false,
                  alwaysLinkToLastBuild: false,
                  keepAll: true,
                  reportDir: 'reports/html',
                  reportFiles: 'index.html',
                  reportName: "Test Report"
                ])

                junit 'reports/xml/*.xml'
        }
    }
}