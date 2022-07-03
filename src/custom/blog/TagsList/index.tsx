/**
 * 用于重写 '@theme/BlogTagsListPage'
 * @author liuyuan
 * @date 2022-07-03 16:47
 * @since 0.0.0
 */

import React from 'react'
import clsx from 'clsx'
import {
    PageMetadata,
    HtmlClassNameProvider,
    ThemeClassNames,
    translateTagsPageTitle,
} from '@docusaurus/theme-common'
import BlogLayout from '@theme/BlogLayout'
import TagsListByLetter from '@theme/TagsListByLetter'
import type { Props } from '@theme/BlogTagsListPage'
import SearchMetadata from '../../components/SearchMetadata'

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
