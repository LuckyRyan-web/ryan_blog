// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const lightCodeDuotoneTheme = require('prism-react-renderer/themes/duotoneLight')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
    plugins: [
        'docusaurus-plugin-sass',
        [
            '@ryan-liu/plugin-content-docs',
            {
                id: 'algorithm',
                path: 'algorithm',
                routeBasePath: 'algorithm',
                sidebarPath: require.resolve('./sidebars.js'),
                // docTagDocListComponent: '@site/src/custom/docs/TagsDetail',
                // docTagsListComponent: '@site/src/custom/docs/TagsList',
                docItemComponent: '@site/src/custom/DocsContent',
                remarkPlugins: [require('mdx-mermaid')],
            },
        ],
        [
            '@ryan-liu/plugin-content-docs',
            {
                id: 'interview',
                path: 'interview',
                routeBasePath: 'interview',
                sidebarPath: require.resolve('./sidebars.js'),
                // docTagDocListComponent: '@site/src/custom/docs/TagsDetail',
                // docTagsListComponent: '@site/src/custom/docs/TagsList',
                docItemComponent: '@site/src/custom/DocsContent',
            },
        ],
        // [
        //     // require.resolve(
        //     //     './src/plugins/docusaurus-plugin-extent-frontMatter/index.js'
        //     // ),
        //     // './src/plugins/docusaurus-plugin-extent-frontMatter/index.js',
        //     '@ryan-liu/docusaurus-plugin-extends-frontmatter',
        //     {},
        // ],
    ],
    title: '小刘的博客',
    tagline: '一个勤奋的猫奴',
    url: 'https://luckyryan.cn',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'facebook', // Usually your GitHub org/user name.
    projectName: 'docusaurus', // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".

    // i18n: {
    //     // defaultLocale: 'en',
    //     defaultLocale: 'zh-CN',
    //     locales: ['en', 'zh-CN'],
    // },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            {
                docs: {
                    // sidebarPath: require.resolve('./sidebars.js'),
                    // sidebarCollapsed: false,
                    // sidebarCollapsible: false,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                    // remarkPlugins: [require('mdx-mermaid')],
                },
                blog: {
                    showReadingTime: true,
                    readingTime: ({
                        content,
                        frontMatter,
                        defaultReadingTime,
                    }) =>
                        defaultReadingTime({
                            content,
                            options: { wordsPerMinute: 300 },
                        }),
                    postsPerPage: 10,
                    blogSidebarTitle: '全部实践文章',
                    blogTitle: 'ryan-liu 博客！',
                    blogDescription: '这是个用 Docusaurus 搭建的博客！',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    // blogTagsListComponent: '@site/src/custom/blog/TagsList',
                    // blogTagsPostsComponent: '@site/src/custom/blog/TagsDetail',
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                theme: {
                    customCss: [require.resolve('./src/css/custom.css')],
                },
            },
        ],
    ],

    themes: ['@docusaurus/theme-live-codeblock'],
    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: '小刘的博客',
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/nuomi.png',
                },
                items: [
                    // {
                    //     type: 'doc',
                    //     docId: 'intro',
                    //     position: 'left',
                    //     label: '教程',
                    // },
                    { to: '/blog', label: 'Blog', position: 'left' },
                    // { to: '/about', label: 'test', position: 'left' },
                    {
                        to: '/algorithm',
                        label: '算法积累',
                        position: 'left',
                        // activeBaseRegex: `/community/`,
                    },
                    { to: '/interview', label: '面试题积累', position: 'left' },

                    // {
                    //     type: 'doc',
                    //     docId: 'community',
                    //     position: 'left',
                    //     label: '测试',
                    // },
                    // {
                    //     type: 'localeDropdown',
                    //     position: 'right',
                    // },
                    {
                        href: 'https://github.com/LuckyRyan-web',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                copyright: `Copyright © ${new Date().getFullYear()} Ryan liu, Inc. Built with Docusaurus.`,
            },
            docs: {
                sidebar: {
                    hideable: true,
                    autoCollapseCategories: true,
                },
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                defaultLanguage: 'typescript',
            },
            // algolia: {
            //     contextualSearch: true,
            // },
        }),
}

module.exports = config
