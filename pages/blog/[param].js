import Head from "next/head";
import styles from "./../../styles/BlogPost.module.css";
import moment from "moment";
import {
    getFilterCategory, getNumberRelationPost,
    getUpdateLinkBlogHome, locationToUrl,
    readingTime
} from "../../utils/functions";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../contexts/GlobalContext";
import {Col, Row} from "antd";
import BlogCard from "../../components/BlogCard";
import Link from 'next/link'
import getListPosts from "../../data/getListPosts";
import getListCategories from "../../data/getListCategories";
import getListTags from "../../data/getListTags";
import CommentFacebook from "../../components/CommentFacebook";
import { FacebookButton } from "react-social";
import {FACEBOOK_APP_ID} from "../../constants/constants";
import {FacebookFilled} from "@ant-design/icons";


const BlogPost = (props) => {
    const [time, setTime] = useState(null);
    const [currentHref, setCurrentHref] = useState(null);
    const [changeCurrentHref, setChangeCurrentHref] = useState(false);
    const {
        tags,
        categories,
        setCategories,
        setTags,
        setPosts,
        initial,
        setInitial
    } = useContext(GlobalContext);
    const {
        listPosts,
        listCategories,
        listTags,
        dataPost
    } = props;
    useEffect(() => {
        if (initial) {
            setInitial(false);
            setCategories(Array.isArray(listCategories) ? listCategories : []);
            setPosts(Array.isArray(listPosts) ? listPosts : []);
            setTags(Array.isArray(listTags) ? listTags : []);
        }
    }, [])

    useEffect(() => {
        let span = document.createElement('span');
        span.innerHTML = dataPost?.content;
        const textContentArticle = span.textContent || span.innerText
        setTime(readingTime(textContentArticle));
    }, [dataPost]);

    let listPostsPast = listPosts.filter((itemPost, index) => {
        return moment(itemPost.publishDate).isBefore(moment());
    })
    let threeRelationPost = getNumberRelationPost(listPostsPast, dataPost, 3);

    const dataCategory = getFilterCategory(categories, dataPost.category);
    try {
        if (currentHref !== locationToUrl(location)) {
            setCurrentHref(locationToUrl(location));
            if (currentHref === null) {
                setChangeCurrentHref(true);
            } else {
                setChangeCurrentHref(false);
                setTimeout(()=>{
                    setChangeCurrentHref(true)
                }, 500)
            }
        }
    } catch (e) {

    }
    return (
        <>
            <Head>
                <title>{dataPost.title} | Thân Văn Sơn</title>
                <meta name="description" content={dataPost.description} />
                <meta property="og:image" content={dataPost.thumbnail} />
                <link rel="canonical" href={dataPost.thumbnail}/>
            </Head>
            <article className={styles.blog_post}>
                <header>
                    <h1 className={styles.blog_title}>{dataPost.title}</h1>
                    <div className={styles.blog_meta}>
                        <div className={styles.blog_meta_item}>
                            {dataPost.publishDate ? moment(dataPost.publishDate).format('LLLL') : ''}
                        </div>
                        {time && <div>
                            {time} phút đọc
                        </div>}
                    </div>
                    {changeCurrentHref && <FacebookButton className={styles.btn_share_facebook} url={currentHref} appId={FACEBOOK_APP_ID}>
                        <span>Chia sẻ</span>
                        <FacebookFilled />
                    </FacebookButton>}
                </header>
                <div className={styles.blog_post_body} dangerouslySetInnerHTML={{
                    __html: dataPost.content
                }}>

                </div>
                <div className={styles.post_topic}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} className={styles.post_topic_item}>
                            <div className={styles.post_category}>
                                <div className={styles.topic_title}>Thể loại :</div>
                                {
                                    dataCategory && <Link
                                        href={getUpdateLinkBlogHome({}, 'category', dataCategory.id)}
                                        passHref
                                    >
                                        <div className={styles.category_view}>
                                            {dataCategory.name}
                                        </div>
                                    </Link>
                                }
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} className={styles.post_topic_item}>
                            <div className={styles.post_tags}>
                                <div className={styles.topic_title}>Nhãn :</div>
                                {
                                    tags.map((item, index) => {
                                        if (dataPost.tags.includes(item.id)) {
                                            return (
                                                <Link
                                                    href={getUpdateLinkBlogHome({}, 'tag', item.id)}
                                                    passHref
                                                >
                                                    <div className={styles.tag_item}>
                                                        {item.name}
                                                    </div>
                                                </Link>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={styles.blog_post_comments_section}>
                    {changeCurrentHref && <CommentFacebook currentHref={currentHref}/>}
                </div>
            </article>
            <div className={styles.relation_post}>
                <div className={styles.relation_header}>
                    Các bài viết liên quan
                </div>
                <div className={styles.relation_list_post}>
                    <Row>
                        {
                            threeRelationPost.map((item, index) => {
                                return (
                                    <Col key={index} xs={24} sm={24} md={24} lg={12} xl={8} className={styles.item_relation_post}>
                                        <BlogCard dataBlog={item}/>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
            </div>
        </>
    )
}
export const getStaticPaths = async () => {
    const posts = getListPosts();
    const paths = posts.map((post) => {
        return ({
            params: { param: `${post.id}-${post.slug}` },
        })
    })

    return { paths, fallback: false }
}


export const getStaticProps = async ({params}) => {
    const {
        param
    } = params;
    const cut = param != undefined ? param.indexOf('-') : 0;
    const id = param != undefined ? param.substring(0, cut) : null ;
    return {
        props: {
            dataPost: getListPosts().find(item => item.id.toString() === id),
            listPosts: getListPosts(),
            listCategories: getListCategories(),
            listTags: getListTags(),
        },
    }
}

export default BlogPost;
