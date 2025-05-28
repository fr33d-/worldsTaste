import { BlogPostEntity } from "../entities/BlogPostEntity";
import { ImagesEntity } from "../entities/ImageEntry";
import { UserEntity } from "../entities/UserEntity";

export class BlogPostDto {
    public id: number;
    public name: string;
    public images: ImagesEntity[];
    public text: string;
    public created: Date;
    public owner: UserEntity;

    public constructor({ id, name, images, text, created, owner }: BlogPostEntity) {
        this.id = id;
        this.name = name;
        this.images = images;
        this.text = text;
        this.created = created;
        this.owner = owner;
    }

    public static fromEntity(blogPostEntity: BlogPostEntity) {
        return new BlogPostDto(blogPostEntity);
    }
}
