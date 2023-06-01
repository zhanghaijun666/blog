pipeline {
  agent {
    node {
      label 'nodejs'
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
        container('node:18-alpine') {
          sh '''
            ls
            node -v && npm -v
            sh scripts/env_node.sh
            npm install --registry=https://registry.npm.taobao.org
            npm run build
            mkdir -p build && tar -czvf build/dist.tar.gz dist/
            ls
          '''
        }
      }
    }

    stage('编译镜像') {
      agent none
      steps {
          sh 'ls'
          sh 'docker -v'
      }
    }
  }
}
