const e=JSON.parse(`{"key":"v-1a70b65f","path":"/62.%E9%9B%86%E6%88%90%E9%85%8D%E7%BD%AE/09.%E9%9B%86%E6%88%90%E6%9E%84%E5%BB%BA/10.Jenkins%E6%A8%A1%E6%9D%BF%E6%96%87%E4%BB%B6.html","title":"Jenkins模板文件","lang":"zh-CN","frontmatter":{"title":"Jenkins模板文件","date":"2023-04-22T00:00:00.000Z","category":["集成配置","集成构建"],"tag":["集成构建"],"description":"Jenkinsfile声明模板 // Jenkinsfile声明模板 pipeline { // Agent: 表示整个流水线或特定阶段中的步骤和命令执行的位置 // Agent any 在任何可用的代理上执行流水线 // Agent none 表示该 Pipeline 脚本没有全局的 agent 配置。当顶层的 agent 配置为 none 时， 每个 stage 部分都需要包含它自己的 agent agent any // 全局变量，会在所有stage中生效 environment { NAME= 'ZHANG' // 动态变量 returnStdout: 将命令的执行结果赋值给变量，比如下述的命令返回的是 clang，此时 CC 的值为“clang”。 CC = \\"\\"\\"\${sh( returnStdout: true, script: 'echo -n \\"clang\\"' //如果使用shell命令的echo赋值变量最好加-n取消换行 )}\\"\\"\\" // 动态变量 returnStatus: 将命令的执行状态赋值给变量，比如下述命令的执行状态为 1，此时 EXIT_STATUS 的值为 1 EXIT_STATUS = \\"\\"\\"\${sh( returnStatus: true, script: 'exit 1' )}\\"\\"\\" // 加密文本 AWS_ACCESS_KEY_ID = credentials('txt1') AWS_SECRET_ACCESS_KEY = credentials('txt2') } // Options: Jenkins 流水线支持很多内置指令，比如 retry 可以对失败的步骤进行重复执行 n 次，可以根据不同的指令实现不同的效果。 // buildDiscarder : 保留多少个流水线的构建记录 // disableConcurrentBuilds : 禁止流水线并行执行，防止并行流水线同时访问共享资源导致流水线失败。 // disableResume : 如果控制器重启，禁止流水线自动恢复。 // newContainerPerStage : agent 为 docker 或 dockerfile 时，每个阶段将在同一个节点的新容器中运行，而不是所有的阶段都在同一个容器中运行。 // quietPeriod : 流水线静默期，也就是触发流水线后等待一会在执行。 // retry : 流水线失败后重试次数。 // timeout : 设置流水线的超时时间，超过流水线时间，job 会自动终止。如果不加 unit 参数默认为 1 分。 // timestamps : 为控制台输出时间戳。 options { timeout(time: 1, unit: 'HOURS') // 超时时间1小时，如果不加unit参数默认为1分 timestamps() // 所有输出每行都会打印时间戳 buildDiscarder(logRotator(numToKeepStr: '3')) //保留三个历史构建版本 quietPeriod(10) // 注意手动触发的构建不生效 retry(3) // 流水线失败后重试次数 } // Parameters: 提供了一个用户在触发流水线时应该提供的参数列表 只能定义在 pipeline 顶层。 // 插件: imageTag | gitParameter parameters { string(name: 'DEPLOY_ENV', defaultValue: 'staging', description: '1') // 执行构建时需要手动配置字符串类型参数，之后赋值给变量 text(name: 'DEPLOY_TEXT', defaultValue: 'One\\\\nTwo\\\\nThree\\\\n', description: '2') // 执行构建时需要提供文本参数，之后赋值给变量 booleanParam(name: 'DEBUG_BUILD', defaultValue: true, description: '3') // 布尔型参数 choice(name: 'CHOICES', choices: ['one', 'two', 'three'], description: '4') // 选择形式列表参数 password(name: 'PASSWORD', defaultValue: 'SECRET', description: 'A secret password') // 密码类型参数，会进行加密 imageTag(name: 'DOCKER_IMAGE', description: '', image: 'kubernetes/kubectl', filter: '.*', defaultTag: '', registry: 'https://192.168.10.15', credentialId: 'harbor-account', tagOrder: 'NATURAL') //获取镜像名称与tag gitParameter(branch: '', branchFilter: 'origin/(.*)', defaultValue: '', description: 'Branch for build and deploy', name: 'BRANCH', quickFilterEnabled: false, selectedValue: 'NONE', sortMode: 'NONE', tagFilter: '*', type: 'PT_BRANCH') } // 定时构建 注意: H 的意思不是 HOURS 的意思，而是 Hash 的缩写。主要为了解决多个流水线在同一时间同时运行带来的系统负载压力。 triggers { cron('H */4 * * 1-5') // 周一到周五每隔四个小时执行一次 cron('H/12 * * * *') // 每隔12分钟执行一次 cron('H * * * *') // 每隔1小时执行一次 } // 定义流水线 stages { // 执行某阶段 stage('Build') { steps { echo 'Build' } } stage('Stage For Build'){ // label: 以节点标签形式选择某个具体的节点执行 Pipeline 命令 agent { label 'role-master' } steps { sh \\"\\"\\" echo 'role-master' echo 'role-master' \\"\\"\\" } } stage('Stage For Build'){ agent { // node: 和 label 配置类似，只不过是可以添加一些额外的配置，比如 customWorkspace(设置默认工作目录) node { label 'role-master' customWorkspace \\"/tmp/zhangzhuo/data\\" } } steps { sh \\"echo role-master &gt; 1.txt\\" } } agent { // dockerfile: 使用从源码中包含的 Dockerfile 所构建的容器执行流水线或 stage dockerfile { filename 'Dockerfile.build' //dockerfile文件名称 dir 'build' //执行构建镜像的工作目录 label 'role-master' //执行的node节点，标签选择 additionalBuildArgs '--build-arg version=1.0.2' //构建参数 } } agent{ // docker: 相当于 dockerfile，可以直接使用 docker 字段指定外部镜像即可，可以省去构建的时间。比如使用 maven 镜像进行打包，同时可以指定 args docker{ image '192.168.10.15/kubernetes/alpine:latest' //镜像地址 label 'role-master' //执行的节点，标签选择 args '-v /tmp:/tmp' //启动镜像的参数 } } // docker 的示例 stage('Example Build') { agent { docker 'maven:3-alpine' } steps { echo 'Hello, Maven' sh 'mvn --version' } } stage('env1') { // 定义在stage中的变量只会在当前stage生效，其他的stage不会生效 environment { HARBOR = 'https://192.168.10.15' } steps { sh \\"env\\" } } stage('env1') { options { // 定义在这里这对这个stage生效 timeout(time: 2, unit: 'SECONDS') // 超时时间2秒 timestamps() // 所有输出每行都会打印时间戳 retry(3) // 流水线失败后重试次数 } steps { sh \\"env &amp;&amp; sleep 2\\" } } // Parameters 测试 stage('git') { steps { // 使用gitParameter，必须有这个 git branch: \\"$BRANCH\\", credentialsId: 'gitlab-key', url: 'git@192.168.10.14:root/env.git' } } // Input 字段可以实现在流水线中进行交互式操作 stage('Example') { input { message \\"还继续么?\\" ok \\"继续\\" submitter \\"alice,bob\\" // 可选，允许提交 input 操作的用户或组的名称，如果为空，任何登录用户均可提交 input； parameters { string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?') } } steps { echo \\"Hello, \${PERSON}, nice to meet you.\\" } } stage('Example Deploy') { when { // beforeAgent: 如果 beforeAgent 为 true，则会先评估 when 条件。在 when 条件为 true 时，才会进入该 stage // beforeInput: 如果 beforeInput 为 true，则会先评估 when 条件。在 when 条件为 true 时，才会进入到 input 阶段； // beforeOptions: 如果 beforeInput 为 true，则会先评估 when 条件。在 when 条件为 true 时，才会进入到 options 阶段； // beforeOptions 优先级大于 beforeInput 大于 beforeAgent beforeAgent true branch 'main' // 多分支流水线，分支为main才会执行。 expression { BRANCH_NAME ==~ /(main|master)/ } // 并且 满足正则表达式 anyOf { // 并且 DEPLOY_TO 为 master 或 main environment name: 'DEPLOY_TO', value: 'main' environment name: 'DEPLOY_TO', value: 'master' } } steps { echo 'Deploying' } } // Parallel: 很方便的实现并发构建 stage('Parallel Stage') { failFast true // 表示其中只要有一个分支构建执行失败，就直接推出不等待其他分支构建 parallel { stage('Branch A') { steps { echo \\"On Branch A\\" } } stage('Branch B') { steps { echo \\"On Branch B\\" } } stage('Branch C') { stages { stage('Nested 1') { steps { echo \\"In stage Nested 1 within Branch C\\" } } stage('Nested 2') { steps { echo \\"In stage Nested 2 within Branch C\\" } } } } } } // 静态变量 // Jenkins 有许多内置变量可以直接在 Jenkinsfile 中使用，可以通过 JENKINS_URL/pipeline/syntax/globals#env 获取完整列表。目前比较常用的环境变量如下 // BUILD_ID: 当前构建的 ID，与 Jenkins 版本 1.597+中的 BUILD_NUMBER 完全相同 // BUILD_NUMBER: 当前构建的 ID，和 BUILD_ID 一致 // BUILD_TAG: 用来标识构建的版本号，格式为: jenkins-{BUILD_NUMBER}， 可以对产物进行命名，比如生产的 jar 包名字、镜像的 TAG 等； // BUILD_URL: 本次构建的完整 URL，比如: http://buildserver/jenkins/job/MyJobName/17/%EF%BC%9B // JOB_NAME: 本次构建的项目名称 // NODE_NAME: 当前构建节点的名称； // JENKINS_URL: Jenkins 完整的 URL，需要在 SystemConfiguration 设置； // WORKSPACE: 执行构建的工作目录。 stage('STATIC_ENV') { steps { echo \\"$env.BUILD_ID\\" echo \\"$env.BUILD_NUMBER\\" echo \\"$env.BUILD_TAG\\" } } //Post: 一般用于流水线结束后的进一步处理 | 一般情况下 post 部分放在流水线的底部 post { // always: 无论 Pipeline 或 stage 的完成状态如何，都允许运行该 post 中定义的指令； // changed: 只有当前 Pipeline 或 stage 的完成状态与它之前的运行不同时，才允许在该 post 部分运行该步骤； // fixed: 当本次 Pipeline 或 stage 成功，且上一次构建是失败或不稳定时，允许运行该 post 中定义的指令； // regression: 当本次 Pipeline 或 stage 的状态为失败、不稳定或终止，且上一次构建的 状态为成功时，允许运行该 post 中定义的指令； // failure: 只有当前 Pipeline 或 stage 的完成状态为失败（failure），才允许在 post 部分运行该步骤，通常这时在 Web 界面中显示为红色 // success: 当前状态为成功（success），执行 post 步骤，通常在 Web 界面中显示为蓝色 或绿色 // unstable: 当前状态为不稳定（unstable），执行 post 步骤，通常由于测试失败或代码 违规等造成，在 Web 界面中显示为黄色 // aborted: 当前状态为终止（aborted），执行该 post 步骤，通常由于流水线被手动终止触发，这时在 Web 界面中显示为灰色； // unsuccessful: 当前状态不是 success 时，执行该 post 步骤； // cleanup: 无论 pipeline 或 stage 的完成状态如何，都允许运行该 post 中定义的指令。和 always 的区别在于，cleanup 会在其它执行之后执行。 always { echo 'I will always say Hello again!' } failure { echo 'I will failure say Hello again!' } } } }","head":[["meta",{"property":"og:url","content":"https://haijunit.top/blog/62.%E9%9B%86%E6%88%90%E9%85%8D%E7%BD%AE/09.%E9%9B%86%E6%88%90%E6%9E%84%E5%BB%BA/10.Jenkins%E6%A8%A1%E6%9D%BF%E6%96%87%E4%BB%B6.html"}],["meta",{"property":"og:site_name","content":"学习笔记"}],["meta",{"property":"og:title","content":"Jenkins模板文件"}],["meta",{"property":"og:description","content":"Jenkinsfile声明模板 // Jenkinsfile声明模板 pipeline { // Agent: 表示整个流水线或特定阶段中的步骤和命令执行的位置 // Agent any 在任何可用的代理上执行流水线 // Agent none 表示该 Pipeline 脚本没有全局的 agent 配置。当顶层的 agent 配置为 none 时， 每个 stage 部分都需要包含它自己的 agent agent any // 全局变量，会在所有stage中生效 environment { NAME= 'ZHANG' // 动态变量 returnStdout: 将命令的执行结果赋值给变量，比如下述的命令返回的是 clang，此时 CC 的值为“clang”。 CC = \\"\\"\\"\${sh( returnStdout: true, script: 'echo -n \\"clang\\"' //如果使用shell命令的echo赋值变量最好加-n取消换行 )}\\"\\"\\" // 动态变量 returnStatus: 将命令的执行状态赋值给变量，比如下述命令的执行状态为 1，此时 EXIT_STATUS 的值为 1 EXIT_STATUS = \\"\\"\\"\${sh( returnStatus: true, script: 'exit 1' )}\\"\\"\\" // 加密文本 AWS_ACCESS_KEY_ID = credentials('txt1') AWS_SECRET_ACCESS_KEY = credentials('txt2') } // Options: Jenkins 流水线支持很多内置指令，比如 retry 可以对失败的步骤进行重复执行 n 次，可以根据不同的指令实现不同的效果。 // buildDiscarder : 保留多少个流水线的构建记录 // disableConcurrentBuilds : 禁止流水线并行执行，防止并行流水线同时访问共享资源导致流水线失败。 // disableResume : 如果控制器重启，禁止流水线自动恢复。 // newContainerPerStage : agent 为 docker 或 dockerfile 时，每个阶段将在同一个节点的新容器中运行，而不是所有的阶段都在同一个容器中运行。 // quietPeriod : 流水线静默期，也就是触发流水线后等待一会在执行。 // retry : 流水线失败后重试次数。 // timeout : 设置流水线的超时时间，超过流水线时间，job 会自动终止。如果不加 unit 参数默认为 1 分。 // timestamps : 为控制台输出时间戳。 options { timeout(time: 1, unit: 'HOURS') // 超时时间1小时，如果不加unit参数默认为1分 timestamps() // 所有输出每行都会打印时间戳 buildDiscarder(logRotator(numToKeepStr: '3')) //保留三个历史构建版本 quietPeriod(10) // 注意手动触发的构建不生效 retry(3) // 流水线失败后重试次数 } // Parameters: 提供了一个用户在触发流水线时应该提供的参数列表 只能定义在 pipeline 顶层。 // 插件: imageTag | gitParameter parameters { string(name: 'DEPLOY_ENV', defaultValue: 'staging', description: '1') // 执行构建时需要手动配置字符串类型参数，之后赋值给变量 text(name: 'DEPLOY_TEXT', defaultValue: 'One\\\\nTwo\\\\nThree\\\\n', description: '2') // 执行构建时需要提供文本参数，之后赋值给变量 booleanParam(name: 'DEBUG_BUILD', defaultValue: true, description: '3') // 布尔型参数 choice(name: 'CHOICES', choices: ['one', 'two', 'three'], description: '4') // 选择形式列表参数 password(name: 'PASSWORD', defaultValue: 'SECRET', description: 'A secret password') // 密码类型参数，会进行加密 imageTag(name: 'DOCKER_IMAGE', description: '', image: 'kubernetes/kubectl', filter: '.*', defaultTag: '', registry: 'https://192.168.10.15', credentialId: 'harbor-account', tagOrder: 'NATURAL') //获取镜像名称与tag gitParameter(branch: '', branchFilter: 'origin/(.*)', defaultValue: '', description: 'Branch for build and deploy', name: 'BRANCH', quickFilterEnabled: false, selectedValue: 'NONE', sortMode: 'NONE', tagFilter: '*', type: 'PT_BRANCH') } // 定时构建 注意: H 的意思不是 HOURS 的意思，而是 Hash 的缩写。主要为了解决多个流水线在同一时间同时运行带来的系统负载压力。 triggers { cron('H */4 * * 1-5') // 周一到周五每隔四个小时执行一次 cron('H/12 * * * *') // 每隔12分钟执行一次 cron('H * * * *') // 每隔1小时执行一次 } // 定义流水线 stages { // 执行某阶段 stage('Build') { steps { echo 'Build' } } stage('Stage For Build'){ // label: 以节点标签形式选择某个具体的节点执行 Pipeline 命令 agent { label 'role-master' } steps { sh \\"\\"\\" echo 'role-master' echo 'role-master' \\"\\"\\" } } stage('Stage For Build'){ agent { // node: 和 label 配置类似，只不过是可以添加一些额外的配置，比如 customWorkspace(设置默认工作目录) node { label 'role-master' customWorkspace \\"/tmp/zhangzhuo/data\\" } } steps { sh \\"echo role-master &gt; 1.txt\\" } } agent { // dockerfile: 使用从源码中包含的 Dockerfile 所构建的容器执行流水线或 stage dockerfile { filename 'Dockerfile.build' //dockerfile文件名称 dir 'build' //执行构建镜像的工作目录 label 'role-master' //执行的node节点，标签选择 additionalBuildArgs '--build-arg version=1.0.2' //构建参数 } } agent{ // docker: 相当于 dockerfile，可以直接使用 docker 字段指定外部镜像即可，可以省去构建的时间。比如使用 maven 镜像进行打包，同时可以指定 args docker{ image '192.168.10.15/kubernetes/alpine:latest' //镜像地址 label 'role-master' //执行的节点，标签选择 args '-v /tmp:/tmp' //启动镜像的参数 } } // docker 的示例 stage('Example Build') { agent { docker 'maven:3-alpine' } steps { echo 'Hello, Maven' sh 'mvn --version' } } stage('env1') { // 定义在stage中的变量只会在当前stage生效，其他的stage不会生效 environment { HARBOR = 'https://192.168.10.15' } steps { sh \\"env\\" } } stage('env1') { options { // 定义在这里这对这个stage生效 timeout(time: 2, unit: 'SECONDS') // 超时时间2秒 timestamps() // 所有输出每行都会打印时间戳 retry(3) // 流水线失败后重试次数 } steps { sh \\"env &amp;&amp; sleep 2\\" } } // Parameters 测试 stage('git') { steps { // 使用gitParameter，必须有这个 git branch: \\"$BRANCH\\", credentialsId: 'gitlab-key', url: 'git@192.168.10.14:root/env.git' } } // Input 字段可以实现在流水线中进行交互式操作 stage('Example') { input { message \\"还继续么?\\" ok \\"继续\\" submitter \\"alice,bob\\" // 可选，允许提交 input 操作的用户或组的名称，如果为空，任何登录用户均可提交 input； parameters { string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?') } } steps { echo \\"Hello, \${PERSON}, nice to meet you.\\" } } stage('Example Deploy') { when { // beforeAgent: 如果 beforeAgent 为 true，则会先评估 when 条件。在 when 条件为 true 时，才会进入该 stage // beforeInput: 如果 beforeInput 为 true，则会先评估 when 条件。在 when 条件为 true 时，才会进入到 input 阶段； // beforeOptions: 如果 beforeInput 为 true，则会先评估 when 条件。在 when 条件为 true 时，才会进入到 options 阶段； // beforeOptions 优先级大于 beforeInput 大于 beforeAgent beforeAgent true branch 'main' // 多分支流水线，分支为main才会执行。 expression { BRANCH_NAME ==~ /(main|master)/ } // 并且 满足正则表达式 anyOf { // 并且 DEPLOY_TO 为 master 或 main environment name: 'DEPLOY_TO', value: 'main' environment name: 'DEPLOY_TO', value: 'master' } } steps { echo 'Deploying' } } // Parallel: 很方便的实现并发构建 stage('Parallel Stage') { failFast true // 表示其中只要有一个分支构建执行失败，就直接推出不等待其他分支构建 parallel { stage('Branch A') { steps { echo \\"On Branch A\\" } } stage('Branch B') { steps { echo \\"On Branch B\\" } } stage('Branch C') { stages { stage('Nested 1') { steps { echo \\"In stage Nested 1 within Branch C\\" } } stage('Nested 2') { steps { echo \\"In stage Nested 2 within Branch C\\" } } } } } } // 静态变量 // Jenkins 有许多内置变量可以直接在 Jenkinsfile 中使用，可以通过 JENKINS_URL/pipeline/syntax/globals#env 获取完整列表。目前比较常用的环境变量如下 // BUILD_ID: 当前构建的 ID，与 Jenkins 版本 1.597+中的 BUILD_NUMBER 完全相同 // BUILD_NUMBER: 当前构建的 ID，和 BUILD_ID 一致 // BUILD_TAG: 用来标识构建的版本号，格式为: jenkins-{BUILD_NUMBER}， 可以对产物进行命名，比如生产的 jar 包名字、镜像的 TAG 等； // BUILD_URL: 本次构建的完整 URL，比如: http://buildserver/jenkins/job/MyJobName/17/%EF%BC%9B // JOB_NAME: 本次构建的项目名称 // NODE_NAME: 当前构建节点的名称； // JENKINS_URL: Jenkins 完整的 URL，需要在 SystemConfiguration 设置； // WORKSPACE: 执行构建的工作目录。 stage('STATIC_ENV') { steps { echo \\"$env.BUILD_ID\\" echo \\"$env.BUILD_NUMBER\\" echo \\"$env.BUILD_TAG\\" } } //Post: 一般用于流水线结束后的进一步处理 | 一般情况下 post 部分放在流水线的底部 post { // always: 无论 Pipeline 或 stage 的完成状态如何，都允许运行该 post 中定义的指令； // changed: 只有当前 Pipeline 或 stage 的完成状态与它之前的运行不同时，才允许在该 post 部分运行该步骤； // fixed: 当本次 Pipeline 或 stage 成功，且上一次构建是失败或不稳定时，允许运行该 post 中定义的指令； // regression: 当本次 Pipeline 或 stage 的状态为失败、不稳定或终止，且上一次构建的 状态为成功时，允许运行该 post 中定义的指令； // failure: 只有当前 Pipeline 或 stage 的完成状态为失败（failure），才允许在 post 部分运行该步骤，通常这时在 Web 界面中显示为红色 // success: 当前状态为成功（success），执行 post 步骤，通常在 Web 界面中显示为蓝色 或绿色 // unstable: 当前状态为不稳定（unstable），执行 post 步骤，通常由于测试失败或代码 违规等造成，在 Web 界面中显示为黄色 // aborted: 当前状态为终止（aborted），执行该 post 步骤，通常由于流水线被手动终止触发，这时在 Web 界面中显示为灰色； // unsuccessful: 当前状态不是 success 时，执行该 post 步骤； // cleanup: 无论 pipeline 或 stage 的完成状态如何，都允许运行该 post 中定义的指令。和 always 的区别在于，cleanup 会在其它执行之后执行。 always { echo 'I will always say Hello again!' } failure { echo 'I will failure say Hello again!' } } } }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-23T07:13:54.000Z"}],["meta",{"property":"article:author","content":"知识库"}],["meta",{"property":"article:tag","content":"集成构建"}],["meta",{"property":"article:published_time","content":"2023-04-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-23T07:13:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Jenkins模板文件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-22T00:00:00.000Z\\",\\"dateModified\\":\\"2023-05-23T07:13:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"知识库\\",\\"url\\":\\"https://haijunit.top\\",\\"email\\":\\"zhanghaijun_java@163.com\\"}]}"]]},"headers":[{"level":2,"title":"Jenkinsfile声明模板","slug":"jenkinsfile声明模板","link":"#jenkinsfile声明模板","children":[]}],"git":{"createdTime":1684826034000,"updatedTime":1684826034000,"contributors":[{"name":"zhanghaijun","email":"zhanghaijun@bjtxra.com","commits":1}]},"readingTime":{"minutes":7.5,"words":2251},"filePathRelative":"62.集成配置/09.集成构建/10.Jenkins模板文件.md","localizedDate":"2023年4月22日","excerpt":"<h2> Jenkinsfile声明模板</h2>\\n<div class=\\"language-JavaScript line-numbers-mode\\" data-ext=\\"JavaScript\\"><pre class=\\"language-JavaScript\\"><code>// Jenkinsfile声明模板\\npipeline {\\n  // Agent: 表示整个流水线或特定阶段中的步骤和命令执行的位置\\n  // Agent any 在任何可用的代理上执行流水线\\n  // Agent none 表示该 Pipeline 脚本没有全局的 agent 配置。当顶层的 agent 配置为 none 时， 每个 stage 部分都需要包含它自己的 agent\\n  agent any\\n  // 全局变量，会在所有stage中生效\\n  environment {\\n    NAME= 'ZHANG'\\n    // 动态变量 returnStdout: 将命令的执行结果赋值给变量，比如下述的命令返回的是 clang，此时 CC 的值为“clang”。\\n    CC = \\"\\"\\"\${sh(\\n         returnStdout: true,\\n         script: 'echo -n \\"clang\\"'   //如果使用shell命令的echo赋值变量最好加-n取消换行\\n         )}\\"\\"\\"\\n    // 动态变量 returnStatus: 将命令的执行状态赋值给变量，比如下述命令的执行状态为 1，此时 EXIT_STATUS 的值为 1\\n    EXIT_STATUS = \\"\\"\\"\${sh(\\n         returnStatus: true,\\n         script: 'exit 1'\\n         )}\\"\\"\\"\\n    // 加密文本\\n    AWS_ACCESS_KEY_ID = credentials('txt1')\\n    AWS_SECRET_ACCESS_KEY = credentials('txt2')\\n  }\\n  // Options: Jenkins 流水线支持很多内置指令，比如 retry 可以对失败的步骤进行重复执行 n 次，可以根据不同的指令实现不同的效果。\\n  // buildDiscarder : 保留多少个流水线的构建记录\\n  // disableConcurrentBuilds : 禁止流水线并行执行，防止并行流水线同时访问共享资源导致流水线失败。\\n  // disableResume : 如果控制器重启，禁止流水线自动恢复。\\n  // newContainerPerStage : agent 为 docker 或 dockerfile 时，每个阶段将在同一个节点的新容器中运行，而不是所有的阶段都在同一个容器中运行。\\n  // quietPeriod : 流水线静默期，也就是触发流水线后等待一会在执行。\\n  // retry : 流水线失败后重试次数。\\n  // timeout : 设置流水线的超时时间，超过流水线时间，job 会自动终止。如果不加 unit 参数默认为 1 分。\\n  // timestamps : 为控制台输出时间戳。\\n  options {\\n    timeout(time: 1, unit: 'HOURS')                     // 超时时间1小时，如果不加unit参数默认为1分\\n    timestamps()                                        // 所有输出每行都会打印时间戳\\n    buildDiscarder(logRotator(numToKeepStr: '3'))       //保留三个历史构建版本\\n    quietPeriod(10)                                     // 注意手动触发的构建不生效\\n    retry(3)                                            // 流水线失败后重试次数\\n  }\\n  // Parameters: 提供了一个用户在触发流水线时应该提供的参数列表 只能定义在 pipeline 顶层。\\n  // 插件: imageTag | gitParameter\\n  parameters {\\n    string(name: 'DEPLOY_ENV', defaultValue: 'staging', description: '1')                   // 执行构建时需要手动配置字符串类型参数，之后赋值给变量\\n    text(name:  'DEPLOY_TEXT', defaultValue: 'One\\\\nTwo\\\\nThree\\\\n', description: '2')         // 执行构建时需要提供文本参数，之后赋值给变量\\n    booleanParam(name: 'DEBUG_BUILD',  defaultValue: true, description: '3')                // 布尔型参数\\n    choice(name: 'CHOICES', choices: ['one', 'two', 'three'], description: '4')             // 选择形式列表参数\\n    password(name: 'PASSWORD', defaultValue: 'SECRET', description: 'A  secret password')   // 密码类型参数，会进行加密\\n    imageTag(name: 'DOCKER_IMAGE', description: '', image: 'kubernetes/kubectl', filter: '.*', defaultTag: '', registry: 'https://192.168.10.15', credentialId: 'harbor-account', tagOrder: 'NATURAL')   //获取镜像名称与tag\\n    gitParameter(branch: '', branchFilter: 'origin/(.*)', defaultValue: '', description: 'Branch for build and deploy', name: 'BRANCH', quickFilterEnabled: false, selectedValue: 'NONE', sortMode: 'NONE',  tagFilter: '*', type: 'PT_BRANCH')\\n  }\\n  // 定时构建 注意: H 的意思不是 HOURS 的意思，而是 Hash 的缩写。主要为了解决多个流水线在同一时间同时运行带来的系统负载压力。\\n  triggers {\\n    cron('H */4 * * 1-5')   // 周一到周五每隔四个小时执行一次\\n    cron('H/12 * * * *')    // 每隔12分钟执行一次\\n    cron('H * * * *')       // 每隔1小时执行一次\\n  }\\n  // 定义流水线\\n  stages {\\n    // 执行某阶段\\n    stage('Build') {\\n      steps {\\n        echo 'Build'\\n      }\\n    }\\n    stage('Stage For Build'){\\n      // label: 以节点标签形式选择某个具体的节点执行 Pipeline 命令\\n      agent { label 'role-master' }\\n      steps {\\n        sh \\"\\"\\"\\n           echo 'role-master'\\n           echo 'role-master'\\n        \\"\\"\\"\\n      }\\n    }\\n    stage('Stage For Build'){\\n      agent {\\n        // node: 和 label 配置类似，只不过是可以添加一些额外的配置，比如 customWorkspace(设置默认工作目录)\\n        node {\\n          label 'role-master'\\n          customWorkspace \\"/tmp/zhangzhuo/data\\"\\n        }\\n      }\\n      steps {\\n        sh \\"echo role-master &gt; 1.txt\\"\\n      }\\n    }\\n    agent {\\n      // dockerfile: 使用从源码中包含的 Dockerfile 所构建的容器执行流水线或 stage\\n      dockerfile {\\n        filename 'Dockerfile.build'  //dockerfile文件名称\\n        dir 'build'                  //执行构建镜像的工作目录\\n        label 'role-master'          //执行的node节点，标签选择\\n        additionalBuildArgs '--build-arg version=1.0.2' //构建参数\\n      }\\n    }\\n    agent{\\n      // docker: 相当于 dockerfile，可以直接使用 docker 字段指定外部镜像即可，可以省去构建的时间。比如使用 maven 镜像进行打包，同时可以指定 args\\n      docker{\\n        image '192.168.10.15/kubernetes/alpine:latest'   //镜像地址\\n        label 'role-master' //执行的节点，标签选择\\n        args '-v /tmp:/tmp'      //启动镜像的参数\\n      }\\n    }\\n    // docker 的示例\\n    stage('Example Build') {\\n      agent { docker 'maven:3-alpine' }\\n      steps {\\n        echo 'Hello, Maven'\\n        sh 'mvn --version'\\n      }\\n    }\\n    stage('env1') {\\n      // 定义在stage中的变量只会在当前stage生效，其他的stage不会生效\\n      environment {\\n        HARBOR = 'https://192.168.10.15'\\n      }\\n      steps {\\n        sh \\"env\\"\\n      }\\n    }\\n    stage('env1') {\\n      options {                               // 定义在这里这对这个stage生效\\n        timeout(time: 2, unit: 'SECONDS')     // 超时时间2秒\\n        timestamps()                          // 所有输出每行都会打印时间戳\\n        retry(3)                              // 流水线失败后重试次数\\n      }\\n      steps {\\n        sh \\"env &amp;&amp; sleep 2\\"\\n      }\\n    }\\n    // Parameters 测试\\n    stage('git') {\\n      steps {\\n        // 使用gitParameter，必须有这个\\n        git branch: \\"$BRANCH\\", credentialsId: 'gitlab-key', url: 'git@192.168.10.14:root/env.git'\\n      }\\n    }\\n    // Input 字段可以实现在流水线中进行交互式操作\\n    stage('Example') {\\n      input {\\n        message \\"还继续么?\\"\\n        ok \\"继续\\"\\n        submitter \\"alice,bob\\"     // 可选，允许提交 input 操作的用户或组的名称，如果为空，任何登录用户均可提交 input；\\n        parameters {\\n          string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')\\n        }\\n      }\\n      steps {\\n        echo \\"Hello, \${PERSON}, nice to meet you.\\"\\n      }\\n    }\\n    stage('Example Deploy') {\\n      when {\\n        // beforeAgent: 如果 beforeAgent 为 true，则会先评估 when 条件。在 when 条件为 true 时，才会进入该 stage\\n        // beforeInput: 如果 beforeInput 为 true，则会先评估 when 条件。在 when 条件为 true 时，才会进入到 input 阶段；\\n        // beforeOptions: 如果 beforeInput 为 true，则会先评估 when 条件。在 when 条件为 true 时，才会进入到 options 阶段；\\n        // beforeOptions 优先级大于 beforeInput 大于 beforeAgent\\n        beforeAgent true\\n        branch 'main'         // 多分支流水线，分支为main才会执行。\\n        expression { BRANCH_NAME ==~ /(main|master)/ }  // 并且 满足正则表达式\\n        anyOf {                                         // 并且 DEPLOY_TO 为 master 或 main\\n          environment name: 'DEPLOY_TO', value: 'main'\\n          environment name: 'DEPLOY_TO', value: 'master'\\n        }\\n      }\\n      steps {\\n        echo 'Deploying'\\n      }\\n    }\\n    // Parallel: 很方便的实现并发构建\\n    stage('Parallel Stage') {\\n      failFast true         // 表示其中只要有一个分支构建执行失败，就直接推出不等待其他分支构建\\n      parallel {\\n        stage('Branch A') {\\n          steps {\\n            echo \\"On Branch A\\"\\n          }\\n        }\\n        stage('Branch B') {\\n          steps {\\n            echo \\"On Branch B\\"\\n          }\\n        }\\n        stage('Branch C') {\\n          stages {\\n            stage('Nested 1') {\\n              steps {\\n                echo \\"In stage Nested 1 within Branch C\\"\\n              }\\n            }\\n            stage('Nested 2') {\\n              steps {\\n               echo \\"In stage Nested 2 within Branch C\\"\\n              }\\n            }\\n          }\\n        }\\n      }\\n    }\\n    // 静态变量\\n    // Jenkins 有许多内置变量可以直接在 Jenkinsfile 中使用，可以通过 JENKINS_URL/pipeline/syntax/globals#env 获取完整列表。目前比较常用的环境变量如下\\n    // BUILD_ID: 当前构建的 ID，与 Jenkins 版本 1.597+中的 BUILD_NUMBER 完全相同\\n    // BUILD_NUMBER: 当前构建的 ID，和 BUILD_ID 一致\\n    // BUILD_TAG: 用来标识构建的版本号，格式为: jenkins-{BUILD_NUMBER}， 可以对产物进行命名，比如生产的 jar 包名字、镜像的 TAG 等；\\n    // BUILD_URL: 本次构建的完整 URL，比如: http://buildserver/jenkins/job/MyJobName/17/%EF%BC%9B\\n    // JOB_NAME: 本次构建的项目名称\\n    // NODE_NAME: 当前构建节点的名称；\\n    // JENKINS_URL: Jenkins 完整的 URL，需要在 SystemConfiguration 设置；\\n    // WORKSPACE: 执行构建的工作目录。\\n    stage('STATIC_ENV') {\\n      steps {\\n        echo \\"$env.BUILD_ID\\"\\n        echo \\"$env.BUILD_NUMBER\\"\\n        echo \\"$env.BUILD_TAG\\"\\n      }\\n    }\\n    //Post: 一般用于流水线结束后的进一步处理 | 一般情况下 post 部分放在流水线的底部\\n    post {\\n      // always: 无论 Pipeline 或 stage 的完成状态如何，都允许运行该 post 中定义的指令；\\n      // changed: 只有当前 Pipeline 或 stage 的完成状态与它之前的运行不同时，才允许在该 post 部分运行该步骤；\\n      // fixed: 当本次 Pipeline 或 stage 成功，且上一次构建是失败或不稳定时，允许运行该 post 中定义的指令；\\n      // regression: 当本次 Pipeline 或 stage 的状态为失败、不稳定或终止，且上一次构建的 状态为成功时，允许运行该 post 中定义的指令；\\n      // failure: 只有当前 Pipeline 或 stage 的完成状态为失败（failure），才允许在 post 部分运行该步骤，通常这时在 Web 界面中显示为红色\\n      // success: 当前状态为成功（success），执行 post 步骤，通常在 Web 界面中显示为蓝色 或绿色\\n      // unstable: 当前状态为不稳定（unstable），执行 post 步骤，通常由于测试失败或代码 违规等造成，在 Web 界面中显示为黄色\\n      // aborted: 当前状态为终止（aborted），执行该 post 步骤，通常由于流水线被手动终止触发，这时在 Web 界面中显示为灰色；\\n      // unsuccessful: 当前状态不是 success 时，执行该 post 步骤；\\n      // cleanup: 无论 pipeline 或 stage 的完成状态如何，都允许运行该 post 中定义的指令。和 always 的区别在于，cleanup 会在其它执行之后执行。\\n      always {\\n        echo 'I will always say Hello again!'\\n      }\\n      failure {\\n        echo 'I will failure say Hello again!'\\n      }\\n    }\\n  }\\n}\\n\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{e as data};
