/**
 * 所有的文章列表
 * @author liuyuan
 * @date 2022-07-10 10:51
 * @since 0.0.0
 */

import React from 'react'
//import classnames from 'classnames'
import style from './style.module.scss'
import Link from '@docusaurus/Link'
import ItemList from '../ItemList'

export interface DocsType {
    id: string
    path: string
    sidebar: string
}

interface DocsListProps {
    docs: DocsType[]
}

const DocsList: React.FC<DocsListProps> = (props) => {
    const { docs } = props

    return (
        <div className={style.main}>
            {docs.map((v) => (
                <ItemList key={v.id} link={v.path} name={v.id} />
            ))}
        </div>
    )
}

export default React.memo(DocsList)
