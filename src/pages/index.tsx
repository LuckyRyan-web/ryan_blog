import React, { useCallback } from 'react'
import classnames from 'classnames'
import style from './index.module.scss'

import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext, {
    DocusaurusContextExtra,
} from '@docusaurus/useDocusaurusContext'
import HomepageFeatures from '@site/src/components/HomepageFeatures'

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext()
    return (
        <header className={classnames('hero hero--primary', style.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={style.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/intro"
                    >
                        Docusaurus Tutorial - 5min ⏱️
                    </Link>
                </div>
            </div>
        </header>
    )
}

function HomePage() {
    return (
        <div className={classnames(style.bg, style.center)}>
            <h1>小刘的网站</h1>
            <p>个人知识点系统整理</p>
        </div>
    )
}

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
    const { siteConfig } = useDocusaurusContext() as DocusaurusContextExtra

    const Link = useCallback(() => {
        window.open('https://beian.miit.gov.cn/', '_blank')
    }, [])

    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            // noFooter={true}
        >
            {/* <HomepageHeader />

            <main><HomepageFeatures /></main> */}

            <main>{<HomePage />}</main>
        </Layout>
    )
}

export default React.memo(Home)
