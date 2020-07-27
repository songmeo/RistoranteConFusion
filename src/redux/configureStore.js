import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Dishes } from './dishes';
import { Promotions } from './promotions';
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Feedbacks } from './form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Feedback } from './form';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: Feedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}