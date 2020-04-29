import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: 'books'})
export class Book {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    author: string;

    @Column({type: 'text'})
    description: string; // Описание

    @Column()
    poster: string; // Изображение

    @Column()
    fileUrl: string; // ссылка
}