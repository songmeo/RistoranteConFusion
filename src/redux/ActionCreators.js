import * as ActionTypes from './ActionTypes';

export const addComment = (dishID, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT, 
    payload: {
        dishId: dishID,
        rating: rating,
        author: author,
        comment: comment
    }
});