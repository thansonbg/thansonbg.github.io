import AboutMe from "./about";
import getListPosts from "../data/getListPosts";
import getListCategories from "../data/getListCategories";
import getListTags from "../data/getListTags";

const Home = (props) => {
    const {
        listPosts,
        listCategories,
        listTags
    } = props;
    return (
        <AboutMe
            listCategories={listCategories}
            listPosts={listPosts}
            listTags={listTags}
        />
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


export default Home;