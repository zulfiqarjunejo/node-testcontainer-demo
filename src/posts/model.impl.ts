import { Post } from "./entity";
import { PostModel } from "./model";
import postgres from "postgres";

export class PostModelImpl implements PostModel {
    private pool: postgres.Sql; 
    
    constructor(pool: postgres.Sql) {
        this.pool = pool;
    }

    async getAll(): Promise<Post[]> {
        const posts = await this.pool<Post[]>`
            select 
                author_id as authorId, 
                created_at as createdAt, 
                id, 
                text
            from posts
        `;

        return posts;
    }
}