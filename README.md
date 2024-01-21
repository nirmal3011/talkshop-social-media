## SETUP

    node version 16.16.0
    npm i
    mysql - local
    redis - local

## RUN Server On 3000 Port

    SQL_USER=root SQL_PASSWORD=root123. node index.js 

## DB Schema

    post table

    CREATE TABLE `post` (
        `id` varchar(45) NOT NULL,
        `content` varchar(1000) NOT NULL,
        `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `authorId` varchar(45) NOT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

    post_analysis table

    CREATE TABLE `post_analysis` (
        `id` varchar(45) NOT NULL,
        `analysis` json DEFAULT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

## Assumptions

    postId - getting it in api now(Accept a JSON payload with text content and a unique identifier.), 
           - we can generate same in code, have few solutions for distributed system, can discuss in call
    Post Table will be in Distributed SQL(Spanner)
    Post_Analysis Table will be in NoSQL(wide column - ScyllaDB)
    Redis - It's Not a SPOF for getting analysis data
    Max Content(text) length 100
    RateLimiting 
         - 5/min for create post
         - 10/min for get analysis

## POSTMan Collection

    https://api.postman.com/collections/13774171-9b0fa6cc-6143-4d5d-a66d-ef9b3aba8249?access_key=PMAT-01HMPKZPB1AKVDFK52EWF39F4G

        



