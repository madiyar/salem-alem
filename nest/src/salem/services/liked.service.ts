import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Liked } from "../entities/Liked";

@Injectable()
export class LikedService {

    constructor(
        @InjectRepository(Liked)
        private readonly respository: Repository<Liked>
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
    create(data: Liked) {
        return this.respository.save(data);
    }

    // UPDATE
    update(id: number, data: Partial<Liked>) {
        return this.respository.update(id, data);
    }

    // DELETE BY ID
    delete(id: number) {
        return this.respository.delete(id);
    }

}