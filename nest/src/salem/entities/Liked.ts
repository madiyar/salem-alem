import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";

@Entity({name: 'liked'})
export class Liked {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    commentId: number;

    @Column()
    userId: number;

    @ManyToOne(type => Comment, comment => comment.id, {eager: true})
    comment: Comment;

    @ManyToOne(type => User, user => user.id, {eager: true})
    user: User;
}