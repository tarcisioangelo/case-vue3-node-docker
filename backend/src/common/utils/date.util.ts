import { format, parse, subHours } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const LOCALE_SUB = process.env.LOCALE_SUB || 0

export async function dateFormatSave(date: string): Promise<Date> {
    try {
        const dateFormatted = format(date, 'yyyy-MM-dd HH:mm', { locale: ptBR })

        let dateSave = parse(dateFormatted, 'yyyy-MM-dd HH:mm', new Date())

        dateSave = subHours(dateSave, Number(LOCALE_SUB))

        return dateSave
    } catch (error) {
        throw new Error('Data inválida')
    }
}
