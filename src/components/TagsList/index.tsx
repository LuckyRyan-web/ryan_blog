/**
 * 标签列表
 * @author liuyuan
 * @date 2022-07-09 17:51
 * @since 0.0.0
 */

import React from 'react'
//import classnames from 'classnames'
import style from './style.module.scss'
import randomColor from 'randomcolor'
import Link from '@docusaurus/Link'

interface TagType {
    count: number
    label: string
    // 路由地址
    permalink: string
    color?: string
}

interface TagsListProps {
    tags: TagType[]
}

function formatTagColor(tags: TagType[]) {
    return tags.map((v, k) => {
        // v.color = colors[k]
        v.color = randomColor({
            luminosity: 'light',
            hue: getColor(),
        })
        return v
    })
}

// 取如下的相似度颜色来实现随机颜色
function getColor() {
    const tagColorArr = [
        '#abbd81',
        '#849b87',
        '#e15b64',
        '#f47e60',
        '#f8b26a',
        '#f26d6d',
        '#67cc86',
        '#fb9b5f',
        '#3498db',
    ]
    const index = Math.floor(Math.random() * tagColorArr.length)
    return tagColorArr[index]
}

const TagsList: React.FC<TagsListProps> = (props) => {
    const { tags: data } = props

    return (
        <div className={style.tagList}>
            {formatTagColor(data).map((v, k) => (
                <Link key={v.permalink} to={v.permalink}>
                    <div
                        className={style.label}
                        style={{
                            backgroundColor: v.color,
                        }}
                    >
                        <span>{v.label}</span>
                        <span className={style.tag}>{v.count}</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default React.memo(TagsList)
