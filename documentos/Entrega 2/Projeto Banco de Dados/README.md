    A tabela “adm” refere-se a toda administração, contendo os seguintes campos:
•	id: referencia a identificações de cada administrador;
•	name_adm: referencia os nomes de cada administrador;
•	email: referencia os e-mails de cada administrador;
•	password: referencia a senha utilizada para efetuação do login do administrador.
    A tabela “student” refere-se a todos os estudantes inscritos no projeto, contendo os seguintes campos:
•	id: referencia a identificações de cada estudante ingressado no projeto;
•	RA: referencia o RA de cada estudante ingressado no projeto;
•	full_name: referencia o nome completo de cada estudante ingressado no projeto;
•	course: referencia a qual curso o estudante pertence;
•	password: referencia a senha utilizada para efetuação do login do estudante.
    A tabela “edition” refere-se a edição em que o projeto está situado:
•	id: referencia a identificação de cada edição; 
•	start_date: referencia a data de início de cada edição;
•	end_date: referencia a data de término da edição.
    A tabela “mentor” refere-se aos mentores selecionados para o projeto, contendo os seguintes campos:
•	id: referencia a identificação do mentor presente em cada edição;
•	name_mentor: referencia o nome do mentor presente;
•	email: referencia o email do mentor;
•	password: referencia a senha utilizada para efetuação do login do mentor.
    A tabela “team” refere-se aos grupos existentes no projeto, contendo os seguintes campos:
•	id: referencia a identificação de cada grupo presente na edição;
•	group_name: referencia o nome do grupo presente em cada edição;
•	pontuation: referencia a pontuação baseada em quantidade arrecadada em cada edição;
•	id_mentor: chave estrangeira que referencia “mentor(id)”.
    A tabela “project” refere-se aos projetos criados por cada grupo durante o período, contendo os seguintes campos:
•	 id: referencia a identificação de cada projeto criado na designada edição;
•	 name_project: referencia o nome escolhido para cada um dos projetos;
•	 description_project: referencia a descrição dada a um dos projetos;
•	 id_group: chave estrangeira que referencia “team(id)”.
    A tabela “collection” refere-se a arrecadação dos alimentos de cada grupo, contendo os seguintes campos:
•	id: referencia a identificação de cada arrecadação;
•	food: referencia a qual alimento foi arrecadado;
•	quantity_kg: referencia a quantidade de alimento arrecadado;
•	proof: referencia a evidencia de pagamento ou doação;
•	jus_reject: referencia a justificativa de rejeição caso tenha;
•	status: referencia o estado do envio do formulário de arrecadação;
•	id_group: chave estrangeira que referencia “team(id)”.
    A tabela “team_studant” refere-se a unificação do grupo com os estudantes desse mesmo grupo, contendo os seguintes campos:
•	id_student: chave estrangeira que referencia “student (id)”;
•	id_edition: chave estrangeira que referencia “edition(id)”;
•	id_group: chave estrangeira que refencia “team(id)”.