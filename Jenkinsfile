pipeline {
  agent {
    kubernetes {
      inheritFrom 'nodejs base'
      containerTemplate {
        name 'nodejs'
        image 'node:18.16.0-alpine'
      }
    }
  }

  environment {
    DOCKER_REGISTRY="192.168.10.5"
  }

  stages {
    stage('拉取代码') {
      agent none
      steps {
        git(url: 'http://192.168.10.3/bedrock/modules/blog-docs.git', credentialsId: 'devops', branch: 'master', changelog: true, poll: false)
        sh '''
          ls -al
          sh scripts/env_git.sh
        '''
      }
    }

    stage('项目编译') {
      agent none
      steps {
        container('nodejs') {
          sh '''
            ls
            node -v && npm -v
            sh scripts/env_node.sh
            pnpm install && pnpm build
            mkdir -p build && tar -czvf build/dist.tar.gz dist/
            ls
          '''
        }
        archiveArtifacts 'build/dist.tar.gz'
      }
    }

    stage('编译镜像') {
      steps {
        container('base') {
          sh 'docker -v'
          sh 'docker version'
          withCredentials([usernamePassword(credentialsId : 'devops' ,)]) {
            sh 'echo"$DOCKER_PWD_VAR"| docker login $DOCKER_REGISTRY -u"$DOCKER_USER_VAR"--password-stdin'
            sh 'docker tag blog-docs:latest $DOCKER_REGISTRY/$DOCKERHUB_NAMESPACE/blog-docs:SNAPSHOT-$BUILD_NUMBER'
            sh 'docker push  $DOCKER_REGISTRY/$DOCKERHUB_NAMESPACE/blog-docs:SNAPSHOT-$BUILD_NUMBER'
          }
        }
      }
    }
  }
}
