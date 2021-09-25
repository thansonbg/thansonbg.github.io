import * as links from "../constants/links";
import moment from "moment";
import {ASCENDING, DECREASE, RANDOM} from "../constants/constants";
export const getUpdateLinkBlogHome = (params, keyChange, valueChange, withOutBasePath) => {
    const linkHome = withOutBasePath ? links.BLOG_HOME_WITHOUT_BASE_PATH : links.BLOG_HOME;
    let linkBlogHome = (keyChange != undefined && valueChange != undefined) ? `${linkHome}?${keyChange}=${valueChange}` : `${linkHome}?`;
    const lastChar = linkBlogHome[linkBlogHome.length - 1];
    if (lastChar == "?") {
        linkBlogHome = linkBlogHome.slice(0, -1);
    }
    let index = 0;
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && key !== keyChange) {
            linkBlogHome += (lastChar == "?" && index === 0) ? `?${key}=${value}` : `&${key}=${value}`;
            index += 1;
        }
    }
    return linkBlogHome;
}

export const getFilterCategory = (listCategories, categoryId) => {
    const categoryFilter = listCategories.filter((item, index) => {
        return item.id == categoryId;
    })
    if (categoryFilter.length > 0) {
        return categoryFilter[0];
    }
    return null;
}

export const getNumberPostByCategory = (listPosts) => {
    let jsonNumberPost = {};
    listPosts.forEach((item, index) => {
        if (jsonNumberPost.hasOwnProperty('cat_' + item.category)) {
            jsonNumberPost['cat_' + item.category] += 1;
        } else {
            jsonNumberPost['cat_' + item.category] = 1;
        }
    })
    return jsonNumberPost;
}

export const searchPostByKeyword = (dataPost, keyword) => {
    const {
        title,
        description,
    } = dataPost;
    const searchInTitle = title != undefined ? title.toLowerCase().indexOf(keyword.toLowerCase())!== -1 : false;
    const searchInDescription = description != undefined ? description.toLowerCase().indexOf(keyword.toLowerCase())!== -1 : false;
    return searchInTitle || searchInDescription;
}

export const readingTime = (text) => {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wpm);
}

const filteredArray = (arrA, arrB) => {
    return arrA.filter((n) => {
        return arrB.indexOf(n) !== -1;
    });
}

export const getNumberRelationPost = (listPosts, dataPost, number) => {
    let numberCheck = number ? number : 3;
    const threeRelationPost = [];
    let indexRelation = 0;
    let relationPostWithCategoryId = [];
    let relationPostWithCategory = listPosts.filter((item, index) => {
        if (item.category == dataPost.category) {
            relationPostWithCategoryId.push(item.id);
        }
        return item.category == dataPost.category
    })
    let relationPostWithTag = listPosts.filter((item, index) => {
        return !relationPostWithCategoryId.includes(item.id) && filteredArray(item.tags, dataPost.tags).length
    })
    relationPostWithCategory = sortPublishDateDecrease(relationPostWithCategory);
    relationPostWithCategory.some((item, index) => {
        if (indexRelation < numberCheck && item.id !== dataPost.id) {
            indexRelation += 1;
            threeRelationPost.push(item);
        } else if (index === numberCheck) {
            return true;
        }
    })
    if (indexRelation < numberCheck) {
        relationPostWithTag = sortPublishDateDecrease(relationPostWithTag);
        relationPostWithTag.some((item, index) => {
            if (indexRelation < numberCheck && item.id !== dataPost.id) {
                indexRelation += 1;
                threeRelationPost.push(item);
            } else if (index === numberCheck) {
                return true;
            }
        })
    }
    return threeRelationPost;
}

export const sortPublishDateDecrease = (posts) => {
    return posts.sort((postA, postB) => {
        return moment(postB.publishDate) - moment(postA.publishDate);
    })
}

export const getPostsFilterWithQuery = (listPosts, query) => {
    const {
        q,
        category,
        tag,
        sort
    } = query;
    const filterPostsQuerySort = listPosts.sort((postA, postB) => {
        return (sort === ASCENDING) ? (moment(postA.publishDate) - moment(postB.publishDate)) : (moment(postB.publishDate) - moment(postA.publishDate));
    })
    return filterPostsQuerySort.filter((item, index) => {
        return (
            (q === undefined || (q != undefined && searchPostByKeyword(item, q)))
            && (tag === undefined || (tag != undefined && item.tags.includes(parseInt(tag))))
            && (category === undefined || (category != undefined && item.category == category))
        );
    });
}

export const locationToUrl = (location) => {
    return location.protocol + "//" + location.host + location.pathname;
}