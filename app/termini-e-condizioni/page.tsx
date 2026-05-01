export default function TerminiCondizioni() {
  return (
    <div className="min-h-screen bg-stone-50 text-zinc-700 py-24 px-4 font-sans selection:bg-stone-200">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-zinc-900 mb-2">Termini e Condizioni di Servizio</h1>
        <p className="text-zinc-500 text-sm">Ultimo aggiornamento: maggio 2026.</p>

        {/* ── 1. Definizioni ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">1. Definizioni</h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-600">
            <li><strong className="text-zinc-900">&quot;Fornitore&quot;</strong>: Agrimensore SRLS, con sede legale in Piazza Buffoni 5, 21013 Gallarate (VA), P.IVA/C.F. 04130840129, PEC: agrimensore@pec.it.</li>
            <li><strong className="text-zinc-900">&quot;Servizio&quot;</strong>: la piattaforma software SaaS &quot;Agrimensore&quot;, accessibile all&apos;indirizzo app.agrimensore.com, comprensiva di tutte le funzionalit&agrave; rese disponibili in base al piano sottoscritto.</li>
            <li><strong className="text-zinc-900">&quot;Cliente&quot;</strong>: la persona fisica o giuridica (impresa edile, studio tecnico, professionista) che sottoscrive un piano di abbonamento.</li>
            <li><strong className="text-zinc-900">&quot;Utente&quot;</strong>: qualsiasi persona fisica che accede al Servizio, inclusi i collaboratori invitati dal Cliente.</li>
          </ul>
        </section>

        {/* ── 2. Oggetto ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">2. Oggetto del Contratto</h2>
          <p className="mb-3">
            I presenti Termini e Condizioni disciplinano l&apos;accesso e l&apos;utilizzo del Servizio fornito dal Fornitore.
            Il Servizio consiste in uno strumento software per la gestione documentale dei cantieri edili,
            comprensivo di funzionalit&agrave; quali: gestione cantieri, generazione verbali, gestione imprese e
            lavoratori, QR Code di trasparenza, condivisione documenti tramite magic link, e badge digitale lavoratore.
          </p>
          <p>
            L&apos;accettazione dei presenti Termini avviene al momento della registrazione sulla piattaforma
            e costituisce un contratto vincolante tra il Cliente e il Fornitore.
          </p>
        </section>

        {/* ── 3. Limitazione di responsabilità ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">3. Limitazione di Responsabilit&agrave;</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="text-amber-900 font-semibold mb-2">Clausola fondamentale</p>
            <p className="text-amber-800 text-sm">
              Il Fornitore fornisce esclusivamente lo strumento software. Il Cliente &egrave; e rimane
              l&apos;unico responsabile della sicurezza del cantiere, della validit&agrave; giuridica dei
              documenti prodotti o gestiti tramite la piattaforma (inclusi, a titolo esemplificativo e non
              esaustivo, POS, DUVRI, verbali, documentazione di subappalto), e di eventuali sanzioni
              comminate da ASL, Ispettorato del Lavoro, o altri enti di controllo.
            </p>
          </div>
          <p className="mb-3">
            Il Servizio non sostituisce la consulenza di un professionista abilitato (RSPP, CSP, CSE,
            consulente del lavoro). I verbali e i documenti generati dalla piattaforma sono modelli di
            supporto e devono essere verificati dal Cliente prima dell&apos;utilizzo.
          </p>
          <p className="mb-3">
            Il Fornitore non garantisce che il Servizio sia privo di errori, interruzioni o difetti.
            In nessun caso il Fornitore sar&agrave; responsabile per danni indiretti, incidentali, consequenziali,
            punitivi o speciali, inclusi ma non limitati a perdita di profitti, perdita di dati,
            interruzione dell&apos;attivit&agrave; o costi di sostituzione.
          </p>
          <p>
            La responsabilit&agrave; complessiva del Fornitore nei confronti del Cliente, per qualsiasi causa
            e a qualsiasi titolo, non potr&agrave; in alcun caso superare l&apos;importo totale corrisposto
            dal Cliente nei 12 (dodici) mesi precedenti l&apos;evento che ha dato origine alla controversia.
          </p>
        </section>

        {/* ── 4. Piani e abbonamento ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">4. Piani di Abbonamento e Pagamento</h2>
          <p className="mb-3">
            Il Servizio &egrave; disponibile in diversi piani (Trial, Starter, Professional, Business),
            ciascuno con limiti specifici in termini di cantieri attivi, collaboratori e spazio di archiviazione.
            I dettagli aggiornati di ciascun piano sono consultabili nella sezione Prezzi del sito.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 mb-3">
            <li><strong className="text-zinc-900">Trial:</strong> gratuito per 7 giorni dalla registrazione. Al termine del periodo di prova, l&apos;accesso alle funzionalit&agrave; viene sospeso fino alla sottoscrizione di un piano a pagamento.</li>
            <li><strong className="text-zinc-900">Rinnovo automatico:</strong> tutti i piani a pagamento si rinnovano automaticamente alla scadenza (mensile o annuale) salvo disdetta.</li>
            <li><strong className="text-zinc-900">Disdetta:</strong> il Cliente pu&ograve; annullare l&apos;abbonamento in qualsiasi momento tramite il Portale Clienti Stripe. La disdetta ha effetto alla scadenza del periodo gi&agrave; pagato.</li>
            <li><strong className="text-zinc-900">Nessun rimborso:</strong> non sono previsti rimborsi per periodi parziali di utilizzo. In caso di disdetta, il Cliente mantiene l&apos;accesso al Servizio fino al termine del periodo corrente.</li>
          </ul>
          <p className="mb-3">
            Tutti i prezzi esposti sono da intendersi al netto di IVA (22%), salvo ove diversamente indicato.
            Il pagamento avviene tramite Stripe. Il Fornitore si riserva il diritto di modificare i prezzi
            con un preavviso di almeno 30 giorni via e-mail.
          </p>
        </section>

        {/* ── 5. Fatturazione ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">5. Fatturazione Elettronica</h2>
          <p className="mb-3">
            Il Cliente &egrave; tenuto a fornire dati fiscali corretti e completi al momento della registrazione
            (ragione sociale, P.IVA, codice fiscale, codice SDI o indirizzo PEC per la ricezione della fattura elettronica).
          </p>
          <p>
            Il Fornitore non risponde di errori nella fatturazione derivanti da dati fiscali errati,
            incompleti o non aggiornati forniti dal Cliente.
          </p>
        </section>

        {/* ── 6. Obblighi del Cliente ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">6. Obblighi del Cliente</h2>
          <p className="mb-3">Il Cliente si impegna a:</p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600">
            <li>Utilizzare il Servizio in conformit&agrave; alla normativa vigente e ai presenti Termini.</li>
            <li>Mantenere riservate le proprie credenziali di accesso e non condividerle con terzi non autorizzati.</li>
            <li>Non caricare sulla piattaforma contenuti illeciti, diffamatori, o lesivi dei diritti di terzi.</li>
            <li>Non tentare di accedere a dati o funzionalit&agrave; non incluse nel proprio piano di abbonamento.</li>
            <li>Non effettuare operazioni di reverse engineering, decompilazione o disassemblaggio del software.</li>
            <li>Verificare la correttezza e la completezza dei documenti generati dalla piattaforma prima del loro utilizzo.</li>
          </ul>
        </section>

        {/* ── 7. Proprietà intellettuale ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">7. Propriet&agrave; Intellettuale</h2>
          <p className="mb-3">
            Il software, il codice sorgente, i modelli di documenti, il design, il marchio &quot;Agrimensore&quot;
            e tutti i materiali correlati sono e restano di propriet&agrave; esclusiva del Fornitore.
            L&apos;abbonamento conferisce al Cliente una licenza d&apos;uso non esclusiva, non trasferibile e
            revocabile, limitata alla durata dell&apos;abbonamento.
          </p>
          <p>
            I dati caricati dal Cliente sulla piattaforma restano di propriet&agrave; del Cliente.
            Il Fornitore non acquisisce alcun diritto sui contenuti del Cliente e non li utilizza
            per finalit&agrave; diverse dall&apos;erogazione del Servizio.
          </p>
        </section>

        {/* ── 8. Disponibilità del servizio ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">8. Disponibilit&agrave; del Servizio e Backup</h2>
          <p className="mb-3">
            Il Fornitore si impegna a garantire la massima disponibilit&agrave; del Servizio, senza tuttavia
            garantire un uptime del 100%. Il Servizio pu&ograve; essere soggetto a interruzioni programmate
            per manutenzione, aggiornamenti o miglioramenti.
          </p>
          <p className="mb-3">
            I dati del Cliente sono ospitati su infrastruttura AWS nella regione eu-south-1 (Milano, Italia).
            Il Fornitore effettua backup automatici giornalieri del database con conservazione di 30 giorni
            e versioning dei documenti su storage S3.
          </p>
          <p>
            Il Fornitore non &egrave; responsabile per perdite di dati dovute a cause di forza maggiore,
            atti di terzi, o malfunzionamenti dell&apos;infrastruttura di terze parti (AWS, Stripe, ecc.).
          </p>
        </section>

        {/* ── 9. Sospensione e risoluzione ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">9. Sospensione e Risoluzione</h2>
          <p className="mb-3">
            Il Fornitore si riserva il diritto di sospendere o risolvere l&apos;accesso al Servizio, con effetto
            immediato e senza obbligo di rimborso, nei seguenti casi:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 mb-3">
            <li>Mancato pagamento del corrispettivo entro 15 giorni dalla scadenza.</li>
            <li>Violazione dei presenti Termini o utilizzo abusivo del Servizio.</li>
            <li>Richiesta da parte di autorit&agrave; competenti.</li>
          </ul>
          <p>
            In caso di risoluzione, il Fornitore conserver&agrave; i dati del Cliente per un periodo di 30 giorni,
            durante i quali il Cliente potr&agrave; richiederne l&apos;esportazione. Trascorso tale periodo,
            i dati saranno cancellati definitivamente.
          </p>
        </section>

        {/* ── 10. Modifiche ai Termini ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">10. Modifiche ai Termini</h2>
          <p>
            Il Fornitore si riserva il diritto di modificare i presenti Termini in qualsiasi momento.
            Le modifiche saranno comunicate al Cliente via e-mail con un preavviso di almeno 15 giorni.
            La prosecuzione dell&apos;utilizzo del Servizio dopo l&apos;entrata in vigore delle modifiche
            costituisce accettazione delle stesse.
          </p>
        </section>

        {/* ── 11. Legge applicabile ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">11. Legge Applicabile e Foro Competente</h2>
          <p className="mb-3">
            I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia derivante
            dall&apos;interpretazione o dall&apos;esecuzione dei presenti Termini sar&agrave; competente in via
            esclusiva il Foro di Busto Arsizio (VA).
          </p>
          <p>
            Per i Clienti qualificabili come &quot;consumatori&quot; ai sensi del D.Lgs. 206/2005 (Codice del Consumo),
            resta salva la competenza del giudice del luogo di residenza o domicilio del consumatore,
            ove obbligatoria per legge.
          </p>
        </section>

        {/* ── 12. Contatti ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">12. Contatti</h2>
          <p>
            Per qualsiasi comunicazione relativa ai presenti Termini:<br />
            <strong className="text-zinc-900">Agrimensore SRLS</strong><br />
            Piazza Buffoni 5, 21013 Gallarate (VA)<br />
            PEC:{" "}
            <a href="mailto:agrimensore@pec.it" className="text-emerald-600 underline hover:text-emerald-500 transition-colors">
              agrimensore@pec.it
            </a><br />
            E-mail:{" "}
            <a href="mailto:info@agrimensore.it" className="text-emerald-600 underline hover:text-emerald-500 transition-colors">
              info@agrimensore.it
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
