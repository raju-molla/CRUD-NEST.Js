import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  private users: User[] = [];
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private configService: ConfigService,
    private jwtTokenService: JwtService,
  ) {}

  //   register
  async Register(data) {
    const { password } = data;
    const saltOrRounds = 10;
    const randomPassword = password;
    const hash = await bcrypt.hash(randomPassword, saltOrRounds);
    data.password = hash;

    const user = await new this.userModel({
      ...data,
    }).save();
    // console.log(user);
    return user;
  }

  //   login
  async login(id: any, email: string, password: string) {
    const user = await this.userModel.findById({ _id: id });
    if (!user) {
      throw new NotFoundException('User is not found!');
    }
    const hash = user.password;

    const isValiedPassword = await bcrypt.compare(password, hash);
    if (!isValiedPassword) {
      throw new NotFoundException('password is not matched!');
    }
    const payload = {
      email: user.email,
      userName: user.userName,
    };
    // console.log(isValiedPassword);
    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }

  //   GETall
  async getAll() {
    const user = await this.userModel.find();
    if (!user) {
      throw new NotFoundException('user is not found');
    }
    return user;
  }

  //    Get single user
  async getSingleUser(userId: any) {
    const user = await this.userModel.findById({ _id: userId });
    if (!user) {
      throw new NotFoundException('user is not found');
    }
    return user;
  }

  //   UPDATE USER
  async updateUser(userId: any, info: any) {
    const newUser = await this.userModel.findOneAndUpdate({_id:userId}, info);
    return newUser;
  }
//   DELETE USER
   async deleteUser(userId: any){
       return await this.userModel.findOneAndDelete({_id:userId});
   }
}
