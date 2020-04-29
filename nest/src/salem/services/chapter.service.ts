import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chapter } from "../entities/Chapter";

@Injectable()
export class ChapterService {

    constructor(
        @InjectRepository(Chapter)
        private readonly respository: Repository<Chapter>
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
    create(data: Chapter) {
        return this.respository.save(data);
    }

    // UPDATE
    update(id: number, data: Partial<Chapter>) {
        return this.respository.update(id, data);
    }

    // DELETE BY ID
    delete(id: number) {
        return this.respository.delete(id);
    }

}