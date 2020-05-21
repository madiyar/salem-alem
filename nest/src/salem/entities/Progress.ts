import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Course } from "./Course";
import { User } from "./User";

@Entity({name: 'progress'})
export class Progress {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    courseId: number;

    @Column()
    percent: number;

    @ManyToOne(type => Course, course => course.id, {eager: true}) //+
    course: Course;

    @ManyToOne(type => User, user => user.id, {eager: true}) //+
    user: User;
}