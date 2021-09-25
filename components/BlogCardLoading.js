import styles from "../styles/components/BlogCardLoading.module.css"
import {Card, Skeleton} from "antd";

const BlogCardLoading = (props) => {
    return (
        <Card
            cover={
                <Skeleton loading={true} active avatar className={styles.card_loading_skeleton}/>
            }
            className={styles.blog_card_loading}
        >

        </Card>
    )
}

export default BlogCardLoading;