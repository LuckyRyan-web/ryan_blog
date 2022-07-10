/**
 * @author liuyuan
 * @date 2022-07-03 15:34
 * @since 0.0.0
 */

import React, { PropsWithChildren } from 'react'
//import classnames from 'classnames'
import style from './style.module.scss'
import Layout from '@theme/Layout'
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { useSpring, animated } from 'react-spring'

interface SidebarProps {}

const Sidebar: React.FC<PropsWithChildren<SidebarProps>> = (props) => {
    const styles = useSpring({
        loop: false,
        from: { opacity: 0, x: 80, y: 0 },
        to: [{ opacity: 1, x: 0, y: 0 }],
    })

    return (
        <animated.div style={styles} className={style.tocPosition}>
            {props.children}
        </animated.div>
    )
}

export default React.memo(Sidebar)
