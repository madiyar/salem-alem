import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Progress } from "./Progress";
import { Comment } from "./Comment";
import { Question } from "./Question";
import { Liked } from "./Liked";

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    city: string;

    @Column()
    avatar: string;

    @Column({type: 'bool', default: 0})
    isAdmin: boolean;

    @OneToMany(type => Progress, progress => progress.userId)
    progress: Promise<Progress[]>;

    @OneToMany(type => Comment, comments => comments.userId)
    comments: Promise<Comment[]>;

    @OneToMany(type => Question, questions => questions.userId)
    questions: Promise<Question[]>;
    
    @OneToMany(type => Liked, liked => liked.userId)
    likes: Promise<Liked[]>;
}