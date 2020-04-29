import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Section } from "../entities/Section";

@Injectable()
export class SectionService {

    constructor(
        @InjectRepository(Section)
        private readonly respository: Repository<Section>
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
    create(data: Section) {
        return this.respository.save(data);
    }

    // UPDATE
    update(id: number, data: Partial<Section>) {
        return this.respository.update(id, data);
    }

    // DELETE BY ID
    delete(id: number) {
        return this.respository.delete(id);
    }

}