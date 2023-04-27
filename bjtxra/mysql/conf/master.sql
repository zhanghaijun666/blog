-- 查看server_id是否生效
SHOW VARIABLES LIKE '%server_id%';
-- 开放root访问权限
SELECT host, user FROM mysql.user;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
-- 刷新权限
FLUSH PRIVILEGES;
-- 创建用户
GRANT REPLICATION SLAVE ON *.* TO 'slave'@'%' IDENTIFIED BY '123456';
-- 查看主节点的状态，其中File 列需要记录下来：
SHOW MASTER STATUS;