import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class SnakeToCamelPipe implements PipeTransform {
  transform(value: Record<string, any>, metadata: ArgumentMetadata): any {
    if (!metadata.metatype) {
      return value;
    }

    const cameled = camelcaseKeys(value, { deep: true });
    return plainToInstance(metadata.metatype, cameled);
  }
}
