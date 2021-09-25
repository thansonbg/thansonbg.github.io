import styles from "./../styles/components/BlogLoadMore.module.css";
import {Col} from "antd";
import useWindowSize from "../hooks/useWindowSize";
import BlogCardLoading from "./BlogCardLoading";
import {useState} from "react";

const BlogLoadMore = (props) => {
    const [loading, setLoading] = useState(false);
    const {
        onLoad
    } = props;
    const size = useWindowSize();
    const {
        width
    } = size;

    const onLoadMore = () => {
        setLoading(true);
        onLoad();
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }
    return (
        <>
            {
                loading &&  <Col xs={24} sm={24} md={width < 950 ? 24 : 12} lg={(width > 1000 && width < 1200) ? 24 : 12} xl={width> 1750 ? 8 : 12} className={styles.blog_col}>
                    <BlogCardLoading />
                </Col>
            }
            {!loading && <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.load_more}>
                <div className={styles.load_more_btn} onClick={() => {
                    onLoadMore();
                }}>
                    Tải thêm
                </div>
            </Col>}
        </>
    )
}

export default BlogLoadMore;