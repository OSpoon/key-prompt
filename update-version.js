const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const semver = require('semver')

const versionPath = path.resolve(__dirname, './manifest.json')
const manifest = JSON.parse(fs.readFileSync(versionPath))

// 读取 commit message, 分析下一次升级的 ReleaseType
const commitMessages = execSync('git log --format=%s -n 10', { encoding: 'utf-8' })
let releaseType = "patch"
if (/BREAKING CHANGE/i.test(commitMessages)) {
    releaseType = 'major'
} else if (/feat/i.test(commitMessages)) {
    releaseType = 'minor'
} else if (/fix/i.test(commitMessages)) {
    releaseType = 'patch'
}

// 按照 ReleaseType 生成新的版本号
const newVersion = semver.inc(manifest.version, releaseType) || version
manifest.version = newVersion;
fs.writeFileSync(
    versionPath,
    JSON.stringify(manifest, null, 2),
    'utf8'
)

console.log(`Version bumped to ${newVersion}`)
