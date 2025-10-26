import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { NewUserDTO } from './newUser.dto';

import { faker } from '@faker-js/faker';
import { Role } from 'src/entities/role.entity';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RoleService,
  ) {}

  async findUserById(userId: string) {
    return await this.userRepository.findOneBy({ uuid: userId });
  }

  async findUserByUsername(username: string) {
    return await this.userRepository.findOneBy({ username: username });
  }

  async addNewUser(newUserDTO: NewUserDTO) {
    const user = await this.findUserByUsername(newUserDTO.username);
    if (user) {
      return new HttpException('Username already exists', HttpStatus.CONFLICT);
    }
    const newUser = await this.userRepository.create(newUserDTO);
    return await this.userRepository.save(newUser);
  }

  async createNewRandomPerson() {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const username = faker.internet.username();
    const password = faker.internet.password();

    const newUser = new User();
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.username = username;
    newUser.password = password;
    newUser.isActive = true;
    newUser.role = 'user';

    // const role: Role | null = await this.roleService.getRandomRole();
    // if (role) {
    //   newUser.role.push(role);
    // }

    const userToSave = await this.userRepository.create(newUser);
    return await this.userRepository.save(userToSave);
  }
}
