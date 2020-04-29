import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Section } from "./Section";

@Entity({name: 'courses'})
export class Course {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; // Название курса. Н/р: JavaScript

    @Column()
    description: string; // Описание курса

    @Column()
    poster: string; // Изображение курса

    @Column()
    url: string; // Коротка ссылка на курс

    @OneToMany(type => Section, section => section.courseId)
    sections: Promise<Section[]>;
}