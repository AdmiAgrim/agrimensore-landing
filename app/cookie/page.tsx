"use client"

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-stone-50 text-zinc-700 py-24 px-4 font-sans selection:bg-stone-200">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-zinc-900 mb-2">Informativa Cookie</h1>
        <p className="text-zinc-500 text-sm">Ultimo aggiornamento: maggio 2026.</p>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">Cosa sono i cookie?</h2>
          <p>
            I cookie sono piccoli file di testo che i siti web salvano sul dispositivo dell&apos;utente durante la
            navigazione. Vengono utilizzati per far funzionare il sito in modo efficiente e per fornire
            informazioni ai proprietari del sito.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">Cookie utilizzati da questo sito</h2>
          <p className="mb-4">
            Questo sito utilizza cookie tecnici necessari al funzionamento e cookie analitici
            (Google Analytics 4) per comprendere come i visitatori interagiscono con il sito.
            I cookie analitici vengono installati <strong>solo previo consenso esplicito</strong> dell&apos;utente.
          </p>
          <div className="border border-stone-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-100 text-zinc-600">
                  <th className="text-left px-4 py-3 font-medium">Tipo</th>
                  <th className="text-left px-4 py-3 font-medium">Finalità</th>
                  <th className="text-left px-4 py-3 font-medium">Consenso richiesto</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-stone-200">
                  <td className="px-4 py-3 text-zinc-900">Cookie tecnici</td>
                  <td className="px-4 py-3 text-zinc-500">Funzionamento del sito e memorizzazione preferenza cookie</td>
                  <td className="px-4 py-3 text-green-600">No (esentati per legge)</td>
                </tr>
                <tr className="border-t border-stone-200">
                  <td className="px-4 py-3 text-zinc-900">Google Analytics 4</td>
                  <td className="px-4 py-3 text-zinc-500">Analisi anonima del traffico (pagine visitate, durata sessione, provenienza). IP anonimizzato.</td>
                  <td className="px-4 py-3 text-amber-600">Sì — attivato solo con consenso</td>
                </tr>
                <tr className="border-t border-stone-200">
                  <td className="px-4 py-3 text-zinc-900">Cookie di profilazione</td>
                  <td className="px-4 py-3 text-zinc-500">—</td>
                  <td className="px-4 py-3 text-zinc-500">Non presenti</td>
                </tr>
                <tr className="border-t border-stone-200">
                  <td className="px-4 py-3 text-zinc-900">Pixel / Retargeting</td>
                  <td className="px-4 py-3 text-zinc-500">—</td>
                  <td className="px-4 py-3 text-zinc-500">Non presenti</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">Google Analytics 4</h2>
          <p className="mb-2">
            Utilizziamo Google Analytics 4, un servizio di analisi web fornito da Google Ireland Limited
            (&quot;Google&quot;). Google Analytics utilizza cookie per raccogliere informazioni aggregate
            e anonime sull&apos;utilizzo del sito.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-600">
            <li>L&apos;indirizzo IP viene anonimizzato (<code className="text-xs bg-stone-100 px-1 py-0.5 rounded">anonymize_ip: true</code>)</li>
            <li>Nessun dato personale identificabile viene raccolto</li>
            <li>I dati sono trattati da Google in conformità al GDPR</li>
            <li>I cookie analitici vengono installati <strong>solo dopo il consenso esplicito</strong> dell&apos;utente tramite il banner</li>
          </ul>
          <p className="mt-3">
            Per maggiori informazioni:{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
              className="text-emerald-600 underline hover:text-emerald-500 transition-colors">
              Privacy Policy di Google
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">Come gestire il consenso</h2>
          <p>
            Puoi modificare la tua preferenza in qualsiasi momento cancellando i cookie del browser.
            Alla visita successiva, il banner di consenso verrà mostrato nuovamente.
            È inoltre possibile gestire o eliminare i cookie dalle impostazioni del proprio browser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3">Contatti</h2>
          <p>
            Per qualsiasi domanda relativa all&apos;uso dei cookie, contattare:{" "}
            <a
              href="mailto:agrimensore@pec.it"
              className="text-emerald-600 underline hover:text-emerald-500 transition-colors"
            >
              agrimensore@pec.it
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
