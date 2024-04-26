import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

// interface createUserDto {
//   name: string;
//   email: string;
//   role: 'INTERN' | 'ENGINEER' | 'ADMIN';
// }

// interface updateUserDto {
//   name?: string;
//   email?: string;
//   role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
// }

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John', email: 'John@gmail.com', role: 'INTERN' },
    { id: 2, name: 'Jane', email: 'Jane@gmail.com', role: 'ENGINEER' },
    { id: 3, name: 'Jame', email: 'Jame@gmail.com', role: 'ADMIN' },
  ];
  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0) {
        throw new NotFoundException('Not Found Role');
      }
      return rolesArray;
    }
  }
  findById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateById(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findById(id);
  }

  delete(id: number) {
    const removeUser = this.findById(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removeUser;
  }
}
