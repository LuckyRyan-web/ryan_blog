/**
 * @author liuyuan
 * @date 2022-07-03 16:46
 * @since 0.0.0
 */

import React, { useMemo } from 'react'
import Layout from '@theme/Layout'
import {
    PageMetadata,
    HtmlClassNameProvider,
    ThemeClassNames,
    translateTagsPageTitle,
} from '@docusaurus/theme-common'
import TagsListByLetter from '@theme/TagsListByLetter'
import SearchMetadata from '@theme/SearchMetadata'
import clsx from 'clsx'
import Tags from '@site/src/components/TagsList'
import DocsList, { DocsType } from '@site/src/components/DocsList'
import style from './style.module.scss'
import useGlobalData from '@docusaurus/useGlobalData'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export default function DocTagsListPage({ tags }) {
    const data = useGlobalData()
    const context = useDocusaurusContext()

    console.log('global data', data)
    console.log('context', context)
    const allDocs = useMemo(() => {
        const allDocs = data['docusaurus-plugin-content-docs']['algorithm'][
            'versions'
        ] as {
            docs: DocsType[]
        }[]

        const docs = []

        allDocs.forEach((v) => {
            v.docs.forEach((i) => {
                if (i.id !== 'README') {
                    docs.push({
                        ...i,
                    })
                }
            })
        })

        return docs
    }, [data])

    const title = translateTagsPageTitle()
    return (
        <HtmlClassNameProvider
            className={clsx(
                ThemeClassNames.wrapper.docsPages,
                ThemeClassNames.page.docsTagsListPage
            )}
        >
            <PageMetadata title={title} />
            <SearchMetadata tag="doc_tags_list" />
            <Layout>
                <div className="container margin-vert--lg">
                    <div className="row">
                        <main className="col col--8 col--offset-2">
                            {/* <h1>{title}</h1> */}
                            <div className={style.title}>所有标签</div>
                            <Tags tags={tags} />
                            <DocsList docs={allDocs} />
                            {/* <TagsListByLetter tags={tags} /> */}
                        </main>
                    </div>
                </div>
            </Layout>
        </HtmlClassNameProvider>
    )
}
