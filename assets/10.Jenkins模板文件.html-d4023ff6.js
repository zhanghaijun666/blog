import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as i,f as s}from"./app-efa5e96e.js";const l={},d=s(`<h2 id="jenkinsfile声明模板" tabindex="-1"><a class="header-anchor" href="#jenkinsfile声明模板" aria-hidden="true">#</a> Jenkinsfile声明模板</h2><div class="language-JavaScript line-numbers-mode" data-ext="JavaScript"><pre class="language-JavaScript"><code>// Jenkinsfile声明模板
pipeline {
  // Agent: 表示整个流水线或特定阶段中的步骤和命令执行的位置
  // Agent any 在任何可用的代理上执行流水线
  // Agent none 表示该 Pipeline 脚本没有全局的 agent 配置。当顶层的 agent 配置为 none 时， 每个 stage 部分都需要包含它自己的 agent
  agent any
  // 全局变量，会在所有stage中生效
  environment {
    NAME= &#39;ZHANG&#39;
    // 动态变量 returnStdout: 将命令的执行结果赋值给变量，比如下述的命令返回的是 clang，此时 CC 的值为“clang”。
    CC = &quot;&quot;&quot;\${sh(
         returnStdout: true,
         script: &#39;echo -n &quot;clang&quot;&#39;   //如果使用shell命令的echo赋值变量最好加-n取消换行
         )}&quot;&quot;&quot;
    // 动态变量 returnStatus: 将命令的执行状态赋值给变量，比如下述命令的执行状态为 1，此时 EXIT_STATUS 的值为 1
    EXIT_STATUS = &quot;&quot;&quot;\${sh(
         returnStatus: true,
         script: &#39;exit 1&#39;
         )}&quot;&quot;&quot;
    // 加密文本
    AWS_ACCESS_KEY_ID = credentials(&#39;txt1&#39;)
    AWS_SECRET_ACCESS_KEY = credentials(&#39;txt2&#39;)
  }
  // Options: Jenkins 流水线支持很多内置指令，比如 retry 可以对失败的步骤进行重复执行 n 次，可以根据不同的指令实现不同的效果。
  // buildDiscarder : 保留多少个流水线的构建记录
  // disableConcurrentBuilds : 禁止流水线并行执行，防止并行流水线同时访问共享资源导致流水线失败。
  // disableResume : 如果控制器重启，禁止流水线自动恢复。
  // newContainerPerStage : agent 为 docker 或 dockerfile 时，每个阶段将在同一个节点的新容器中运行，而不是所有的阶段都在同一个容器中运行。
  // quietPeriod : 流水线静默期，也就是触发流水线后等待一会在执行。
  // retry : 流水线失败后重试次数。
  // timeout : 设置流水线的超时时间，超过流水线时间，job 会自动终止。如果不加 unit 参数默认为 1 分。
  // timestamps : 为控制台输出时间戳。
  options {
    timeout(time: 1, unit: &#39;HOURS&#39;)                     // 超时时间1小时，如果不加unit参数默认为1分
    timestamps()                                        // 所有输出每行都会打印时间戳
    buildDiscarder(logRotator(numToKeepStr: &#39;3&#39;))       //保留三个历史构建版本
    quietPeriod(10)                                     // 注意手动触发的构建不生效
    retry(3)                                            // 流水线失败后重试次数
  }
  // Parameters: 提供了一个用户在触发流水线时应该提供的参数列表 只能定义在 pipeline 顶层。
  // 插件: imageTag | gitParameter
  parameters {
    string(name: &#39;DEPLOY_ENV&#39;, defaultValue: &#39;staging&#39;, description: &#39;1&#39;)                   // 执行构建时需要手动配置字符串类型参数，之后赋值给变量
    text(name:  &#39;DEPLOY_TEXT&#39;, defaultValue: &#39;One\\nTwo\\nThree\\n&#39;, description: &#39;2&#39;)         // 执行构建时需要提供文本参数，之后赋值给变量
    booleanParam(name: &#39;DEBUG_BUILD&#39;,  defaultValue: true, description: &#39;3&#39;)                // 布尔型参数
    choice(name: &#39;CHOICES&#39;, choices: [&#39;one&#39;, &#39;two&#39;, &#39;three&#39;], description: &#39;4&#39;)             // 选择形式列表参数
    password(name: &#39;PASSWORD&#39;, defaultValue: &#39;SECRET&#39;, description: &#39;A  secret password&#39;)   // 密码类型参数，会进行加密
    imageTag(name: &#39;DOCKER_IMAGE&#39;, description: &#39;&#39;, image: &#39;kubernetes/kubectl&#39;, filter: &#39;.*&#39;, defaultTag: &#39;&#39;, registry: &#39;https://192.168.10.15&#39;, credentialId: &#39;harbor-account&#39;, tagOrder: &#39;NATURAL&#39;)   //获取镜像名称与tag
    gitParameter(branch: &#39;&#39;, branchFilter: &#39;origin/(.*)&#39;, defaultValue: &#39;&#39;, description: &#39;Branch for build and deploy&#39;, name: &#39;BRANCH&#39;, quickFilterEnabled: false, selectedValue: &#39;NONE&#39;, sortMode: &#39;NONE&#39;,  tagFilter: &#39;*&#39;, type: &#39;PT_BRANCH&#39;)
  }
  // 定时构建 注意: H 的意思不是 HOURS 的意思，而是 Hash 的缩写。主要为了解决多个流水线在同一时间同时运行带来的系统负载压力。
  triggers {
    cron(&#39;H */4 * * 1-5&#39;)   // 周一到周五每隔四个小时执行一次
    cron(&#39;H/12 * * * *&#39;)    // 每隔12分钟执行一次
    cron(&#39;H * * * *&#39;)       // 每隔1小时执行一次
  }
  // 定义流水线
  stages {
    // 执行某阶段
    stage(&#39;Build&#39;) {
      steps {
        echo &#39;Build&#39;
      }
    }
    stage(&#39;Stage For Build&#39;){
      // label: 以节点标签形式选择某个具体的节点执行 Pipeline 命令
      agent { label &#39;role-master&#39; }
      steps {
        sh &quot;&quot;&quot;
           echo &#39;role-master&#39;
           echo &#39;role-master&#39;
        &quot;&quot;&quot;
      }
    }
    stage(&#39;Stage For Build&#39;){
      agent {
        // node: 和 label 配置类似，只不过是可以添加一些额外的配置，比如 customWorkspace(设置默认工作目录)
        node {
          label &#39;role-master&#39;
          customWorkspace &quot;/tmp/zhangzhuo/data&quot;
        }
      }
      steps {
        sh &quot;echo role-master &gt; 1.txt&quot;
      }
    }
    agent {
      // dockerfile: 使用从源码中包含的 Dockerfile 所构建的容器执行流水线或 stage
      dockerfile {
        filename &#39;Dockerfile.build&#39;  //dockerfile文件名称
        dir &#39;build&#39;                  //执行构建镜像的工作目录
        label &#39;role-master&#39;          //执行的node节点，标签选择
        additionalBuildArgs &#39;--build-arg version=1.0.2&#39; //构建参数
      }
    }
    agent{
      // docker: 相当于 dockerfile，可以直接使用 docker 字段指定外部镜像即可，可以省去构建的时间。比如使用 maven 镜像进行打包，同时可以指定 args
      docker{
        image &#39;192.168.10.15/kubernetes/alpine:latest&#39;   //镜像地址
        label &#39;role-master&#39; //执行的节点，标签选择
        args &#39;-v /tmp:/tmp&#39;      //启动镜像的参数
      }
    }
    // docker 的示例
    stage(&#39;Example Build&#39;) {
      agent { docker &#39;maven:3-alpine&#39; }
      steps {
        echo &#39;Hello, Maven&#39;
        sh &#39;mvn --version&#39;
      }
    }
    stage(&#39;env1&#39;) {
      // 定义在stage中的变量只会在当前stage生效，其他的stage不会生效
      environment {
        HARBOR = &#39;https://192.168.10.15&#39;
      }
      steps {
        sh &quot;env&quot;
      }
    }
    stage(&#39;env1&#39;) {
      options {                               // 定义在这里这对这个stage生效
        timeout(time: 2, unit: &#39;SECONDS&#39;)     // 超时时间2秒
        timestamps()                          // 所有输出每行都会打印时间戳
        retry(3)                              // 流水线失败后重试次数
      }
      steps {
        sh &quot;env &amp;&amp; sleep 2&quot;
      }
    }
    // Parameters 测试
    stage(&#39;git&#39;) {
      steps {
        // 使用gitParameter，必须有这个
        git branch: &quot;$BRANCH&quot;, credentialsId: &#39;gitlab-key&#39;, url: &#39;git@192.168.10.14:root/env.git&#39;
      }
    }
    // Input 字段可以实现在流水线中进行交互式操作
    stage(&#39;Example&#39;) {
      input {
        message &quot;还继续么?&quot;
        ok &quot;继续&quot;
        submitter &quot;alice,bob&quot;     // 可选，允许提交 input 操作的用户或组的名称，如果为空，任何登录用户均可提交 input；
        parameters {
          string(name: &#39;PERSON&#39;, defaultValue: &#39;Mr Jenkins&#39;, description: &#39;Who should I say hello to?&#39;)
        }
      }
      steps {
        echo &quot;Hello, \${PERSON}, nice to meet you.&quot;
      }
    }
    stage(&#39;Example Deploy&#39;) {
      when {
        // beforeAgent: 如果 beforeAgent 为 true，则会先评估 when 条件。在 when 条件为 true 时，才会进入该 stage
        // beforeInput: 如果 beforeInput 为 true，则会先评估 when 条件。在 when 条件为 true 时，才会进入到 input 阶段；
        // beforeOptions: 如果 beforeInput 为 true，则会先评估 when 条件。在 when 条件为 true 时，才会进入到 options 阶段；
        // beforeOptions 优先级大于 beforeInput 大于 beforeAgent
        beforeAgent true
        branch &#39;main&#39;         // 多分支流水线，分支为main才会执行。
        expression { BRANCH_NAME ==~ /(main|master)/ }  // 并且 满足正则表达式
        anyOf {                                         // 并且 DEPLOY_TO 为 master 或 main
          environment name: &#39;DEPLOY_TO&#39;, value: &#39;main&#39;
          environment name: &#39;DEPLOY_TO&#39;, value: &#39;master&#39;
        }
      }
      steps {
        echo &#39;Deploying&#39;
      }
    }
    // Parallel: 很方便的实现并发构建
    stage(&#39;Parallel Stage&#39;) {
      failFast true         // 表示其中只要有一个分支构建执行失败，就直接推出不等待其他分支构建
      parallel {
        stage(&#39;Branch A&#39;) {
          steps {
            echo &quot;On Branch A&quot;
          }
        }
        stage(&#39;Branch B&#39;) {
          steps {
            echo &quot;On Branch B&quot;
          }
        }
        stage(&#39;Branch C&#39;) {
          stages {
            stage(&#39;Nested 1&#39;) {
              steps {
                echo &quot;In stage Nested 1 within Branch C&quot;
              }
            }
            stage(&#39;Nested 2&#39;) {
              steps {
               echo &quot;In stage Nested 2 within Branch C&quot;
              }
            }
          }
        }
      }
    }
    // 静态变量
    // Jenkins 有许多内置变量可以直接在 Jenkinsfile 中使用，可以通过 JENKINS_URL/pipeline/syntax/globals#env 获取完整列表。目前比较常用的环境变量如下
    // BUILD_ID: 当前构建的 ID，与 Jenkins 版本 1.597+中的 BUILD_NUMBER 完全相同
    // BUILD_NUMBER: 当前构建的 ID，和 BUILD_ID 一致
    // BUILD_TAG: 用来标识构建的版本号，格式为: jenkins-{BUILD_NUMBER}， 可以对产物进行命名，比如生产的 jar 包名字、镜像的 TAG 等；
    // BUILD_URL: 本次构建的完整 URL，比如: http://buildserver/jenkins/job/MyJobName/17/%EF%BC%9B
    // JOB_NAME: 本次构建的项目名称
    // NODE_NAME: 当前构建节点的名称；
    // JENKINS_URL: Jenkins 完整的 URL，需要在 SystemConfiguration 设置；
    // WORKSPACE: 执行构建的工作目录。
    stage(&#39;STATIC_ENV&#39;) {
      steps {
        echo &quot;$env.BUILD_ID&quot;
        echo &quot;$env.BUILD_NUMBER&quot;
        echo &quot;$env.BUILD_TAG&quot;
      }
    }
    //Post: 一般用于流水线结束后的进一步处理 | 一般情况下 post 部分放在流水线的底部
    post {
      // always: 无论 Pipeline 或 stage 的完成状态如何，都允许运行该 post 中定义的指令；
      // changed: 只有当前 Pipeline 或 stage 的完成状态与它之前的运行不同时，才允许在该 post 部分运行该步骤；
      // fixed: 当本次 Pipeline 或 stage 成功，且上一次构建是失败或不稳定时，允许运行该 post 中定义的指令；
      // regression: 当本次 Pipeline 或 stage 的状态为失败、不稳定或终止，且上一次构建的 状态为成功时，允许运行该 post 中定义的指令；
      // failure: 只有当前 Pipeline 或 stage 的完成状态为失败（failure），才允许在 post 部分运行该步骤，通常这时在 Web 界面中显示为红色
      // success: 当前状态为成功（success），执行 post 步骤，通常在 Web 界面中显示为蓝色 或绿色
      // unstable: 当前状态为不稳定（unstable），执行 post 步骤，通常由于测试失败或代码 违规等造成，在 Web 界面中显示为黄色
      // aborted: 当前状态为终止（aborted），执行该 post 步骤，通常由于流水线被手动终止触发，这时在 Web 界面中显示为灰色；
      // unsuccessful: 当前状态不是 success 时，执行该 post 步骤；
      // cleanup: 无论 pipeline 或 stage 的完成状态如何，都允许运行该 post 中定义的指令。和 always 的区别在于，cleanup 会在其它执行之后执行。
      always {
        echo &#39;I will always say Hello again!&#39;
      }
      failure {
        echo &#39;I will failure say Hello again!&#39;
      }
    }
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),v=[d];function a(r,u){return e(),i("div",null,v)}const m=n(l,[["render",a],["__file","10.Jenkins模板文件.html.vue"]]);export{m as default};
