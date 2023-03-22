# Car Register

**RF**
User must be allowed to register a new car.
It must be possible to list all the categories.



**RN**
It must not be possible register two cars with the same license_plate.
It must not be possible to alter a car's license_plate.
Car's availability must be true by default.
Only Admins must be able to register a new cars.


# List cars

**RF**
It must be possible to list all available cars.
It must be possible to list all available cars by the name of the category.
It must be possible to list all available cars by the brand.
It must be possible to list all available cars by car's name.

**RN**
The user don't have to be logged in to see the car's list.

# Registro de especificações do carro

**RF**
It must be possible register a specification for a car.
It must be possible to list all the specifications.
It must be possible to list all the cars.
Only Admins must be able to register a new specifications.

**RN**
It must not be possible to register a specification for a non-existing car.
It must not be possible to register two specifications with the same name for a car.


# Cadastro de imagens do carro


**RF**
It must be possible register.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer apra o upload dos arquivos

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel

**RN**
O aluguel deve ter duração miníma de 24 hora.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário

Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro




