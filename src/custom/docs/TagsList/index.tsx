/**
 * 用于重写 @theme/DocTagsListPage
 * @author liuyuan
 * @date 2022-07-03 16:46
 * @since 0.0.0
 */

import React from 'react'
import clsx from 'classnames'
import {
    PageMetadata,
    HtmlClassNameProvider,
    ThemeClassNames,
    translateTagsPageTitle,
} from '@docusaurus/theme-common'
import Layout from '@theme/Layout'
import TagsListByLetter from '@theme/TagsListByLetter'
import SearchMetadata from '@theme/SearchMetadata'
import type { Props } from '@theme/DocTagsListPage'

export default function DocTagsListPage({ tags }: Props): JSX.Element {
    const title = translateTagsPageTitle()

    console.log('tags', tags)

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
                            <h1>{title}</h1>
                            <TagsListByLetter tags={tags} />
                        </main>
                    </div>
                </div>
            </Layout>
        </HtmlClassNameProvider>
    )
}
