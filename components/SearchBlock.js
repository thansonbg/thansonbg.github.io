import styles from "./../styles/components/SearchBlock.module.css";
import { Input } from 'antd';
import { useRouter } from 'next/router';
import {useContext} from "react";
import {getUpdateLinkBlogHome} from "../utils/functions";
import {GlobalContext} from "../contexts/GlobalContext";

const { Search } = Input;

const SearchBlock = (props) => {
    const {
        keyword,
        onLoading,
        setKeyword
    } = useContext(GlobalContext);
    const router = useRouter();
    const onChange = (event) => {
        setKeyword(event.target.value);
    }

    const onSearch = (value) => {
        if (value) {
            onLoading(1000);
            setKeyword('');
            let linkBlogHome = getUpdateLinkBlogHome(router.query, 'q', value, true);
            router.push(linkBlogHome, undefined,undefined);
        }
    }


    return (
        <Search
            className={styles.search_block}
            placeholder="Nhập từ khóa"
            onSearch={onSearch}
            value={keyword}
            onChange={onChange}
            enterButton
            maxLength={60}
        />
    )
}

export default SearchBlock;