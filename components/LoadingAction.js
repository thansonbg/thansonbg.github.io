import styles from "../styles/components/LoadingAction.module.css";
import { Spin } from 'antd';
import { Image } from 'antd';
import {ASSET_PREFIX} from "../constants/constants";

const LoadingAction = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.center}>
                <div className={styles.logo_wrapper}>
                     <Image
                         className={styles.logo}
                         src={ASSET_PREFIX + "/images/profile.png"}
                         alt=""
                         width={120}
                         height={120}
                         preview={false}
                     />
                </div>
                <Spin size="large"/>
            </div>
        </div>
    )
}

export default LoadingAction;