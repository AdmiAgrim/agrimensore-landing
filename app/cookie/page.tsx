"use client"

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-stone-50 text-zinc-700 py-24 px-4 font-sans selection:bg-stone-200 dark:bg-black dark:text-zinc-300 dark:selection:bg-zinc-800">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-zinc-900 mb-2 dark:text-white">Informativa Cookie</h1>
        <p className="text-zinc-500 text-sm">Ultimo aggiornamento: marzo 2026.</p>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3 dark:text-white">Cosa sono i cookie?</h2>
          <p>
            I cookie sono piccoli file di testo che i siti web salvano sul dispositivo dell&apos;utente durante la
            navigazione. Vengono utilizzati per far funzionare il sito in modo efficiente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3 dark:text-white">Cookie utilizzati da questo sito</h2>
          <p className="mb-4">
            Questo sito utilizza <strong className="text-white">esclusivamente cookie tecnici o di sessione</strong>,
            strettamente necessari al funzionamento delle pagine. Non vengono installati cookie di profilazione,
            cookie di tracciamento, né pixel di retargeting di alcun tipo.
          </p>
          <div className="border border-stone-200 rounded-lg overflow-hidden dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                  <th className="text-left px-4 py-3 font-medium">Tipo</th>
                  <th className="text-left px-4 py-3 font-medium">Finalità</th>
                  <th className="text-left px-4 py-3 font-medium">Consenso richiesto</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-stone-200 dark:border-zinc-800">
                  <td className="px-4 py-3 text-zinc-900 dark:text-white">Cookie tecnici / di sessione</td>
                  <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">Funzionamento del sito</td>
                  <td className="px-4 py-3 text-green-500">No (esentati per legge)</td>
                </tr>
                <tr className="border-t border-stone-200 dark:border-zinc-800">
                  <td className="px-4 py-3 text-zinc-900 dark:text-white">Cookie di profilazione</td>
                  <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">—</td>
                  <td className="px-4 py-3 text-zinc-500">Non presenti</td>
                </tr>
                <tr className="border-t border-stone-200 dark:border-zinc-800">
                  <td className="px-4 py-3 text-zinc-900 dark:text-white">Pixel / Retargeting</td>
                  <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">—</td>
                  <td className="px-4 py-3 text-zinc-500">Non presenti</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3 dark:text-white">Come disabilitare i cookie</h2>
          <p>
            Poiché i cookie tecnici sono necessari al funzionamento del sito, la loro disabilitazione potrebbe
            comprometterne l&apos;usabilità. È comunque possibile gestire o eliminare i cookie dalle impostazioni
            del proprio browser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-3 dark:text-white">Contatti</h2>
          <p>
            Per qualsiasi domanda relativa all&apos;uso dei cookie, contattare il Titolare del Trattamento all&apos;indirizzo:{" "}
            <a
              href="mailto:info@agrimensore.it"
              className="text-zinc-400 underline hover:text-white transition-colors"
            >
              info@agrimensore.it
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
