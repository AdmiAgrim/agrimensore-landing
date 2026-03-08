export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-stone-50 text-zinc-700 py-24 px-4 font-sans selection:bg-stone-200 dark:bg-black dark:text-zinc-300 dark:selection:bg-zinc-800">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-zinc-900 mb-2 dark:text-white">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm">
          Informativa sul Trattamento dei Dati Personali redatta ai sensi degli artt. 13 e 14 del
          Regolamento (UE) 2016/679 (GDPR). Ultimo aggiornamento: marzo 2026.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3 dark:text-white">1. Titolare del Trattamento</h2>
          <p>
            Il Titolare del trattamento dei dati personali è <strong className="text-white">Agrimensore SRLS</strong>,
            con sede legale in Piazza Buffoni 5, 21013 Gallarate (VA), P.IVA/C.F.{" "}
            <strong className="text-white">04130840129</strong>, e-mail:{" "}
            <a href="mailto:info@agrimensore.it" className="text-zinc-500 underline hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white">
              info@agrimensore.it
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3 dark:text-white">2. Tipologia di Dati Trattati e Cookie</h2>
          <p className="mb-3">
            Nel pieno rispetto del principio di minimizzazione dei dati, il Titolare tratta esclusivamente:
          </p>
          <ul className="list-disc list-inside space-y-3 text-zinc-400">
            <li>
              <strong className="text-zinc-800 dark:text-zinc-200">Dati forniti volontariamente:</strong> Nome, cognome, e-mail e altre
              informazioni inserite spontaneamente dall&apos;Utente nel modulo di contatto.
            </li>
            <li>
              <strong className="text-zinc-800 dark:text-zinc-200">Dati di Navigazione e Cookie:</strong> Il presente sito ha natura
              informativa. Non sono installati cookie di profilazione, né strumenti di tracciamento o pixel per
              retargeting. Il Sito utilizza esclusivamente cookie tecnici o di sessione (strettamente necessari per
              il funzionamento), per i quali la normativa non richiede il consenso preventivo dell&apos;Utente.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3 dark:text-white">3. Finalità, Base Giuridica e Tempi di Conservazione</h2>
          <p className="mb-3">I dati personali conferiti tramite il modulo di contatto sono trattati per:</p>
          <ul className="list-disc list-inside space-y-3 text-zinc-400">
            <li>
              <strong className="text-zinc-800 dark:text-zinc-200">Finalità:</strong> Fornire riscontro alle richieste di informazioni,
              demo o preventivi relativi al software. Nessun dato sarà utilizzato per invio di newsletter promozionali
              senza un separato ed esplicito consenso.
            </li>
            <li>
              <strong className="text-zinc-800 dark:text-zinc-200">Base Giuridica:</strong> Esecuzione di misure precontrattuali adottate
              su richiesta dell&apos;interessato (Art. 6, par. 1, lett. b del GDPR).
            </li>
            <li>
              <strong className="text-zinc-800 dark:text-zinc-200">Tempi di Conservazione:</strong> I dati saranno conservati per il
              tempo strettamente necessario a evadere la richiesta e non oltre 24 mesi dall&apos;ultima interazione,
              salvo instaurazione di un rapporto contrattuale.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3 dark:text-white">4. Destinatari dei Dati e Trasferimento Extra-UE</h2>
          <p>
            I dati non saranno diffusi. Per la sola gestione tecnica dei messaggi inviati dal sito, il Titolare si
            avvale di Formspree Inc. nominato Responsabile del Trattamento. L&apos;eventuale trasferimento di dati
            verso gli Stati Uniti d&apos;America è garantito e legittimato dall&apos;adesione del fornitore al{" "}
            <strong className="text-white">Data Privacy Framework (DPF)</strong> o tramite la sottoscrizione di
            Clausole Contrattuali Tipo (SCC) approvate dalla Commissione Europea.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3 dark:text-white">5. Diritti dell&apos;Interessato</h2>
          <p className="mb-3">
            Ai sensi degli artt. 15-22 del GDPR, l&apos;interessato ha il diritto di chiedere al Titolare:
            l&apos;accesso, la rettifica, la cancellazione (oblio), la limitazione, la portabilità dei dati e
            l&apos;opposizione al trattamento.
          </p>
          <p className="mb-3">
            Le richieste vanno rivolte via e-mail a:{" "}
            <a href="mailto:info@agrimensore.it" className="text-zinc-500 underline hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white">
              info@agrimensore.it
            </a>
            .
          </p>
          <p>
            Fatto salvo ogni altro ricorso amministrativo o giurisdizionale, l&apos;interessato ha il diritto di
            proporre reclamo all&apos;Autorità Garante per la Protezione dei Dati Personali (
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 underline hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white"
            >
              www.garanteprivacy.it
            </a>
            ).
          </p>
        </section>
      </div>
    </div>
  )
}
