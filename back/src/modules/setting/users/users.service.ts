import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDto } from 'src/dtos-globals/user-login.dto';
import { PageOptionsDto } from 'src/dtos-globals/page-options.dto';
import { User } from './entities/user.entity';
import { PageDto } from 'src/dtos-globals/page.dto';
import { PageMetaDto } from 'src/dtos-globals/page-meta.dto';
import { hash, compare } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }
  
  async changePassword(changePasswordDto: ChangePasswordDto, user: UserLoginDto){
    const { user_id, newPassword, repetPassword, currentPassword } = changePasswordDto;
    
    const userInfo = await this.userRepository.findOneBy({id: user_id});
    const checkPassword = await compare(currentPassword, (await userInfo).password);
    if (!checkPassword) throw new HttpException('Contraseña incorrecta', 403);

    if (newPassword !== repetPassword) throw new HttpException('Contraseñas no coinciden', 403);

    const hashPassword = await hash(newPassword, 10);
    await this.userRepository.update(user_id, 
      {
        password:hashPassword,
        updated_at: this.formatDate(new Date()),
        updated_by: user_id
      });
    
    return {message: 'Contraseña cambiada exitosamente'};
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<any> {
    const queryBuilder = await this.userRepository.createQueryBuilder("users")
      .leftJoinAndSelect('users.role', 'role')
      .andWhere(qb => {
        qb.where('(users.names LIKE :names)', {
          names: `%${pageOptionsDto.term}%`,
        })
      })
      .orderBy("users.id", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
  
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
  
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
  
    return new PageDto(entities, pageMetaDto);
  }    

  async findOne(id: number) {
    const data = await this.userRepository.createQueryBuilder("users")
      .leftJoinAndSelect('users.role', 'role')
      .where("users.id= :id", { id: id })
      .getOne();

    if (!data) throw new NotFoundException('No existe el usuario con el id '+id);

    return data;
  }
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.createQueryBuilder('user')
      .where("user.email = :email", { email: email })
      .getOne();
  }

  async findByUserName(user_name: string): Promise<User> {
    return await this.userRepository.createQueryBuilder('user')
      .where("user.user_name = :user_name", { user_name: user_name })
      .getOne();
  }

  async create(dto: CreateUserDto, user: UserLoginDto): Promise<User | any> {
    const existsEmail = await this.findByEmail(dto.email);
    if (existsEmail) throw new NotFoundException('Ya existe un usuario con el correo ingresado');

    const existsUserName = await this.findByUserName(dto.user_name);
    if (existsUserName) throw new NotFoundException('Ya existe un usuario con el nombre de usuario ingresado');

    const { password } = dto;
    const plainToHash = await hash(password, 10);
    
    const data = this.userRepository.create({
      headquarters_id: dto.headquarters_id,
      roles_id: dto.roles_id,
      document: dto.document,
      names: dto.names,
      surnames: dto.surnames,
      user_name: dto.user_name,
      password: plainToHash,
      email: dto?.email,
      active: dto.active,
      created_at: this.formatDate(new Date()),
      created_by: user.userId
    });

    await this.userRepository.save(data);

    return {message: 'Usuario registrado exitosamente'};
  }

  async update(id:number, dto: UpdateUserDto, user: UserLoginDto): Promise<any> {
    const data = await this.findOne(id);

    if (!data) throw new NotFoundException({message: 'No existe el usuario solicitado'});

    await this.userRepository.update(id, {
      headquarters_id: dto.headquarters_id,
      roles_id: dto.roles_id,
      names: dto.names,
      surnames: dto.surnames,
      user_name: dto.user_name,
      email: dto?.email,
      active: dto.active,
      updated_at: this.formatDate(new Date()),
      updated_by: user.userId
    });

    return {message: 'Usuario actualizado exitosamente'};
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.userRepository.delete(id);
    
    return {message: 'Usuario eliminado exitosamente'};
  }

  private formatDate(date: Date): string {
    date.setHours(date.getHours() - 5);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
}