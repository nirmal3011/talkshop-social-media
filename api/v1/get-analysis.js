const getPostAnalysisSchema  = require('./schemas')['getPostAnalysisSchema']

class GetAnalysis {

    constructor(helper, logger, constants, validator, postAnalysisLogic) {
        this.helper = helper;
        this.logger = logger;
        this.constants = constants;
        this.validator = validator;
        this.postAnalysisLogic = postAnalysisLogic;
    }

    async handleRequest(req, res) {
        const userHeaderKey = this.constants.userHeaderKey;
        const authorId = req.get(userHeaderKey);
        const postId = req.params.id;

        const input = { authorId, postId }

        // Validating API
        const [validatorErr, validInput] = await this.helper.invoker(this.validator.validate(input, getPostAnalysisSchema));

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

        // Fetching Post Analysis
        let [err, resp ] = await this.helper.invoker(this.postAnalysisLogic.getPostAnalysis(validInput));

        if(!resp) {
            // If no result found Set 412 status
            res.status(this.constants.API_STATUS.DATA_NOT_FOUND)
            resp = {}
        }

        this.helper.writeResponse(err, resp, res);
    }
}

module.exports = GetAnalysis