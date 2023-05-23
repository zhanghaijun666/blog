#!/bin/bash
set -e

## 安装脚本
cat > install-after.sh << EOF
#!/bin/bash
set -e

echo ...... install after ......
EOF

## 更新脚本
cat > upgrade-after.sh << EOF
#!/bin/bash
set -e

echo ...... upgrade after ......
EOF

## 更新脚本
cat > remove-after.sh << EOF
#!/bin/bash
set -e

echo ...... remove after ......
EOF

echo build start...
VERSION=$(date "+%Y%m%d")
BUILD_NUMBER=$(date "+%H%M%S")
PACKAGE_ARCH=$(uname -m)

fpm -s dir -t rpm -f --prefix=/ \
  --after-install /scripts/install-after.sh \
  --after-upgrade /scripts/upgrade-after.sh \
  --after-remove /scripts/remove-after.sh \
  -n "hello" -v $VERSION -a $PACKAGE_ARCH \
  --iteration $BUILD_NUMBER \
  --license private \
  --vendor "软件制造商" \
  --maintainer "作者" \
  --description "test hello" \
  --url "https://baidu.com" \
  $(ls -d {usr,etc,opt} 2>/dev/null)
