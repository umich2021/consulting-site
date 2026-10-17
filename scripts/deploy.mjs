// Publishes dist/ to the gh-pages branch, which GitHub Pages serves.
import { execSync } from 'node:child_process'

const run = (cmd, cwd = 'dist') => execSync(cmd, { cwd, stdio: 'inherit' })
const remote = execSync('git remote get-url origin').toString().trim()

run('git init -q -b gh-pages')
run('git add -A')
run('git commit -q -m "Deploy"')
run(`git push -f ${remote} gh-pages`)
