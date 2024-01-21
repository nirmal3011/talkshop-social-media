const createPostSchema  = require('./schemas')['createPostSchema']

class CreatePost {

    constructor(constants, helper, logger, validator, postLogic) {
        this.constants = constants;
        this.helper = helper;
        this.logger = logger;
        this.validator = validator;
        this.postLogic = postLogic;
    }

    async handleRequest(req, res) {
        const payload = req.body;
        const userHeaderKey = this.constants.userHeaderKey;
        const authorId = req.get(userHeaderKey);
        const postId = payload.postId;
        const content = payload.content;

        const input = {authorId, postId, content}

        // Validating API
        const [validatorErr, validInput] = await this.helper.invoker(this.validator.validate(input, createPostSchema));

        if(validatorErr) {
            this.logger.error('Invalid Input',
                {
                    err: validatorErr,
                    datetime: Date.now(),
                    input: input
                }
            );
            return this.helper.writeResponse({ code: this.constants.API_STATUS.INVALID_INPUT, msg: 'Invalid Input' }, null, res);
        }

        // Adding Post
        const [err, resp ] = await this.helper.invoker(this.postLogic.addPost(validInput));

        return this.helper.writeResponse(err, resp, res);
    }
}

module.exports = CreatePost;