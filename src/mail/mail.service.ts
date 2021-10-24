import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interface';
import axios, { AxiosResponse } from 'axios';

import * as FormData from 'form-data';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
    console.log(options);
    this.sendEmail('testing', 'test', 'tjkim@vetec.co.kr');
  }
  
  private async sendEmail(subject: string, content:string, to:string) {
    const form = new FormData();
    form.append("from", `Excited User <mailgun@${this.options.domain}>`)
    form.append("to", `tjkim@vetec.co.kr`)
    form.append("subject", subject)
    form.append("text", content)
    const response: AxiosResponse = await axios.post(
        `https:/api/mailgun.net/v3/${this.options.domain}/messages/`, {
            headers: {
                "Authorization": `Basic ${Buffer.from(
                    `api:${this.options.apiKey}`,
                ).toString('base64')}`
            },
            body: form
        }
    )
    console.log(response);
    
  }

}
