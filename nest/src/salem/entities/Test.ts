import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Course } from "./Course";

@Entity({name: 'tests'})
export class Test {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string; // Вопрос

    @Column()
    courseId: number; // ID курса

    @Column() answer1: string;
    @Column() answer2: string;
    @Column() answer3: string;
    @Column() answer: string;

    @ManyToOne(type => Course, course => course.id) //+
    course: Course;
}