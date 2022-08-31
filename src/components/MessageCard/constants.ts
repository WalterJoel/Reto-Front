import { keyBy } from 'lodash';

export const MessageType = {
  Invitation: 'Invitation',
  Reminder: 'Reminder',
  Customized: 'Customized',
};

export const ChannelType = {
  Email: 'Email',
  Sms: 'Sms',
  Whatsapp: 'Whatsapp',
};

export const templateConfigs = [
  {
    type: MessageType.Invitation,
    channel: ChannelType.Email,
    subject: 'Invitación a proceso',
    body: 'Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]',
  },
  {
    type: MessageType.Invitation,
    channel: ChannelType.Sms,
    body: 'Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]',
  },
  {
    type: MessageType.Invitation,
    channel: ChannelType.Whatsapp,
    body: 'Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra mas informacion aqui: [Link]',
  },
  {
    type: MessageType.Reminder,
    channel: ChannelType.Email,
    subject: 'Recordatorio de proceso',
    body: 'Hola, [userName] nos gustaria recordarte que tienes pendiente un proceso. Entra aqui para continuar [Link]',
  },
  {
    type: MessageType.Reminder,
    channel: ChannelType.Sms,
    subject: 'Recordatorio de proceso',
    body: 'Hola, [userName] nos gustaria recordarte que tienes pendiente un proceso. Entra aqui para continuar [Link]',
  },
  {
    type: MessageType.Reminder,
    channel: ChannelType.Whatsapp,
    subject: 'Recordatorio de proceso',
    body: 'Hola, [userName] nos gustaria recordarte que tienes pendiente un proceso. Entra aqui para continuar [Link]',
  },
  {
    type: MessageType.Customized,
    channel: ChannelType.Email,
    subject: '',
    body: '',
  },
  {
    type: MessageType.Customized,
    channel: ChannelType.Sms,
    subject: '',
    body: '',
  },
  {
    type: MessageType.Customized,
    channel: ChannelType.Whatsapp,
    subject: '',
    body: '',
  },
];

export const SectionCode = {
  SelectMessageType: 'SelectMessageType',
  SelectChannelType: 'SelectChannelType',
  PreviewEmail: 'PreviewEmail',
  PreviewSms: 'PreviewSms',
  PreviewWhatsapp: 'PreviewWhatsapp',
};
export const Sections = [
  {
    code: SectionCode.SelectMessageType,
    title: 'Selecciona el tipo de mensaje',
  },
  {
    code: SectionCode.SelectChannelType,
    title: 'Selecciona canales',
  },
  {
    code: SectionCode.PreviewEmail,
    title: 'Correo eletrónico',
  },
  {
    code: SectionCode.PreviewSms,
    title: 'Mensaje de texto',
  },
  {
    code: SectionCode.PreviewWhatsapp,
    title: 'Whatsapp',
  },
];

export const sectionBy = keyBy(Sections, 'code');
