import styles from "../styles/components/ResumeBlockItem.module.css";
import {Col, Row} from "antd";
import useWindowSize from "../hooks/useWindowSize";

const ResumeBlockItem = (props) => {
    const {
        title,
        meta,
        body,
        bodyHtml,
        width100
    } = props;
    const size = useWindowSize();
    const {
        width
    } = size;
    const checkTitleFull = meta === undefined || width100;
    const checkMetaFull = title === undefined || width100;
    return (
        <div className={styles.resume_block_item}>
            <div className={styles.item_heading}>
                <Row>
                    {title != undefined && <Col xs={24} sm={checkTitleFull ? 24 : 16} md={checkTitleFull ? 24 : 18} lg={checkTitleFull ? 24 : 18} xl={checkTitleFull ? 24 : 18}>
                        <h4 className={styles.item_title}>
                            {title}
                        </h4>
                    </Col>}
                    {meta != undefined && <Col xs={24} sm={checkMetaFull ? 24 : 8} md={checkMetaFull ? 24 : 6} lg={checkMetaFull ? 24 : 6} xl={checkMetaFull ? 24 : 6}>
                        <div className={styles.item_meta} style={(checkMetaFull || width < 576) ? {textAlign: 'unset'} : {}}>
                            {meta}
                        </div>
                    </Col>}
                </Row>
            </div>
            {body != undefined && <div className={styles.item_content}>
                {bodyHtml ?   <div dangerouslySetInnerHTML={{
                    __html: body
                }}>

                </div> : body}
            </div>}
        </div>
    )
}

export default ResumeBlockItem;