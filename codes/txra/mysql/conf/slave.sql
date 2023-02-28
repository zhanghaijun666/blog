-- 查看server_id是否生效
SHOW VARIABLES LIKE '%server_id%';
-- 开放root访问权限
SELECT host, user FROM mysql.user;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
-- 刷新权限
FLUSH PRIVILEGES;
-- slave中指向master 注意这里的 bedrock-db-master.bedrock-cloud 和 mysql-bin.000003 ，都是上面主节点中的：
CHANGE MASTER TO MASTER_HOST='mysql-master',MASTER_USER='slave',MASTER_PASSWORD='123456',MASTER_LOG_FILE='mysql-bin.000003',MASTER_LOG_POS=0,MASTER_PORT=3306;
-- 开始同步
start slave;
-- 查看同步的状态： Slave_IO_Running: Yes Slave_SQL_Running: Yes 即可
show slave status;