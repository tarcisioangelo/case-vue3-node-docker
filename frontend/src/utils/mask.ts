const Mask = {
    toInitials(fullName: string | undefined) {
        if (!fullName) return 'AN'
        const formmated = fullName.split(' ')
        const initials = formmated.map((word) => word.charAt(0).toUpperCase())
        return initials.join('')
    },
    dataBR(data: string) {
        if (!data) return ''

        let v = data
        v = v.replace(/\D/g, '') // Remove tudo o que não é dígito

        v = v.replace(/^(\d{2})(\d)/g, '$1/$2') // Coloca barra depois dos dois primeiros dígitos
        v = v.replace(/(\d)(\d{4})$/, '$1/$2') // Coloca barra depois dos quatro primeiros dígitos

        if (v.length > 8) v = v.slice(0, 8)
        return v
    },

    dataUS(data: string) {
        if (!data) return ''

        var dia = data.split('/')[0]
        var mes = data.split('/')[1]
        var ano = data.split('/')[2]

        return ano + '-' + ('0' + mes).slice(-2) + '-' + ('0' + dia).slice(-2)
    },
    hora(hora: string) {
        if (!hora) return ''

        if (hora === '') return '00:00'

        let v = hora
        v = v.replace(/\D/g, '') // Remove tudo o que não é dígito
        v = v.replace(/^(\d{2})(\d)/g, '$1:$2') // Coloca barra depois dos dois primeiros dígitos
        return v.substr(0, 5)
    },
}

export default Mask
