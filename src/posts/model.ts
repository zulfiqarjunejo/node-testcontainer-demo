import { Post } from "./entity";

export interface PostModel {
    getAll(): Promise<Post[]>;
};