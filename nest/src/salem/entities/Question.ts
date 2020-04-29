import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { QuestionCategory } from "./QuestionCategory";

@Entity({name: 'questions'})
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({type: 'text'})
    msg: string;

    @Column()
    userId: number;

    @Column()
    categoryId: number;

    @Column({default: 0})
    answerId: number;

    @ManyToOne(type => User, user => user.id, {eager: true})
    user: User;

    @ManyToOne(type => QuestionCategory, category => category.id, {eager: true})
    category: QuestionCategory;

}