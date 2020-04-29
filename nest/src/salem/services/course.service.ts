import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Course } from "../entities/Course";

@Injectable()
export class CourseService {

    constructor(
        @InjectRepository(Course)
        private readonly repository: Repository<Course>
    ) {}

    // GET ALL IN TABLE
    getAll(criteria = {}) {
        return this.repository.find(criteria);
    }

    // GET BY ID
    getById(id: number) {
        return this.repository.findOne(id);
    }

    getOne(criteria = {}) {
        return this.repository.findOne(criteria);
    }

    // INSERT INTO
    create(data: Course) {
        return this.repository.save(data);
    }

    // UPDATE
    update(id: number, data: Partial<Course>) {
        return this.repository.update(id, data);
    }

    // DELETE BY ID
    delete(id: number) {
        return this.repository.delete(id);
    }

}