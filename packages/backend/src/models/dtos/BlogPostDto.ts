import { BlogPostEntity } from "../entities/BlogPostEntity";
import { ImagesEntity } from "../entities/ImageEntry";
import { UserEntity } from "../entities/UserEntity";

export class BlogPostDto {
    public id: number;
    public name: string;
    public image: ImagesEntity;
    public text: string;
    public created: Date;
    public owner: UserEntity;

    public constructor({ id, name, image, text, created, owner }: BlogPostEntity) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.text = text;
        this.created = created;
        this.owner = owner;
    }

    public static fromEntity(blogPostEntity: BlogPostEntity) {
        return new BlogPostDto(blogPostEntity);
    }
}
