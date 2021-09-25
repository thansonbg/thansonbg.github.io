import styles from "../styles/BlogPost.module.css";
import Head from "next/head";
import {FACEBOOK_APP_ID} from "../constants/constants";

const CommentFacebook = (props) => {
    const {
        currentHref
    } = props;
    return (
        <>
            <Head>
                <script
                    async
                    defer
                    crossOrigin="anonymous"
                    src={`https://connect.facebook.net/vi_VI/sdk.js#xfbml=1&version=v11.0&appId=${FACEBOOK_APP_ID}&autoLogAppEvents=1`}
                    nonce="cr7OSC6b"
                >

                </script>
            </Head>
            <div className={styles.fb_comments +  " fb-comments"} data-href={currentHref} data-width="100%" data-numposts="5" data-lazy="false" data-mobile="true"/>
        </>
    )
}

export default CommentFacebook;