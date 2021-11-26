import { ClientesService } from './../../clientes.service';
import { Cliente } from './../cliente';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: String;
  mensagemErro: String;

  constructor(
    private service:ClientesService,
    private router : Router) { }

  ngOnInit(): void {
    this.service.getClientes()
      .subscribe(resposta => this.clientes = resposta);
  }

  novoCadastro(){
    this.router.navigate(['/cliente-form']);
  }

  voltarListaClientes(){
    this.router.navigate(['/cliente-lista']);
  }

  preparaDelecao(cliente: Cliente){
    this.clienteSelecionado = cliente;
  }

  deletarCliente(){
    this.service
      .deletaClienteByid(this.clienteSelecionado)
      .subscribe(
        response => {
          this.mensagemSucesso = "Cliente deletado com sucesso!"
          this.ngOnInit();
        },
        erro => this.mensagemErro = "Ocorreu um erro ao deletar o cliente"
      )
  }

}
