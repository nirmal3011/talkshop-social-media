class PostLogic {

    constructor(logger, helper, config, postRepo, postAnalysisRepo, postAnalysisLogic) {
        this.logger = logger;
        this.helper = helper;
        this.config = config;
        this.postRepo = postRepo;
        this.postAnalysisLogic = postAnalysisLogic;
    }

    async addPost(input) {
        const { postId, content, authorId } = input;
        // 1. Adding Post In Post Table
        let [err, resp ] = await this.helper.invoker(this.postRepo.put(postId, content, authorId));
        // 1.1 Throwing 500
        if (err) {
            this.logger.error('Error while putting data in post repo',
                {
                    err: JSON.stringify(err, Object.getOwnPropertyNames(err)),
                    datetime: Date.now(),
                    input
                }
            );
            return Promise.reject('Internal Server Error');
        }

        // 2. Asynchronously Doing Post Analysis
        if (resp) {
            this.addPostAnalysis(postId, content);
            return {"PostId": postId, Message: "Post Added"};
        } else {
            // In case of no response from db and no error Throwing 500
            return Promise.reject('Something Went Wrong');
        }
    }

    // TO-DO: Add this to PubSub, Which consumed by cron job to parallelize the analysis computation.
    async addPostAnalysis(postId, content) {
        // To Make Sure
        let retryCount = this.config.DB_FAILURE_RETRY_COUNT.POST_ANALYSIS
        while(retryCount--) {
            let [_, resp] = await this.helper.invoker(this.postAnalysisLogic.addPostAnalysis(postId, content));
            if (resp) {
                break;
            }
        }
        // TO-DO: Add this msg to pub sub which is doing deep dive into for reason of failure
    }

}

module.exports = PostLogic