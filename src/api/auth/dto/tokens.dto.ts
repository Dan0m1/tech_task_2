import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty({
    description: 'Access token',
    name: 'access_token',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
    name: 'refresh_token',
  })
  refreshToken: string;
}
