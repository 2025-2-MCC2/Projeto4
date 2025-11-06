🗄️ Estrutura do Banco de Dados

Abaixo está a descrição das tabelas utilizadas no projeto, seus campos e relações principais.

🧑‍💼 Tabela adm

A tabela adm refere-se à administração do sistema.

Campos:

id → Identificação única de cada administrador.

name_adm → Nome do administrador.

email → E-mail do administrador.

password → Senha utilizada para o login do administrador.

🎓 Tabela student

A tabela student representa todos os estudantes inscritos no projeto.

Campos:

id → Identificação única de cada estudante.

RA → Registro Acadêmico (RA) do estudante.

full_name → Nome completo do estudante.

course → Curso ao qual o estudante pertence.

password → Senha utilizada para o login do estudante.

📅 Tabela edition

A tabela edition representa a edição em que o projeto está situado.

Campos:

id → Identificação única de cada edição.

start_date → Data de início da edição.

end_date → Data de término da edição.

🧑‍🏫 Tabela mentor

A tabela mentor representa os mentores selecionados para o projeto.

Campos:

id → Identificação única do mentor.

name_mentor → Nome do mentor.

email → E-mail do mentor.

password → Senha utilizada para o login do mentor.

👥 Tabela team

A tabela team representa os grupos existentes no projeto.

Campos:

id → Identificação única de cada grupo.

group_name → Nome do grupo.

pontuation → Pontuação baseada na quantidade arrecadada em cada edição.

id_mentor → Chave estrangeira que referencia mentor(id).

🧩 Tabela project

A tabela project representa os projetos criados por cada grupo durante o período do projeto.

Campos:

id → Identificação única de cada projeto.

name_project → Nome do projeto.

description_project → Descrição do projeto.

id_group → Chave estrangeira que referencia team(id).

🍽️ Tabela collection

A tabela collection representa a arrecadação de alimentos realizada por cada grupo.

Campos:

id → Identificação única de cada arrecadação.

food → Tipo de alimento arrecadado.

quantity_kg → Quantidade arrecadada (em kg).

proof → Evidência de pagamento ou doação.

jus_reject → Justificativa de rejeição (caso aplicável).

status → Estado do envio do formulário de arrecadação.

id_group → Chave estrangeira que referencia team(id).

🧑‍🤝‍🧑 Tabela team_student

A tabela team_student unifica a relação entre grupos, estudantes e edições.

Campos:

id_student → Chave estrangeira que referencia student(id).

id_edition → Chave estrangeira que referencia edition(id).

id_group → Chave estrangeira que referencia team(id).