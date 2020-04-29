import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuestionCategory } from "../entities/QuestionCategory";

@Injectable()
export class QuestionCategoryService {

    constructor(
        @InjectRepository(QuestionCategory)
        private readonly respository: Repository<QuestionCategory>
    ) {}

    // GET ALL IN TABLE
    getAll(criteria = {}) {
        return this.respository.find(criteria);
    }

    // GET BY ID
    getById(id: number) {
        return this.respository.findOne(id);
    }

    // INSERT INTO
    create(data: QuestionCategory) {
        return this.respository.save(data);
    }

    // UPDATE
    update(id: number, data: Partial<QuestionCategory>) {
        return this.respository.update(id, data);
    }

    // DELETE BY ID
    delete(id: number) {
        return this.respository.delete(id);
    }

}