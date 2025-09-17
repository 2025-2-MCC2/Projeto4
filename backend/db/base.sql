create database Empathize;
use Empathize;

create table Mentores(
id_mentores int primary key auto_increment, 
Nome_Mentor varchar(100) not null,
Email varchar(50) unique not null,
Senha_mentor varchar(50) not null
);

create table ADM(
id_adm int primary key auto_increment,
Email varchar(50) unique not null,
Senha_adm varchar(50) not null
);

create table Edicoes(
id_edicoes int primary key auto_increment,
data_inicio date,
data_termino date
);

create table Grupo(
id_grupo int primary key auto_increment,
Pontuacao int,
Nome_grupo varchar(25) not null,
Senha_grupo varchar(50) not null,
id_edicoes int,
foreign key (id_edicoes) references Edicoes(id_edicoes)
);

create table Alunos(
id_alunos int primary key auto_increment,
Nota int check (Nota between 0 and 10),
Curso varchar(50) not null,
Nome varchar(100) not null,
id_grupo int,
id_mentores int,
foreign key (id_grupo) references Grupo(id_grupo),
foreign key (id_mentores) references Mentores(id_mentores) 
);

create table Arrecadacoes(
id_arrecadacoes int primary key auto_increment,
Validade varchar(50),
Alimentos varchar(50),
quant_kg int,
Comprovante varchar(50) not null,
Just_rejeicao varchar(100),
status_arrecadacao varchar(15),
id_grupo int,
foreign key (id_grupo) references Grupo(id_grupo) 
);

create table Projetos(
id_projetos int primary key auto_increment,
descricao_projeto varchar(100),
id_grupo int,
foreign key (id_grupo) references Grupo(id_grupo)
);