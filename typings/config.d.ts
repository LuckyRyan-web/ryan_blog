declare module '@docusaurus/useDocusaurusContext' {
    import type { DocusaurusConfig, DocusaurusContext } from '@docusaurus/types'
    import { ThemeConfig } from '@docusaurus/preset-classic'

    // export type DocusaurusContextExtra = DocusaurusContext & {
    //     themeConfig: ThemeConfig & {
    //         footer: {
    //             copyright: string
    //         }
    //     }
    // }

    export interface DocusaurusContextExtra extends DocusaurusContext {
        siteConfig: DocusaurusConfig & {
            themeConfig: ThemeConfig & {
                footer: {
                    copyright: string
                }
            }
        }
    }

    export default function useDocusaurusContext(): DocusaurusContextExtra
}
