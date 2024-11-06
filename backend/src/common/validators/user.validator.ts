import { IsNotEmpty, MinLength, IsEmail } from 'class-validator'

export class dtoCreateUser {
    @IsNotEmpty({ message: 'Nome é obrigatório' })
    @MinLength(2, { message: 'O nome deve conter pelo menos 2 caracters' })
    firstName: string

    @IsNotEmpty({ message: 'Sobrenome nome é obrigatório' })
    @MinLength(2, { message: 'Sobrenome deve conter pelo menos 2 caracters' })
    lastName: string

    @IsNotEmpty({ message: 'E-mail é obrigatório' })
    @IsEmail()
    email: string

    @IsNotEmpty({ message: 'Senha é obrigatório' })
    @MinLength(6, { message: 'A senha deve conter pelo menos 6 caracters' })
    password: string
}

export class dtoUpdatePasswordUser {
    @IsNotEmpty({ message: 'Senha é obrigatório' })
    @MinLength(2)
    password: string

    @IsNotEmpty({ message: 'Nova Senha é obrigatório' })
    @MinLength(2)
    newPassword: string
}

export class dtoUserLogin {
    @IsNotEmpty({ message: 'E-mail é obrigatório' })
    @MinLength(2)
    email: string

    @IsNotEmpty({ message: 'Senha é obrigatório' })
    @MinLength(2)
    password: string
}
