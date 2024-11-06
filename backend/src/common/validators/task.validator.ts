import { IsDateString, IsNotEmpty, Matches, MinLength } from 'class-validator'

export class dtoCreateTask {
    id?: number
    idUser?: number

    @IsNotEmpty({ message: 'Nome é obrigatório' })
    description: string

    @IsNotEmpty({ message: 'E-mail é obrigatório' })
    @IsDateString({}, { each: true, message: 'Data inválida' })
    @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, { message: 'Data deve estar no formato YYYY-MM-DD HH:MM' })
    dateTask: string

    @IsNotEmpty({ message: 'Status é obrigatório' })
    stTask: string
}
