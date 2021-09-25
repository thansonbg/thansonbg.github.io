import styles from "./../styles/Resume.module.css";
import {
    FileTextFilled,
} from "@ant-design/icons";
import {Col, Row} from "antd";
import useWindowSize from "../hooks/useWindowSize";
import { Image } from 'antd';
import ResumeBlockItem from "../components/ResumeBlockItem";
import {ASSET_PREFIX} from "../constants/constants";
import Head from "next/head";
import getListPosts from "../data/getListPosts";
import getListCategories from "../data/getListCategories";
import getListTags from "../data/getListTags";
import {GlobalContext} from "../contexts/GlobalContext";
import {useContext, useEffect} from "react";
import {dataInfoMe, dataResume, listContact, listSocialResume} from "../constants/data";

const Resume = (props) => {
    const {
        setCategories,
        setTags,
        setPosts,
        initial,
        setInitial
    } = useContext(GlobalContext);
    const {
        listPosts,
        listCategories,
        listTags
    } = props;
    useEffect(() => {
        if (initial) {
            setInitial(false);
            setCategories(Array.isArray(listCategories) ? listCategories : []);
            setPosts(Array.isArray(listPosts) ? listPosts : []);
            setTags(Array.isArray(listTags) ? listTags : []);
        }
    }, [])
    const size = useWindowSize();
    const {
        width
    } = size;
    const checkWidth = width > 850 && width < 992;
    return (
        <div className={styles.resume_wrapper}>
            <Head>
                <title>Trần Đình Thắng | Hồ sơ cá nhân</title>
                <meta name="description" content={"Hồ sơ cá nhân của tôi"} />
            </Head>
            <div className={styles.title}>
                <h2>
                    Hồ sơ cá nhân
                </h2>
                <a href={ASSET_PREFIX + "/"} download>
                    <div className={styles.btn_download_resume}>
                        <FileTextFilled /> Tải hồ sơ PDF
                    </div>
                </a>
            </div>
            <div className={styles.resume_block} style={
                width < 540 ? {padding: '1rem'} : {}
            }>
                <div className={styles.resume_header}>
                    <Row>
                        <Col xs={24} sm={24} md={checkWidth ? 24 : 14} lg={16} xl={16}>
                            <div className={styles.resume_title}>
                                <h2 className={styles.resume_name}>{dataInfoMe.name}</h2>
                                <div className={styles.resume_role}>{dataInfoMe.role}</div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={checkWidth ? 24 : 10} lg={8} xl={8}>
                            <div className={styles.resume_contact} style={(checkWidth || width < 768) ? {border: 'none'} : {}}>
                                {
                                    listContact.map((item, index) => {
                                        return (
                                            <div key={index} className={styles.resume_contact_item}>
                                                {item.icon}
                                                <span className={styles.contact_info}>{item.value}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
                <hr />
                <div className={styles.resume_intro}>
                    <Row>
                        <Col xs={24} sm={24} md={checkWidth ? 24 : 8} lg={6} xl={6} className={styles.intro_left}>
                            <div className={styles.resume_profile_wrapper}>
                                 <Image
                                     className={styles.resume_image}
                                     src={ASSET_PREFIX + "/images/profile.png"}
                                     alt=""
                                     width={140}
                                     height={140}
                                     preview={false}
                                 />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={checkWidth ? 24 : 16} lg={18} xl={18} className={styles.intro_right}>
                            <div className={styles.resume_media}>
                                {dataResume.media}
                            </div>
                        </Col>
                    </Row>
                </div>
                <hr />
                <div className={styles.resume_body}>
                    <Row>
                        <Col xs={24} sm={24} md={checkWidth ? 24 : 14} lg={(width >= 992 && width < 1150) ? 24 : 18} xl={18} className={styles.resume_main}>
                            <div className={styles.resume_section}>
                                <h2 className={styles.resume_section_header}>
                                    KINH NGHIỆM LÀM VIỆC
                                </h2>
                                <div className={styles.resume_section_body}>
                                    {
                                        dataResume.experiences.map((item, index) => {
                                            return (
                                                <ResumeBlockItem
                                                    key={index}
                                                    title={item.title}
                                                    meta={item.meta}
                                                    body={item.body}
                                                    bodyHtml={item.bodyHtml}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={styles.resume_section}>
                                <h2 className={styles.resume_section_header}>
                                    DỰ ÁN
                                </h2>
                                <div className={styles.resume_section_body}>
                                    {
                                        dataResume.projects.map((item, index) => {
                                            return (
                                                <ResumeBlockItem
                                                    key={index}
                                                    title={item.title}
                                                    meta={item.meta}
                                                    body={item.body}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={checkWidth ? 24 : 10} lg={(width >= 992 && width < 1150) ? 24 : 6} xl={6} className={styles.resume_aside}>
                            <div className={styles.resume_section}>
                                <h2 className={styles.resume_section_header}>
                                    KỸ NĂNG
                                </h2>
                                <div className={styles.resume_section_body}>
                                    <ResumeBlockItem
                                        title={
                                            "Technical"
                                        }
                                        body={
                                            <ul className={styles.resume_list}>
                                                {
                                                    dataResume.technicals.map((item, index) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                            >
                                                                {item}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        }
                                    />
                                    <ResumeBlockItem
                                        title={
                                            "Professional"
                                        }
                                        body={
                                            <ul className={styles.resume_list}>
                                                {
                                                    dataResume.professionals.map((item, index) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                            >
                                                                {item}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        }
                                    />
                                </div>
                            </div>
                            <div className={styles.resume_section}>
                                <h2 className={styles.resume_section_header}>
                                    GIÁO DỤC
                                </h2>
                                <div className={styles.resume_section_body}>
                                    {
                                        dataResume.educations.map((item, index) => {
                                            return (
                                                <ResumeBlockItem
                                                    key={index}
                                                    title={item.title}
                                                    meta={item.meta}
                                                    width100={true}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={styles.resume_section}>
                                <h2 className={styles.resume_section_header}>
                                    Ngôn ngữ
                                </h2>
                                <div className={styles.resume_section_body}>
                                    <ResumeBlockItem
                                        body={
                                            <ul className={styles.resume_list}>
                                                {
                                                    dataResume.languages.map((item, index) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                            >
                                                                {item}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        }
                                    />
                                </div>
                            </div>
                            <div className={styles.resume_section}>
                                <h2 className={styles.resume_section_header}>
                                    SỞ THÍCH
                                </h2>
                                <div className={styles.resume_section_body}>
                                    <ResumeBlockItem
                                        body={
                                            <ul className={styles.resume_list}>
                                                {
                                                    dataResume.interests.map((item, index) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                            >
                                                                {item}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        }
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <hr />
                <div className={styles.resume_footer}>
                    {
                        listSocialResume.map((item, index) => {
                            return (
                                <a
                                    key={index}
                                    href={item.link}
                                >
                                    <div className={styles.resume_social_item}>
                                        {item.icon}
                                        <span className={styles.social_username}>{item.username}</span>
                                    </div>
                                </a>
                            );
                        })
                    }
                </div>
            </div>

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

export default Resume;