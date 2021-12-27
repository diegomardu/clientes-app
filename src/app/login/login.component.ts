import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  cadastrando: boolean;
  mensagem: string;
  errors: string[];

  constructor(private route: Router,
    private authServive: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authServive
      .tentarLogar(this.username, this.password)
      .subscribe( response => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('access_token',access_token);
        this.route.navigate(['/home']);
      }, errosResponse => {
        this.errors = ['Usuário ou senha invalidos']
      })

  }

  preparaCadastrar(event){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastrar(){
    this.cadastrando = false;
  }

  cadastrar(){
    const usuario: Usuario = new Usuario()
    usuario.username = this.username;
    usuario.password = this.password;
    this.authServive
      .salvar(usuario)
      .subscribe( response => {
        this.mensagem = "Cadastro realizado com sucesso! Efetue login";
        this.cadastrando = false;
        this.username ='';
        this.password = '';
        this.errors = [];
      }, errorResponse => {
        this.mensagem = null;
        this.errors = errorResponse.error.errors;
      });

  }

}
