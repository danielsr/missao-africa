import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from '../entity/User';

export class CreateAdminUser1591010015138 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const user = new User();
        user.email = 'danielsr@gmail.com';
        user.password = 'admin';
        user.hashPassword();
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {}
}
