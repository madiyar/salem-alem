import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Liked } from "./Liked";

@Entity({name: 'comments'})
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    targetId: number;

    /* course, blog, book, qna */
    @Column({default: 'course'})
    type: string;

    @Column({type: 'text'})
    msg: string;

    @ManyToOne(type => User, user => user.id, {eager: true})
    user: User;
    
    @OneToMany(type => Liked, liked => liked.commentId)
    likes: Promise<Liked[]>;
}