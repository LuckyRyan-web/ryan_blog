/**
 * @author liuyuan
 * @date 2022-07-03 09:15
 * @since 0.0.0
 */

import React from 'react'
//import classnames from 'classnames'
//import style from './style.module.scss'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import * as tags from '@theme/BlogTagsListPage'
// import {
//     Tags,
//     TagList,
//     type TagType,
//     type User,
//     type Tag,
//   } from '@site/src/data/users';

interface IndexProps {}

const Index: React.FC<IndexProps> = (props) => {
    return <Layout>This is index page</Layout>
}

export default React.memo(Index)
