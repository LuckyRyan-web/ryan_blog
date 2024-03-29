// local interface file: /Users/yizhi/.vscode/extensions/qiu8310.dot-template-vscode-0.3.0/node_modules/dot-template-core/out/common/interface
import * as _ from 'dot-template-types'
import * as path from 'path'

/*
  注意：

    1. 虽然 ts 文件有很强的语法提示，但默认情况下 dot-template 并不支持，
       你需要把它编译成 js 文件并放在同目录下；不过 dot-template 也是可
       以支持处理 ts 文件的，需要你在当前项目中安装  `ts-node` 和
       `typescript` 组件。

    2. 在此脚本中使用 console 语句是不会输出在控制面板的，因为此脚本是在
       vscode 插件中执行的，插件的输出不在当前环境中；不过你可以设置配置
       项中的 dot-template-vscode.debug 为 true，并在此程序中执行：

       source.app.debug('...')

    3. 当 matches 是字符串时，可以只匹配 basename，但如果 matches 带
       路径时，就要从项目根路径开始匹配，否则无法匹配成功。(主要是是因为
       minimatch 的选项 matchBase 设置为 true 了，你可以用
       dot-template-vscode.minimatchOptions 来修改默认的配置)
 */

export default function (source: _.Source): _.IDtplConfig {
    return {
        templates: [
            {
                name: 'template/page',
                matches: (
                    _minimatch: _.IMinimatchFunction,
                    source: _.Source
                ) => {
                    if (!source.isDirectory) {
                        return false
                    }

                    const { rawModuleName, relativeFilePath } = source.basicData

                    // 在 pages 中大小写都要生成 mdx 文件
                    if (!relativeFilePath.startsWith('src/pages/')) {
                        return false
                    }

                    return true
                },
            },
            {
                name: 'template/page',
                matches: (
                    _minimatch: _.IMinimatchFunction,
                    source: _.Source
                ) => {
                    if (!source.isDirectory) {
                        return false
                    }

                    const { rawModuleName, relativeFilePath } = source.basicData

                    // 小写不生成
                    if (/^[a-z]/.test(rawModuleName)) {
                        return false
                    }

                    // 在 pages 中大小写都要生成 mdx 文件
                    if (!relativeFilePath.startsWith('src/custom')) {
                        return false
                    }

                    return true
                },
            },
            {
                name: 'template/components',
                matches: (
                    _minimatch: _.IMinimatchFunction,
                    source: _.Source
                ) => {
                    if (!source.isDirectory) {
                        return false
                    }

                    const { rawModuleName, relativeFilePath } = source.basicData

                    // 小写不生成
                    // if (/^[a-z]/.test(rawModuleName)) {
                    //     return false
                    // }

                    if (!relativeFilePath.startsWith('src/components')) {
                        return false
                    }

                    return true
                },
            },
            {
                name: 'template/mdx/algorithm/$fileName$.mdx.dtpl',
                matches: (
                    _minimatch: _.IMinimatchFunction,
                    source: _.Source
                ) => {
                    if (!source.isFile) {
                        return false
                    }

                    const { rawModuleName, relativeFilePath, fileExt } =
                        source.basicData

                    if (!relativeFilePath.startsWith('algorithm')) {
                        return false
                    }

                    if (fileExt.indexOf('mdx') !== -1) {
                        return true
                    }
                },
            },
            {
                name: 'template/mdx/$fileName$.mdx.dtpl',
                matches: (
                    _minimatch: _.IMinimatchFunction,
                    source: _.Source
                ) => {
                    if (!source.isFile) {
                        return false
                    }

                    const { fileExt } = source.basicData

                    if (fileExt.indexOf('mdx') !== -1) {
                        return true
                    }
                },
            },
            {
                name: 'template/md/$fileName$.md.dtpl',
                matches: (
                    _minimatch: _.IMinimatchFunction,
                    source: _.Source
                ) => {
                    if (!source.isFile) {
                        return false
                    }

                    const { fileExt } = source.basicData

                    if (fileExt.indexOf('md') !== -1) {
                        return true
                    }
                },
            },
        ],

        globalData: {
            projectName: 'blog-vite',
        },
    }
}
