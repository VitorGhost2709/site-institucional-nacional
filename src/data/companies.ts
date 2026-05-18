const logoModules = import.meta.glob<string>('../assets/Empresas Parceiras/*.png', {
  eager: true,
  import: 'default',
})

const logosByFile = Object.fromEntries(
  Object.entries(logoModules).map(([path, url]) => {
    const fileName = path.split('/').pop() ?? path
    return [fileName, url] as const
  }),
)

function logo(fileName: string): string {
  const url = logosByFile[fileName]
  if (!url) {
    throw new Error(`Logo não encontrado: ${fileName}`)
  }
  return url
}

export type Company = {
  name: string
  logo: string
  alt: string
  description: string
}

export const companies: Company[] = [
  {
    name: 'Aymoré',
    logo: logo('logoAymore.png'),
    alt: 'Logo Aymoré',
    description:
      'A Aymoré é uma marca tradicional de biscoitos com forte presença em Minas Gerais. Pertencente ao portfólio da Arcor, é conhecida por linhas de biscoitos doces e salgados que fazem parte da rotina de consumo de muitas famílias brasileiras.',
  },
  {
    name: 'Marcella / Biscoito Boa Vida',
    logo: logo('logoMarcella.png'),
    alt: 'Logo Marcella / Biscoito Boa Vida',
    description:
      'A Marcella, associada aos biscoitos Boa Vida, atua no segmento de alimentos práticos para o dia a dia. A marca trabalha com produtos de consumo cotidiano, especialmente biscoitos, voltados para lanches, merendas e abastecimento do varejo alimentar.',
  },
  {
    name: 'Santher',
    logo: logo('logoSanther.png'),
    alt: 'Logo Santher',
    description:
      'A Santher é uma empresa brasileira do segmento de higiene e papéis descartáveis. Seu portfólio inclui papéis higiênicos, lenços de papel, guardanapos, toalhas de papel, absorventes, protetores, fraldas e lenços umedecidos.',
  },
  {
    name: 'Predilecta',
    logo: logo('logoPredilecta.png'),
    alt: 'Logo Predilecta',
    description:
      'A Predilecta Alimentos nasceu em 1990, em São Lourenço do Turvo, distrito de Matão/SP, região reconhecida pela produção de goiaba. A marca trabalha com atomatados, conservas, doces, geleias, condimentos, molhos e outras linhas alimentícias.',
  },
  {
    name: 'Piracanjuba',
    logo: logo('logoPiracanjuba.png'),
    alt: 'Logo Piracanjuba',
    description:
      'A Piracanjuba é uma marca brasileira de alimentos e laticínios, originada no interior de Goiás. Seu portfólio reúne leite, bebidas lácteas, creme de leite, leite condensado, queijos, produtos zero lactose e outras soluções para a alimentação diária.',
  },
  {
    name: 'Triângulo',
    logo: logo('logoTriângulo.png'),
    alt: 'Logo Triângulo',
    description:
      'A Triângulo atua no setor de alimentos e produtos de consumo, com itens voltados ao abastecimento de mercados, mercearias e outros canais do varejo. Sua presença no mercado está ligada à oferta de produtos de giro e consumo recorrente.',
  },
  {
    name: 'ParaTudo',
    logo: logo('logoParaTudo.png'),
    alt: 'Logo ParaTudo',
    description:
      'A ParaTudo é uma indústria de bebidas de Uberlândia/MG, fundada em 1951. A marca ficou conhecida pela bebida Paratudo, feita à base de ervas e raízes amargas, e mantém tradição no segmento de bebidas populares brasileiras.',
  },
  {
    name: 'Müller',
    logo: logo('logoMuller.png'),
    alt: 'Logo Müller',
    description:
      'A Companhia Müller de Bebidas é uma das principais indústrias brasileiras de bebidas destiladas. É conhecida pela Cachaça 51 e por um portfólio que inclui cachaças, conhaques, vodkas, bebidas ice e outras linhas alcoólicas.',
  },
  {
    name: 'Salton',
    logo: logo('logoSalton.png'),
    alt: 'Logo Salton',
    description:
      'A Salton é uma das vinícolas mais tradicionais do Brasil, com origem familiar ligada à imigração italiana e atuação centenária no setor vitivinícola. Produz vinhos, espumantes, frisantes e outras bebidas, com forte presença nacional.',
  },
  {
    name: 'Balalaika',
    logo: logo('logoBalalaika.png'),
    alt: 'Logo Balalaika',
    description:
      'A Balalaika é uma vodka brasileira produzida pela Indústria de Bebidas Pirassununga. A marca é conhecida por sua proposta acessível no segmento de destilados e por produtos como a vodka tridestilada, filtrada e voltada ao consumo popular.',
  },
  {
    name: 'Campo Largo',
    logo: logo('logoCampo Largo.png'),
    alt: 'Logo Campo Largo',
    description:
      'A Campo Largo é uma marca de bebidas associada à Zanlorenzi, com produtos como sucos integrais, chás funcionais, chás orgânicos e água de coco. A marca trabalha uma linha voltada ao consumo cotidiano, bem-estar e praticidade.',
  },
  {
    name: 'Cata Festa',
    logo: logo('logoCata Festa.png'),
    alt: 'Logo Cata Festa',
    description:
      'A Cata Festa atua no segmento de artigos e soluções para festas, com produtos voltados para comemorações, decoração, consumo prático e organização de eventos. A marca atende demandas ligadas a festas infantis, celebrações e ocasiões especiais.',
  },
  {
    name: 'Unilever',
    logo: logo('logoUnilever.png'),
    alt: 'Logo Unilever',
    description:
      'A Unilever é uma multinacional de bens de consumo com presença histórica no Brasil. Atua em categorias como alimentos, limpeza, higiene pessoal e cuidados com a casa, reunindo marcas conhecidas como OMO, Dove, Rexona, Hellmann’s, Knorr, Cif e outras.',
  },
  {
    name: 'Aliança',
    logo: logo('logoAliança.png'),
    alt: 'Logo Aliança',
    description:
      'A Aliança é uma marca ligada ao segmento de vinhos e bebidas, com atuação no mercado brasileiro por meio de rótulos voltados a diferentes ocasiões de consumo. Sua linha é associada a produtos como vinhos, espumantes e bebidas derivadas da uva.',
  },
  {
    name: 'Oderich',
    logo: logo('logoOderich.png'),
    alt: 'Logo Oderich',
    description:
      'A Oderich é uma empresa brasileira de alimentos com origem no Rio Grande do Sul e história ligada ao setor de conservas. Seu portfólio inclui vegetais em conserva, enlatados, molhos, carnes, patês e produtos práticos para refeições e lanches.',
  },
  {
    name: 'Fugini',
    logo: logo('logoFuginne.png'),
    alt: 'Logo Fugini',
    description:
      'A Fugini é uma marca brasileira de alimentos conhecida por molhos de tomate, atomatados, milho, conservas, maioneses, molhos prontos e produtos práticos para a cozinha. A marca tem forte presença em itens de preparo rápido e consumo familiar.',
  },
  {
    name: 'Start Química',
    logo: logo('logoStart Química.png'),
    alt: 'Logo Start Química',
    description:
      'A Start Química atua no segmento de limpeza doméstica, profissional e institucional. A empresa oferece um amplo portfólio de produtos para limpeza, desinfecção e higienização de ambientes, incluindo linhas para residências, empresas e indústrias.',
  },
  {
    name: 'Super Globo',
    logo: logo('logoSuper globo.png'),
    alt: 'Logo Super Globo',
    description:
      'A Super Globo é uma marca de produtos de limpeza com história iniciada em 1938. Seu portfólio inclui água sanitária, desinfetantes, multiuso, limpa pisos, limpa vidros, desengordurantes, cloro ativo e limpadores perfumados.',
  },
  {
    name: 'Fante',
    logo: logo('logoFante.png'),
    alt: 'Logo Fante',
    description:
      'A Fante é uma marca associada ao segmento de vinhos e bebidas, com produtos voltados a diferentes ocasiões de consumo. A marca aparece no mercado com rótulos ligados à tradição de bebidas populares e ao abastecimento do varejo.',
  },
  {
    name: 'Chapadão',
    logo: logo('logoChapadão.png'),
    alt: 'Logo Chapadão',
    description:
      'A Chapadão é uma marca presente no setor de alimentos e produtos de consumo, com itens voltados ao abastecimento alimentar e à rotina de compra de mercados, mercearias e outros pontos de venda.',
  },
  {
    name: 'Cahdam Bob',
    logo: logo('logoCahdam Bob.png'),
    alt: 'Logo Cahdam Bob',
    description:
      'A Cahdam Bob atua no segmento de papéis, bobinas e soluções de embalagem. A marca é voltada ao fornecimento de materiais usados em operações comerciais, pontos de venda, atendimento, embalagem e rotinas de consumo.',
  },
]
