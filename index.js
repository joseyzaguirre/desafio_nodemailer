const express = require('express');
const fs = require('fs').promises;
const axios = require('axios');
const enviarEmail = require('./email.js')
const uuid = require('uuid')

const app = express();

app.use(express.static('static'));

app.get('/mailing', async (req, res) => {

    let correos = req.query.correos
    let asunto = req.query.asunto
    let contenido = req.query.contenido

    let resp = await axios.get('https://mindicador.cl/api');
    let data = resp.data;

    let mensajeDivisas = `    
    El valor del dolar el día de hoy es: ${data.dolar.valor}<br><br>
    El valor del euro el día de hoy es: ${data.euro.valor}<br><br>    
    El valor del uf el día de hoy es: ${data.uf.valor}<br><br>
    El valor del utm el día de hoy es: ${data.utm.valor}<br><br>
    `

    let mensajeEmail = contenido + mensajeDivisas

    let id = uuid.v4();
    let nombre_archivo = id + '.txt'
    let contenidoMail = `${correos}\n\n${asunto}\n\n${mensajeEmail}`

    await fs.writeFile(`correos/${nombre_archivo}`, contenidoMail.replaceAll('<br>', '\n').replaceAll('<p>', ' ').replaceAll('</p>', ' '), 'utf-8');

    enviarEmail(correos, asunto, mensajeEmail)
    res.send('correo enviado exitosamente')
});


app.listen(3000, () => {
    console.log('servidor corriendo en puerto 3000')
})