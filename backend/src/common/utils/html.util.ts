export function removeScriptInjection(field: string) {
    return field.replace(/<script.*(\/script>)/gs, '')
}
