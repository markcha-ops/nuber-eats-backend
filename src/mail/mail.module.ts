import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interface';
import { MailService } from './mail.service';

@Module({})
export class MailModule {
    static forRoot(options: MailModuleOptions): DynamicModule {
      return {
        
        module: MailModule, // 모듈이 서비스를 제공한다.
        exports: [MailService],
        providers: [
          {
            provide: CONFIG_OPTIONS,
            useValue: options,
          },
          MailService
        ],
      };
    }
  }
