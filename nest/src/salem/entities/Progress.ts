import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Chapter } from "./Chapter";
import { User } from "./User";

@Entity({name: 'progress'})
export class Progress {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    chapterId: number;

    @ManyToOne(type => Chapter, chapter => chapter.id, {eager: true})
    chapter: Chapter;

    @ManyToOne(type => User, user => user.id, {eager: true})
    user: User;
}