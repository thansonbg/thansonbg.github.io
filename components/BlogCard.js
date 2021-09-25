import {Card, Badge} from "antd";
import styles from "./../styles/components/BlogCard.module.css";
import moment from "moment";
import * as links from "../constants/links";
import {getFilterCategory} from "../utils/functions";
import {useContext} from "react";
import {GlobalContext} from "../contexts/GlobalContext";
import { Image } from 'antd';
import Link from 'next/link'

const { Meta } = Card;

const BlogCard = (props) => {
    const {
        categories
    } = useContext(GlobalContext);
    const {
        dataBlog
    } = props;
    const {
        category
    } = dataBlog;
    const dataCategory = getFilterCategory(categories, category);
    return (
        <Badge.Ribbon className={styles.badge_blog_card} text={dataCategory ? dataCategory.name : ''}>
            <Card
                hoverable
                cover={
                    <Link
                        href={links.BLOG_POST.replace(':id', dataBlog.id).replace(':slug', dataBlog.slug)}
                        passHref
                    >
                        <div
                            className={styles.blog_thumbnail}
                        >
                            <Image
                                alt="example"
                                src={dataBlog.thumbnail}
                                preview={false}
                            />
                        </div>
                    </Link>
                }
                className={styles.blog_card}
            >
                <Meta
                    className={styles.blog_meta + " blog_meta"}
                    title={
                        <div className={styles.blog_title}>
                            <Link
                                href={links.BLOG_POST.replace(':id', dataBlog.id).replace(':slug', dataBlog.slug)}
                                passHref
                            >
                                {dataBlog.title}
                            </Link>
                        </div>
                    }
                    description={
                        <div className={styles.blog_description}>
                            {dataBlog.description}
                        </div>
                    }
                />
                <div className={styles.blog_read_more}>
                    <Link
                        href={links.BLOG_POST.replace(':id', dataBlog.id).replace(':slug', dataBlog.slug)}
                        passHref
                    >
                        Đọc thêm →
                    </Link>
                </div>
                <div className={styles.blog_publish_date}>
                    {moment(dataBlog.publishDate).format('lll')}
                </div>
            </Card>
        </Badge.Ribbon>
    );
}

export default BlogCard;