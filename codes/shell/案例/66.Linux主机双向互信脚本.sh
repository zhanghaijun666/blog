
#!/bin/bash

# 主机列表
hosts=(
    "user1@host1"
    "user2@host2"
    "user3@host3"
)

# 密码
password="password"

# 生成SSH密钥对
generate_ssh_key() {
    local host=$1
    local key_file=~/.ssh/id_rsa_$host

    if [ ! -f $key_file ]; then
        ssh-keygen -t rsa -f $key_file -N ""
    fi
}

# 复制公钥到其他主机
copy_public_key() {
    local host=$1
    local key_file=~/.ssh/id_rsa_$host

    for target_host in "${hosts[@]}"; do
        if [[ $target_host != $host ]]; then
            sshpass -p "$password" ssh-copy-id -i $key_file.pub $target_host
        fi
    done
}

# 设置双向互信
setup_ssh_trust() {
    local host=$1
    local key_file=~/.ssh/id_rsa_$host

    for target_host in "${hosts[@]}"; do
        if [[ $target_host != $host ]]; then
            sshpass -p "$password" ssh -i $key_file $target_host "mkdir -p ~/.ssh && grep -qxF '$(cat $key_file.pub)' ~/.ssh/authorized_keys || echo '$(cat $key_file.pub)' >> ~/.ssh/authorized_keys"
        fi
    done
}

# 并行执行函数
parallel_execute() {
    local func=$1

    for host in "${hosts[@]}"; do
        $func "$host" &
    done
    wait
}

# 并行生成SSH密钥对
parallel_execute generate_ssh_key

# 并行复制公钥到其他主机
parallel_execute copy_public_key

# 并行设置双向互信
parallel_execute setup_ssh_trust

echo "双向互信设置完成"
