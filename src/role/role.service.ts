import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async addNewRole() {
    const newRole = new Role();
    newRole.role = faker.person.jobDescriptor();

    const role = this.getRoleByRoleName(newRole.role);
    if (!role) {
      const newRoleToAdd = this.roleRepository.create(newRole);
      return this.roleRepository.save(newRoleToAdd);
    }

    return new HttpException('Role Already Exists', HttpStatus.CONFLICT);
  }

  async getRoleByRoleName(roleName: string) {
    return await this.roleRepository.findOneBy({ role: roleName });
  }

  async getRandomRole() {
    return await this.roleRepository
      .createQueryBuilder('entity')
      .orderBy('RANDOM()')
      .getOne();
  }
}
