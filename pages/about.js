import styles from "../styles/AboutMe.module.css";
import {Col, Row} from "antd";
import * as links from "../constants/links";
import {FileTextFilled, RightCircleFilled} from "@ant-design/icons";
import useWindowSize from "../hooks/useWindowSize";
import {useContext, useEffect} from "react";
import {GlobalContext} from "../contexts/GlobalContext";
import BlogCard from "../components/BlogCard";
import {ASCENDING, ASSET_PREFIX} from "../constants/constants";
import { Image } from 'antd';
import Head from 'next/head'
import Link from 'next/link'
import getListPosts from "../data/getListPosts";
import getListCategories from "../data/getListCategories";
import getListTags from "../data/getListTags";
import {dataInfoMe} from "../constants/data";
import moment from "moment";

const AboutMe = (props) => {
    const {
        setCategories,
        setTags,
        setPosts,
        posts,
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
    const size = useWindowSize();
    const {
        width
    } = size;
    let lastPosts = [];
    let listPostsPast = listPosts.filter((itemPost, index) => {
        return moment(itemPost.publishDate).isBefore(moment());
    })
    const sortLastPosts = listPostsPast.sort((postA, postB) => {
        return moment(postB.publishDate) - moment(postA.publishDate);
    })
    sortLastPosts.some((item, index) => {
       if (index < 3) {
           lastPosts.push(item);
       } else {
           return true;
       }
    })
    return (
        <div className={styles.about_me}>
            <Head>
                <title>Thân Văn Sơn | Về tôi</title>
                <meta name="description" content={"Thông tin cơ bản của tôi"} />
            </Head>
            <section className={styles.about_me_section} style={width > 1200 ? {
                padding: '1rem 2rem'
            } : {}}>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                        <div className={styles.about_me_info}>
                            <h2 className={styles.about_me_name}>{dataInfoMe.name}</h2>
                            <div className={styles.about_me_role}>{dataInfoMe.role}</div>
                            <div className={styles.about_me_bio}>
                                {dataInfoMe.bio_begin} <Link href={links.BLOG_HOME}>{dataInfoMe.bio_link}</Link> {dataInfoMe.bio_end}
                            </div>
                            <Link
                                href={links.RESUME}
                                passHref
                            >
                                <div className={styles.resume_btn}>
                                    <FileTextFilled />  Hồ sơ cá nhân
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8} className={styles.about_me_right}>
                         <Image
                             className={styles.about_me_profile}
                             src={ASSET_PREFIX + "/images/profile.png"}
                             alt=""
                             width={250}
                             height={250}
                             preview={false}
                         />
                    </Col>
                </Row>
            </section>
            <section className={styles.last_blog}>
                <h2 className={styles.last_blog_title}>Bài viết mới cập nhật</h2>
                <Row>
                    {
                        lastPosts.map((item, index) => {
                            return (
                                <Col key={index} xs={24} sm={24} md={24} lg={12} xl={8} className={styles.item_post}>
                                    <BlogCard dataBlog={item}/>
                                </Col>
                            )
                        })
                    }
                </Row>
                {lastPosts.length > 0 && <div className={styles.last_blog_bottom}>
                    <Link
                        href={links.BLOG_HOME}
                        passHref
                    >
                        <div className={styles.enter_blog_home}>
                            <RightCircleFilled /> Xem danh sách bài viết
                        </div>
                    </Link>
                </div>}
            </section>
        </div>
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

export default AboutMe;

