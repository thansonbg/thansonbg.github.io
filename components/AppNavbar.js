import { Image } from 'antd';
import {
    Menu,
} from "antd";
import {
    FolderOpenFilled,
    InstagramFilled,
    GithubFilled,
    FacebookFilled,
    YoutubeFilled,
    LinkedinFilled,
    UserOutlined,
    FileTextFilled
} from "@ant-design/icons";
import styles from "./../styles/components/AppNavbar.module.css";
import {useContext} from "react";
import {GlobalContext} from "../contexts/GlobalContext";
import {getUpdateLinkBlogHome} from "../utils/functions";
import * as links from "./../constants/links";
import {ASSET_PREFIX} from "../constants/constants";
import Link from 'next/link'
const { SubMenu } = Menu;

const AppNavbar = (props) => {
    const {
        categories,
    } = useContext(GlobalContext);
    const {
        onClose,
    } = props;
    const currentUrl =document.URL;
    const listSocial = [
        {
            link: '',
            icon: <GithubFilled className={styles.social_item_github} />
        },
        {
            link: '',
            icon: <LinkedinFilled className={styles.social_item_linkedin} />
        },
        {
            link: '/',
            icon: <InstagramFilled className={styles.social_item_instagram} />
        },
        {
            link: '',
            icon: <FacebookFilled className={styles.social_item_facebook} />
        },
        {
            link: '',
            icon: <YoutubeFilled className={styles.social_item_youtube} />
        }
    ]
    return (
        <div className={styles.wrapper}>
            <Link
                href={links.INDEX}
                passHref
            >
                <div className={styles.name}>
                    Thân Văn Sơn
                </div>
            </Link>
            <div className={styles.profile_wrapper}>
                <Link
                    href={links.INDEX}
                    passHref
                >
                    <div className={styles.profile_block}>
                        <Image
                            className={styles.profile_image}
                            src={ASSET_PREFIX + "/images/profile.png"}
                            alt=""
                            width={140}
                            height={140}
                            preview={false}
                        />
                    </div>
                </Link>
            </div>
            <div className={styles.bio}>
                Xin chào, Mình tên Thân Văn Sơn. Mình là một FE developer. Chào mừng đến với website cá nhân của mình!
            </div>
            <div className={styles.social_list}>
                {
                    listSocial.map((item,index) => {
                        return (
                            <div key={index} className={styles.social_item}>
                                <a href={item.link}>
                                    {item.icon}
                                </a>
                            </div>
                        )
                    })
                }
            </div>
            <hr />
            <Menu color={"#fff"} theme="dark" mode="inline" className={styles.menu}>
                <SubMenu key="blog" icon={<FolderOpenFilled />} title="Blog" className={styles.menu_item + ' menu_item ' + styles.sub_menu + ' ' + (currentUrl.includes(links.BLOG_HOME) ? styles.menu_item_active_sub_menu : "")}>
                    {
                        categories.map((item, index) => {
                            if (!item.hide) {
                                return (
                                    <Menu.Item key={index}
                                               className={styles.menu_item + " menu_item " + styles.menu_item_level_2}>
                                        <Link
                                            href={getUpdateLinkBlogHome({}, 'category', item.id)}
                                            passHref
                                        >
                                            <div className={styles.item_link} onClick={() => {
                                                onClose();
                                            }}>{item.name}</div>
                                        </Link>
                                    </Menu.Item>
                                )
                            }
                        })
                    }
                </SubMenu>
                <Menu.Item key="about_me" icon={<UserOutlined />} className={styles.menu_item + ' menu_item ' + (currentUrl.includes(links.ABOUT) ? styles.menu_item_active : "")}>
                    <Link
                        href={links.ABOUT}
                        passHref
                    >
                        <div className={styles.item_link} onClick={() => {
                            onClose();
                        }}>Về tôi</div>
                    </Link>
                </Menu.Item>
                <Menu.Item key="resume" icon={<FileTextFilled />} className={styles.menu_item + ' menu_item ' + (currentUrl.includes(links.RESUME) ? styles.menu_item_active : "")}>
                    <Link
                        href={links.RESUME}
                        passHref
                    >
                        <div className={styles.item_link} onClick={() => {
                            onClose();
                        }}>Hồ sơ cá nhân</div>
                    </Link>
                </Menu.Item>
            </Menu>
            <hr />
        </div>
    );
}

export default AppNavbar;
