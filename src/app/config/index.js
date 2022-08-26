/* Modulo 27  - Definindo base  e primeira requisição */



 const api = (process.env.PUBLIC_URL) ? "htpps://api.loja-teste.ampliee.com" : "http://localhost:3000";
 const versao = "v1";

const apiVersao = () => `${api}/${versao}/api`;

export const urlogin = `${apiVersao()}/login`;
export const urlLoginAdmin = `${apiVersao()}/usuarios/login/admin`;
export const urlPedidosAdmin = `${apiVersao()}/pedidos/admin`; 
export const urlUsuarios = `${apiVersao()}/usuarios`;
export const urlRecuperarSenha = `${apiVersao()}/usuarios/recuperar-senha`;
export const urlPedidosPesquisa = `${apiVersao()}/clientes/search`;
export const urlPagamentos  = `${apiVersao()}/pagamentos`;
export const urlEntregas = `${apiVersao()}/entregas`;
export const urlClientes = `${apiVersao()}/clientes`;
export const urlClientesPesquisa = `${apiVersao()}/clientes/search`;
export const urlClientesAdmin = `${apiVersao()}/clientes/admin`;