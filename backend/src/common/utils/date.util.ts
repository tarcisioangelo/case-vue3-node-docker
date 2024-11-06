import { format, parse, subHours } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export async function dateFormatSave(date: string, sub = 0): Promise<Date> {
    try {
        const dateFormatted = format(date, 'yyyy-MM-dd HH:mm', { locale: ptBR })

        let dateSave = parse(dateFormatted, 'yyyy-MM-dd HH:mm', new Date())

        dateSave = subHours(dateSave, sub)

        return dateSave
    } catch (error) {
        throw new Error('Data inválida')
    }
}
