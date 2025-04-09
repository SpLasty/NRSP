import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/users/create-user.dto';

@Injectable()
export class UsersService {
  private users: any[] = [];

  createUser(createUserDto: CreateUserDto) {
    const newUser = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  findAllUsers() {
    return this.users;
  }

  findOneUser(id: string) {
    return this.users.find((user) => user.id === Number(id));
  }
}
