const contactAddress =
  'Av. das Américas, 555 - Kennedy, Contagem/MG, CEP 32145-000'

const contactEmail = 'comercial@nacionaldistribuicao.com.br'

export const site = {
  brand: {
    name: 'Nacional Distribuidora',
    legalName: 'Distribuidora Nacional LTDA',
    domain: 'nacionaldistribuicao.com.br',
    city: 'Contagem/MG',
  },
  contact: {
    email: contactEmail,
    gmailComposeUrl: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmail)}`,
    phone: '(31) 8572-1210',
    phoneTel: '+553185721210',
    address: contactAddress,
    cnpj: '54.610.170/0001-17',
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactAddress)}`,
  },
  nav: [
    { label: 'Home', to: '/' },
    {
      label: 'Institucional',
      children: [
        { label: 'Quem Somos', to: '/quem-somos' },
        { label: 'Política de Privacidade', to: '/politica-de-privacidade' },
      ],
    },
    { label: 'Empresas Parceiras', to: '/empresas-parceiras' },
    { label: 'Trabalhe Conosco', to: '/trabalhe-conosco' },
    { label: 'Contato', to: '/contato' },
  ],
} as const

