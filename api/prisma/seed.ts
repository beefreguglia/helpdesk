import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o processo de seed...');

  console.log('Criando administrador...');
  await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@email.com',
      password: hashSync('admin123', 10),
      role: 'ADMIN',
    },
  });

  console.log('Criando técnicos...');
  await prisma.user.create({
    data: {
      name: 'Técnico Um',
      email: 'tecnico1@email.com',
      password: hashSync('tecnico123', 10),
      role: 'TECHNICIAN',
      technicianProfile: {
        create: {
          availability: JSON.stringify([
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
          ]),
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      name: 'Técnico Dois',
      email: 'tecnico2@email.com',
      password: hashSync('tecnico123', 10),
      role: 'TECHNICIAN',
      technicianProfile: {
        create: {
          availability: JSON.stringify([
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
          ]),
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      name: 'Técnico Três',
      email: 'tecnico3@email.com',
      password: hashSync('tecnico123', 10),
      role: 'TECHNICIAN',
      technicianProfile: {
        create: {
          availability: JSON.stringify([
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00',
          ]),
        },
      },
    },
  });

  await prisma.service.createMany({
    data: [
      {
        title: 'Instalação e atualização de softwares',
        price: 99.9,
      },
      {
        title: 'Instalação e atualização de hardwares',
        price: 149.9,
      },
      {
        title: 'Diagnóstico e remoção de vírus',
        price: 120.0,
      },
      {
        title: 'Suporte a impressoras e periféricos',
        price: 80.5,
      },
      {
        title: 'Solução de problemas de conectividade de internet',
        price: 110.0,
      },
      {
        title: 'Backup e recuperação de dados',
        price: 180.0,
      },
      {
        title: 'Otimização de desempenho do sistema operacional',
        price: 95.0,
      },
    ],
  });

  console.log('Seed concluído com sucesso! ✅');
}

main()
  .catch((e) => {
    console.error('Ocorreu um erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
