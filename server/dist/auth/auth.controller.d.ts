import { AuthService } from './auth.service';
import { RegisterDto } from './dto/user-register-user.dto';
import { LoginDto } from './dto/user-log-in.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
    }>;
}
