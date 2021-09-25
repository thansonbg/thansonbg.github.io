import styles from "./../styles/components/AppFooter.module.css";

const AppFooter = (props) => {
    return (
        <div className={styles.footer}>
            <smail className={styles.copyright}>
                &copy; 2021 Thân Văn Sơn
            </smail>
        </div>
    )
}

export default AppFooter;