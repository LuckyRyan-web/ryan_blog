import React, { useCallback } from 'react'
import classnames from 'classnames'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext, {
    DocusaurusContextExtra,
} from '@docusaurus/useDocusaurusContext'
import style from './index.module.scss'
import HomepageFeatures from '@site/src/components/HomepageFeatures'

import { Button } from 'antd'

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

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
    const { siteConfig } = useDocusaurusContext() as DocusaurusContextExtra

    const Link = useCallback(() => {
        window.open('https://beian.miit.gov.cn/', '_blank')
    }, [])

    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
            noFooter={true}
        >
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>

            <footer
                className={classnames('footer footer--dark', style.fixFooter)}
            >
                <div className="container container-fluid">
                    <div className="text--center">
                        <div>{siteConfig.themeConfig.footer.copyright}</div>
                        <Button type="link" onClick={Link}>
                            互联网ICP备案:粤ICP备2020117319号
                        </Button>
                    </div>
                </div>
            </footer>
        </Layout>
    )
}

export default React.memo(Home)
