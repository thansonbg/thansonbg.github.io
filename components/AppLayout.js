import AppNavbar from "./AppNavbar";
import AppFooter from "./AppFooter";
import {Button, Drawer, Layout} from 'antd';
import {
    MenuFoldOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import useWindowSize from "../hooks/useWindowSize";
import {useContext, useEffect, useState} from "react";
import { Image } from 'antd';
import styles from "../styles/components/AppLayout.module.css";
import Head from 'next/head'
import {GlobalContext} from "../contexts/GlobalContext";
import LoadingAction from "./LoadingAction";
import {ASSET_PREFIX} from "../constants/constants";
const { Header, Sider } = Layout;
import Link from 'next/link'
import * as links from "../constants/links";

const AppLayout = (props) => {
    const {
        loading,
        setLoading
    } = useContext(GlobalContext);
    const {
        children,
    } = props;
    // useEffect(async () => {
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 1000)
    //     return () => {
    //
    //     }
    // }, [])
    const [visible, setVisible] = useState(false);
    const size = useWindowSize();
    const width = size.width;
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    return (
        <Layout>
            {loading && <LoadingAction />}
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
                <link rel="icon" href={ASSET_PREFIX + "/images/profile_circle.png"}/>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {width > 850 ? <Sider
                className={styles.navbar_slider}
                width={280}
            >
                <AppNavbar onClose={onClose}/>
            </Sider> : <Header className={styles.header}>
                <Link
                    href={links.INDEX}
                    passHref
                >
                     <Image
                         className={styles.header_logo}
                         src={ASSET_PREFIX + "/images/profile.png"}
                         alt=""
                         width={36}
                         height={36}
                         preview={false}
                     />
                 </Link>
                <Button className={styles.button_drawer} onClick={showDrawer}>
                    <MenuFoldOutlined />
                </Button>
                <Drawer
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    width={300}
                    className={styles.drawer + " " + 'drawer-navbar'}
                >
                    <AppNavbar onClose={onClose}/>
                    <ArrowRightOutlined onClick={onClose} className={styles.close_drawer}/>
                </Drawer>
            </Header>}
            <Layout className={styles.site_layout} style={width > 850 ? { marginLeft: 280 } : {marginTop: '3.5rem'}} >
                <div className={styles.site_body}>
                    {children}
                </div>
                <AppFooter />
            </Layout>
            <div id="fb-root"></div>
        </Layout>
    )
}

export default AppLayout;