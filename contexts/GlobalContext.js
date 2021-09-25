import {createContext, useState} from "react";
import {TIME_OUT_LOADING} from "../constants/constants";

export const GlobalContext = createContext({
    categories: [],
    tags: [],
    posts: []
});

const GlobalContextProvider = ({children}) => {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [initial, setInitial] = useState(true);
    const onLoading = (timeOut) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, (timeOut != undefined && !isNaN(timeOut)) ? timeOut : TIME_OUT_LOADING)
    }

    const globalContextData = {
        categories,
        tags,
        posts,
        keyword,
        setCategories,
        loading,
        initial,
        setTags,
        setPosts,
        setKeyword,
        setLoading,
        setInitial,
        onLoading
    };

    return <GlobalContext.Provider value={globalContextData}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalContextProvider;