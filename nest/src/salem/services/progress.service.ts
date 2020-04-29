import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Progress } from "../entities/Progress";

@Injectable()
export class ProgressService {

    constructor(
        @InjectRepository(Progress)
        private readonly respository: Repository<Progress>
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
    create(data: Progress) {
        return this.respository.save(data);
    }

    // UPDATE
    update(id: number, data: Partial<Progress>) {
        return this.respository.update(id, data);
    }

    // DELETE BY ID
    delete(id: number) {
        return this.respository.delete(id);
    }

}