import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Blog } from "../entities/Blog";

@Injectable()
export class BlogService {

    constructor(
        @InjectRepository(Blog)
        private readonly respository: Repository<Blog>
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
    create(data: Blog) {
        return this.respository.save(data);
    }

    // UPDATE
    update(id: number, data: Partial<Blog>) {
        return this.respository.update(id, data);
    }

    // DELETE BY ID
    delete(id: number) {
        return this.respository.delete(id);
    }

}