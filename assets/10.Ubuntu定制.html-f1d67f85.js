import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as l,c as o,a as n,b as s,d as e,f as c}from"./app-efa5e96e.js";const p={},r=n("h2",{id:"相关地址",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#相关地址","aria-hidden":"true"},"#"),s(" 相关地址")],-1),u={href:"https://dragonfly.fun/devops/livecd.html",target:"_blank",rel:"noopener noreferrer"},d={href:"https://help.ubuntu.com/community/LiveCDCustomizationFromScratch",target:"_blank",rel:"noopener noreferrer"},v=c(`<h2 id="镜像制作" tabindex="-1"><a class="header-anchor" href="#镜像制作" aria-hidden="true">#</a> 镜像制作</h2><h3 id="_1、安装必备工具" tabindex="-1"><a class="header-anchor" href="#_1、安装必备工具" aria-hidden="true">#</a> 1、安装必备工具</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> --no-install-recommends <span class="token parameter variable">-y</span> <span class="token punctuation">\\</span>
    <span class="token function">debootstrap</span> <span class="token punctuation">\\</span>
    squashfs-tools <span class="token punctuation">\\</span>
    grub-efi <span class="token punctuation">\\</span>
    xorriso <span class="token punctuation">\\</span>
    dosfstools <span class="token punctuation">\\</span>
    <span class="token function">mtools</span> <span class="token punctuation">\\</span>
    grub-pc-bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、配置根文件系统" tabindex="-1"><a class="header-anchor" href="#_2、配置根文件系统" aria-hidden="true">#</a> 2、配置根文件系统</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 1、初始化 rootfs</span>
<span class="token comment"># 创建必要目录</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CHROOT</span><span class="token operator">=</span><span class="token environment constant">$PWD</span>/target
<span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">$CHROOT</span> livecd/<span class="token punctuation">{</span>casper,boot/grub,EFI/boot<span class="token punctuation">}</span>
 
<span class="token comment"># 加载基础文件系统</span>
<span class="token function">sudo</span> <span class="token function">debootstrap</span> --no-check-gpg <span class="token punctuation">\\</span>
    <span class="token parameter variable">--variant</span><span class="token operator">=</span>minbase <span class="token punctuation">\\</span>
    <span class="token parameter variable">--arch</span><span class="token operator">=</span>amd64 <span class="token punctuation">\\</span>
    <span class="token parameter variable">--components</span><span class="token operator">=</span>main,restricted,universe,multiverse <span class="token punctuation">\\</span>
    <span class="token parameter variable">--include</span><span class="token operator">=</span>bash-completion,systemd-sysv,locales,nano,casper,console-setup,netplan.io,whiptail <span class="token punctuation">\\</span>
    <span class="token parameter variable">--exclude</span><span class="token operator">=</span>gcc-9-base,gcc-10-base jammy  <span class="token variable">$CHROOT</span>  https://mirrors.aliyun.com/ubuntu
 
<span class="token comment"># 配置源</span>
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> <span class="token function">tee</span> /etc/apt/sources.list <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
deb https://mirrors.aliyun.com/ubuntu jammy main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu jammy-security main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu jammy-updates main restricted universe multiverse
EOF</span>

<span class="token comment">## 2、挂载</span>
<span class="token function">sudo</span> <span class="token function">mount</span> <span class="token parameter variable">-B</span> /dev <span class="token variable">$CHROOT</span>/dev
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> <span class="token function">mount</span> none <span class="token parameter variable">-t</span> proc /proc
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> <span class="token function">mount</span> none <span class="token parameter variable">-t</span> sysfs /sys
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> <span class="token function">mount</span> none <span class="token parameter variable">-t</span> devpts /dev/pts
 
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> <span class="token function">apt-get</span> update
 
<span class="token comment"># 可选</span>
<span class="token comment"># sudo chroot $CHROOT env DEBIAN_FRONTEND=noninteractive apt-get -y upgrade</span>

<span class="token comment">## 3、生成 Linux 内核文件</span>
<span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s|COMPRESS=lz4|COMPRESS=lzma|&#39;</span> <span class="token variable">$CHROOT</span>/etc/initramfs-tools/initramfs.conf
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> linux-image-generic-hwe-22.04 grub-pc-
<span class="token function">sudo</span> <span class="token function">mv</span> <span class="token variable">$CHROOT</span>/boot/vmlinuz-**-**-generic livecd/casper/vmlinuz
<span class="token function">sudo</span> <span class="token function">mv</span> <span class="token variable">$CHROOT</span>/boot/initrd.img-**-**-generic livecd/casper/initrd.img
创建默认用户
<span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s|\\\\w|\\\\W|g&#39;</span> <span class="token variable">$CHROOT</span>/etc/skel/.bashrc
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> adduser <span class="token parameter variable">--gecos</span> <span class="token string">&#39;&#39;</span> --disabled-password ubuntu
 
<span class="token comment"># 配置网络 https://ubuntu.com/server/docs/network-configuration</span>
<span class="token function">sudo</span> <span class="token function">tee</span> <span class="token variable">$CHROOT</span>/etc/netplan/00-networkd.yaml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
network:
   version: 2
   renderer: networkd
   ethernets:
      eth0:
         dhcp4: true
EOF</span>

<span class="token comment">## 4、最小化桌面</span>
<span class="token comment"># 精简版本</span>
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> <span class="token function">env</span> <span class="token assign-left variable">DEBIAN_FRONTEND</span><span class="token operator">=</span>noninteractive <span class="token punctuation">\\</span>
    <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token punctuation">\\</span>
        ubuntu-desktop-minimal <span class="token punctuation">\\</span>
        networkd-dispatcher <span class="token punctuation">\\</span>
        netplan.io <span class="token punctuation">\\</span>
        language-pack-gnome-zh-hans
 
<span class="token comment"># 安装Chrome浏览器</span>
<span class="token function">wget</span> https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
<span class="token function">cp</span> ./google-chrome-stable_current_amd64.deb <span class="token variable">$CHROOT</span>/
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> <span class="token function">env</span> <span class="token assign-left variable">DEBIAN_FRONTEND</span><span class="token operator">=</span>noninteractive dpkg <span class="token parameter variable">-i</span> google-chrome-stable_current_amd64.deb
<span class="token function">rm</span> <span class="token variable">$CHROOT</span>/google-chrome-stable_current_amd64.deb
 
<span class="token comment"># 删除Dock工具栏</span>
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> <span class="token function">env</span> <span class="token assign-left variable">DEBIAN_FRONTEND</span><span class="token operator">=</span>noninteractive <span class="token function">apt</span> remove gnome-shell-extension-ubuntu-dock <span class="token parameter variable">-y</span>
 
<span class="token comment"># 关闭，关机时检查光盘是否挂载</span>
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> <span class="token function">env</span> <span class="token assign-left variable">DEBIAN_FRONTEND</span><span class="token operator">=</span>noninteractive systemctl disable unattended-upgrades
 
<span class="token comment"># 配置谷歌浏览器自动启动</span>
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span>
<span class="token function">su</span> ubuntu
<span class="token function">mkdir</span> ~/.config/autostart <span class="token parameter variable">-p</span>
<span class="token function">tee</span> /home/ubuntu/.config/autostart/chrome.desktop<span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[Desktop Entry]
Type=Application
Name=Google Chrome
Exec=/usr/bin/google-chrome-stable --no-first-run --kiosk --noerrdialogs --start-fullscreen https://pan.bjtxra.com
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
EOF</span>
 
<span class="token comment"># 屏蔽关机时提示</span>
<span class="token function">nano</span> /sbin/casper-stop
<span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$prompt</span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">return</span> <span class="token number">0</span>   修改为： <span class="token builtin class-name">return</span> <span class="token number">0</span>
 
<span class="token builtin class-name">exit</span>
<span class="token builtin class-name">exit</span>
 
  <span class="token comment"># 原始版本</span>
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> <span class="token function">env</span> <span class="token assign-left variable">DEBIAN_FRONTEND</span><span class="token operator">=</span>noninteractive <span class="token punctuation">\\</span>
    <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token punctuation">\\</span>
        ubuntu-desktop-minimal <span class="token punctuation">\\</span>
        networkd-dispatcher <span class="token punctuation">\\</span>
        netplan.io <span class="token punctuation">\\</span>
        firefox- gedit- eog- <span class="token punctuation">\\</span>
        evince- gnome-characters- <span class="token punctuation">\\</span>
        gnome-user-docs- <span class="token punctuation">\\</span>
        gnome-font-viewer- <span class="token punctuation">\\</span>
        gnome-online-accounts- <span class="token punctuation">\\</span>
        gnome-disk-utility- <span class="token punctuation">\\</span>
        gnome-screenshot- <span class="token punctuation">\\</span>
        gnome-logs- <span class="token punctuation">\\</span>
        ubuntu-docs- <span class="token punctuation">\\</span>
        fonts-deva- <span class="token punctuation">\\</span>
        fonts-noto-cjk-extra<span class="token punctuation">\\</span>
        language-pack-gnome-zh-hans <span class="token punctuation">\\</span>
        snapd- <span class="token punctuation">\\</span>
        cups- <span class="token punctuation">\\</span>
        cups-*- <span class="token punctuation">\\</span>
        ibus- <span class="token punctuation">\\</span>
        ibus-*-
 
<span class="token function">sudo</span> <span class="token function">tee</span> <span class="token variable">$CHROOT</span>/etc/netplan/01-network-manager-all.yaml <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: NetworkManager
EOF</span>
安装字体
<span class="token function">sudo</span> <span class="token function">unzip</span> <span class="token environment constant">$HOME</span>/fonts.zip <span class="token parameter variable">-d</span> <span class="token variable">$CHROOT</span>/usr/share/fonts/truetype/microsoft
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> <span class="token function">env</span> <span class="token assign-left variable">DEBIAN_FRONTEND</span><span class="token operator">=</span>noninteractive <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> gnome-tweaks
 
<span class="token comment"># 额外字体</span>
<span class="token builtin class-name">echo</span> msttcorefonts msttcorefonts/accepted-mscorefonts-eula <span class="token keyword">select</span> <span class="token boolean">true</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> debconf-set-selections
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> ttf-mscorefonts-installer
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> debconf-show ttf-mscorefonts-installer
设置默认值
<span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">$CHROOT</span>/etc/dconf/profile <span class="token variable">$CHROOT</span>/etc/dconf/db/local.d
 
<span class="token function">sudo</span> <span class="token function">tee</span> <span class="token variable">$CHROOT</span>/etc/dconf/profile/user <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
user-db:user
system-db:local
EOF</span>
 
<span class="token function">sudo</span> <span class="token function">tee</span> <span class="token variable">$CHROOT</span>/etc/dconf/db/local.d/01-desktop <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[org/gnome/desktop/media-handling]
automount=&#39;false&#39;
 
[org/gnome/desktop/interface]
font-name=&#39;微软雅黑 11&#39;
document-font-name=&#39;微软雅黑 11&#39;
 
[org/gnome/desktop/wm/preferences]
titlebar-font=&#39;微软雅黑 Bold 11&#39;
EOF</span>
 
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> dconf update
清理挂载
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> <span class="token function">apt-get</span> autoremove <span class="token parameter variable">--purge</span> <span class="token parameter variable">-y</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> /dev/pts /dev /proc /sys<span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token function">sudo</span> <span class="token function">umount</span> <span class="token variable">$CHROOT</span><span class="token variable">$i</span><span class="token punctuation">;</span> <span class="token keyword">done</span>
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> <span class="token function">bash</span> <span class="token parameter variable">-s</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
truncate -s 0 /etc/machine-id
ln -fs /etc/machine-id /var/lib/dbus/machine-id
dpkg-divert --local --rename --add /sbin/initctl
ln -s /bin/true /sbin/initctl
EOF</span>
生成squashfs根文件系统
<span class="token function">sudo</span> mksquashfs <span class="token variable">$CHROOT</span> livecd/casper/filesystem.squashfs <span class="token parameter variable">-noappend</span> <span class="token parameter variable">-wildcards</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;var/cache/*&quot;</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;var/log/*&quot;</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;var/lib/apt/lists/*&quot;</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;usr/share/man/*&quot;</span>
 
<span class="token function">sudo</span> <span class="token function">chroot</span> <span class="token variable">$CHROOT</span> dpkg-query <span class="token parameter variable">-W</span> <span class="token parameter variable">--showformat</span><span class="token operator">=</span><span class="token string">&#39;\${Package} \${Version}\\n&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> livecd/casper/filesystem.manifest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、制作-iso" tabindex="-1"><a class="header-anchor" href="#_3、制作-iso" aria-hidden="true">#</a> 3、制作 ISO</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 生成引导菜单</span>
<span class="token function">sudo</span> <span class="token function">tee</span> livecd/boot/grub/grub.cfg <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
search --set=root --file /casper/vmlinuz
insmod all_video
set timeout=1
menuentry &quot;Ubuntu Live&quot; {
  linux /casper/vmlinuz boot=casper net.ifnames=0 locale=zh_CN.UTF-8 toram quiet splash --
  initrd /casper/initrd.img
}
menuentry &quot;Ubuntu persistent&quot; {
  linux /casper/vmlinuz boot=casper net.ifnames=0 locale=zh_CN.UTF-8 persistent quiet splash --
  initrd /casper/initrd.img
}
EOF</span>

<span class="token comment"># Create a grub UEFI image</span>
<span class="token function">sudo</span> grub-mkstandalone <span class="token punctuation">\\</span>
        <span class="token parameter variable">--format</span><span class="token operator">=</span>x86_64-efi <span class="token punctuation">\\</span>
        <span class="token parameter variable">--output</span><span class="token operator">=</span>livecd/EFI/boot/bootx64.efi <span class="token punctuation">\\</span>
        <span class="token parameter variable">--locales</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span> <span class="token punctuation">\\</span>
        <span class="token parameter variable">--fonts</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span> <span class="token punctuation">\\</span>
        <span class="token string">&quot;boot/grub/grub.cfg=livecd/boot/grub/grub.cfg&quot;</span>
 
<span class="token function">sudo</span> <span class="token assign-left variable">LC_CTYPE</span><span class="token operator">=</span>C <span class="token function">bash</span> <span class="token parameter variable">-s</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
dd if=/dev/zero of=efiboot.img bs=1M count=3 &amp;&amp; \\
mkfs.vfat efiboot.img &amp;&amp; \\
mmd -i efiboot.img efi efi/boot &amp;&amp; \\
mcopy -i efiboot.img livecd/EFI/boot/bootx64.efi ::efi/boot/
EOF</span>

<span class="token comment"># Create a grub BIOS image</span>
<span class="token function">sudo</span> grub-mkstandalone <span class="token punctuation">\\</span>
        <span class="token parameter variable">--format</span><span class="token operator">=</span>i386-pc <span class="token punctuation">\\</span>
        <span class="token parameter variable">--output</span><span class="token operator">=</span>core.img <span class="token punctuation">\\</span>
        --install-modules<span class="token operator">=</span><span class="token string">&quot;linux16 linux normal iso9660 biosdisk memdisk search tar ls&quot;</span> <span class="token punctuation">\\</span>
        <span class="token parameter variable">--modules</span><span class="token operator">=</span><span class="token string">&quot;linux16 linux normal iso9660 biosdisk search&quot;</span> <span class="token punctuation">\\</span>
        <span class="token parameter variable">--locales</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span> <span class="token punctuation">\\</span>
        <span class="token parameter variable">--fonts</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span> <span class="token punctuation">\\</span>
        <span class="token string">&quot;boot/grub/grub.cfg=livecd/boot/grub/grub.cfg&quot;</span>
 
<span class="token function">cat</span> /usr/lib/grub/i386-pc/cdboot.img core.img <span class="token operator">&gt;</span> bios.img  
 
<span class="token comment"># 制作 UEFI 启动的 ISO</span>
<span class="token function">sudo</span> xorriso <span class="token parameter variable">-as</span> <span class="token function">mkisofs</span> <span class="token punctuation">\\</span>
      -iso-level <span class="token number">3</span> <span class="token punctuation">\\</span>
      -full-iso9660-filenames <span class="token punctuation">\\</span>
      <span class="token parameter variable">-volid</span> <span class="token string">&quot;UBUNTU&quot;</span> <span class="token punctuation">\\</span>
      <span class="token parameter variable">-output</span> <span class="token string">&quot;/opt/Ubuntu-22.04-LiveCD-x86_64.iso&quot;</span> <span class="token punctuation">\\</span>
      -eltorito-boot boot/grub/bios.img <span class="token punctuation">\\</span>
      -no-emul-boot <span class="token punctuation">\\</span>
      -boot-load-size <span class="token number">4</span> <span class="token punctuation">\\</span>
      -boot-info-table <span class="token punctuation">\\</span>
      --eltorito-catalog boot/grub/boot.cat <span class="token punctuation">\\</span>
      --grub2-boot-info <span class="token punctuation">\\</span>
      --grub2-mbr /usr/lib/grub/i386-pc/boot_hybrid.img <span class="token punctuation">\\</span>
      -eltorito-alt-boot <span class="token punctuation">\\</span>
      <span class="token parameter variable">-e</span> EFI/efiboot.img <span class="token punctuation">\\</span>
      -no-emul-boot <span class="token punctuation">\\</span>
      <span class="token parameter variable">-append_partition</span> <span class="token number">2</span> 0xef efiboot.img <span class="token punctuation">\\</span>
      -graft-points <span class="token string">&quot;livecd&quot;</span> <span class="token string">&quot;/EFI/efiboot.img=efiboot.img&quot;</span> <span class="token string">&quot;/boot/grub/bios.img=bios.img&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function m(b,k){const a=t("ExternalLinkIcon");return l(),o("div",null,[r,n("ul",null,[n("li",null,[n("a",u,[s("从零制作 Ubuntu LiveCD"),e(a)])]),n("li",null,[n("a",d,[s("https://help.ubuntu.com/community/LiveCDCustomizationFromScratch"),e(a)])])]),v])}const h=i(p,[["render",m],["__file","10.Ubuntu定制.html.vue"]]);export{h as default};
