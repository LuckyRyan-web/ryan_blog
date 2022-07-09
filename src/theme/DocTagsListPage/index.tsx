/**
 * @author liuyuan
 * @date 2022-07-03 16:46
 * @since 0.0.0
 */

import React from 'react'
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
export default function DocTagsListPage({ tags }) {
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
                            <h1>{title}</h1>
                            <TagsListByLetter tags={tags} />
                        </main>
                    </div>
                </div>
            </Layout>
        </HtmlClassNameProvider>
    )
}
