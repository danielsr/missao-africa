import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from '../entity/User';

export class AdminUser1592329918596 implements MigrationInterface {
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
