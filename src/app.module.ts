import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleService } from './role/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryHistory } from './entities/inventory-history.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'IMPass',
      database: 'inventorymanagement',
      synchronize: true, //make sure to remove on production.
      entities: [InventoryHistory, Role, User, Product],
    }),
    AuthModule,
    UserModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
