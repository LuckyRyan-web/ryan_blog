/**
 * 列表样式
 * @author liuyuan
 * @date 2022-07-10 11:23
 * @since 0.0.0
 */

import React, { useMemo } from 'react'
//import classnames from 'classnames'
import style from './style.module.scss'
import Link from '@docusaurus/Link'

interface ItemListProps {
    link: string
    name: string
}

const ItemList: React.FC<ItemListProps> = (props) => {
    const { link, name } = props

    const label = useMemo(() => {
        const id = name.split('/')

        if (id.length > 1) {
            return id[1]
        }
        return name
    }, [name])

    return (
        <>
            <Link to={link}>
                <div className={style.container}>
                    <div className={style.title}>{label}</div>
                </div>
            </Link>
        </>
    )
}

export default React.memo(ItemList)
