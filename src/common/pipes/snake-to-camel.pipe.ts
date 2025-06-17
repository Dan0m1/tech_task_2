import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

function toCamelCase(obj: unknown): any {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
        toCamelCase(value),
      ]),
    );
  }
  return obj;
}

@Injectable()
export class SnakeToCamelPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata): any {
    if (!metadata.metatype) {
      return value;
    }

    const cameled = toCamelCase(value);
    return plainToInstance(metadata.metatype, cameled);
  }
}
