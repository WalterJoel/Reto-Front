import { keyBy } from 'lodash';
export const Preguntas=[
    {
      key_id: 0,
      has_video:false,
      description: '¿Que es para ti computacion?',
    },
    {
      key_id: 1,
      has_video:false,
      description: '¿Cual es la diferencia entre un contenedor vs maquina virtual?',
    },
    {
      key_id: 2,
      has_video:false,
      description: '¿Que es virtualizacion?',
    },
    {
      key_id: 3,
      has_video:false,
      description: '¿Eres autodidacta?',
    },
  ]
  export const sectionBy = keyBy(Preguntas, 'key_id');
