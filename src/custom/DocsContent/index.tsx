/**
 * 文章的内容（用于添加动画和自定义布局）
 * @author liuyuan
 * @date 2022-07-03 10:16
 * @since 0.0.0
 */

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import classnames from 'classnames'
import {
    PageMetadata,
    HtmlClassNameProvider,
    ThemeClassNames,
    useWindowSize,
} from '@docusaurus/theme-common'
import DocPaginator from '@theme/DocPaginator'
import DocVersionBanner from '@theme/DocVersionBanner'
import DocVersionBadge from '@theme/DocVersionBadge'
import DocItemFooter from '@theme/DocItemFooter'
import TOC from '@theme/TOC'
import TOCCollapsible from '@theme/TOCCollapsible'
import Heading from '@theme/Heading'
import DocBreadcrumbs from '@theme/DocBreadcrumbs'
import MDXContent from '@theme/MDXContent'
import type { Props } from '@theme/DocItem'

import styles from './style.module.scss'
import Spring from './components/Spring'
import Sidebar from './components/Sidebar'

function DocItemMetadata(props: Props): JSX.Element {
    const { content: DocContent } = props
    const { metadata, frontMatter, assets } = DocContent
    const { keywords } = frontMatter
    const { description, title } = metadata
    const image = assets.image ?? frontMatter.image

    return <PageMetadata {...{ title, description, keywords, image }} />
}

function DocItemContent(props: Props): JSX.Element {
    const { content: DocContent } = props
    const { metadata, frontMatter } = DocContent
    const {
        hide_title: hideTitle,
        hide_table_of_contents: hideTableOfContents,
        toc_min_heading_level: tocMinHeadingLevel,
        toc_max_heading_level: tocMaxHeadingLevel,
    } = frontMatter
    const { title } = metadata

    // We only add a title if:
    // - user doesn't ask to hide it with front matter
    // - the markdown content does not already contain a top-level h1 heading
    const shouldAddTitle =
        !hideTitle && typeof DocContent.contentTitle === 'undefined'

    const windowSize = useWindowSize()

    const canRenderTOC =
        !hideTableOfContents && DocContent.toc && DocContent.toc.length > 0

    const renderTocDesktop =
        canRenderTOC && (windowSize === 'desktop' || windowSize === 'ssr')

    return (
        <div className="row">
            <div
                className={classnames(
                    'col',
                    !hideTableOfContents &&
                        styles.docItemCol &&
                        styles.contentAnimation
                )}
            >
                <DocVersionBanner />
                <div
                    className={classnames(
                        styles.docItemContainer,
                        styles.docsContent
                    )}
                >
                    <article>
                        <DocBreadcrumbs />
                        <DocVersionBadge />

                        {canRenderTOC && (
                            <TOCCollapsible
                                toc={DocContent.toc}
                                minHeadingLevel={tocMinHeadingLevel}
                                maxHeadingLevel={tocMaxHeadingLevel}
                                className={classnames(
                                    ThemeClassNames.docs.docTocMobile,
                                    styles.tocMobile
                                )}
                            />
                        )}

                        <div
                            className={classnames(
                                ThemeClassNames.docs.docMarkdown,
                                'markdown'
                            )}
                        >
                            {/*
                 Title can be declared inside md content or declared through
                 front matter and added manually. To make both cases consistent,
                 the added title is added under the same div.markdown block
                 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120
                 */}
                            {shouldAddTitle && (
                                <header>
                                    <Heading as="h1">{title}</Heading>
                                </header>
                            )}

                            <Spring>
                                <MDXContent>
                                    <DocContent />
                                </MDXContent>
                            </Spring>
                        </div>

                        <DocItemFooter {...props} />
                    </article>

                    <DocPaginator
                        previous={metadata.previous}
                        next={metadata.next}
                    />
                </div>
            </div>
            {renderTocDesktop && (
                <div className="col col--3">
                    <Sidebar>
                        <TOC
                            toc={DocContent.toc}
                            minHeadingLevel={tocMinHeadingLevel}
                            maxHeadingLevel={tocMaxHeadingLevel}
                            className={ThemeClassNames.docs.docTocDesktop}
                        />
                    </Sidebar>
                </div>
            )}
        </div>
    )
}

export default function DocItem(props: Props): JSX.Element {
    console.log('props', props)

    const docHtmlClassName = `docs-doc-id-${props.content.metadata.unversionedId}`
    return (
        <HtmlClassNameProvider className={docHtmlClassName}>
            <DocItemMetadata {...props} />
            <DocItemContent {...props} />
        </HtmlClassNameProvider>
    )
}
