/**
 * @author liuyuan
 * @date 2022-05-19 18:05
 * @since 0.0.0
 */

import React from 'react'
//import classnames from 'classnames'
//import style from './style.module.scss'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {

    return (
        <Layout>
            This is index page
        </Layout>
    )
}

export default React.memo(About)
