#! /usr/bin/env node

import { $ } from "zx";
import moment  from "moment";
import fs from "fs";
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const conf = require('./conf.json')
const time = moment().format('YYYY_MM_DD_hhmmss')
const date = moment().format('YYYY_MM_DD')
const path = `./data/${date}`
if (! fs.existsSync(path)) {
    await $`mkdir ${path}`.quiet()
}

conf.connections.forEach((conn, idx) => {
    conn.databases.split(',').forEach(async (db) => {
        const fileFullName = `${path}/${db}_${time}.sql`
        const serverFileName = `${conf.backup_dir}/${db}/${db}_${time}.sql`

        if (conn.type === 'docker') {
            await $`docker exec ${conn.container} sh -c '${conf.mysqldump_docker} -h${conn.connection} -u${conn.username} -p${conn.password} ${db}' > ${fileFullName}`.quiet()
        } else if(conn.type === 'local') {
            await $`${conf.mysqldump_local} -h${conn.connection} -u${conn.username} -p${conn.password} ${db} > ${fileFullName}`.quiet()
        }
        await $`${conf.qshell} rput ${conf.bucket} ${serverFileName} ${fileFullName} --overwrite`.quiet()
    })
});

// 删除n天以前的备份
(await $`ls ./data/`.quiet()).stdout.trim().split("\n").forEach((path) => {
    if (moment().diff(moment(path, "YYYY_MM_DD"), 'days') >= conf.keep_days) {
        $`rm -rf  ./data/${path}`.quiet()
    }
});
