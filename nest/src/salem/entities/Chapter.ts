import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Section } from "./Section";

@Entity({name: 'chapters'})
export class Chapter {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; // Название главы. Внутри Раздела. Н/р: Variables, Booleans

    @Column({type: 'text'})
    text: string;

    @Column()
    sectionId: number; // ID Раздела

    @ManyToOne(type => Section, section => section.id, {eager: true})
    section: Section;
}