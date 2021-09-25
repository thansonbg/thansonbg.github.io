import styles from "./../styles/components/BlogSideBar.module.css";
import SearchBlock from "./SearchBlock";
import useWindowSize from "../hooks/useWindowSize";
import {useContext} from "react";
import {useRouter} from "next/router";
import {getNumberPostByCategory, getUpdateLinkBlogHome} from "../utils/functions";
import {GlobalContext} from "../contexts/GlobalContext";
import Link from 'next/link'
import moment from "moment";

const BlogSideBar = (props) => {
    const size = useWindowSize();
    const router = useRouter();
    const {
        posts,
        categories,
        tags,
    } = useContext(GlobalContext);
    const {
        width
    } = size;
    let listPostsPast = posts.filter((itemPost, index) => {
        return moment(itemPost.publishDate).isBefore(moment());
    })
    const numberByCategory = getNumberPostByCategory(listPostsPast);
    return (
        <div className={styles.blog_sidebar}>
            {width >= 1000 && <div className={styles.blog_sidebar_item}>
                <SearchBlock />
            </div>}
            <div className={styles.blog_sidebar_item}>
                <div className={styles.item_title}>
                    Thể loại
                </div>
                <div className={styles.item_content + " " + styles.category_block}>
                    {
                        categories.map((item, index) => {
                            if (!item.hide) {
                                return (
                                    <div key={index}
                                         className={styles.category_item + ' ' + (index !== categories.length - 1 ? styles.not_last_category : '')}>
                                        <div className={styles.category_name}>
                                            <Link
                                                key={index}
                                                href={getUpdateLinkBlogHome(router.query, 'category', item.id)}
                                                passHref
                                            >
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className={styles.amount_post}>
                                            {numberByCategory['cat_' + item.id] ? numberByCategory['cat_' + item.id] : 0}
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
            <div className={styles.blog_sidebar_item}>
                <div className={styles.item_title}>
                    Nhãn
                </div>
                <div className={styles.item_content + " " + styles.tag_block}>
                    {
                        tags.map((item, index) => {
                            if (!item.hide) {
                                return (
                                    <Link
                                        key={index}
                                        href={getUpdateLinkBlogHome(router.query, 'tag', item.id)}
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
            </div>
        </div>
    )
}
export default BlogSideBar;