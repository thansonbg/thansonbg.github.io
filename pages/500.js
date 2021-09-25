import { Result, Button } from 'antd';
import styles from "../styles/PageError.module.css";
import * as links from "../constants/links";
import Head from "next/head";
import Link from 'next/link'
import getListPosts from "../data/getListPosts";
import getListCategories from "../data/getListCategories";
import getListTags from "../data/getListTags";
import {useContext, useEffect} from "react";
import {GlobalContext} from "../contexts/GlobalContext";

const Page500 = (props) => {
    const {
        setCategories,
        setTags,
        setPosts,
        initial,
        setInitial
    } = useContext(GlobalContext);
    const {
        listPosts,
        listCategories,
        listTags
    } = props;
    useEffect(() => {
        if (initial) {
            setInitial(false);
            setCategories(Array.isArray(listCategories) ? listCategories : []);
            setPosts(Array.isArray(listPosts) ? listPosts : []);
            setTags(Array.isArray(listTags) ? listTags : []);
        }
    }, [])
    return (
        <>
            <Head>
                <title>500</title>
            </Head>
            <Result
                status="500"
                title="500"
                subTitle="Xin lỗi, có lỗi xảy ra."
                extra={
                    <Link href={links.INDEX} passHref>
                        <Button type="primary" className={styles.btn_back_home}>Trở về trang chủ</Button>
                    </Link>
                }
            />
        </>
    )
}

export const getStaticProps = async () => {
    return {
        props: {
            listPosts: getListPosts(),
            listCategories: getListCategories(),
            listTags: getListTags(),
        },
    }
}

export default Page500;