import { MurmursService } from './murmurs.service';
import { CreateMurmurDto } from './dto/create-murmur.dto';
export declare class MurmursController {
    private readonly murmurService;
    constructor(murmurService: MurmursService);
    create(dto: CreateMurmurDto): Promise<import("./entities/murmur.entity").Murmur>;
    findAll(page: string): Promise<import("./entities/murmur.entity").Murmur[]>;
    findOne(id: string): Promise<import("./entities/murmur.entity").Murmur>;
    delete(id: number, userId: number): Promise<import("./entities/murmur.entity").Murmur>;
}
