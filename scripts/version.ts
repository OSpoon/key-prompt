import fs from 'node:fs'
import path from 'node:path'

import { execSync } from 'child_process'
import semver from 'semver'
import type { ReleaseType } from 'semver'

import manifest, { version } from '../manifest.json'

const commitMessages = execSync('git log --format=%s -n 10', { encoding: 'utf-8' })

let releaseType: ReleaseType = "patch"
if (/BREAKING CHANGE/i.test(commitMessages)) {
  releaseType = 'major'
} else if (/feat/i.test(commitMessages)) {
  releaseType = 'minor'
} else if (/fix/i.test(commitMessages)) {
  releaseType = 'patch'
}

const newVersion = semver.inc(version, releaseType) || version
console.log(`Current version: ${version}`, path.resolve(__dirname, '../manifest.json'))
manifest.version = newVersion;
fs.writeFileSync(
  path.resolve(__dirname, '../manifest.json'),
  JSON.stringify(manifest, null, 2),
  'utf8'
)

console.log(`Version bumped to ${newVersion}`)
