pipeline {
    agent any
    stages {
        stage('Construire l’image Docker') {
            steps {
                script {
                    // Construire l’image Docker
                    def app = docker.build("andriamanaja/ctmotors:${env.BUILD_ID}")
                }
            }
        }
        stage('Exécuter le conteneur Docker') {
            steps {
                script {
                    // Exécuter le conteneur Docker
                    docker.image("andriamanaja/ctmotors:${env.BUILD_ID}").run('-p 2010:2010')
                }
            }
        }
    }
}