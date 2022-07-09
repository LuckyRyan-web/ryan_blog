/**
 * blog 标签列表
 * @author liuyuan
 * @date 2022-07-09 15:14
 * @since 0.0.0
 */

import React from 'react'
import BlogLayout from '@theme/BlogLayout'
import TagsListByLetter from '@theme/TagsListByLetter'
import {
    PageMetadata,
    HtmlClassNameProvider,
    ThemeClassNames,
    translateTagsPageTitle,
} from '@docusaurus/theme-common'
import SearchMetadata from '../SearchMetadata'
import type { Props } from '@theme/BlogTagsListPage'
import clsx from 'clsx'

export default function BlogTagsListPage({
    tags,
    sidebar,
}: Props): JSX.Element {
    const title = translateTagsPageTitle()

    return (
        <HtmlClassNameProvider
            className={clsx(
                ThemeClassNames.wrapper.blogPages,
                ThemeClassNames.page.blogTagsListPage
            )}
        >
            <PageMetadata title={title} />
            <SearchMetadata tag="blog_tags_list" />
            <BlogLayout sidebar={sidebar}>
                <h1>{title}</h1>
                <TagsListByLetter tags={tags} />
            </BlogLayout>
        </HtmlClassNameProvider>
    )
}
