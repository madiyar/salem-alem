import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "../entities/Book";

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book)
        private readonly respository: Repository<Book>
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
    create(data: Book) {
        return this.respository.save(data);
    }

    // UPDATE
    update(id: number, data: Partial<Book>) {
        return this.respository.update(id, data);
    }

    // DELETE BY ID
    delete(id: number) {
        return this.respository.delete(id);
    }

}