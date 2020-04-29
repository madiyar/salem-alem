import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Question } from "./Question";

@Entity({name: 'categories_question'})
export class QuestionCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @OneToMany(type => Question, questions => questions.categoryId)
    questions: Promise<Question[]>;
}