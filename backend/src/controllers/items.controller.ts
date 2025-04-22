import {Controller, Get, Post, Put, Body, Param, UseGuards, ParseIntPipe, UseInterceptors, UploadedFile} from '@nestjs/common';
import { ItemsService } from '../services/items.services';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { User } from '../db/entity/user.entity';
import { CreateItemDto } from '../dto/items/create-item.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UsersService } from '../services/users.services';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly items: ItemsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  findAll() {
    return this.items.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.items.findById(id);
  }

  @Get('/users/me/items') 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('lender')
  getMyItems(@CurrentUser() user: { sub: number }) {
    return this.items.findByLender(user.sub);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('lender')
  async create(
    @Body() dto: CreateItemDto,
    @CurrentUser() user: { sub: number },
  ) {
    console.log('🔍 Lender ID (user.sub):', user.sub);
    const lender = await this.usersService.findById(8);
    return this.items.create({ ...dto, lender });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('lender')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateItemDto>,
  ) {
    return this.items.update(id, dto);
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('lender')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    const url = `/uploads/${file.filename}`;
    return { url };
  }
}
