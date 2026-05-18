import { site } from '../site/content'

function Section(props: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-lg font-extrabold tracking-tight text-primaryDark sm:text-xl">
        {props.title}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink/80 sm:text-base">
        {props.children}
      </div>
    </section>
  )
}

function List(props: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {props.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default function Privacidade() {
  const { email } = site.contact
  const { domain, name, legalName } = site.brand

  return (
    <main className="bg-surface">
      <div className="n-container py-12 sm:py-16">
        <header className="max-w-3xl">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base">
            A {name} valoriza a privacidade dos usuários e trata as informações recebidas com
            responsabilidade e transparência.
          </p>
        </header>

        <article className="mt-10 rounded-2xl border border-muted bg-white p-6 shadow-[0_12px_28px_-24px_rgba(7,31,61,0.18)] sm:p-8 lg:p-10">
          <Section title="1. Informações gerais">
            <p>
              Esta Política de Privacidade descreve como a {name} ({legalName}), inscrita no CNPJ{' '}
              {site.contact.cnpj}, pode coletar, usar e proteger informações fornecidas por usuários
              ao acessar o site {domain} e ao utilizar nossos canais de contato.
            </p>
            <p>
              Ao navegar no site ou entrar em contato conosco, recomendamos que você leia esta
              política para entender como as informações podem ser tratadas. Recomendamos a leitura
              periódica deste documento, pois ele pode ser atualizado conforme mudanças no site ou
              na legislação aplicável.
            </p>
          </Section>

          <Section title="2. Dados que podem ser coletados">
            <p>Podemos receber dados pessoais quando você:</p>
            <List
              items={[
                'entra em contato por e-mail, telefone ou WhatsApp;',
                'envia informações por formulários disponíveis no site;',
                'envia currículo ou dados profissionais pela página Trabalhe Conosco, quando houver formulário;',
                'navega pelo site.',
              ]}
            />
            <p>Exemplos de dados que podem ser informados ou registrados:</p>
            <List
              items={[
                'nome;',
                'telefone;',
                'e-mail;',
                'empresa;',
                'cargo de interesse;',
                'mensagem enviada;',
                'currículo, quando enviado voluntariamente;',
                'informações técnicas básicas de navegação, quando aplicável.',
              ]}
            />
          </Section>

          <Section title="3. Finalidade do uso dos dados">
            <p>Os dados podem ser utilizados para:</p>
            <List
              items={[
                'responder solicitações de contato;',
                'atender demandas comerciais;',
                'analisar currículos enviados;',
                'melhorar a comunicação com usuários;',
                'manter registros internos de atendimento;',
                'cumprir obrigações legais, quando necessário.',
              ]}
            />
          </Section>

          <Section title="4. Compartilhamento de dados">
            <p>
              A {name} não vende dados pessoais. As informações podem ser compartilhadas apenas
              quando necessário para:
            </p>
            <List
              items={[
                'atendimento da solicitação do usuário;',
                'cumprimento de obrigações legais ou regulatórias;',
                'uso de ferramentas essenciais para funcionamento do site, hospedagem, e-mail ou segurança.',
              ]}
            />
            <p>
              Nessas situações, buscamos que terceiros envolvidos também adotem medidas adequadas de
              proteção das informações.
            </p>
          </Section>

          <Section title="5. Cookies e tecnologias semelhantes">
            <p>
              Cookies são pequenos arquivos que podem ser armazenados no seu navegador para permitir
              funcionalidades básicas ou melhorar a experiência de navegação.
            </p>
            <p>
              No momento, este site utiliza recursos necessários ao seu funcionamento. Não
              utilizamos, nesta etapa, cookies não essenciais para análise de tráfego, publicidade ou
              remarketing.
            </p>
            <p>
              Caso sejam adicionadas ferramentas de análise, marketing ou cookies não essenciais no
              futuro, esta política poderá ser atualizada e, se necessário, será exibido aviso ou
              banner de consentimento ao usuário.
            </p>
          </Section>

          <Section title="6. Segurança das informações">
            <p>
              Adotamos medidas razoáveis para proteger as informações recebidas contra acessos não
              autorizados, perda, alteração ou divulgação indevida. Ainda assim, nenhum sistema de
              transmissão ou armazenamento eletrônico é totalmente imune a riscos.
            </p>
          </Section>

          <Section title="7. Direitos do usuário">
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você pode solicitar,
              quando aplicável:
            </p>
            <List
              items={[
                'confirmação da existência de tratamento de dados;',
                'acesso aos dados;',
                'correção de dados incompletos ou desatualizados;',
                'exclusão de dados, quando aplicável;',
                'informações sobre uso e compartilhamento;',
                'revogação de consentimento, quando aplicável.',
              ]}
            />
            <p>
              Para exercer esses direitos, utilize o canal de contato indicado nesta política.
            </p>
          </Section>

          <Section title="8. Canal de contato">
            <p>
              Para solicitações relacionadas à privacidade e proteção de dados, entre em contato pelo
              e-mail:{' '}
              <a
                href={site.contact.gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                {email}
              </a>
              .
            </p>
          </Section>

          <Section title="9. Atualizações desta política">
            <p>
              Esta política pode ser atualizada periodicamente para refletir mudanças no site, nos
              canais de atendimento, nas funcionalidades disponíveis ou em exigências legais. A data
              da última atualização será indicada ao final desta página.
            </p>
          </Section>

          <p className="mt-10 border-t border-muted pt-6 text-sm font-semibold text-ink/70">
            Última atualização: maio de 2026
          </p>
        </article>
      </div>
    </main>
  )
}
