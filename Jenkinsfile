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
        }
      }
    }
  }
}
