import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { User } from '../../common/decorators/get-user.decorator';
import { UserRequestEntity } from './types/user-request.entity';
import { RegisterCredentialsDto } from './dto/register-credentials.dto';
import { TokensDto } from './dto/tokens.dto';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiEndpoint({
    summary: 'Login',
    guards: [LocalGuard],
    body: LoginCredentialsDto,
  })
  @ApiOkResponse({ type: TokensDto })
  @Post('login')
  login(@User() user: UserRequestEntity) {
    return this.authService.login(user);
  }

  @ApiEndpoint({
    summary: 'Register',
  })
  @ApiCreatedResponse({ type: TokensDto })
  @Post('register')
  async register(
    @Body() credentials: RegisterCredentialsDto,
  ): Promise<TokensDto> {
    return this.authService.register(credentials);
  }
}
