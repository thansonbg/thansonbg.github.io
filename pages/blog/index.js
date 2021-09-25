import {Col, Row, Select} from "antd";
import styles from "./../../styles/BlogHome.module.css";
import BlogCard from "../../components/BlogCard";
import useWindowSize from "../../hooks/useWindowSize";
import BlogSideBar from "../../components/BlogSideBar";
import SearchBlock from "../../components/SearchBlock";
import {useContext, useEffect, useRef, useState} from "react";
import {GlobalContext} from "../../contexts/GlobalContext";
import {
    CloseCircleFilled,
    ArrowDownOutlined,
    ArrowUpOutlined
} from "@ant-design/icons";
import {getPostsFilterWithQuery, getUpdateLinkBlogHome} from "../../utils/functions";
import {useRouter} from "next/router";
import BlogLoadMore from "../../components/BlogLoadMore";
import {ASCENDING, DECREASE, RANDOM} from "../../constants/constants";
import Head from "next/head";
import getListPosts from "../../data/getListPosts";
import getListCategories from "../../data/getListCategories";
import getListTags from "../../data/getListTags";
import moment from "moment";
const { Option } = Select;

const BlogHome = (props) => {
    const [listBlogResult, setListBlogResult] = useState([]);
    const [listPostsFilter, setListPostsFilter] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [sortDate, setSortDate] = useState(RANDOM);
    const size = useWindowSize();
    const {
        width
    } = size;
    const router = useRouter();
    const {
        q,
        category,
        tag,
        sort
    } = router.query;
    const {
        setCategories,
        setTags,
        setPosts,
        categories,
        tags,
        onLoading,
        initial,
        setInitial
    } = useContext(GlobalContext);
    const {
        listPosts,
        listCategories,
        listTags,
    } = props;
    let listPostsPast = listPosts.filter((itemPost, index) => {
        return moment(itemPost.publishDate).isBefore(moment());
    })
    useEffect(() => {
        if (initial) {
            setInitial(false);
            setCategories(Array.isArray(listCategories) ? listCategories : []);
            setPosts(Array.isArray(listPosts) ? listPosts : []);
            setTags(Array.isArray(listTags) ? listTags : []);
        }
    }, [])
    const onCloseQuery = (key) => {
        const newQuery = {
            ...router.query
        };
        delete newQuery[key];
        onLoading();
        let linkBlogHome = getUpdateLinkBlogHome(newQuery, undefined, undefined, true);
        router.push(linkBlogHome, undefined,undefined);
    }

    const categoryFilter = categories.filter((item, index) => {
        return item.id == category;
    })
    const tagFilter = tags.filter((item, index) => {
        return item.id == tag;
    })
    useEffect(() => {
        if (sort !== sortDate) {
            if (sort == DECREASE) {
                setSortDate(DECREASE);
            } else if (sort == ASCENDING) {
                setSortDate(ASCENDING);
            } else {
                setSortDate(RANDOM);
            }
        }
        const listPostsFilter = getPostsFilterWithQuery(listPostsPast, {
            q,
            category,
            tag,
            sort,
        })
        setListPostsFilter(listPostsFilter);
        setListBlogResult(listPostsFilter.slice(0, pageSize));
        setPageNumber(1)
        return () => {

        }
    }, [
        q,
        category,
        tag,
        sort,
    ]);
    const onLoadMore = () => {
        setTimeout(() => {
            setListBlogResult(listPostsFilter.slice(0, (pageNumber+1)*pageSize));
            setPageNumber(prev => {
                return prev + 1;
            })
        }, 1000)
    }
    const postsEndRef = useRef(null)

    const scrollToBottom = () => {
        if (listBlogResult.length > pageSize) {
            postsEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    useEffect(scrollToBottom, [listBlogResult]);

    const onSortPublishDateChange = (value) => {
        onLoading();
        let linkBlogHome = value === RANDOM ? getUpdateLinkBlogHome(router.query, 'sort', undefined, true) : getUpdateLinkBlogHome(router.query, 'sort', value, true);
        router.push(linkBlogHome, undefined,undefined);
    }
    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Thân Văn Sơn | Blog</title>
                <meta name="description" content={"Blog của tôi"} />
            </Head>
            <section className={styles.blog_description}>
                <h2 className={styles.heading}>
                    Blog cá nhân của Trần Đình Thắng
                </h2>
                <div className={styles.intro}>
                    Chào mừng đến với blog của mình, bài viết sẽ mới được publish vào <span>00:00 chủ nhật</span> hàng tuần
                </div>
                <hr />
            </section>
            <section className={styles.blog_list} style={((width > 850 && width < 1100) || width < 600) ? {
                padding: '1rem 0'
            } : {}}>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={width < 1000 ? 24 : 14} xl={17}>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.sort_blog}>
                                <Select value={sortDate} style={{ width: 180 }} onChange={onSortPublishDateChange} className={styles.select_sort_type}>
                                    <Option className={styles.item_sort_type + " " + (sortDate === RANDOM ? styles.item_sort_type_selected : "")} value={RANDOM}>Ngẫu nhiên</Option>
                                    <Option className={styles.item_sort_type + " " + (sortDate === DECREASE ? styles.item_sort_type_selected : "")} value={DECREASE}><ArrowDownOutlined /> Thời gian giảm dần</Option>
                                    <Option className={styles.item_sort_type + " " + (sortDate === ASCENDING ? styles.item_sort_type_selected : "")} value={ASCENDING}><ArrowUpOutlined /> Thời gian tăng dần</Option>
                                </Select>
                            </Col>
                            {
                                width < 1000 && <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.search_block_wrapper}>
                                    <SearchBlock />
                                </Col>
                            }
                            {
                                q != undefined && <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.query}>
                                    <span>Từ khóa :</span> <span className={styles.query_search}>{q}</span>
                                    <CloseCircleFilled
                                        onClick={() => {
                                            onCloseQuery('q');
                                        }}
                                        className={styles.close_query}
                                    />
                                </Col>
                            }
                            {
                                categoryFilter.length > 0 && <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.query}>
                                    <span>Category :</span> <span className={styles.query_category}>{categoryFilter[0].name}</span>
                                    <CloseCircleFilled
                                        onClick={() => {
                                            onCloseQuery('category');
                                        }}
                                        className={styles.close_query}
                                    />
                                </Col>
                            }
                            {
                                tagFilter.length > 0 && <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.query}>
                                    <span>Tag :</span> <span className={styles.query_tag}>{tagFilter[0].name}</span>
                                    <CloseCircleFilled
                                        onClick={() => {
                                            onCloseQuery('tag');
                                        }}
                                        className={styles.close_query}
                                    />
                                </Col>
                            }
                            {
                                listBlogResult.map((item, index) => {
                                    return (
                                        <Col key={index} xs={24} sm={24} md={width < 950 ? 24 : 12} lg={(width > 1000 && width < 1200) ? 24 : 12} xl={width > 1750 ? 8 : 12} className={styles.blog_col}>
                                            <BlogCard dataBlog={item}/>
                                        </Col>
                                    )
                                })
                            }
                            <div ref={postsEndRef} />
                            { listBlogResult.length < listPostsFilter.length && <BlogLoadMore onLoad={onLoadMore}/>}
                        </Row>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={width < 1000 ? 24 : 10} xl={7} className={styles.blog_right}>
                        <BlogSideBar />
                    </Col>
                </Row>
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

export default BlogHome;
