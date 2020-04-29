import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Course } from "./Course";
import { Chapter } from "./Chapter";

@Entity({name: 'sections'})
export class Section {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; // Название раздела. Н/р: Python Basics, Python Core, Intermediate Python

    @Column()
    courseId: number; // ID Курса

    // @ManyToOne(type => Category, category => category.id, {eager: true})
    // eager: true returns child table's data too
    @ManyToOne(type => Course, course => course.id)
    course: Course;
    
    @OneToMany(type => Chapter, chapter => chapter.sectionId)
    chapters: Promise<Chapter[]>;
}