const url = "https://my-json-server.typicode.com/ivoneforero/E-commerce-Delliti/usuarios";

//"https://my-json-server.typicode.com/zidjian/b-b-opticas/usuarios"; 

const autenticacion = (usuario, contrasenia) => 
    fetch(`${url}?usuario=${usuario}&contrasenia=${contrasenia}`).then((respuesta) => respuesta.json());


export const LoginServicio = {
    autenticacion
};