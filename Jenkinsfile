pipeline {
  agent {
    docker {
      image 'node:18.16.0'
      args '-v $HOME/.m2:/root/.m2 -v /etc/localtime:/etc/localtime -v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker -v /etc/docker:/etc/docker --privileged=true'
    }
  }

  environment {
    DOCKER_REGISTRY="192.168.10.5"
  }

  stages {
    stage('环境检查'){
      steps {
        sh 'echo "node版本:`node -v`"'
        sh 'echo "npm版本:`npm -v`"'
        sh 'echo "git版本:`git -v`"'
    }

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
