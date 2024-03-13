
# food explorer 🚀

Aplicação de ponta a ponta que simula um restaurante. Foi criado um cenário onde os clientes podem cadastrar-se para visualizar o menu, enquanto os funcionários(admin) do restaurante podem gerenciar pratos, ingredinetes, editar, alterar preços.

Para o back-end, utilizamos o Node.js como tecnologia principal, juntamente com Express.js para criar um servidor robusto que irá lidar com as requisições dos clientes. Para banco de dados utilizamos SQLlite para armazenar informações sobre o menu do restaurante, cadastrando usuários, pratos e ingredintes. Além disso, implementamos autenticação de usuário para que os clientes possam fazer login e acessar o menu, e os funcionários(admin) possam acessar o sistema de gerenciamento do restaurante.

🚨**ATENÇÃO**🚨
***O deploy do backand foi feito no [render](https://api-rocketfood.onrender.com/)(ensinado em aula!), até o momento, em uma conta gratuita. por isso ficará inativa, podendo atrasar as solicitações em 50 segundos, conforme consta no site: "Sua instância gratuita ficará inativa, o que pode atrasar as solicitações em 50 segundos ou mais."***

## Funcionalidades e competências

- Desenvolvimento de uma API que suporte as operações de CRUD (criar, ler, atualizar, e apagar) para os pratos do restaurante.

- Implementação de autenticação JWT para usuários e admin.

- Armazenamento de dados do admin, do restaurante e dos usuários em um banco de dados.

- Implementação de funcionalidades de busca por nome e ingredientes para pratos.

- Desenvolvimento de *endpoints* para manipulação de pratos, autenticação e outras operações necessárias.

- Implementação de validações de entrada e saída de dados.


## Tecnologias utilizadas

- Node.js
- Express
- Express-async-errors
- Bcryptjs
- Jsonwebtoken
- Multer 
- SQLite
- Knex.js
- Autenticação JWT
- Cors
- PM2
- Deploy (render)

## Autor

- [@tonyfernandes991](https://github.com/tonyfernandes991)

