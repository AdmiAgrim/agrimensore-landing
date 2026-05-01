export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-stone-50 text-zinc-700 py-24 px-4 font-sans selection:bg-stone-200">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-zinc-900 mb-2">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm">
          Informativa sul Trattamento dei Dati Personali ai sensi degli artt. 13 e 14 del
          Regolamento (UE) 2016/679 (GDPR). Ultimo aggiornamento: maggio 2026.
        </p>

        {/* ── 1. Titolare e Responsabile ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">1. Titolare e Responsabile del Trattamento</h2>
          <p className="mb-3">
            Ai sensi del GDPR, il <strong className="text-zinc-900">Titolare del Trattamento</strong> dei dati
            personali inseriti nella piattaforma &egrave; il Cliente stesso (l&apos;impresa edile, lo studio tecnico
            o il professionista che sottoscrive l&apos;abbonamento). Il Cliente determina le finalit&agrave; e
            i mezzi del trattamento dei dati dei propri collaboratori e lavoratori.
          </p>
          <p className="mb-3">
            <strong className="text-zinc-900">Agrimensore SRLS</strong> opera in qualit&agrave; di{" "}
            <strong className="text-zinc-900">Responsabile del Trattamento</strong> (Art. 28 GDPR), trattando
            i dati personali per conto del Cliente e secondo le sue istruzioni, limitatamente a quanto necessario
            per l&apos;erogazione del Servizio.
          </p>
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 text-sm space-y-1">
            <p><strong className="text-zinc-900">Agrimensore SRLS</strong></p>
            <p>Piazza Buffoni 5, 21013 Gallarate (VA)</p>
            <p>P.IVA / C.F.: 04130840129</p>
            <p>PEC: <a href="mailto:agrimensore@pec.it" className="text-emerald-600 underline">agrimensore@pec.it</a></p>
            <p>E-mail: <a href="mailto:info@agrimensore.it" className="text-emerald-600 underline">info@agrimensore.it</a></p>
          </div>
        </section>

        {/* ── 2. DPO ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">2. Responsabile della Protezione dei Dati (DPO)</h2>
          <p>
            Ai sensi dell&apos;Art. 37 del GDPR, la nomina di un DPO non &egrave; obbligatoria per Agrimensore SRLS
            in quanto il trattamento non rientra tra quelli che richiedono un monitoraggio regolare e sistematico
            degli interessati su larga scala, n&eacute; riguarda categorie particolari di dati su larga scala.
            Per qualsiasi richiesta relativa alla protezione dei dati, &egrave; possibile contattare il Titolare
            agli indirizzi sopra indicati.
          </p>
        </section>

        {/* ── 3. Dati trattati ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">3. Tipologia di Dati Trattati</h2>
          <p className="mb-3">Nell&apos;ambito dell&apos;erogazione del Servizio, vengono trattati i seguenti dati:</p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600">
            <li><strong className="text-zinc-900">Dati di registrazione:</strong> nome, cognome, indirizzo e-mail, ragione sociale, P.IVA, codice fiscale, codice SDI/PEC.</li>
            <li><strong className="text-zinc-900">Dati dei collaboratori:</strong> nome, cognome, e-mail, ruolo, dati inseriti dal Cliente nell&apos;ambito della gestione del cantiere.</li>
            <li><strong className="text-zinc-900">Dati dei lavoratori:</strong> nome, cognome, ruolo, qualifiche, scadenze documentali (idoneit&agrave; sanitaria, formazione, badge), come inseriti dal Cliente.</li>
            <li><strong className="text-zinc-900">Documenti:</strong> file caricati dal Cliente (documenti di cantiere, certificati, verbali).</li>
            <li><strong className="text-zinc-900">Dati di navigazione:</strong> indirizzo IP, user agent, timestamp delle azioni di autenticazione (login, registrazione, reset password), registrati nell&apos;audit log di sicurezza.</li>
            <li><strong className="text-zinc-900">Cookie analitici:</strong> dati anonimi raccolti tramite Google Analytics 4, solo previo consenso esplicito dell&apos;utente (vedi <a href="/cookie" className="text-emerald-600 underline">Informativa Cookie</a>).</li>
          </ul>
        </section>

        {/* ── 4. Finalità e base giuridica ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">4. Finalit&agrave; e Base Giuridica del Trattamento</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-zinc-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-zinc-100 text-zinc-600">
                  <th className="text-left px-4 py-3 font-medium">Finalit&agrave;</th>
                  <th className="text-left px-4 py-3 font-medium">Base giuridica</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-200">
                  <td className="px-4 py-3">Erogazione del Servizio e gestione dell&apos;abbonamento</td>
                  <td className="px-4 py-3 text-zinc-500">Esecuzione del contratto (Art. 6.1.b)</td>
                </tr>
                <tr className="border-t border-zinc-200">
                  <td className="px-4 py-3">Fatturazione e adempimenti fiscali</td>
                  <td className="px-4 py-3 text-zinc-500">Obbligo legale (Art. 6.1.c)</td>
                </tr>
                <tr className="border-t border-zinc-200">
                  <td className="px-4 py-3">Sicurezza: audit log delle autenticazioni</td>
                  <td className="px-4 py-3 text-zinc-500">Legittimo interesse (Art. 6.1.f)</td>
                </tr>
                <tr className="border-t border-zinc-200">
                  <td className="px-4 py-3">Analisi anonima del traffico (Google Analytics 4)</td>
                  <td className="px-4 py-3 text-zinc-500">Consenso (Art. 6.1.a)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 5. Sub-responsabili ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">5. Sub-Responsabili del Trattamento</h2>
          <p className="mb-3">
            Per l&apos;erogazione del Servizio, Agrimensore SRLS si avvale dei seguenti sub-responsabili:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-zinc-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-zinc-100 text-zinc-600">
                  <th className="text-left px-4 py-3 font-medium">Sub-responsabile</th>
                  <th className="text-left px-4 py-3 font-medium">Servizio</th>
                  <th className="text-left px-4 py-3 font-medium">Localizzazione dati</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-200">
                  <td className="px-4 py-3 text-zinc-900 font-medium">AWS EMEA SARL</td>
                  <td className="px-4 py-3 text-zinc-500">Hosting, storage, database, e-mail transazionale</td>
                  <td className="px-4 py-3 text-zinc-500">Milano, Italia (eu-south-1)</td>
                </tr>
                <tr className="border-t border-zinc-200">
                  <td className="px-4 py-3 text-zinc-900 font-medium">Stripe, Inc.</td>
                  <td className="px-4 py-3 text-zinc-500">Gestione pagamenti e abbonamenti</td>
                  <td className="px-4 py-3 text-zinc-500">UE (con DPF per dati accessori)</td>
                </tr>
                <tr className="border-t border-zinc-200">
                  <td className="px-4 py-3 text-zinc-900 font-medium">Google Ireland Ltd.</td>
                  <td className="px-4 py-3 text-zinc-500">Google Analytics 4 (solo con consenso)</td>
                  <td className="px-4 py-3 text-zinc-500">UE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 6. Trasferimento dati ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">6. Trasferimento Dati Extra-UE</h2>
          <p className="mb-3">
            Tutti i dati del Cliente (database, documenti, file) sono conservati esclusivamente su server
            AWS ubicati a <strong className="text-zinc-900">Milano, Italia (regione eu-south-1)</strong>.
            Nessun dato del Cliente viene trasferito al di fuori dell&apos;Unione Europea.
          </p>
          <p>
            Per i servizi di pagamento (Stripe), eventuali trasferimenti di dati accessori verso gli Stati Uniti
            sono legittimati dall&apos;adesione di Stripe al Data Privacy Framework (DPF) e dalle Clausole
            Contrattuali Tipo (SCC) approvate dalla Commissione Europea.
          </p>
        </section>

        {/* ── 7. Conservazione ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">7. Tempi di Conservazione</h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-600">
            <li><strong className="text-zinc-900">Dati dell&apos;account:</strong> per tutta la durata dell&apos;abbonamento e per 30 giorni successivi alla cancellazione, per consentire l&apos;esportazione dei dati.</li>
            <li><strong className="text-zinc-900">Dati di fatturazione:</strong> 10 anni dalla data della fattura, come richiesto dalla normativa fiscale italiana.</li>
            <li><strong className="text-zinc-900">Audit log di sicurezza:</strong> 24 mesi, successivamente cancellati automaticamente.</li>
            <li><strong className="text-zinc-900">Backup del database:</strong> 30 giorni (snapshot giornalieri con rotazione automatica).</li>
            <li><strong className="text-zinc-900">Documenti su storage (S3):</strong> conservati con versioning attivo per tutta la durata dell&apos;abbonamento. Dopo la cancellazione dell&apos;account, i documenti vengono eliminati entro 30 giorni.</li>
          </ul>
        </section>

        {/* ── 8. Diritti dell'interessato ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">8. Diritti dell&apos;Interessato</h2>
          <p className="mb-3">
            Ai sensi degli artt. 15-22 del GDPR, l&apos;interessato ha il diritto di:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 mb-4">
            <li><strong className="text-zinc-900">Accesso</strong> (Art. 15): ottenere conferma del trattamento e copia dei dati personali.</li>
            <li><strong className="text-zinc-900">Rettifica</strong> (Art. 16): correggere dati inesatti o incompleti.</li>
            <li><strong className="text-zinc-900">Cancellazione / Diritto all&apos;oblio</strong> (Art. 17): richiedere la cancellazione dei dati personali.</li>
            <li><strong className="text-zinc-900">Limitazione</strong> (Art. 18): limitare il trattamento in determinate circostanze.</li>
            <li><strong className="text-zinc-900">Portabilit&agrave;</strong> (Art. 20): ricevere i dati in formato strutturato e leggibile.</li>
            <li><strong className="text-zinc-900">Opposizione</strong> (Art. 21): opporsi al trattamento basato su legittimo interesse.</li>
          </ul>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-emerald-900 font-semibold mb-2">Diritto alla Cancellazione — Implementazione Tecnica</p>
            <p className="text-emerald-800 text-sm">
              La piattaforma implementa il diritto alla cancellazione (Art. 17 GDPR) tramite un endpoint
              dedicato che anonimizza tutti i dati personali dell&apos;utente (nome, cognome, e-mail, dati
              fiscali). L&apos;operazione &egrave; irreversibile e viene registrata nell&apos;audit log.
            </p>
          </div>
          <p className="mt-4">
            Le richieste possono essere inviate a:{" "}
            <a href="mailto:info@agrimensore.it" className="text-emerald-600 underline hover:text-emerald-500 transition-colors">
              info@agrimensore.it
            </a>{" "}
            o tramite PEC a{" "}
            <a href="mailto:agrimensore@pec.it" className="text-emerald-600 underline hover:text-emerald-500 transition-colors">
              agrimensore@pec.it
            </a>.
            Il riscontro verr&agrave; fornito entro 30 giorni dalla ricezione della richiesta.
          </p>
        </section>

        {/* ── 9. Sicurezza ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">9. Misure di Sicurezza</h2>
          <p className="mb-3">
            Agrimensore SRLS adotta misure tecniche e organizzative adeguate alla protezione dei dati personali,
            tra cui:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600">
            <li>Crittografia dei dati in transito (TLS/HTTPS) e a riposo (AES-256 per storage e database).</li>
            <li>Backup automatici giornalieri con conservazione di 30 giorni.</li>
            <li>Versioning dei documenti su storage S3.</li>
            <li>Audit log di tutte le operazioni di autenticazione (login, registrazione, reset password) con IP e timestamp.</li>
            <li>Accesso ai sistemi limitato al personale autorizzato tramite credenziali individuali.</li>
            <li>Monitoraggio automatico con alerting in caso di anomalie.</li>
          </ul>
        </section>

        {/* ── 10. Reclamo ── */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">10. Diritto di Reclamo</h2>
          <p>
            Fatto salvo ogni altro ricorso amministrativo o giurisdizionale, l&apos;interessato che ritenga
            che il trattamento dei propri dati personali avvenga in violazione del GDPR ha il diritto di
            proporre reclamo all&apos;Autorit&agrave; Garante per la Protezione dei Dati Personali:{" "}
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 underline hover:text-emerald-500 transition-colors"
            >
              www.garanteprivacy.it
            </a>.
          </p>
        </section>
      </div>
    </div>
  )
}
