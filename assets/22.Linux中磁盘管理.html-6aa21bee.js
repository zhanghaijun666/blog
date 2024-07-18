import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as e,f as a}from"./app-efa5e96e.js";const i={},l=a(`<h2 id="一、磁盘分区" tabindex="-1"><a class="header-anchor" href="#一、磁盘分区" aria-hidden="true">#</a> 一、磁盘分区</h2><p>在Linux下，磁盘格式化、分区和挂载的详细步骤如下所示：</p><h3 id="_1-确定磁盘设备" tabindex="-1"><a class="header-anchor" href="#_1-确定磁盘设备" aria-hidden="true">#</a> 1.确定磁盘设备</h3><p>使用以下命令来查看可用磁盘设备：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">fdisk</span> <span class="token parameter variable">-l</span>
<span class="token comment"># Disk /dev/mmcblk1: 7456 MB, 7818182656 bytes, 15269888 sectors</span>
<span class="token comment"># 238592 cylinders, 4 heads, 16 sectors/track</span>
<span class="token comment"># Units: sectors of 1 * 512 = 512 bytes</span>

<span class="token comment"># Disk /dev/mmcblk1 doesn&#39;t contain a valid partition table</span>
<span class="token comment"># Disk /dev/mmcblk1boot0: 4 MB, 4194304 bytes, 8192 sectors</span>
<span class="token comment"># 128 cylinders, 4 heads, 16 sectors/track</span>
<span class="token comment"># Units: sectors of 1 * 512 = 512 bytes</span>

<span class="token comment"># Disk /dev/mmcblk1boot0 doesn&#39;t contain a valid partition table</span>
<span class="token comment"># Disk /dev/mmcblk1boot1: 4 MB, 4194304 bytes, 8192 sectors</span>
<span class="token comment"># 128 cylinders, 4 heads, 16 sectors/track</span>
<span class="token comment"># Units: sectors of 1 * 512 = 512 bytes</span>

<span class="token comment"># Disk /dev/mmcblk1boot1 doesn&#39;t contain a valid partition table</span>
<span class="token comment"># Disk /dev/mmcblk0: 15 GB, 15931539456 bytes, 31116288 sectors</span>
<span class="token comment"># 486192 cylinders, 4 heads, 16 sectors/track</span>
<span class="token comment"># Units: sectors of 1 * 512 = 512 bytes</span>

<span class="token comment"># Device       Boot StartCHS    EndCHS        StartLBA     EndLBA    Sectors  Size Id Type</span>
<span class="token comment"># /dev/mmcblk0p1 *  0,32,33     8,73,1            2048     133119     131072 64.0M  c Win95 FAT32 (LBA)</span>
<span class="token comment"># /dev/mmcblk0p2    8,73,2      912,229,21      133120   31116287   30983168 14.7G 83 Linux</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面可以得出：</p><ul><li>/dev/mmcblk1：容量为7456 MB的磁盘。238592柱面，4个磁头，每个磁道16个扇区。磁盘上没有有效的分区表。</li><li>/dev/mmcblk1boot0和/dev/mmcblk1boot1是磁盘的引导区，大小为4 MB，但它们没有有效的分区表。</li><li>/dev/mmcblk0：容量为15 GB的磁盘。486192柱面，4个磁头，每个磁道16个扇区。包含两个分区：</li><li>/dev/mmcblk0p1是引导分区，大小为64.0M，使用Win95 FAT32（LBA）文件系统。</li><li>/dev/mmcblk0p2是第二个分区，大小为14.7G，使用Linux文件系统（ID为83）。</li></ul><h3 id="_2-使用fdisk命令对磁盘进行分区" tabindex="-1"><a class="header-anchor" href="#_2-使用fdisk命令对磁盘进行分区" aria-hidden="true">#</a> 2.使用fdisk命令对磁盘进行分区</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">fdisk</span> /dev/mmcblk1

<span class="token comment"># The number of cylinders for this disk is set to 238592.</span>
<span class="token comment"># There is nothing wrong with that, but this is larger than 1024,</span>
<span class="token comment"># and could in certain setups cause problems with:</span>
<span class="token comment"># 1) software that runs at boot time (e.g., old versions of LILO)</span>
<span class="token comment"># 2) booting and partitioning software from other OSs</span>
<span class="token comment">#    (e.g., DOS FDISK, OS/2 FDISK)</span>

<span class="token comment"># Command (m for help):</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>此时命令栏提示输入<code>m</code>，可以看到有如下参数</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Command (m for help): m</span>
<span class="token comment"># Command Action</span>
<span class="token comment"># a: 切换引导标志（toggle a bootable flag）</span>
<span class="token comment"># b: 编辑BSD磁盘标签（edit bsd disklabel）</span>
<span class="token comment"># c: 切换DOS兼容性标志（toggle the dos compatibility flag）</span>
<span class="token comment"># d: 删除分区（delete a partition）</span>
<span class="token comment"># l: 列出已知的分区类型（list known partition types）</span>
<span class="token comment"># n: 添加新分区（add a new partition）</span>
<span class="token comment"># o: 创建一个新的空DOS分区表（create a new empty DOS partition table）</span>
<span class="token comment"># p: 打印分区表（print the partition table）</span>
<span class="token comment"># q: 退出而不保存更改（quit without saving changes）</span>
<span class="token comment"># s: 创建一个新的空Sun磁盘标签（create a new empty Sun disklabel）</span>
<span class="token comment"># t: 更改分区的系统ID（change a partition&#39;s system id）</span>
<span class="token comment"># u: 更改显示/输入单位（change display/entry units）</span>
<span class="token comment"># v: 验证分区表（verify the partition table）</span>
<span class="token comment"># w: 将表写入磁盘并退出（write table to disk and exit）</span>
<span class="token comment"># x: 额外功能（仅供专家使用）（extra functionality (experts only)） 继续往下，进行创建分区操作：</span>

<span class="token comment"># Command (m for help): </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>使用命令<code>n</code>创建一个新的分区：</p></blockquote><ul><li>选择主分区（primary partition）类型，输入<code>p</code>。</li><li>输入分区号，这里选择<code>1</code>。</li><li>输入起始扇区，默认为16，可以直接按<code>回车键</code>使用默认值。</li><li>输入结束扇区或者分区大小，这里输入<code>+32M</code>表示分区大小为32MB。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Command (m for help): n</span>
<span class="token comment"># Partition type</span>
<span class="token comment">#    p   primary partition (1-4)</span>
<span class="token comment">#    e   extended</span>
<span class="token comment"># p</span>
<span class="token comment"># Partition number (1-4): 1</span>
<span class="token comment"># First sector (16-15269887, default 16): </span>
<span class="token comment"># Using default value 16</span>
<span class="token comment"># Last sector or +size{,K,M,G,T} (16-15269887, default 15269887): +32M</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>使用命令<code>n</code>再次创建一个新的分区：</p></blockquote><ul><li>选择主分区（primary partition）类型，输入<code>p</code>。</li><li>输入分区号，这里选择<code>2</code>。</li><li>输入起始扇区，默认为65552，可以直接按<code>回车键</code>使用默认值。</li><li>输入结束扇区或者分区大小，这里使用<code>默认值</code>15269887。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Command (m for help): n</span>
<span class="token comment"># Partition type</span>
<span class="token comment">#    p   primary partition (1-4)</span>
<span class="token comment">#    e   extended</span>

<span class="token comment"># p</span>
<span class="token comment"># Partition number (1-4): 2</span>
<span class="token comment"># First sector (65552-15269887, default 65552): </span>
<span class="token comment"># Using default value 65552</span>
<span class="token comment"># Last sector or +size{,K,M,G,T} (65552-15269887, default 15269887): </span>
<span class="token comment"># Using default value 15269887</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>使用命令<code>t</code>设置分区类型：</p></blockquote><ul><li>输入要设置类型的分区号，这里选择<code>1</code>。</li><li>输入十六进制代码（Hex code），这里输入<code>c</code>表示将分区1的系统类型设置为Win95 FAT32（LBA）。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Command (m for help): t</span>
<span class="token comment"># Partition number (1-4): 1</span>
<span class="token comment"># Hex code (type L to list codes): c</span>
<span class="token comment"># Changed system type of partition 1 to c (Win95 FAT32 (LBA))</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>使用命令<code>a</code>设置引导标志：</p></blockquote><ul><li>输入要设置引导标志的分区号，这里选择<code>1</code>。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Command (m for help): a</span>
<span class="token comment"># Partition number (1-4): 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>使用命令<code>w</code>保存更改并退出：</p></blockquote><ul><li>确认分区表已经被修改，并且调用ioctl()重新读取分区表。</li><li>提示分区表已经被修改，并成功保存更改。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Command (m for help): w</span>
<span class="token comment"># The partition table has been altered.</span>
<span class="token comment"># Calling ioctl() to re-read partition table</span>
<span class="token comment"># [ 1334.059435]  mmcblk1: p1 p2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>最后，磁盘分区表将被修改，分区1被设置为Win95 FAT32（LBA）类型，并且设置为引导分区。</p><p>请注意，这些操作可能会对磁盘上的数据产生影响，请确保在进行此类操作之前备份重要数据。</p></blockquote><h2 id="二、磁盘格式化" tabindex="-1"><a class="header-anchor" href="#二、磁盘格式化" aria-hidden="true">#</a> 二、磁盘格式化</h2><p>磁盘格式化是指在磁盘上创建文件系统以准备存储数据的过程。通过格式化，磁盘将被分区划分为逻辑块，并创建用于存储和组织文件的文件系统结构。格式化磁盘将清除磁盘上的所有数据，并为其提供一个干净的文件系统环境，使其可以开始存储新的数据。</p><p>这里，我们将上面的两个分区分别格式化为Fat32格式的文件系统和ext4格式的文件系统</p><ul><li>将<code>/dev/mmcblk1p1</code>格式化为<code>Fat32</code>格式的文件系统</li><li>将<code>/dev/mmcblk1p2</code>格式化为<code>ext4</code>格式的文件系统</li></ul><blockquote><p>Fat32格式，使用命令如下：</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mkfs.vfat <span class="token parameter variable">-F</span> <span class="token number">32</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;boot&quot;</span> /dev/mmcblk1p1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>每个选项的含义解释如下：</p><ul><li>-F 32：指定创建的文件系统类型为FAT32。</li><li>-n MyVolume：设置卷标为&quot;MyVolume&quot;，该卷标将作为文件系统的名称显示。</li><li><code>/dev/mmcblk1p1</code>：是要格式化的设备或分区</li></ul><p>ext4格式，使用命令如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mkfs.ext4 <span class="token parameter variable">-F</span> <span class="token parameter variable">-L</span> <span class="token string">&quot;rootfs&quot;</span> /dev/mmcblk1p2
<span class="token comment"># -/bin/sh: mkfs.ext4: not found </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>每个选项的含义解释如下：</p><ul><li>-F：强制进行格式化，即使设备已经被挂载。</li><li>-L &quot;rootfs&quot;：设置文件系统的标签为&quot;rootfs&quot;，该标签将作为文件系统的名称显示。</li><li><code>/dev/mmcblk1p2</code>：要格式化的设备或分区。</li></ul><p>这里我们的文件系统不支持mkfs.ext4格式，但是可以使用它的孪生兄弟“mke2fs”，指令如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mke2fs</span> <span class="token parameter variable">-F</span> <span class="token parameter variable">-L</span> <span class="token string">&quot;rootfs&quot;</span> /dev/mmcblk1p2

<span class="token comment"># Filesystem label=rootfs</span>
<span class="token comment"># OS type: Linux</span>
<span class="token comment"># Block size=4096 (log=2)</span>
<span class="token comment"># Fragment size=4096 (log=2)</span>
<span class="token comment"># 475136 inodes, 1900542 blocks</span>
<span class="token comment"># 95027 blocks (5%) reserved for the super user</span>
<span class="token comment"># First data block=0</span>
<span class="token comment"># Maximum filesystem blocks=4194304</span>
<span class="token comment"># 58 block groups</span>
<span class="token comment"># 32768 blocks per group, 32768 fragments per group</span>
<span class="token comment"># 8192 inodes per group</span>
<span class="token comment"># Superblock backups stored on blocks:</span>
<span class="token comment">#         32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、磁盘挂载" tabindex="-1"><a class="header-anchor" href="#三、磁盘挂载" aria-hidden="true">#</a> 三、磁盘挂载</h2><h3 id="_1-创建挂载点" tabindex="-1"><a class="header-anchor" href="#_1-创建挂载点" aria-hidden="true">#</a> 1.创建挂载点</h3><p>首先，您需要选择一个目录作为挂载点。可以使用mkdir命令创建一个空目录作为挂载点，例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> /mnt/boot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-执行挂载命令" tabindex="-1"><a class="header-anchor" href="#_2-执行挂载命令" aria-hidden="true">#</a> 2.执行挂载命令</h3><p>使用mount命令将文件系统挂载到指定的挂载点上，例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mount</span> /dev/mmcblk1p1 /mnt/boot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用“df”指令查看是否挂载成功，命令如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">df</span> <span class="token parameter variable">-a</span>
<span class="token comment"># Filesystem           1K-blocks      Used Available Use% Mounted on</span>
<span class="token comment"># /dev/root             15141732    161948  14188824   1% /</span>
<span class="token comment"># devtmpfs                216388         0    216388   0% /dev</span>
<span class="token comment"># proc                         0         0         0   0% /proc</span>
<span class="token comment"># tmpfs                   249668         0    249668   0% /tmp</span>
<span class="token comment"># sysfs                        0         0         0   0% /sys</span>
<span class="token comment"># devpts                       0         0         0   0% /dev/pts</span>
<span class="token comment"># /dev/mmcblk1p1           32260         1     32260   0% /mnt/boot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很明显已经<code>/dev/mmcblk1p1</code>分区已经成功挂载到<code>/mnt/boot</code>目录下。</p><h3 id="_3-访问文件系统" tabindex="-1"><a class="header-anchor" href="#_3-访问文件系统" aria-hidden="true">#</a> 3.访问文件系统</h3><p>现在，可以通过挂载点来访问和操作文件系统中的文件和目录。</p><p>例如，您可以使用cd命令进入挂载点，并使用其他文件操作命令进行文件的读取、写入等操作：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /mnt/boot
<span class="token function">touch</span> test.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后掉电重启开发板，再次查看<code>/mnt/boot</code>下是否有test.txt文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ls</span> /mnt/boot/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>很明显是没有test.txt文件，磁盘的<code>/dev/mmcblk1p1</code>分区未进行挂载到<code>/mnt/boot</code>目录下，因此在<code>/mnt/boot</code>下是看不到test.txt文件的。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">df</span> <span class="token parameter variable">-a</span>
<span class="token comment"># Filesystem           1K-blocks      Used Available Use% Mounted on</span>
<span class="token comment"># /dev/root             15141732    161948  14188824   1% /</span>
<span class="token comment"># devtmpfs                216388         0    216388   0% /dev</span>
<span class="token comment"># proc                         0         0         0   0% /proc</span>
<span class="token comment"># tmpfs                   249668         0    249668   0% /tmp</span>
<span class="token comment"># sysfs                        0         0         0   0% /sys</span>
<span class="token comment"># devpts                       0         0         0   0% /dev/pts</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>test.txt文件是保存在磁盘的<code>/dev/mmcblk1p1</code>分区，掉电后需要手动挂载到<code>/mnt/boot</code>该目录下，才能查看到test.txt文件，如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mount</span> /dev/mmcblk1p1 /mnt/boot
<span class="token comment"># [  179.885442] FAT-fs (mmcblk1p1): Volume was not properly unmounted. Some data may be corrupt. Please run fsck.</span>

<span class="token function">ls</span> /mnt/boot/
<span class="token comment"># test.txt</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个分区挂载如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> /mnt/rootfs
<span class="token function">mount</span> /dev/mmcblk1p2 /mnt/rootfs
<span class="token function">df</span> <span class="token parameter variable">-h</span>
<span class="token comment"># Filesystem                Size      Used Available Use% Mounted on</span>
<span class="token comment"># /dev/root                14.4G    158.2M     13.5G   1% /</span>
<span class="token comment"># devtmpfs                211.3M         0    211.3M   0% /dev</span>
<span class="token comment"># tmpfs                   243.8M         0    243.8M   0% /tmp</span>
<span class="token comment"># /dev/mmcblk1p1           31.5M       512     31.5M   0% /mnt/boot</span>
<span class="token comment"># /dev/mmcblk1p2            7.1G     20.0K      6.8G   0% /mnt/rootfs</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、开机自动挂载" tabindex="-1"><a class="header-anchor" href="#四、开机自动挂载" aria-hidden="true">#</a> 四、开机自动挂载</h2><h3 id="_1-设备路径挂载" tabindex="-1"><a class="header-anchor" href="#_1-设备路径挂载" aria-hidden="true">#</a> 1.设备路径挂载</h3><p>如果希望在系统启动时自动挂载分区，可以编辑<code>/etc/fstab</code>文件并添加相应的条目。例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#&lt;file system&gt;  &lt;mount point&gt;   &lt;type&gt;  &lt;options&gt;       &lt;dump&gt;  &lt;pass&gt;</span>
proc            /proc           proc    defaults        <span class="token number">0</span>       <span class="token number">0</span>
tmpfs           /tmp            tmpfs   defaults        <span class="token number">0</span>       <span class="token number">0</span>
sysfs           /sys            sysfs   defaults        <span class="token number">0</span>       <span class="token number">0</span>
/dev/mmcblk1p1  /mnt/boot       vfat    defaults        <span class="token number">0</span>       <span class="token number">0</span>
/dev/mmcblk1p2  /mnt/rootfs     ext4    defaults        <span class="token number">0</span>       <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新启动开发板，使用<code>df</code>命令查看是否自动挂载</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">df</span> <span class="token parameter variable">-h</span>
<span class="token comment"># Filesystem                Size      Used Available Use% Mounted on</span>
<span class="token comment"># /dev/root                14.4G    158.2M     13.5G   1% /</span>
<span class="token comment"># devtmpfs                211.3M         0    211.3M   0% /dev</span>
<span class="token comment"># tmpfs                   243.8M         0    243.8M   0% /tmp</span>
<span class="token comment"># /dev/mmcblk1p1           31.5M       512     31.5M   0% /mnt/boot</span>
<span class="token comment"># /dev/mmcblk1p2            7.1G     20.0K      6.8G   0% /mnt/rootfs</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-uuid挂载" tabindex="-1"><a class="header-anchor" href="#_2-uuid挂载" aria-hidden="true">#</a> 2.UUID挂载</h3><p>另一种挂载方法，这里在教大家使用UUID来进行自动挂载，如下：</p><p>获取分区的UUID：使用以下命令各分区的UUID：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>blkid 
<span class="token comment"># /dev/mmcblk0p2: LABEL=&quot;rootfs&quot; UUID=&quot;4bdc82c7-5e83-4992-9966-cd99a2317944&quot; TYPE=&quot;ext4&quot;</span>
<span class="token comment"># /dev/mmcblk0p1: LABEL=&quot;boot&quot; UUID=&quot;DF8D-2A71&quot; TYPE=&quot;vfat&quot;</span>
<span class="token comment"># /dev/mmcblk1p2: LABEL=&quot;rootfs&quot; UUID=&quot;54b75bd6-7cdf-4e80-aa48-1af163bf61f3&quot; TYPE=&quot;ext2&quot;</span>
<span class="token comment"># /dev/mmcblk1p1: TYPE=&quot;vfat&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编辑<code>/etc/fstab</code>文件并添加相应的条目。例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#&lt;file system&gt;  &lt;mount point&gt;   &lt;type&gt;  &lt;options&gt;       &lt;dump&gt;  &lt;pass&gt;</span>
proc            /proc           proc    defaults        <span class="token number">0</span>       <span class="token number">0</span>
tmpfs           /tmp            tmpfs   defaults        <span class="token number">0</span>       <span class="token number">0</span>
sysfs           /sys            sysfs   defaults        <span class="token number">0</span>       <span class="token number">0</span>
<span class="token assign-left variable">UUID</span><span class="token operator">=</span>54b75bd6-7cdf-4e80-aa48-1af163bf61f3   /mnt/rootfs ext4 defaults <span class="token number">0</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>保存后，重启开发板，成功自动挂载，如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">df</span> <span class="token parameter variable">-h</span>
Filesystem                Size      Used Available Use% Mounted on
/dev/root                <span class="token number">14</span>.4G    <span class="token number">158</span>.2M     <span class="token number">13</span>.5G   <span class="token number">1</span>% /
devtmpfs                <span class="token number">211</span>.3M         <span class="token number">0</span>    <span class="token number">211</span>.3M   <span class="token number">0</span>% /dev
tmpfs                   <span class="token number">243</span>.8M         <span class="token number">0</span>    <span class="token number">243</span>.8M   <span class="token number">0</span>% /tmp
/dev/mmcblk1p2            <span class="token number">7</span>.1G     <span class="token number">20</span>.0K      <span class="token number">6</span>.8G   <span class="token number">0</span>% /mnt/rootfs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在挂载文件系统时，您可以使用设备路径（如 <code>/dev/mmcblk1p1</code>）或文件系统的UUID来标识要挂载的分区。这两种方法各有一些区别和好处：</p><h4 id="_1-设备路径-dev-mmcblk1p1" tabindex="-1"><a class="header-anchor" href="#_1-设备路径-dev-mmcblk1p1" aria-hidden="true">#</a> 1.设备路径 (/dev/mmcblk1p1)</h4><ul><li>标识分区的路径：使用设备路径是一种直接而简单的方法来标识要挂载的分区。它基于设备文件的物理路径，可以明确地指定要挂载的分区。例如，<code>/dev/mmcblk1p1</code> 表示第二个MMC类型的磁盘的第一个分区。</li><li>相对容易记忆：设备路径通常较短且易于记忆，因为它们直接与设备文件的名称相关。</li></ul><p>但是，设备路径可能会受到设备插入和拔出的影响。如果您的系统中存在多个磁盘或设备连接状态发生变化，设备路径可能会改变。</p><h4 id="_2-文件系统uuid" tabindex="-1"><a class="header-anchor" href="#_2-文件系统uuid" aria-hidden="true">#</a> 2.文件系统UUID</h4><ul><li>标识分区的唯一性：每个文件系统都有一个唯一的UUID（通用唯一标识符），用于识别分区。UUID是在创建文件系统时生成的，并且是全局唯一的。它不受设备连接状态的影响，因此即使设备路径发生变化，UUID仍将保持不变。</li><li>稳定性和持久性：使用UUID来挂载分区可以提供更稳定和持久的挂载方式，因为即使重新启动系统或更改设备连接状态，UUID标识的分区仍然可以准确地被找到。</li><li>更适合自动化和脚本：使用UUID可以更方便地进行自动化操作和脚本编写，因为UUID提供了一个固定的标识符来唯一标识特定的分区。</li></ul><p>总的来说，使用设备路径或UUID进行挂载都是可行的方法，具体取决于您的需求和使用场景。如果您的系统中没有频繁插拔设备并且不涉及自动化操作，使用设备路径可能更加简单和直接。而如果您需要更稳定和持久的挂载方式，以及更适合自动化操作，使用UUID则更为可靠和推荐。</p>`,84),t=[l];function d(c,o){return n(),e("div",null,t)}const r=s(i,[["render",d],["__file","22.Linux中磁盘管理.html.vue"]]);export{r as default};
