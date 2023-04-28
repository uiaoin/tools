mysql backup tool
========================

A tool that can backup and upload MySQL from the host and Docker containers to Qiniuyun

Requirements
------------

* Nodejs & npm;
* Js library: zx,moment;

Installation
------------

```bash
$ git clone git@github.com:uiaoin/tools.git
$ cd mysql-backup
$ npm install
```

Usage
------------

```bash
$ cp conf.example.json conf.json 
$ ./backup.mjs
```

Configuration
------------
|  Item   | Explication  |
|  :----  | :-----  |
| bucket  | QiNiu cloud bucket name |
| backup_dir  | dir of QiNiu cloud bucket |
| mysqldump_docker  | mysqldump in docker container |
| mysqldump_local  | mysqldump in local host |
| qshell  | [qshell][1]. in local host, this tool will be run in local host |
| keep_days  | days the file exists locally |
| connections  | mysql connections |
| connections[*].type  | place of mysql server, `local` or `docker` |
| connections[*].container  | docker container name or id |
| connections[*].connection  | connection name, e.g. `localhost` in host or `mysql57` in docker |
| connections[*].username  | username of connection |
| connections[*].password  | password of connection |
| connections[*].databases  | databases to be backed up, separated by `,` |

[1]: https://developer.qiniu.com/kodo/1302/qshell
