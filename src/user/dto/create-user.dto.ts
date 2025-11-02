import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Length, MinLength } from "class-validator";

export class CreateUserDto {
    
    @Length(3)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(11)
    cpf: string;

    @IsNotEmpty()
    @IsNumber()
    typeUser: number;

    @IsNotEmpty()
    @MinLength(10)
    phone: string;

    @IsNotEmpty()
    @IsStrongPassword({minLength: 8,minLowercase: 1,minUppercase: 1,minNumbers: 1,minSymbols: 0,},
    {
        message:
            'The password should contain at least 1 uppercase character, 1 lowercase, 1 number and should be at least 8 characters long.',
    },
    )  
    password: string;

}
