// @ts-ignore
const socket = io()

// @ts-ignore
const armarListadoUsuarios = Handlebars.compile(`
{{#if hayUsuarios}}
<ul>
    {{#each usuarios}}
    <li>Nombre: {{this.nombre}} | email: {{this.email}}</li>
    {{/each}}
</ul>
{{else}}
<p>no hay usuarios para mostrar</p>
{{/if}}
`)

socket.on('usuarios', usuarios => {
    const hayUsuarios = usuarios.length > 0
    // alert('recibi los usuarios: ' + JSON.stringify(usuarios[usuarios.length - 1]))
    const divLlistado = document.querySelector('#listadoUsuarios')
    if (divLlistado instanceof HTMLDivElement) {
        const html = armarListadoUsuarios({
            usuarios,
            hayUsuarios
        })
        divLlistado.innerHTML = html
    }
})