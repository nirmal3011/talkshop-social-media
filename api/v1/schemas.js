const Joi = require('joi');

const createPostSchema = Joi.object().keys({
    authorId : Joi.string().min(1).required(),
    postId : Joi.string().min(1).required(),
    content : Joi.string().min(1).max(100).required().trim()
}).unknown(false)

const getPostAnalysisSchema = Joi.object().keys({
    authorId : Joi.string().min(1).required(),
    postId : Joi.string().min(1).required(),
}).unknown(false)

module.exports = {
    'createPostSchema': createPostSchema,
    'getPostAnalysisSchema': getPostAnalysisSchema,
};