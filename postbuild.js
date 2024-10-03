const fs = require('node:fs/promises')
const path = require('node:path')

// 要清除的 sourcemap 的目標資料夾, vite 會放在 "dist/assets"
const rootDir = path.join('./build', 'static', 'js')

async function removeSourcemap () {
  try {
    // 取得目標資料夾的 files
    const files = await fs.readdir(rootDir)

    // 遍歷 files
    files.forEach(async (file) => {
      const filePath = path.join(rootDir, file)

      // 移除 sourcemap
      if (path.extname(file) === '.map') {
        await fs.unlink(filePath)
      }

      // 移除 sourcemap 參照註解
      if (path.extname(file) === '.js') {
        const content = await fs.readFile(filePath, 'utf8')
        const removed = content.replace(/(\r\n|\n)\/\/# sourceMappingURL=\S+/g, '')
        await fs.writeFile(filePath, removed)
      }
    })

    console.log('[PostBuild] sourcemap is already removed.\n')
  } catch (err) {
    console.log('[PostBuild]', err, '\n')
  }
}

removeSourcemap()
