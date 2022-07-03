/**
 * @author liuyuan
 * @date 2022-07-03 14:55
 * @since 0.0.0
 */

import React, { PropsWithChildren } from 'react'
//import classnames from 'classnames'
//import style from './style.module.scss'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { useSpring, animated } from 'react-spring'

interface SpringProps {}

const Spring: React.FC<PropsWithChildren<SpringProps>> = (props) => {
    const styles = useSpring({
        loop: false,
        to: [{ opacity: 1 }],
        from: { opacity: 0 },
    })

    return <animated.div style={styles}>{props.children}</animated.div>
}

export default React.memo(Spring)
