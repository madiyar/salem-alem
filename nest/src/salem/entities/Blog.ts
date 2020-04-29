import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: 'blog'})
export class Blog {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({type: 'text'})
    text: string; // Описание

    @Column()
    poster: string; // Изображение

    @Column({type: 'date'})
    postedAt: string;
}