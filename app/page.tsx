"use client"

import { useState, useEffect, useLayoutEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ContactModal } from "@/components/ContactModal"
import { HardHat, FileWarning, SearchX, ShieldCheck, Link as LinkIcon, FolderLock, ArrowRight, Server, Globe } from "lucide-react"

// Extend window types for tracking scripts
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

const LANGUAGES: Record<string, { name: string; flag: string }> = {
  it: { name: "Italiano", flag: "🇮🇹" },
  en: { name: "English", flag: "🇬🇧" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  fr: { name: "Français", flag: "🇫🇷" },
  es: { name: "Español", flag: "🇪🇸" },
  pt: { name: "Português", flag: "🇵🇹" },
  nl: { name: "Nederlands", flag: "🇳🇱" },
  pl: { name: "Polski", flag: "🇵🇱" },
}

const TRANSLATIONS = {
  it: {
    header_caos: "Il Caos",
    header_flusso: "Il Flusso",
    header_prezzi: "Prezzi",
    header_accesso: "Accesso",
    hero_button_1: "Richiedi Accesso",
    hero_button_2: "Vedi come funziona",
    hero_title: "L'archivio intelligente che sa già quali documenti ti servono.",
    hero_desc: "Dimentica il caos. In base al tipo di cantiere, Agrimensore ti guida sull'esatta documentazione da raccogliere. Archivia i file, collabora con i tecnici esterni e resta a norma di legge per 10 anni.",
    hero_badge: "Pensato per le PMI italiane • Infrastructure AWS Milano",
    hero_security: "Dati al sicuro in Italia (AWS Milano)",
    problem_main: "Le normative cambiano. Il disordine non è più perdonato.",
    problem_desc: "Tra Patente a crediti e obbligo di conservazione decennale, gestire i cantieri su WhatsApp o cartelline fisiche significa esporsi al fermo lavori.",
    solution_main: "La Soluzione",
    feature_1_title: "Guidato dal cantiere",
    feature_1_desc: "Apri un progetto e ottieni subito la lista esatta dei documenti necessari. Nessuna dimenticanza, zero margine d'errore.",
    feature_2_title: "Collaborazione diretta via link",
    feature_2_desc: "Devi far redigere un documento per il cantiere? Genera un link e invialo al tecnico. Lui lo usa per consultare i dati o caricare il file finito in piattaforma.",
    feature_3_title: "Stoccaggio legale decennale",
    feature_3_desc: "Dimentica la paura dei controlli. I tuoi file restano archiviati in sicurezza nell'infrastruttura cloud, a norma di legge, per 10 anni.",
    feature_4_title: "Infrastruttura blindata (Server in Italia)",
    feature_4_desc: "I dati della tua azienda e dei tuoi subappaltatori sono protetti da crittografia militare e ospitati su server AWS localizzati fisicamente a Milano. Massima sicurezza e conformità GDPR garantita.",
    gated_section_title: "Pensato per le PMI edili italiane.",
    gated_section_desc: "Non siamo un software macchinoso per gigantesche multinazionali. Agrimensore è nato per l'impresa edile che ha cantieri da mandare avanti e zero tempo da perdere dietro al disordine burocratico.",
    problem_box_1_title: "Il labirinto dei file",
    problem_box_1_desc: "Ore perse a cercare quel documento specifico che ti hanno mandato tre mesi fa per email, mescolato tra mille altre comunicazioni.",
    problem_box_2_title: "Normative impazzite",
    problem_box_2_desc: "La frustrazione di non sapere mai al 100% se per quello specifico lavoro in subappalto l'azienda ha tutta la documentazione in regola.",
    problem_box_3_title: "Tecnici bloccati",
    problem_box_3_desc: "L'ingegnere deve redigere documenti specifici per il cantiere ma perde giornate intere a rincorrerti per farsi mandare le scartoffie valide.",
    solution_main_title: "Un unico ambiente. Tutto pronto all'uso.",
    solution_main_desc: "Abbiamo ingegnerizzato il flusso perfetto per le PMI edili. Agrimensore non è uno spazio vuoto, è un assistente che organizza il lavoro per te e i tuoi collaboratori.",
    hero_trust_swiss: "Ingegneria Svizzera",
    plan_professional_desc: "Pensato per professionisti indipendenti che gestiscono un solo progetto alla volta. Include un editor con la possibilità di aggiungere collaboratori extra. Ideale per lavorare in autonomia con il massimo controllo.",
    plan_professional_feature_1: "1 progetto attivo alla volta",
    plan_professional_feature_2: "1 editor incluso (proprietario)",
    plan_professional_feature_3: "0 visualizzatori inclusi",
    plan_professional_feature_4: "Archiviazione progetto attivo",
    plan_professional_feature_5: "Possibilità di aggiungere editor extra",
    plan_professional_feature_6: "Accesso completo alle funzionalità",
    plan_studio_name: "Studio Associato",
    plan_studio_badge: "Più Scelto",
    plan_studio_desc: "Ideale per piccoli studi e team collaborativi. Consente di gestire fino a tre progetti attivi contemporaneamente. Progettato per favorire il lavoro di squadra e la coordinazione.",
    plan_studio_feature_1: "Fino a 3 progetti attivi",
    plan_studio_feature_2: "1 editor incluso (proprietario)",
    plan_studio_feature_3: "2 visualizzatori inclusi",
    plan_studio_feature_4: "Progettato per la collaborazione",
    plan_studio_feature_5: "Possibilità di aggiungere editor extra",
    plan_studio_feature_6: "Accesso completo alle funzionalità",
    plan_contractor_desc: "Pensato per aziende strutturate che gestiscono progetti senza limiti. Include supporto prioritario e la massima flessibilità per scalare il team in base alle esigenze operative.",
    plan_contractor_feature_1: "Progetti attivi illimitati",
    plan_contractor_feature_2: "1 editor incluso (proprietario)",
    plan_contractor_feature_3: "5 visualizzatori inclusi",
    plan_contractor_feature_4: "Nessun limite sul numero di progetti",
    plan_contractor_feature_5: "Supporto prioritario 24/7",
    plan_contractor_feature_6: "Accesso completo a tutto l'ecosistema",
    pricing_title: "Scegli la tua configurazione",
    pricing_subtitle: "Seleziona il piano di licenza per sbloccare l'ecosistema Agrimensore.",
    plan_button: "Richiedi Consulenza",
    problem_title: "Il Problema",
    solution_title: "La Soluzione",
    gated_access_title: "GATED ACCESS",
    gated_access_desc: "Richiedi accesso esclusivo alla nostra piattaforma enterprise.",
    plan_professional: "Libero Professionista",
    plan_studio: "Studio Associato",
    plan_contractor: "General Contractor",
    plan_featured: "Più Scelto",
    footer_copyright: "© 2026 Agrimensore SRLS. Tutti i diritti riservati.",
    modal_title: "Richiedi Accesso",
    modal_name: "Nome Completo",
    modal_email: "Email",
    modal_company: "Azienda",
    modal_message: "Messaggio",
    modal_button: "Invia Richiesta",
    infra_title: "Infrastruttura Enterprise per le PMI",
    infra_subtitle: "Tecnologia di livello enterprise, senza la complessità. I tuoi dati sono protetti da un'infrastruttura moderna e scalabile.",
    infra_db: "Dati in Italia e Zero Multe (GDPR)",
    infra_db_1: "I documenti dei tuoi cantieri risiedono esclusivamente su server ad alta sicurezza a Milano.",
    infra_db_2: "Nessun dato all'estero: sei totalmente al riparo da sanzioni del Garante della Privacy.",
    infra_db_3: "Architettura cloud progettata per azzerare il rischio di perdere i documenti cruciali della tua azienda.",
    infra_db_4: "",
    infra_security: "Cassaforte Decennale a Norma di Legge",
    infra_sec_1: "La legge impone 10 anni di conservazione? Noi blindiamo i tuoi file in un archivio inattaccabile.",
    infra_sec_2: "Se l'ispettorato bussa alla tua porta tra 9 anni, hai tutto pronto da esibire in due clic.",
    infra_sec_3: "Documenti protetti con crittografia avanzata per resistere a furti o attacchi informatici.",
    infra_sec_4: "",
    infra_lambda: "Sistema \"A Prova di Cantiere\"",
    infra_lam_1: "Infrastruttura sempre operativa, studiata per reggere i ritmi e le urgenze quotidiane del cantiere.",
    infra_lam_2: "Accesso istantaneo e sicuro per scaricare DURC e certificati direttamente dal tuo smartphone.",
    infra_lam_3: "La tua azienda non resta mai bloccata per colpa di un portale che non risponde.",
    infra_lam_4: "",
    infra_compliance: "Scudo Anti-Virus e Zero Installazioni",
    infra_comp_1: "Nessun programma da installare: tutto funziona via web in un ambiente isolato e protetto.",
    infra_comp_2: "Elimina il rischio di scaricare virus o ransomware che ricattano e bloccano i PC dell'ufficio.",
    infra_comp_3: "Anche se un computer si rompe o viene rubato, i tuoi dati restano intatti e accessibili da qualsiasi altro dispositivo.",
    infra_comp_4: "",
    infra_footer: "Infrastruttura enterprise • Zero compromessi sulla sicurezza",
    infra_uptime: "Uptime SLA 99.99% • Backup ridondanti • Disaster recovery",
    cookie_title: "Gestione Cookie e Dati",
    cookie_desc: "Utilizziamo cookie essenziali per il funzionamento e cookie opzionali per analytics e marketing. Puoi personalizzare le tue preferenze.",
    cookie_essential: "Cookie Essenziali",
    cookie_essential_desc: "Necessari per il funzionamento del sito. Non possono essere disabilitati.",
    cookie_analytics: "Analytics",
    cookie_analytics_desc: "Ci aiutano a capire come usi il sito e a migliorarlo.",
    cookie_marketing: "Marketing",
    cookie_marketing_desc: "Utilizzati per personalizzare i contenuti e gli annunci.",
    cookie_accept_all: "Accetta Tutti",
    cookie_reject_all: "Rifiuta Tutti",
    cookie_customize: "Personalizza",
    cookie_save: "Salva Preferenze",
    cookie_privacy: "Leggi la nostra Privacy Policy",
  },
  en: {
    header_caos: "The Chaos",
    header_flusso: "The Flow",
    header_prezzi: "Pricing",
    header_accesso: "Access",
    hero_button_1: "Request Access",
    hero_button_2: "See how it works",
    hero_title: "The intelligent archive that already knows which documents you need.",
    hero_desc: "Forget the chaos. Based on the type of project, Agrimensore guides you on the exact documentation to collect. Archive files, collaborate with external technicians and stay compliant for 10 years.",
    hero_badge: "Designed for Italian SMEs • Infrastructure AWS Milan",
    hero_security: "Data safe in Italy (AWS Milan)",
    problem_main: "Regulations change. Disorder is no longer forgiven.",
    problem_desc: "With credit licenses and mandatory 10-year retention, managing projects on WhatsApp or physical folders means exposing yourself to work stoppages.",
    solution_main: "The Solution",
    feature_1_title: "Guided by the project",
    feature_1_desc: "Open a project and immediately get the exact list of required documents. No forgotten items, zero margin for error.",
    feature_2_title: "Direct collaboration via link",
    feature_2_desc: "Need to have a document drafted for your project? Generate a link and send it to the technician. They can use it to view data or upload the finished file to the platform.",
    feature_3_title: "Legal 10-year storage",
    feature_3_desc: "Forget the fear of inspections. Your files remain safely archived in the cloud infrastructure, compliant with regulations, for 10 years.",
    feature_4_title: "Armored Infrastructure (Servers in Italy)",
    feature_4_desc: "Your company's data and your subcontractors' are protected by military-grade encryption and hosted on AWS servers physically located in Milan. Maximum security and GDPR compliance guaranteed.",
    gated_section_title: "Designed for Italian construction SMEs.",
    gated_section_desc: "We're not a cumbersome software for giant multinationals. Agrimensore was born for the construction company that has projects to execute and zero time to waste on bureaucratic mess.",
    problem_box_1_title: "The file labyrinth",
    problem_box_1_desc: "Hours wasted searching for that specific document that was sent to you three months ago via email, mixed among a thousand other communications.",
    problem_box_2_title: "Crazy regulations",
    problem_box_2_desc: "The frustration of never knowing 100% if for that specific subcontracting work your company has all the documentation in order.",
    problem_box_3_title: "Blocked technicians",
    problem_box_3_desc: "The engineer must draft specific documents for the project but wastes entire days chasing you to send valid paperwork.",
    solution_main_title: "One single environment. Everything ready to use.",
    solution_main_desc: "We've engineered the perfect workflow for construction SMEs. Agrimensore isn't an empty space, it's an assistant that organizes work for you and your collaborators.",
    hero_trust_swiss: "Swiss Engineering",
    plan_professional_desc: "Designed for independent professionals managing a single project at a time. Includes an editor with the option to add extra collaborators. Ideal for autonomous work with maximum control.",
    plan_professional_feature_1: "1 active project at a time",
    plan_professional_feature_2: "1 editor included (owner)",
    plan_professional_feature_3: "0 viewers included",
    plan_professional_feature_4: "Active project storage",
    plan_professional_feature_5: "Ability to add extra editors",
    plan_professional_feature_6: "Full access to all features",
    plan_studio_name: "Associated Studio",
    plan_studio_badge: "Most Popular",
    plan_studio_desc: "Ideal for small studios and collaborative teams. Allows you to manage up to three active projects simultaneously. Designed to encourage teamwork and coordination.",
    plan_studio_feature_1: "Up to 3 active projects",
    plan_studio_feature_2: "1 editor included (owner)",
    plan_studio_feature_3: "2 viewers included",
    plan_studio_feature_4: "Designed for collaboration",
    plan_studio_feature_5: "Ability to add extra editors",
    plan_studio_feature_6: "Full access to all features",
    plan_contractor_desc: "Designed for structured companies managing unlimited projects. Includes priority support and maximum flexibility to scale the team based on operational needs.",
    plan_contractor_feature_1: "Unlimited active projects",
    plan_contractor_feature_2: "1 editor included (owner)",
    plan_contractor_feature_3: "5 viewers included",
    plan_contractor_feature_4: "No limit on number of projects",
    plan_contractor_feature_5: "Priority 24/7 support",
    plan_contractor_feature_6: "Full access to the entire ecosystem",
    pricing_title: "Choose your configuration",
    pricing_subtitle: "Select the license plan to unlock the Agrimensore ecosystem.",
    plan_button: "Request Consultation",
    problem_title: "The Problem",
    solution_title: "The Solution",
    gated_access_title: "EXCLUSIVE ACCESS",
    gated_access_desc: "Request exclusive access to our enterprise platform.",
    plan_professional: "Solo Professional",
    plan_studio: "Associated Studio",
    plan_contractor: "General Contractor",
    plan_featured: "Most Popular",
    footer_copyright: "© 2026 Agrimensore SRLS. All rights reserved.",
    modal_title: "Request Access",
    modal_name: "Full Name",
    modal_email: "Email",
    modal_company: "Company",
    modal_message: "Message",
    modal_button: "Send Request",
    infra_title: "Enterprise Infrastructure for SMEs",
    infra_subtitle: "Enterprise-grade technology, without the complexity. Your data is protected by modern, scalable infrastructure.",
    infra_db: "Data in Italy and Zero Fines (GDPR)",
    infra_db_1: "Your construction site documents reside exclusively on high-security servers in Milan.",
    infra_db_2: "No data abroad: you are completely protected from Privacy Authority sanctions.",
    infra_db_3: "Cloud architecture designed to eliminate the risk of losing your company's crucial documents.",
    infra_db_4: "",
    infra_security: "Ten-Year Vault in Compliance with Law",
    infra_sec_1: "Does the law require 10 years of retention? We lock your files in an unassailable archive.",
    infra_sec_2: "If the inspector shows up at your door in 9 years, you have everything ready to present with two clicks.",
    infra_sec_3: "Documents protected with advanced encryption to resist theft or cyber attacks.",
    infra_sec_4: "",
    infra_lambda: "Jobsite-Proof System",
    infra_lam_1: "Always-on infrastructure designed to handle the daily pace and urgencies of the jobsite.",
    infra_lam_2: "Instant and secure access to download DURC and certificates directly from your smartphone.",
    infra_lam_3: "Your company never gets blocked because a portal isn't responding.",
    infra_lam_4: "",
    infra_compliance: "Anti-Virus Shield and Zero Installations",
    infra_comp_1: "No programs to install: everything works via web in an isolated and protected environment.",
    infra_comp_2: "Eliminate the risk of downloading viruses or ransomware that extort and block office computers.",
    infra_comp_3: "Even if a computer breaks or is stolen, your data remains intact and accessible from any other device.",
    infra_comp_4: "",
    infra_footer: "Enterprise infrastructure • Zero security compromises",
    infra_uptime: "99.99% Uptime SLA • Redundant backups • Disaster recovery",
    cookie_title: "Cookie & Data Management",
    cookie_desc: "We use essential cookies for functionality and optional cookies for analytics and marketing. You can customize your preferences.",
    cookie_essential: "Essential Cookies",
    cookie_essential_desc: "Required for site functionality. Cannot be disabled.",
    cookie_analytics: "Analytics",
    cookie_analytics_desc: "Help us understand how you use the site and improve it.",
    cookie_marketing: "Marketing",
    cookie_marketing_desc: "Used to personalize content and ads.",
    cookie_accept_all: "Accept All",
    cookie_reject_all: "Reject All",
    cookie_customize: "Customize",
    cookie_save: "Save Preferences",
    cookie_privacy: "Read our Privacy Policy",
  },
  de: {
    header_caos: "Das Chaos",
    header_flusso: "Der Fluss",
    header_prezzi: "Preise",
    header_accesso: "Zugang",
    hero_button_1: "Zugang anfordern",
    hero_button_2: "So funktioniert es",
    hero_title: "Das intelligente Archiv, das bereits weiß, welche Dokumente du brauchst.",
    hero_desc: "Vergessen Sie das Chaos. Basierend auf der Art des Projekts führt Sie Agrimensore durch die genaue Dokumentation. Archivieren Sie Dateien, arbeiten Sie mit externen Technikern zusammen und bleiben Sie 10 Jahre lang konform.",
    hero_badge: "Entwickelt für deutsche KMUs • Infrastructure AWS Mailand",
    hero_security: "Daten sicher in Italien (AWS Mailand)",
    problem_main: "Vorschriften ändern sich. Unordnung wird nicht mehr verziehen.",
    problem_desc: "Mit Lizenzkrediten und obligatorischer 10-jähriger Aufbewahrung bedeutet die Verwaltung von Projekten auf WhatsApp oder in physischen Ordnern, sich Arbeitseinstellungen auszusetzen.",
    solution_main: "Die Lösung",
    feature_1_title: "Vom Projekt geleitet",
    feature_1_desc: "Öffnen Sie ein Projekt und erhalten Sie sofort die genaue Liste der erforderlichen Dokumente. Keine vergessenen Elemente, null Fehlerspielraum.",
    feature_2_title: "Direkte Zusammenarbeit über Link",
    feature_2_desc: "Müssen Sie ein Dokument für Ihr Projekt entwerfen? Generieren Sie einen Link und senden Sie ihn dem Techniker. Er kann es verwenden, um Daten anzuzeigen oder die fertige Datei auf die Plattform hochzuladen.",
    feature_3_title: "Legale 10-Jahresspeicherung",
    feature_3_desc: "Vergessen Sie die Angst vor Inspektionen. Ihre Dateien bleiben sicher in der Cloud-Infrastruktur archiviert, konform mit Vorschriften, für 10 Jahre.",
    feature_4_title: "Gepanzerte Infrastruktur (Server in Italien)",
    feature_4_desc: "Die Daten Ihres Unternehmens und Ihrer Subunternehmer sind durch militärische Verschlüsselung geschützt und auf AWS-Servern gehostet, die sich physisch in Mailand befinden. Maximale Sicherheit und GDPR-Konformität garantiert.",
    gated_section_title: "Entwickelt für italienische Bau-KMUs.",
    gated_section_desc: "Wir sind keine umständliche Software für riesige Konzerne. Agrimensore wurde für das Bauunternehmen entwickelt, das Projekte ausführen muss und keine Zeit für bürokratisches Durcheinander hat.",
    problem_box_1_title: "Das Dateien-Labyrinth",
    problem_box_1_desc: "Stunden verschwendet, um dieses bestimmte Dokument zu finden, das vor drei Monaten per E-Mail zusammen mit tausend anderen Mitteilungen gesendet wurde.",
    problem_box_2_title: "Verrückte Vorschriften",
    problem_box_2_desc: "Die Frustration, nie zu 100% zu wissen, ob für diese bestimmte Subunternehmerarbeit alle Unterlagen korrekt sind.",
    problem_box_3_title: "Blockierte Techniker",
    problem_box_3_desc: "Der Ingenieur muss spezifische Dokumente für das Projekt entwerfen, verschwendet aber ganze Tage damit, Sie um gültige Unterlagen zu bitten.",
    solution_main_title: "Eine einzige Umgebung. Alles einsatzbereit.",
    solution_main_desc: "Wir haben den perfekten Workflow für Bau-KMUs entwickelt. Agrimensore ist kein leerer Raum, sondern ein Assistent, der die Arbeit für Sie und Ihre Mitarbeiter organisiert.",
    hero_trust_swiss: "Schweizer Ingenieurwesen",
    plan_professional_desc: "Entwickelt für unabhängige Profis, die ein Projekt gleichzeitig verwalten. Umfasst einen Editor mit der Möglichkeit, zusätzliche Mitarbeiter hinzuzufügen. Ideal für autonome Arbeit mit maximaler Kontrolle.",
    plan_professional_feature_1: "1 aktives Projekt gleichzeitig",
    plan_professional_feature_2: "1 Editor inbegriffen (Inhaber)",
    plan_professional_feature_3: "0 Betrachter inbegriffen",
    plan_professional_feature_4: "Speicherung des aktiven Projekts",
    plan_professional_feature_5: "Möglichkeit, zusätzliche Editoren hinzuzufügen",
    plan_professional_feature_6: "Vollständiger Zugriff auf alle Funktionen",
    plan_studio_name: "Verbundenes Studio",
    plan_studio_badge: "Am Meisten Gewählt",
    plan_studio_desc: "Ideal für kleine Studios und Teamprojekte. Ermöglicht gleichzeitige Verwaltung von bis zu drei aktiven Projekten. Konzipiert, um Teamarbeit und Koordination zu fördern.",
    plan_studio_feature_1: "Bis zu 3 aktive Projekte",
    plan_studio_feature_2: "1 Editor inbegriffen (Inhaber)",
    plan_studio_feature_3: "2 Betrachter inbegriffen",
    plan_studio_feature_4: "Für Zusammenarbeit konzipiert",
    plan_studio_feature_5: "Möglichkeit, zusätzliche Editoren hinzuzufügen",
    plan_studio_feature_6: "Vollständiger Zugriff auf alle Funktionen",
    plan_contractor_desc: "Konzipiert für strukturierte Unternehmen, die unbegrenzte Projekte verwalten. Beinhaltet prioritären Support und maximale Flexibilität zur Skalierung des Teams nach operativen Anforderungen.",
    plan_contractor_feature_1: "Unbegrenzte aktive Projekte",
    plan_contractor_feature_2: "1 Editor inbegriffen (Inhaber)",
    plan_contractor_feature_3: "5 Betrachter inbegriffen",
    plan_contractor_feature_4: "Kein Limit für Projektanzahl",
    plan_contractor_feature_5: "Priorisierter 24/7 Support",
    plan_contractor_feature_6: "Vollständiger Zugriff auf das gesamte Ökosystem",
    pricing_title: "Wählen Sie Ihre Konfiguration",
    pricing_subtitle: "Wählen Sie den Lizenzplan zum Entsperren des Agrimensore-Ökosystems.",
    plan_button: "Beratung anfordern",
    problem_title: "Das Problem",
    solution_title: "Die Lösung",
    gated_access_title: "EXKLUSIVER ZUGANG",
    gated_access_desc: "Fordern Sie exklusiven Zugang zu unserer Enterprise-Plattform an.",
    plan_professional: "Einzelne Fachperson",
    plan_studio: "Verbundenes Studio",
    plan_contractor: "Generalunternehmer",
    plan_featured: "Am Meisten Gewählt",
    footer_copyright: "© 2026 Agrimensore SRLS. Alle Rechte vorbehalten.",
    modal_title: "Zugang anfordern",
    modal_name: "Vollständiger Name",
    modal_email: "E-Mail",
    modal_company: "Unternehmen",
    modal_message: "Nachricht",
    modal_button: "Anfrage Senden",
    infra_title: "Enterprise-Infrastruktur für KMUs",
    infra_subtitle: "Enterprise-Technologie ohne Komplexität. Ihre Daten sind durch moderne, skalierbare Infrastruktur geschützt.",
    infra_db: "Daten in Italien und Null Bußgelder (DSGVO)",
    infra_db_1: "Ihre Baustellen-Dokumente befinden sich ausschließlich auf hochsicheren Servern in Mailand.",
    infra_db_2: "Keine Daten im Ausland: Sie sind vollständig vor Sanktionen der Datenschutzbehörde geschützt.",
    infra_db_3: "Cloud-Architektur, die das Risiko des Verlusts kritischer Unternehmensunterlagen ausschließt.",
    infra_db_4: "",
    infra_security: "Zehn-Jahre-Tresor im Einklang mit dem Gesetz",
    infra_sec_1: "Das Gesetz schreibt 10 Jahre Aufbewahrung vor? Wir sperren Ihre Dateien in einem unzerstörbaren Archiv.",
    infra_sec_2: "Wenn der Inspekteur in 9 Jahren an Ihrer Tür klopft, haben Sie alles bereit, um es mit zwei Klicks zu präsentieren.",
    infra_sec_3: "Dokumente mit fortschrittlicher Verschlüsselung geschützt gegen Diebstahl oder Cyberangriffe.",
    infra_sec_4: "",
    infra_lambda: "Baustellen-sicheres System",
    infra_lam_1: "Ständig verfügbare Infrastruktur, ausgelegt für das Tempo und die Dringlichkeiten der Baustelle.",
    infra_lam_2: "Sofortiger und sicherer Zugriff zum Herunterladen von DURC und Zertifikaten direkt vom Smartphone.",
    infra_lam_3: "Ihr Unternehmen wird nie blockiert, weil ein Portal nicht antwortet.",
    infra_lam_4: "",
    infra_compliance: "Antivirus-Schutz und Null Installationen",
    infra_comp_1: "Keine Programme zu installieren: Alles funktioniert über Web in einer isolierten und geschützten Umgebung.",
    infra_comp_2: "Beseitigen Sie das Risiko, Viren oder Ransomware herunterzuladen, die Bürocomputer erpressen und blockieren.",
    infra_comp_3: "Selbst wenn ein Computer ausfällt oder gestohlen wird, bleiben Ihre Daten intakt und von jedem anderen Gerät zugänglich.",
    infra_comp_4: "",
    infra_footer: "Enterprise-Infrastruktur • Keine Sicherheitskompromisse",
    infra_uptime: "99,99% Uptime-SLA • Redundante Sicherungen • Disaster Recovery",
    cookie_title: "Cookie- und Datenverwaltung",
    cookie_desc: "Wir verwenden wesentliche Cookies für die Funktionalität und optionale Cookies für Analytics und Marketing. Sie können Ihre Einstellungen anpassen.",
    cookie_essential: "Wesentliche Cookies",
    cookie_essential_desc: "Erforderlich für die Website-Funktionalität. Können nicht deaktiviert werden.",
    cookie_analytics: "Analytik",
    cookie_analytics_desc: "Helfen uns zu verstehen, wie Sie die Website nutzen und sie zu verbessern.",
    cookie_marketing: "Marketing",
    cookie_marketing_desc: "Wird verwendet, um Inhalte und Anzeigen zu personalisieren.",
    cookie_accept_all: "Alle Akzeptieren",
    cookie_reject_all: "Alle Ablehnen",
    cookie_customize: "Anpassen",
    cookie_save: "Einstellungen Speichern",
    cookie_privacy: "Lesen Sie unsere Datenschutzrichtlinie",
  },
  fr: {
    header_caos: "Le Chaos",
    header_flusso: "Le Flux",
    header_prezzi: "Tarifs",
    header_accesso: "Accès",
    hero_button_1: "Demander l'accès",
    hero_button_2: "Voir comment ça marche",
    hero_title: "L'archive intelligente qui sait déjà quels documents vous avez besoin.",
    hero_desc: "Oubliez le chaos. En fonction du type de projet, Agrimensore vous guide sur la documentation exacte à collecter. Archivez les fichiers, collaborez avec les techniciens externes et restez en conformité pendant 10 ans.",
    hero_badge: "Conçu pour les PME italiennes • Infrastructure AWS Milan",
    hero_security: "Données sûres en Italie (AWS Milan)",
    problem_main: "Les réglementations changent. Le désordre n'est plus pardonné.",
    problem_desc: "Avec les licences de crédit et la rétention obligatoire de 10 ans, gérer les projets sur WhatsApp ou dans des dossiers physiques signifie vous exposer aux arrêts de travail.",
    solution_main: "La Solution",
    feature_1_title: "Guidé par le projet",
    feature_1_desc: "Ouvrez un projet et obtenez immédiatement la liste exacte des documents requis. Pas d'éléments oubliés, zéro marge d'erreur.",
    feature_2_title: "Collaboration directe via lien",
    feature_2_desc: "Besoin de faire rédiger un document pour votre projet ? Générez un lien et envoyez-le au technicien. Il peut l'utiliser pour consulter les données ou télécharger le fichier terminé sur la plateforme.",
    feature_3_title: "Stockage légal sur 10 ans",
    feature_3_desc: "Oubliez la peur des inspections. Vos fichiers restent archivés en toute sécurité dans l'infrastructure cloud, conformément aux réglementations, pendant 10 ans.",
    feature_4_title: "Infrastructure blindée (Serveurs en Italie)",
    feature_4_desc: "Les données de votre entreprise et de vos sous-traitants sont protégées par chiffrement militaire et hébergées sur des serveurs AWS situés physiquement à Milan. Sécurité maximale et conformité RGPD garanties.",
    gated_section_title: "Conçu pour les PME de construction italiennes.",
    gated_section_desc: "Nous ne sommes pas un logiciel lourd pour les géantes multinationales. Agrimensore est né pour l'entreprise de construction qui doit exécuter des projets et n'a pas de temps à perdre avec le chaos bureaucratique.",
    problem_box_1_title: "Le labyrinthe des fichiers",
    problem_box_1_desc: "Des heures gaspillées à chercher ce document spécifique qui vous a été envoyé il y a trois mois par email, mélangé parmi mille autres communications.",
    problem_box_2_title: "Réglementations folles",
    problem_box_2_desc: "La frustration de ne jamais savoir à 100% si pour ce travail de sous-traitance spécifique votre entreprise a toute la documentation en ordre.",
    problem_box_3_title: "Techniciens bloqués",
    problem_box_3_desc: "L'ingénieur doit rédiger des documents spécifiques pour le projet mais perd des journées entières à vous supplier d'envoyer de la documentation valide.",
    solution_main_title: "Un seul environnement. Tout prêt à l'emploi.",
    solution_main_desc: "Nous avons conçu le flux de travail parfait pour les PME de construction. Agrimensore n'est pas un espace vide, c'est un assistant qui organise le travail pour vous et vos collaborateurs.",
    hero_trust_swiss: "Ingénierie Suisse",
    plan_professional_desc: "Conçu pour les professionnels indépendants gérant un seul projet à la fois. Inclut un éditeur avec la possibilité d'ajouter des collaborateurs supplémentaires. Idéal pour un travail autonome avec un contrôle maximal.",
    plan_professional_feature_1: "1 projet actif à la fois",
    plan_professional_feature_2: "1 éditeur inclus (propriétaire)",
    plan_professional_feature_3: "0 lecteurs inclus",
    plan_professional_feature_4: "Stockage du projet actif",
    plan_professional_feature_5: "Possibilité d'ajouter des éditeurs supplémentaires",
    plan_professional_feature_6: "Accès complet à toutes les fonctionnalités",
    plan_studio_name: "Studio Associé",
    plan_studio_badge: "Plus Populaire",
    plan_studio_desc: "Idéal pour les petits studios et les équipes collaboratives. Permet de gérer jusqu'à trois projets actifs simultanément. Conçu pour encourager le travail en équipe et la coordination.",
    plan_studio_feature_1: "Jusqu'à 3 projets actifs",
    plan_studio_feature_2: "1 éditeur inclus (propriétaire)",
    plan_studio_feature_3: "2 lecteurs inclus",
    plan_studio_feature_4: "Conçu pour la collaboration",
    plan_studio_feature_5: "Possibilité d'ajouter des éditeurs supplémentaires",
    plan_studio_feature_6: "Accès complet à toutes les fonctionnalités",
    plan_contractor_desc: "Conçu pour les entreprises structurées gérant des projets sans limites. Inclut un support prioritaire et une flexibilité maximale pour adapter l'équipe selon les besoins opérationnels.",
    plan_contractor_feature_1: "Projets actifs illimités",
    plan_contractor_feature_2: "1 éditeur inclus (propriétaire)",
    plan_contractor_feature_3: "5 lecteurs inclus",
    plan_contractor_feature_4: "Aucune limite sur le nombre de projets",
    plan_contractor_feature_5: "Support prioritaire 24/7",
    plan_contractor_feature_6: "Accès complet à tout l'écosystème",
    pricing_title: "Choisissez votre configuration",
    pricing_subtitle: "Sélectionnez le plan de licence pour déverrouiller l'écosystème Agrimensore.",
    plan_button: "Demander une consultation",
    problem_title: "Le Problème",
    solution_title: "La Solution",
    gated_access_title: "ACCÈS EXCLUSIF",
    gated_access_desc: "Demandez l'accès exclusif à notre plateforme enterprise.",
    plan_professional: "Professionnel Solo",
    plan_studio: "Studio Associé",
    plan_contractor: "Entrepreneur Général",
    plan_featured: "Le Plus Populaire",
    footer_copyright: "© 2026 Agrimensore SRLS. Tous les droits réservés.",
    modal_title: "Demander l'accès",
    modal_name: "Nom Complet",
    modal_email: "Email",
    modal_company: "Entreprise",
    modal_message: "Message",
    modal_button: "Envoyer la Demande",
    infra_title: "Infrastructure d'entreprise pour les PME",
    infra_subtitle: "Technologie d'entreprise sans complexité. Vos données sont protégées par une infrastructure moderne et évolutive.",
    infra_db: "Données en Italie et Zéro Amende (RGPD)",
    infra_db_1: "Les documents de vos chantiers résident exclusivement sur des serveurs hautement sécurisés à Milan.",
    infra_db_2: "Aucune donnée à l'étranger: vous êtes totalement protégé contre les sanctions de l'Autorité de protection des données.",
    infra_db_3: "Architecture cloud conçue pour éliminer le risque de perdre les documents cruciaux de votre entreprise.",
    infra_db_4: "",
    infra_security: "Coffre-Fort Décennal en Conformité avec la Loi",
    infra_sec_1: "La loi exige 10 ans de conservation? Nous verrouillons vos fichiers dans une archive inviolable.",
    infra_sec_2: "Si l'inspecteur frappe à votre porte dans 9 ans, vous avez tout prêt à présenter en deux clics.",
    infra_sec_3: "Documents protégés par chiffrement avancé pour résister aux vols ou aux cyberattaques.",
    infra_sec_4: "",
    infra_lambda: "Système \"Preuve de Chantier\"",
    infra_lam_1: "Infrastructure toujours opérationnelle, conçue pour supporter le rythme et l'urgence du chantier.",
    infra_lam_2: "Accès instantané et sécurisé pour télécharger DURC et certificats directement depuis votre smartphone.",
    infra_lam_3: "Votre entreprise n'est jamais bloquée parce qu'un portail ne répond pas.",
    infra_lam_4: "",
    infra_compliance: "Bouclier Anti-Virus et Zéro Installation",
    infra_comp_1: "Aucun programme à installer: tout fonctionne via web dans un environnement isolé et protégé.",
    infra_comp_2: "Éliminez le risque de télécharger des virus ou des ransomwares qui extorquent et bloquent les ordinateurs de bureau.",
    infra_comp_3: "Même si un ordinateur tombe en panne ou est volé, vos données restent intactes et accessibles depuis n'importe quel autre appareil.",
    infra_comp_4: "",
    infra_footer: "Infrastructure d'entreprise • Aucun compromis sur la sécurité",
    infra_uptime: "SLA Uptime 99,99% • Sauvegardes redondantes • Récupération d'urgence",
    cookie_title: "Gestion des Cookies et des Données",
    cookie_desc: "Nous utilisons des cookies essentiels pour la fonctionnalité et des cookies optionnels pour l'analyse et le marketing. Vous pouvez personnaliser vos préférences.",
    cookie_essential: "Cookies Essentiels",
    cookie_essential_desc: "Nécessaires pour le fonctionnement du site. Ne peuvent pas être désactivés.",
    cookie_analytics: "Analyse",
    cookie_analytics_desc: "Nous aident à comprendre comment vous utilisez le site et à l'améliorer.",
    cookie_marketing: "Marketing",
    cookie_marketing_desc: "Utilisés pour personnaliser le contenu et les annonces.",
    cookie_accept_all: "Accepter Tous",
    cookie_reject_all: "Refuser Tous",
    cookie_customize: "Personnaliser",
    cookie_save: "Enregistrer les Préférences",
    cookie_privacy: "Lire notre Politique de Confidentialité",
  },
  es: {
    header_caos: "El Caos",
    header_flusso: "El Flujo",
    header_prezzi: "Precios",
    header_accesso: "Acceso",
    hero_button_1: "Solicitar Acceso",
    hero_button_2: "Ver cómo funciona",
    hero_title: "El archivo inteligente que ya sabe qué documentos necesitas.",
    hero_desc: "Olvida el caos. Según el tipo de proyecto, Agrimensore te guía sobre la documentación exacta a recopilar. Archiva archivos, colabora con técnicos externos y mantente conforme durante 10 años.",
    hero_badge: "Diseñado para PYMES italianas • Infrastructure AWS Milán",
    hero_security: "Datos seguros en Italia (AWS Milán)",
    problem_main: "Las regulaciones cambian. El desorden ya no se perdona.",
    problem_desc: "Con licencias de crédito y retención obligatoria de 10 años, administrar proyectos en WhatsApp o carpetas físicas significa exponerse a paradas de trabajo.",
    solution_main: "La Solución",
    feature_1_title: "Guiado por el proyecto",
    feature_1_desc: "Abre un proyecto y obtén inmediatamente la lista exacta de documentos requeridos. Sin elementos olvidados, cero margen de error.",
    feature_2_title: "Colaboración directa vía enlace",
    feature_2_desc: "¿Necesitas que redacten un documento para tu proyecto? Genera un enlace y envíalo al técnico. Puede usarlo para ver datos o subir el archivo terminado a la plataforma.",
    feature_3_title: "Almacenamiento legal de 10 años",
    feature_3_desc: "Olvida el miedo a las inspecciones. Tus archivos permanecen archivados de forma segura en la infraestructura en la nube, conforme a las regulaciones, durante 10 años.",
    feature_4_title: "Infraestructura blindada (Servidores en Italia)",
    feature_4_desc: "Los datos de tu empresa y tus subcontratistas están protegidos por cifrado de nivel militar y alojados en servidores AWS ubicados físicamente en Milán. Máxima seguridad y conformidad GDPR garantizada.",
    gated_section_title: "Pensado para las PYMES de construcción italianas.",
    gated_section_desc: "No somos un software engorroso para multinacionales gigantes. Agrimensore nació para la empresa constructora que tiene proyectos que ejecutar y cero tiempo que perder en el desorden burocrático.",
    problem_box_1_title: "El laberinto de archivos",
    problem_box_1_desc: "Horas perdidas buscando ese documento específico que te enviaron hace tres meses por correo, mezclado entre mil otras comunicaciones.",
    problem_box_2_title: "Regulaciones locas",
    problem_box_2_desc: "La frustración de nunca saber al 100% si para ese trabajo de subcontratación específico tu empresa tiene toda la documentación en orden.",
    problem_box_3_title: "Técnicos bloqueados",
    problem_box_3_desc: "El ingeniero debe redactar documentos específicos para el proyecto pero pierde días enteros persiguiéndote para obtener documentación válida.",
    solution_main_title: "Un único entorno. Todo listo para usar.",
    solution_main_desc: "Hemos ingenierizado el flujo de trabajo perfecto para las PYMES de construcción. Agrimensore no es un espacio vacío, es un asistente que organiza el trabajo para ti y tus colaboradores.",
    hero_trust_swiss: "Ingeniería Suiza",
    plan_professional_desc: "Diseñado para profesionales independientes que manejan un solo proyecto a la vez. Incluye un editor con la opción de agregar colaboradores adicionales. Ideal para trabajo autónomo con máximo control.",
    plan_professional_feature_1: "1 proyecto activo a la vez",
    plan_professional_feature_2: "1 editor incluido (propietario)",
    plan_professional_feature_3: "0 visualizadores incluidos",
    plan_professional_feature_4: "Almacenamiento del proyecto activo",
    plan_professional_feature_5: "Posibilidad de agregar editores adicionales",
    plan_professional_feature_6: "Acceso completo a todas las características",
    plan_studio_name: "Estudio Asociado",
    plan_studio_badge: "Más Popular",
    plan_studio_desc: "Ideal para pequeños estudios y equipos colaborativos. Permite gestionar hasta tres proyectos activos simultáneamente. Diseñado para fomentar el trabajo en equipo y la coordinación.",
    plan_studio_feature_1: "Hasta 3 proyectos activos",
    plan_studio_feature_2: "1 editor incluido (propietario)",
    plan_studio_feature_3: "2 visualizadores incluidos",
    plan_studio_feature_4: "Diseñado para colaboración",
    plan_studio_feature_5: "Posibilidad de agregar editores adicionales",
    plan_studio_feature_6: "Acceso completo a todas las características",
    plan_contractor_desc: "Diseñado para empresas estructuradas que gestionan proyectos sin límites. Incluye soporte prioritario y máxima flexibilidad para escalar el equipo según las necesidades operativas.",
    plan_contractor_feature_1: "Proyectos activos ilimitados",
    plan_contractor_feature_2: "1 editor incluido (propietario)",
    plan_contractor_feature_3: "5 visualizadores incluidos",
    plan_contractor_feature_4: "Sin límite en número de proyectos",
    plan_contractor_feature_5: "Soporte prioritario 24/7",
    plan_contractor_feature_6: "Acceso completo a todo el ecosistema",
    pricing_title: "Elige tu configuración",
    pricing_subtitle: "Selecciona el plan de licencia para desbloquear el ecosistema Agrimensore.",
    plan_button: "Solicitar Consulta",
    problem_title: "El Problema",
    solution_title: "La Solución",
    gated_access_title: "ACCESO EXCLUSIVO",
    gated_access_desc: "Solicita acceso exclusivo a nuestra plataforma empresarial.",
    plan_professional: "Profesional Solo",
    plan_studio: "Estudio Asociado",
    plan_contractor: "Contratista General",
    plan_featured: "Más Popular",
    footer_copyright: "© 2026 Agrimensore SRLS. Todos los derechos reservados.",
    modal_title: "Solicitar Acceso",
    modal_name: "Nombre Completo",
    modal_email: "Correo Electrónico",
    modal_company: "Empresa",
    modal_message: "Mensaje",
    modal_button: "Enviar Solicitud",
    infra_title: "Infraestructura empresarial para PYMES",
    infra_subtitle: "Tecnología empresarial sin complejidad. Tus datos están protegidos por una infraestructura moderna y escalable.",
    infra_db: "Datos en Italia y Cero Multas (RGPD)",
    infra_db_1: "Los documentos de sus obras residen exclusivamente en servidores de alta seguridad en Milán.",
    infra_db_2: "Sin datos en el extranjero: está totalmente protegido contra sanciones de la Autoridad de Protección de Datos.",
    infra_db_3: "Arquitectura de nube diseñada para eliminar el riesgo de perder documentos cruciales de su empresa.",
    infra_db_4: "",
    infra_security: "Bóveda Decenal Conforme a la Ley",
    infra_sec_1: "¿La ley requiere 10 años de conservación? Bloqueamos sus archivos en un archivo inviolable.",
    infra_sec_2: "Si el inspector llama a su puerta en 9 años, tiene todo listo para presentar en dos clics.",
    infra_sec_3: "Documentos protegidos con cifrado avanzado para resistir robos o ataques cibernéticos.",
    infra_sec_4: "",
    infra_lambda: "Sistema \"A Prueba de Obras\"",
    infra_lam_1: "Infraestructura siempre operativa, diseñada para soportar el ritmo y urgencias de la obra.",
    infra_lam_2: "Acceso instantáneo y seguro para descargar DURC y certificados directamente desde su smartphone.",
    infra_lam_3: "Su empresa nunca se bloquea porque un portal no responde.",
    infra_lam_4: "",
    infra_compliance: "Escudo Antivirus e Instalaciones Cero",
    infra_comp_1: "Sin programas para instalar: todo funciona a través de web en un entorno aislado y protegido.",
    infra_comp_2: "Elimine el riesgo de descargar virus o ransomware que extorsionan y bloquean computadoras de oficina.",
    infra_comp_3: "Aunque una computadora se dañe o sea robada, sus datos permanecen intactos y accesibles desde cualquier otro dispositivo.",
    infra_comp_4: "",
    infra_footer: "Infraestructura empresarial • Cero compromisos en seguridad",
    infra_uptime: "SLA de tiempo de actividad 99,99% • Copias de seguridad redundantes • Recuperación ante desastres",
    cookie_title: "Gestión de Cookies y Datos",
    cookie_desc: "Utilizamos cookies esenciales para la funcionalidad y cookies opcionales para análisis y marketing. Puede personalizar sus preferencias.",
    cookie_essential: "Cookies Esenciales",
    cookie_essential_desc: "Necesarios para el funcionamiento del sitio. No se pueden desactivar.",
    cookie_analytics: "Análisis",
    cookie_analytics_desc: "Nos ayudan a comprender cómo usa el sitio y mejorarlo.",
    cookie_marketing: "Marketing",
    cookie_marketing_desc: "Se utilizan para personalizar contenido y anuncios.",
    cookie_accept_all: "Aceptar Todo",
    cookie_reject_all: "Rechazar Todo",
    cookie_customize: "Personalizar",
    cookie_save: "Guardar Preferencias",
    cookie_privacy: "Leer nuestra Política de Privacidad",
  },
  pt: {
    header_caos: "O Caos",
    header_flusso: "O Fluxo",
    header_prezzi: "Preços",
    header_accesso: "Acesso",
    hero_button_1: "Solicitar Acesso",
    hero_button_2: "Veja como funciona",
    hero_title: "O arquivo inteligente que já sabe quais documentos você precisa.",
    hero_desc: "Esqueça o caos. Com base no tipo de projeto, Agrimensore o orienta sobre a documentação exata a coletar. Arquive arquivos, colabore com técnicos externos e mantenha-se em conformidade por 10 anos.",
    hero_badge: "Projetado para PMEs italianas • Infrastructure AWS Milão",
    hero_security: "Dados seguros na Itália (AWS Milão)",
    problem_main: "As regulamentações mudam. A desordem não é mais perdoada.",
    problem_desc: "Com licenças de crédito e retenção obrigatória de 10 anos, gerenciar projetos no WhatsApp ou em pastas físicas significa se expor a paradas de trabalho.",
    solution_main: "A Solução",
    feature_1_title: "Guiado pelo projeto",
    feature_1_desc: "Abra um projeto e obtenha imediatamente a lista exata dos documentos necessários. Nenhum item esquecido, margem zero para erro.",
    feature_2_title: "Colaboração direta via link",
    feature_2_desc: "Precisa fazer redigir um documento para seu projeto? Gere um link e envie-o ao técnico. Ele pode usá-lo para visualizar dados ou carregar o arquivo concluído na plataforma.",
    feature_3_title: "Armazenamento legal de 10 anos",
    feature_3_desc: "Esqueça o medo das inspeções. Seus arquivos permanecem arquivados com segurança na infraestrutura em nuvem, em conformidade com as regulamentações, por 10 anos.",
    feature_4_title: "Infraestrutura blindada (Servidores na Itália)",
    feature_4_desc: "Os dados da sua empresa e seus subcontratados estão protegidos por criptografia de nível militar e hospedados em servidores AWS localizados fisicamente em Milão. Máxima segurança e conformidade com GDPR garantidas.",
    gated_section_title: "Projetado para PMEs de construção italianas.",
    gated_section_desc: "Não somos um software complicado para multinacionais gigantes. Agrimensore nasceu para a empresa de construção que precisa executar projetos e não tem tempo a perder com bagunça burocrática.",
    problem_box_1_title: "O labirinto de arquivos",
    problem_box_1_desc: "Horas perdidas procurando aquele documento específico que foi enviado há três meses por email, misturado entre mil outras comunicações.",
    problem_box_2_title: "Regulamentações loucas",
    problem_box_2_desc: "A frustração de nunca saber 100% se para esse trabalho de subcontratação específico sua empresa tem toda a documentação em ordem.",
    problem_box_3_title: "Técnicos bloqueados",
    problem_box_3_desc: "O engenheiro deve redigir documentos específicos para o projeto, mas perde dias inteiros pedindo documentação válida.",
    solution_main_title: "Um único ambiente. Tudo pronto para usar.",
    solution_main_desc: "Desenvolvemos o fluxo de trabalho perfeito para PMEs de construção. Agrimensore não é um espaço vazio, é um assistente que organiza o trabalho para você e seus colaboradores.",
    hero_trust_swiss: "Engenharia Suíça",
    plan_professional_desc: "Projetado para profissionais independentes que gerenciam um único projeto por vez. Inclui um editor com a opção de adicionar colaboradores extras. Ideal para trabalho autônomo com controle máximo.",
    plan_professional_feature_1: "1 projeto ativo por vez",
    plan_professional_feature_2: "1 editor incluído (proprietário)",
    plan_professional_feature_3: "0 visualizadores incluídos",
    plan_professional_feature_4: "Armazenamento do projeto ativo",
    plan_professional_feature_5: "Possibilidade de adicionar editores extras",
    plan_professional_feature_6: "Acesso completo a todos os recursos",
    plan_studio_name: "Estúdio Associado",
    plan_studio_badge: "Mais Popular",
    plan_studio_desc: "Ideal para pequenos estúdios e equipes colaborativas. Permite gerenciar até três projetos ativos simultaneamente. Projetado para promover trabalho em equipe e coordenação.",
    plan_studio_feature_1: "Até 3 projetos ativos",
    plan_studio_feature_2: "1 editor incluído (proprietário)",
    plan_studio_feature_3: "2 visualizadores incluídos",
    plan_studio_feature_4: "Projetado para colaboração",
    plan_studio_feature_5: "Possibilidade de adicionar editores extras",
    plan_studio_feature_6: "Acesso completo a todos os recursos",
    plan_contractor_desc: "Projetado para empresas estruturadas que gerenciam projetos ilimitados. Inclui suporte prioritário e máxima flexibilidade para escalar a equipe conforme as necessidades operacionais.",
    plan_contractor_feature_1: "Projetos ativos ilimitados",
    plan_contractor_feature_2: "1 editor incluído (proprietário)",
    plan_contractor_feature_3: "5 visualizadores incluídos",
    plan_contractor_feature_4: "Sem limite no número de projetos",
    plan_contractor_feature_5: "Suporte prioritário 24/7",
    plan_contractor_feature_6: "Acesso completo a todo o ecossistema",
    pricing_title: "Escolha sua configuração",
    pricing_subtitle: "Selecione o plano de licença para desbloquear o ecossistema Agrimensore.",
    plan_button: "Solicitar Consulta",
    problem_title: "O Problema",
    solution_title: "A Solução",
    gated_access_title: "ACESSO EXCLUSIVO",
    gated_access_desc: "Solicite acesso exclusivo à nossa plataforma empresarial.",
    plan_professional: "Profissional Solo",
    plan_studio: "Estúdio Associado",
    plan_contractor: "Empreiteiro Geral",
    plan_featured: "Mais Popular",
    footer_copyright: "© 2026 Agrimensore SRLS. Todos os direitos reservados.",
    modal_title: "Solicitar Acesso",
    modal_name: "Nome Completo",
    modal_email: "Email",
    modal_company: "Empresa",
    modal_message: "Mensagem",
    modal_button: "Enviar Solicitação",
    infra_title: "Infraestrutura Empresarial para PMEs",
    infra_subtitle: "Tecnologia de nível empresarial sem complexidade. Seus dados são protegidos por infraestrutura moderna e escalável.",
    infra_db: "Dados na Itália e Zero Multas (LGPD)",
    infra_db_1: "Os documentos de seus canteiros residem exclusivamente em servidores de alta segurança em Milão.",
    infra_db_2: "Nenhum dado no exterior: você está totalmente protegido contra sanções da Autoridade de Proteção de Dados.",
    infra_db_3: "Arquitetura de nuvem projetada para eliminar o risco de perder documentos cruciais da sua empresa.",
    infra_db_4: "",
    infra_security: "Cofre Decenal em Conformidade com a Lei",
    infra_sec_1: "A lei exige 10 anos de retenção? Bloqueamos seus arquivos em um arquivo inviolável.",
    infra_sec_2: "Se o inspetor bater à sua porta em 9 anos, você tem tudo pronto para apresentar em dois cliques.",
    infra_sec_3: "Documentos protegidos com criptografia avançada para resistir a roubo ou ataques cibernéticos.",
    infra_sec_4: "",
    infra_lambda: "Sistema \"À Prova de Canteiro\"",
    infra_lam_1: "Infraestrutura sempre operacional, projetada para suportar o ritmo e urgências do canteiro.",
    infra_lam_2: "Acesso instantâneo e seguro para baixar DURC e certificados diretamente do seu smartphone.",
    infra_lam_3: "Sua empresa nunca fica bloqueada porque um portal não responde.",
    infra_lam_4: "",
    infra_compliance: "Escudo Antivírus e Instalações Zero",
    infra_comp_1: "Nenhum programa para instalar: tudo funciona via web em um ambiente isolado e protegido.",
    infra_comp_2: "Elimine o risco de baixar vírus ou ransomware que extorquem e bloqueiam computadores de escritório.",
    infra_comp_3: "Mesmo que um computador quebra ou seja roubado, seus dados permanecem intactos e acessíveis de qualquer outro dispositivo.",
    infra_comp_4: "",
    infra_footer: "Infraestrutura empresarial • Zero compromissos em segurança",
    infra_uptime: "SLA de tempo de atividade 99,99% • Backups redundantes • Recuperação de desastres",
    cookie_title: "Gerenciamento de Cookies e Dados",
    cookie_desc: "Usamos cookies essenciais para funcionalidade e cookies opcionais para análise e marketing. Você pode personalizar suas preferências.",
    cookie_essential: "Cookies Essenciais",
    cookie_essential_desc: "Necessários para o funcionamento do site. Não podem ser desativados.",
    cookie_analytics: "Análise",
    cookie_analytics_desc: "Nos ajudam a entender como você usa o site e melhorá-lo.",
    cookie_marketing: "Marketing",
    cookie_marketing_desc: "Usados para personalizar conteúdo e anúncios.",
    cookie_accept_all: "Aceitar Todos",
    cookie_reject_all: "Rejeitar Todos",
    cookie_customize: "Personalizar",
    cookie_save: "Salvar Preferências",
    cookie_privacy: "Leia nossa Política de Privacidade",
  },
  nl: {
    header_caos: "De Chaos",
    header_flusso: "De Stroom",
    header_prezzi: "Prijzen",
    header_accesso: "Toegang",
    hero_button_1: "Toegang Aanvragen",
    hero_button_2: "Bekijk hoe het werkt",
    hero_title: "Het intelligente archief dat al weet welke documenten je nodig hebt.",
    hero_desc: "Vergeet de chaos. Op basis van het projecttype begeleidt Agrimensore je door de exacte documentatie om te verzamelen. Archiveer bestanden, werk samen met externe technici en blijf 10 jaar compliant.",
    hero_badge: "Ontworpen voor Italiaanse MKBs • Infrastructure AWS Milaan",
    hero_security: "Gegevens veilig in Italië (AWS Milaan)",
    problem_main: "Regelgeving verandert. Wanorde wordt niet meer vergeven.",
    problem_desc: "Met kredietlicenties en verplichte 10-jarige bewaring betekent het beheren van projecten op WhatsApp of in fysieke mappen dat je jezelf blootstelt aan werkstilleggingen.",
    solution_main: "De Oplossing",
    feature_1_title: "Geleid door het project",
    feature_1_desc: "Open een project en krijg onmiddellijk de exacte lijst met vereiste documenten. Geen vergeten items, nul foutenmarge.",
    feature_2_title: "Directe samenwerking via link",
    feature_2_desc: "Moet een document voor je project worden opgesteld? Genereer een link en stuur deze naar de technicus. Ze kunnen deze gebruiken om gegevens weer te geven of het voltooide bestand naar het platform te uploaden.",
    feature_3_title: "Wettelijke opslag van 10 jaar",
    feature_3_desc: "Vergeet de angst voor inspections. Uw bestanden blijven veilig gearchiveerd in de cloudinfrastructuur, in overeenstemming met regelgeving, gedurende 10 jaar.",
    feature_4_title: "Gepantserde infrastructuur (Servers in Italië)",
    feature_4_desc: "De gegevens van uw bedrijf en uw onderaannemers worden beschermd door militaire encryptie en gehost op AWS-servers die zich fysiek in Milaan bevinden. Maximale beveiliging en GDPR-naleving gegarandeerd.",
    gated_section_title: "Ontworpen voor Italiaanse bouw-MKBs.",
    gated_section_desc: "We zijn geen omslachtig software voor reuseachtige multinationals. Agrimensore is ontstaan voor het bouwbedrijf dat projecten moet uitvoeren en geen tijd te verliezen heeft aan bureaucratische chaos.",
    problem_box_1_title: "Het bestandendoolhof",
    problem_box_1_desc: "Uren verloren aan het zoeken naar dat specifieke document dat drie maanden geleden per e-mail is verzonden, vermengd met duizend andere communicaties.",
    problem_box_2_title: "Gekte regelgeving",
    problem_box_2_desc: "De frustratie van nooit 100% te weten of voor dat specifieke onderaannemingswerk uw bedrijf alle documentatie op orde heeft.",
    problem_box_3_title: "Geblokkeerde technici",
    problem_box_3_desc: "De ingenieur moet specifieke documenten voor het project opstellen maar verspilt hele dagen je achterna voor geldige documentatie.",
    solution_main_title: "Één enkele omgeving. Alles klaar voor gebruik.",
    solution_main_desc: "We hebben de perfecte werkstroom voor bouw-MKBs ontworpen. Agrimensore is geen lege ruimte, het is een assistent die het werk voor u en uw medewerkers organiseert.",
    hero_trust_swiss: "Zwitserse Techniek",
    plan_professional_desc: "Ontworpen voor onafhankelijke professionals die één project tegelijk beheren. Inclusief een editor met de mogelijkheid om extra medewerkers toe te voegen. Ideaal voor autonoom werk met maximale controle.",
    plan_professional_feature_1: "1 actief project tegelijk",
    plan_professional_feature_2: "1 editor inbegrepen (eigenaar)",
    plan_professional_feature_3: "0 viewers inbegrepen",
    plan_professional_feature_4: "Opslag van actief project",
    plan_professional_feature_5: "Mogelijkheid om extra editors toe te voegen",
    plan_professional_feature_6: "Volledige toegang tot alle functies",
    plan_studio_name: "Bijbehorende Studio",
    plan_studio_badge: "Meest Gekozen",
    plan_studio_desc: "Ideaal voor kleine studios en samenwerkingsteams. Hiermee kunt u tot drie actieve projecten tegelijk beheren. Ontworpen om teamwerk en coördinatie aan te moedigen.",
    plan_studio_feature_1: "Tot 3 actieve projecten",
    plan_studio_feature_2: "1 editor inbegrepen (eigenaar)",
    plan_studio_feature_3: "2 viewers inbegrepen",
    plan_studio_feature_4: "Ontworpen voor samenwerking",
    plan_studio_feature_5: "Mogelijkheid om extra editors toe te voegen",
    plan_studio_feature_6: "Volledige toegang tot alle functies",
    plan_contractor_desc: "Ontworpen voor gestructureerde bedrijven die onbeperkte projecten beheren. Inclusief prioriteitsondersteuning en maximale flexibiliteit om het team te schalen volgens operationele behoeften.",
    plan_contractor_feature_1: "Onbeperkte actieve projecten",
    plan_contractor_feature_2: "1 editor inbegrepen (eigenaar)",
    plan_contractor_feature_3: "5 viewers inbegrepen",
    plan_contractor_feature_4: "Geen limiet op aantal projecten",
    plan_contractor_feature_5: "Prioriteitsondersteuning 24/7",
    plan_contractor_feature_6: "Volledige toegang tot het gehele ecosysteem",
    pricing_title: "Kies uw configuratie",
    pricing_subtitle: "Selecteer het licentieplan om het Agrimensore-ecosysteem te ontgrendelen.",
    plan_button: "Raadpleging Aanvragen",
    problem_title: "Het Probleem",
    solution_title: "De Oplossing",
    gated_access_title: "EXCLUSIEVE TOEGANG",
    gated_access_desc: "Vraag exclusieve toegang tot ons enterprise-platform aan.",
    plan_professional: "Solo Professional",
    plan_studio: "Geassocieerd Studio",
    plan_contractor: "Algemene Aannemer",
    plan_featured: "Meest Populair",
    footer_copyright: "© 2026 Agrimensore SRLS. Alle rechten voorbehouden.",
    modal_title: "Toegang Aanvragen",
    modal_name: "Volledige Naam",
    modal_email: "Email",
    modal_company: "Bedrijf",
    modal_message: "Bericht",
    modal_button: "Aanvraag Verzenden",
    infra_title: "Enterprise-infrastructuur voor MKBs",
    infra_subtitle: "Enterprise-technologie zonder complexiteit. Uw gegevens zijn beveiligd door moderne, schaalbare infrastructuur.",
    infra_db: "Gegevens in Italië en Nul Boetes (AVG)",
    infra_db_1: "Uw bouwplaatsdocumenten bevinden zich uitsluitend op zeer veilige servers in Milaan.",
    infra_db_2: "Geen gegevens in het buitenland: u bent volledig beschermd tegen sancties van de gegevensbeschermingsautoriteit.",
    infra_db_3: "Cloud-architectuur ontworpen om het risico op verlies van kritieke bedrijfsdocumenten uit te sluiten.",
    infra_db_4: "",
    infra_security: "Tienjaar-Kluis in Overeenstemming met de Wet",
    infra_sec_1: "Vereist de wet 10 jaar bewaring? Wij sluiten uw bestanden op in een onaantastbaar archief.",
    infra_sec_2: "Als de inspecteur over 9 jaar aan uw deur klopt, heeft u alles klaar om te presenteren met twee klikken.",
    infra_sec_3: "Documenten beschermd met geavanceerde versleuteling om bestand te zijn tegen diefstal of cyberaanvallen.",
    infra_sec_4: "",
    infra_lambda: "Bouwplaats-Proof Systeem",
    infra_lam_1: "Altijd operationele infrastructuur, ontworpen om het ritme en urgentie van de bouwplaats aan te kunnen.",
    infra_lam_2: "Onmiddellijke en veilige toegang om DURC en certificaten rechtstreeks van uw smartphone te downloaden.",
    infra_lam_3: "Uw bedrijf wordt nooit geblokkeerd omdat een portaal niet reageert.",
    infra_lam_4: "",
    infra_compliance: "Antiviruscème en Nul Installaties",
    infra_comp_1: "Geen programma's om te installeren: alles werkt via web in een geïsoleerde en beveiligde omgeving.",
    infra_comp_2: "Elimineer het risico op virussen of ransomware die kantoorcomputers afpersen en blokkeren.",
    infra_comp_3: "Zelfs als een computer kapot gaat of wordt gestolen, blijven uw gegevens intact en toegankelijk vanaf elk ander apparaat.",
    infra_comp_4: "",
    infra_footer: "Enterprise-infrastructuur • Nul beveiligingscompromissen",
    infra_uptime: "99,99% uptime SLA • Redundante back-ups • Noodherstellingsprocedure",
    cookie_title: "Cookie- en Gegevensbeheer",
    cookie_desc: "We gebruiken essentiële cookies voor functionaliteit en optionele cookies voor analytics en marketing. U kunt uw voorkeuren aanpassen.",
    cookie_essential: "Essentiële Cookies",
    cookie_essential_desc: "Vereist voor sitefunctionaliteit. Kan niet worden uitgeschakeld.",
    cookie_analytics: "Analytiek",
    cookie_analytics_desc: "Helpen ons begrijpen hoe u de site gebruikt en deze te verbeteren.",
    cookie_marketing: "Marketing",
    cookie_marketing_desc: "Gebruikt om inhoud en advertenties aan te passen.",
    cookie_accept_all: "Alles Accepteren",
    cookie_reject_all: "Alles Weigeren",
    cookie_customize: "Aanpassen",
    cookie_save: "Voorkeuren Opslaan",
    cookie_privacy: "Lees ons Privacybeleid",
  },
  pl: {
    header_caos: "Chaos",
    header_flusso: "Przepływ",
    header_prezzi: "Ceny",
    header_accesso: "Dostęp",
    hero_button_1: "Żądaj Dostępu",
    hero_button_2: "Zobacz jak to działa",
    hero_title: "Inteligentne archiwum, które już wie, jakie dokumenty są Ci potrzebne.",
    hero_desc: "Zapomnij o chaosie. W oparciu o typ projektu Agrimensore poprowadzi Cię przez dokładną dokumentację do zebrania. Archiwizuj pliki, współpracuj z zewnętrznymi technikami i pozostań zgodny przez 10 lat.",
    hero_badge: "Zaprojektowane dla włoskich MŚP • Infrastructure AWS Mediolan",
    hero_security: "Dane bezpieczne we Włoszech (AWS Mediolan)",
    problem_main: "Regulacje się zmieniają. Nieład nie jest już tolerowany.",
    problem_desc: "Dzięki licencjom kredytowym i obowiązkowej retencji 10-letniej zarządzanie projektami na WhatsAppie lub w fizycznych folderach oznacza narażenie się na wznowienie pracy.",
    solution_main: "Rozwiązanie",
    feature_1_title: "Kierowanie przez projekt",
    feature_1_desc: "Otwórz projekt i natychmiast uzyskaj dokładną listę wymaganych dokumentów. Brak zapomnień, zerowa tolerancja błędów.",
    feature_2_title: "Bezpośrednia współpraca poprzez link",
    feature_2_desc: "Musisz sporządzić dokument dla swojego projektu? Wygeneruj link i wyślij go technikowi. Mogą go używać do wyświetlania danych lub przesyłania ukończonego pliku na platformę.",
    feature_3_title: "Przechowywanie prawne przez 10 lat",
    feature_3_desc: "Zapomnij o strachu przed inspekcjami. Twoje pliki pozostają bezpiecznie zarchiwizowane w infrastrukturze chmury, zgodnie z przepisami, przez 10 lat.",
    feature_4_title: "Opancerzona infrastruktura (Serwery we Włoszech)",
    feature_4_desc: "Dane Twojej firmy i Twoich podwykonawców są chronione szyfrowaniem na poziomie militarnym i hostowane na serwerach AWS znajdujących się fizycznie w Mediolanie. Maksymalne bezpieczeństwo i zgodność z RODO gwarantowane.",
    gated_section_title: "Zaprojektowane dla włoskich MŚP budowlanych.",
    gated_section_desc: "Nie jesteśmy rozwlekłym oprogramowaniem dla gigantycznych multinacjonali. Agrimensore powstało dla firmy budowlanej, która musi wykonywać projekty i nie ma czasu do stracenia na bałagan biurokratyczny.",
    problem_box_1_title: "Labirynt plików",
    problem_box_1_desc: "Godziny spędzone na szukaniu tego konkretnego dokumentu, który wysłano Ci trzy miesiące temu e-mailem, pomieszanego z tysiącem innych wiadomości.",
    problem_box_2_title: "Szalone regulacje",
    problem_box_2_desc: "Frustracja z tego, że nigdy nie wiesz w 100%, czy dla tej konkretnej pracy podwykonawcy Twoja firma ma całą dokumentację w porządku.",
    problem_box_3_title: "Zablokowani technicy",
    problem_box_3_desc: "Inżynier musi sporządzać konkretne dokumenty dla projektu, ale spędza całe dni na ściganiu Cię o ważną dokumentację.",
    solution_main_title: "Jedno środowisko. Wszystko gotowe do użycia.",
    solution_main_desc: "Stworzyliśmy idealny przepływ pracy dla MŚP budowlanych. Agrimensore to nie pusta przestrzeń, to asystent, który organizuje pracę dla Ciebie i Twoich współpracowników.",
    hero_trust_swiss: "Inżynieria Szwajcarska",
    plan_professional_desc: "Zaprojektowane dla niezależnych profesjonalistów zarządzających jednym projektem na raz. Obejmuje edytor z możliwością dodania dodatkowych współpracowników. Idealny do autonomicznej pracy z maksymalną kontrolą.",
    plan_professional_feature_1: "1 aktywny projekt na raz",
    plan_professional_feature_2: "1 edytor w zestawie (właściciel)",
    plan_professional_feature_3: "0 przeglądających w zestawie",
    plan_professional_feature_4: "Przechowywanie aktywnego projektu",
    plan_professional_feature_5: "Możliwość dodania dodatkowych edytorów",
    plan_professional_feature_6: "Pełny dostęp do wszystkich funkcji",
    plan_studio_name: "Studio Skojarzone",
    plan_studio_badge: "Najpopularniejszy",
    plan_studio_desc: "Idealne dla małych studiów i zespołów współpracujących. Pozwala zarządzać do trzema aktywnymi projektami jednocześnie. Zaprojektowane do promowania pracy zespołowej i koordynacji.",
    plan_studio_feature_1: "Do 3 aktywnych projektów",
    plan_studio_feature_2: "1 edytor w zestawie (właściciel)",
    plan_studio_feature_3: "2 przeglądających w zestawie",
    plan_studio_feature_4: "Zaprojektowane dla współpracy",
    plan_studio_feature_5: "Możliwość dodania dodatkowych edytorów",
    plan_studio_feature_6: "Pełny dostęp do wszystkich funkcji",
    plan_contractor_desc: "Zaprojektowane dla ustrukturyzowanych firm zarządzających nieograniczonymi projektami. Obejmuje priorytetową obsługę i maksymalną elastyczność w skalowaniu zespołu w zależności od potrzeb operacyjnych.",
    plan_contractor_feature_1: "Nieograniczone aktywne projekty",
    plan_contractor_feature_2: "1 edytor w zestawie (właściciel)",
    plan_contractor_feature_3: "5 przeglądających w zestawie",
    plan_contractor_feature_4: "Brak limitu liczby projektów",
    plan_contractor_feature_5: "Priorytetowa obsługa 24/7",
    plan_contractor_feature_6: "Pełny dostęp do całego ekosystemu",
    pricing_title: "Wybierz swoją konfigurację",
    pricing_subtitle: "Wybierz plan licencji, aby odblokować ekosystem Agrimensore.",
    plan_button: "Poproś o Konsultację",
    problem_title: "Problem",
    solution_title: "Rozwiązanie",
    gated_access_title: "DOSTĘP WYŁĄCZNY",
    gated_access_desc: "Poproś o wyłączny dostęp do naszej platformy enterprise.",
    plan_professional: "Profesjonalista Solo",
    plan_studio: "Studio Skojarzone",
    plan_contractor: "Generalny Wykonawca",
    plan_featured: "Najpopularniejszy",
    footer_copyright: "© 2026 Agrimensore SRLS. Wszystkie prawa zastrzeżone.",
    modal_title: "Poproś o Dostęp",
    modal_name: "Imię i Nazwisko",
    modal_email: "Email",
    modal_company: "Firma",
    modal_message: "Wiadomość",
    modal_button: "Wyślij Prośbę",
    infra_title: "Infrastruktura klasy Enterprise dla MŚP",
    infra_subtitle: "Technologia klasy enterprise bez złożoności. Twoje dane są chronione przez nowoczesną, skalowalną infrastrukturę.",
    infra_db: "Dane we Włoszech i Zerowe Grzywny (RODO)",
    infra_db_1: "Dokumenty z Twoich budów przechowywane są wyłącznie na serwerach o wysokim bezpieczeństwie w Mediolanie.",
    infra_db_2: "Brak danych za granicą: jesteś całkowicie chroniony przed sankcjami Urzędu Ochrony Danych Osobowych.",
    infra_db_3: "Architektura cloud zaprojektowana w celu wyeliminowania ryzyka utraty krytycznych dokumentów Twojej firmy.",
    infra_db_4: "",
    infra_security: "Sejf Dziesięcioletni Zgodny z Prawem",
    infra_sec_1: "Prawo wymaga przechowywania przez 10 lat? Blokujemy Twoje pliki w niezatakowanym archiwum.",
    infra_sec_2: "Jeśli inspektor zapuka do Twoich drzwi za 9 lat, masz wszystko gotowe do zaprezentowania dwiema klikami.",
    infra_sec_3: "Dokumenty chronione zaawansowanym szyfrowaniem przed kradzieżą lub atakami cybernetycznymi.",
    infra_sec_4: "",
    infra_lambda: "System \"Odporny na Budowę\"",
    infra_lam_1: "Infrastruktura zawsze operacyjna, zaprojektowana do obsługi tempa i pilności budowy.",
    infra_lam_2: "Błyskawiczny i bezpieczny dostęp do pobierania DURC i certyfikatów bezpośrednio ze smartfona.",
    infra_lam_3: "Twoja firma nigdy nie zostaje zablokowana, ponieważ portal nie odpowiada.",
    infra_lam_4: "",
    infra_compliance: "Tarcza Antywirusowa i Zerowe Instalacje",
    infra_comp_1: "Brak programów do zainstalowania: wszystko działa przez sieć w izolowanym i chronionym środowisku.",
    infra_comp_2: "Wyeliminuj ryzyko pobierania wirusów lub ransomware'u, które szantażują i blokują komputery biurowe.",
    infra_comp_3: "Nawet jeśli komputer się psuje lub zostaje skradziony, Twoje dane pozostają niezmienione i dostępne z dowolnego innego urządzenia.",
    infra_comp_4: "",
    infra_footer: "Infrastruktura klasy enterprise • Zero kompromisów w kwestii bezpieczeństwa",
    infra_uptime: "99,99% SLA czasu pracy • Nadmierne kopie zapasowe • Odzyskiwanie po awarii",
    cookie_title: "Zarządzanie Plikami Cookie i Danymi",
    cookie_desc: "Używamy niezbędnych plików cookie do funkcjonowania oraz opcjonalnych plików cookie do analityki i marketingu. Możesz dostosować swoje preferencje.",
    cookie_essential: "Niezbędne Pliki Cookie",
    cookie_essential_desc: "Wymagane do działania witryny. Nie można ich wyłączyć.",
    cookie_analytics: "Analityka",
    cookie_analytics_desc: "Pomagają nam zrozumieć, w jaki sposób korzystasz z witryny i ją ulepszić.",
    cookie_marketing: "Marketing",
    cookie_marketing_desc: "Używane do personalizacji treści i reklam.",
    cookie_accept_all: "Zaakceptuj Wszystko",
    cookie_reject_all: "Odrzuć Wszystko",
    cookie_customize: "Dostosuj",
    cookie_save: "Zapisz Preferencje",
    cookie_privacy: "Przeczytaj naszą Politykę Prywatności",
  },
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("it")
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [cookieConsent, setCookieConsent] = useState<{ analytics?: boolean; marketing?: boolean } | null>(null)
  const [showCookieDetails, setShowCookieDetails] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [tempAnalytics, setTempAnalytics] = useState(true)
  const [tempMarketing, setTempMarketing] = useState(true)
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  // Load cookie consent from localStorage
  useLayoutEffect(() => {
    setIsMounted(true)
  }, [])

  // Load cookie preferences
  useEffect(() => {
    const saved = localStorage.getItem("cookieConsent")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Batch state updates
        setCookieConsent(parsed)
        setTempAnalytics(parsed.analytics ?? true)
        setTempMarketing(parsed.marketing ?? true)
      } catch (error) {
        console.error("Failed to parse cookie consent:", error)
      }
    }
  }, [])

  // Load tracking scripts based on consent
  // DISABLED FOR NOW - TO BE RE-ENABLED LATER
  /*
  useEffect(() => {
    if (cookieConsent === null || !isMounted) return

    // Google Analytics (Analytics Consent)
    if (cookieConsent.analytics) {
      const script = document.createElement("script")
      script.async = true
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" // Replace with your GA ID
      document.head.appendChild(script)

      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer?.push(arguments)
      }
      gtag("js", new Date())
      gtag("config", "G-XXXXXXXXXX") // Replace with your GA ID
    }

    // Facebook Pixel (Marketing Consent)
    if (cookieConsent.marketing) {
      const fbScript = document.createElement("script")
      fbScript.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'YOUR_PIXEL_ID'); // Replace with your Pixel ID
        fbq('track', 'PageView');
      `
      document.head.appendChild(fbScript)

      // noscript fallback
      const noscript = document.createElement("noscript")
      noscript.innerHTML = '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1" />' // Replace with your Pixel ID
      document.head.appendChild(noscript)
    }
  }, [cookieConsent, isMounted])
  */

  const t = (key: string) => {
    const lang = TRANSLATIONS[currentLang as keyof typeof TRANSLATIONS] || TRANSLATIONS.it
    return lang[key as keyof typeof lang] || key
  }

  const handleCookieConsent = (analytics: boolean, marketing: boolean) => {
    const consent = { analytics, marketing }
    localStorage.setItem("cookieConsent", JSON.stringify(consent))
    setCookieConsent(consent)
    setShowCookieDetails(false)
  }

  const handleSaveCustom = () => {
    handleCookieConsent(tempAnalytics, tempMarketing)
  }

  const handleAcceptAll = () => {
    handleCookieConsent(true, true)
  }

  const handleRejectAll = () => {
    handleCookieConsent(false, false)
  }

  return (
    <div className="min-h-screen bg-stone-50 text-zinc-900 font-sans selection:bg-stone-200 selection:text-zinc-900 dark:bg-black dark:text-zinc-50 dark:selection:bg-zinc-800 dark:selection:text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-black/5 bg-stone-50/95 backdrop-blur-sm dark:border-white/5 dark:bg-black/95">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="font-bold text-lg md:text-xl tracking-tighter flex items-center gap-2 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Agrimensore" className="h-8 w-8 object-contain" />
            <span className="hidden sm:inline text-sm">Agrimensore</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-500 absolute left-1/2 -translate-x-1/2 dark:text-zinc-400">
            <button onClick={() => scrollToSection("problema")} className="hover:text-zinc-900 transition-colors dark:hover:text-white">{t("header_caos")}</button>
            <button onClick={() => scrollToSection("soluzione")} className="hover:text-zinc-900 transition-colors dark:hover:text-white">{t("header_flusso")}</button>
            <button onClick={() => scrollToSection("pricing")} className="hover:text-zinc-900 transition-colors dark:hover:text-white">{t("header_prezzi")}</button>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1 text-zinc-500 hover:text-zinc-900 transition-colors text-xs sm:text-sm font-semibold uppercase tracking-wider p-2 dark:text-zinc-400 dark:hover:text-white"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden xs:inline text-xs">{LANGUAGES[currentLang]?.flag}</span>
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 rounded-lg shadow-xl z-50 dark:bg-zinc-950 dark:border-zinc-800">
                  {Object.entries(LANGUAGES).map(([code, { name, flag }]) => (
                    <button
                      key={code}
                      onClick={() => {
                        if (code === "en") {
                          window.location.href = "https://agrimensore.com"
                        } else {
                          setCurrentLang(code)
                          setShowLangMenu(false)
                        }
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        currentLang === code
                          ? "bg-stone-100 text-zinc-900 font-semibold dark:bg-zinc-800 dark:text-white"
                          : "text-zinc-600 hover:bg-stone-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                      }`}
                    >
                      {flag} {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-zinc-900 text-white hover:bg-zinc-800 text-xs sm:text-sm h-9 px-3 sm:px-4 font-semibold flex-shrink-0 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {t("header_accesso")}
            </Button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION CON TRUST BADGES */}
      <section className="relative container mx-auto px-4 py-12 sm:py-20 md:py-28 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] sm:h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_60%)] pointer-events-none"></div>

        <Badge variant="outline" className="mb-6 sm:mb-8 py-1.5 px-4 text-xs font-medium border-stone-300 text-zinc-600 rounded-full bg-gradient-to-r from-stone-100 to-stone-50 backdrop-blur-sm dark:border-zinc-700/50 dark:text-zinc-300 dark:from-zinc-900/80 dark:to-zinc-800/80">
          <ShieldCheck className="w-4 h-4 mr-2 text-emerald-400" />
          {t("hero_badge")}
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter max-w-5xl mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-500 relative z-10 dark:from-white dark:via-white dark:to-zinc-500">
          {t("hero_title")}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-2xl mb-8 sm:mb-10 leading-relaxed font-light relative z-10 dark:text-zinc-400">
          {t("hero_desc")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative z-10 w-full px-0 sm:w-auto justify-center">
          <Button onClick={() => setIsModalOpen(true)} size="lg" className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white hover:from-zinc-800 hover:to-zinc-700 h-12 sm:h-12 px-6 sm:px-8 font-semibold rounded-md w-full sm:w-auto shadow-lg hover:shadow-xl transition-all text-sm sm:text-base dark:from-white dark:to-zinc-100 dark:text-black dark:hover:from-zinc-50 dark:hover:to-white">
            {t("hero_button_1")}
          </Button>
          <Button
            onClick={() => scrollToSection("soluzione")}
            size="lg"
            variant="outline"
            className="border-emerald-500/40 hover:bg-emerald-500/10 text-zinc-600 hover:text-emerald-700 h-12 sm:h-12 px-6 sm:px-8 rounded-md w-full sm:w-auto group bg-gradient-to-r from-transparent to-emerald-500/5 text-sm sm:text-base dark:border-emerald-500/30 dark:text-zinc-300 dark:hover:text-emerald-300"
          >
            {t("hero_button_2")}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* TRUST BADGES: Svizzera + Italia */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-8 sm:mt-12 text-xs sm:text-sm text-zinc-600 font-medium relative z-10 dark:text-zinc-400">
          <div className="flex items-center gap-2 bg-stone-100/80 px-3 sm:px-4 py-2 rounded-full border border-stone-200 backdrop-blur-sm dark:bg-zinc-900/50 dark:border-zinc-800/50">
            <span className="text-base">🇨🇭</span>
            <span>{t("hero_trust_swiss")}</span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-zinc-800"></div>
          <div className="flex items-center gap-2 bg-stone-100/80 px-3 sm:px-4 py-2 rounded-full border border-stone-200 backdrop-blur-sm dark:bg-zinc-900/50 dark:border-zinc-800/50">
            <span className="text-base">🇮🇹</span>
            <span>{t("hero_security")}</span>
          </div>
        </div>
      </section>

      {/* 3. IL PROBLEMA */}
      <section id="problema" className="border-t border-black/5 bg-white py-12 sm:py-16 md:py-20 relative dark:border-white/5 dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 tracking-tight">{t("problem_title")}</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto font-light text-sm sm:text-base dark:text-zinc-400">
              {t("problem_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
            <Card className="bg-stone-50 border-stone-200 shadow-sm hover:border-stone-300 transition-colors duration-300 dark:bg-black dark:border-zinc-800/60 dark:shadow-2xl dark:hover:border-zinc-600">
              <CardContent className="pt-8 pb-8 px-8">
                <SearchX className="w-8 h-8 text-zinc-500 mb-6 dark:text-zinc-200" />
                <h3 className="font-semibold text-xl mb-3 text-zinc-800 dark:text-zinc-100">{t("problem_box_1_title")}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed dark:text-zinc-400">{t("problem_box_1_desc")}</p>
              </CardContent>
            </Card>
            <Card className="bg-stone-50 border-stone-200 shadow-sm hover:border-stone-300 transition-colors duration-300 dark:bg-black dark:border-zinc-800/60 dark:shadow-2xl dark:hover:border-zinc-600">
              <CardContent className="pt-8 pb-8 px-8">
                <FileWarning className="w-8 h-8 text-zinc-500 mb-6 dark:text-zinc-200" />
                <h3 className="font-semibold text-xl mb-3 text-zinc-800 dark:text-zinc-100">{t("problem_box_2_title")}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed dark:text-zinc-400">{t("problem_box_2_desc")}</p>
              </CardContent>
            </Card>
            <Card className="bg-stone-50 border-stone-200 shadow-sm hover:border-stone-300 transition-colors duration-300 dark:bg-black dark:border-zinc-800/60 dark:shadow-2xl dark:hover:border-zinc-600">
              <CardContent className="pt-8 pb-8 px-8">
                <HardHat className="w-8 h-8 text-zinc-500 mb-6 dark:text-zinc-200" />
                <h3 className="font-semibold text-xl mb-3 text-zinc-800 dark:text-zinc-100">{t("problem_box_3_title")}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed dark:text-zinc-400">{t("problem_box_3_desc")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. LA SOLUZIONE PULITA E ALLINEATA */}
      <section id="soluzione" className="py-12 sm:py-16 md:py-20 container mx-auto px-4 border-t border-black/5 dark:border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
              {t("solution_main_title")}
            </h2>
            <p className="text-zinc-600 mb-8 sm:mb-10 leading-relaxed font-light text-sm sm:text-base dark:text-zinc-400">
              {t("solution_main_desc")}
            </p>

            <div className="space-y-8 mt-10">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 group-hover:border-stone-300 transition-colors dark:bg-zinc-900 dark:border-zinc-800 dark:group-hover:border-zinc-600">
                  <FolderLock className="w-5 h-5 text-zinc-500 dark:text-zinc-300" />
                </div>
                <div>
                  <strong className="block text-zinc-800 font-semibold text-lg mb-1 dark:text-zinc-100">{t("feature_1_title")}</strong>
                  <span className="text-sm text-zinc-500 leading-relaxed block dark:text-zinc-400">{t("feature_1_desc")}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 group-hover:border-stone-300 transition-colors dark:bg-zinc-900 dark:border-zinc-800 dark:group-hover:border-zinc-600">
                  <LinkIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-300" />
                </div>
                <div>
                  <strong className="block text-zinc-800 font-semibold text-lg mb-1 dark:text-zinc-100">{t("feature_2_title")}</strong>
                  <span className="text-sm text-zinc-500 leading-relaxed block dark:text-zinc-400">{t("feature_2_desc")}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 group-hover:border-stone-300 transition-colors dark:bg-zinc-900 dark:border-zinc-800 dark:group-hover:border-zinc-600">
                  <Server className="w-5 h-5 text-zinc-500 dark:text-zinc-300" />
                </div>
                <div>
                  <strong className="block text-zinc-800 font-semibold text-lg mb-1 dark:text-zinc-100">{t("feature_3_title")}</strong>
                  <span className="text-sm text-zinc-500 leading-relaxed block dark:text-zinc-400">{t("feature_3_desc")}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 group-hover:border-stone-300 transition-colors dark:bg-zinc-900 dark:border-zinc-800 dark:group-hover:border-zinc-600">
                  <ShieldCheck className="w-5 h-5 text-zinc-500 dark:text-zinc-300" />
                </div>
                <div>
                  <strong className="block text-zinc-800 font-semibold text-lg mb-1 dark:text-zinc-100">{t("feature_4_title")}</strong>
                  <span className="text-sm text-zinc-500 leading-relaxed block dark:text-zinc-400">{t("feature_4_desc")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* MOCKUP VISIVO */}
          <div className="relative h-[400px] w-full bg-stone-100 rounded-2xl border border-stone-200 flex flex-col items-center justify-center p-8 overflow-hidden shadow-sm dark:bg-zinc-950 dark:border-zinc-800 dark:shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.03),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_60%)]"></div>
            <div className="w-full max-w-sm bg-white border border-stone-200 rounded-xl overflow-hidden z-10 shadow-md dark:bg-black dark:border-zinc-800 dark:shadow-2xl">
              <div className="h-8 border-b border-stone-200 bg-stone-50 flex items-center px-4 gap-2 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-zinc-800"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-zinc-800"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-zinc-800"></div>
              </div>
              <div className="p-5 space-y-4">
                <div className="h-2 w-24 bg-stone-200 rounded-full dark:bg-zinc-800"></div>
                <div className="flex items-center justify-between p-3 border border-stone-200 rounded-lg bg-stone-50/80 dark:border-zinc-800 dark:bg-zinc-950/50">
                  <div className="flex items-center gap-3">
                    <FileWarning className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                    <div className="h-2 w-32 bg-stone-300 rounded-full dark:bg-zinc-700"></div>
                  </div>
                  <div className="h-2 w-8 bg-green-500/50 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 border border-stone-200 rounded-lg bg-stone-50/80 dark:border-zinc-800 dark:bg-zinc-950/50">
                  <div className="flex items-center gap-3">
                    <LinkIcon className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                    <div className="h-2 w-28 bg-stone-300 rounded-full dark:bg-zinc-700"></div>
                  </div>
                  <div className="h-2 w-8 bg-stone-200 rounded-full dark:bg-zinc-800"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GATED ACCESS */}
      <section className="border-t border-black/5 bg-stone-100 py-12 sm:py-16 md:py-20 relative overflow-hidden dark:border-white/5 dark:bg-zinc-950/30">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[200px] sm:h-[300px] bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.04),transparent_60%)] pointer-events-none dark:bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.05),transparent_60%)]"></div>
        <div className="container mx-auto px-4 text-center max-w-2xl relative z-10">
          <HardHat className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-6 sm:mb-8 text-zinc-400 dark:text-zinc-600" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 tracking-tight">{t("gated_section_title")}</h2>
          <p className="text-zinc-600 mb-8 sm:mb-10 text-sm sm:text-base font-light leading-relaxed dark:text-zinc-400">
            {t("gated_section_desc")}
          </p>
          <Button onClick={() => setIsModalOpen(true)} size="lg" className="bg-zinc-900 text-white hover:bg-zinc-800 h-12 px-6 sm:px-8 font-semibold rounded-md w-full sm:w-auto text-sm sm:text-base dark:bg-white dark:text-black dark:hover:bg-zinc-200">
            Richiedi Accesso
          </Button>
        </div>
      </section>

      {/* STEALTH MODE - SENZA PREZZI */}
      <section id="pricing" className="py-12 sm:py-16 md:py-20 container mx-auto px-4 border-t border-black/5 font-sans relative dark:border-white/5">
        <div className="text-center mb-10 sm:mb-12 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-800 to-emerald-600 uppercase dark:from-white dark:via-white dark:to-emerald-300">{t("pricing_title")}</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto font-light text-xs sm:text-sm dark:text-zinc-400">{t("pricing_subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto relative z-10">

          {/* 1. LIBERO PROFESSIONISTA */}
          <Card className="bg-white border-stone-200 hover:border-emerald-500/40 transition-all dark:bg-gradient-to-br dark:from-zinc-950 dark:to-zinc-950/60 dark:border-zinc-800/40 dark:hover:border-emerald-500/20">
            <CardContent className="pt-10 px-6 sm:px-8 flex-1">
              <h3 className="text-xl font-bold text-zinc-900 mb-6 uppercase tracking-widest dark:text-white">{t("plan_professional")}</h3>
              <p className="text-zinc-600 text-sm leading-relaxed mb-8 h-28 italic dark:text-zinc-400">
                {t("plan_professional_desc")}
              </p>
              <div className="space-y-4 mb-8">
                {[
                  t("plan_professional_feature_1"),
                  t("plan_professional_feature_2"),
                  t("plan_professional_feature_3"),
                  t("plan_professional_feature_4"),
                  t("plan_professional_feature_5"),
                  t("plan_professional_feature_6")
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <ShieldCheck className="w-4 h-4 text-zinc-400 shrink-0 dark:text-zinc-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-6 sm:p-8 pt-0">
              <Button onClick={() => setIsModalOpen(true)} variant="outline" className="w-full border-emerald-500/40 hover:border-emerald-500/70 hover:bg-emerald-500/5 text-zinc-900 font-bold py-6 uppercase tracking-tighter transition-all dark:text-white dark:border-emerald-500/30">
                {t("plan_button")}
              </Button>
            </div>
          </Card>

          {/* 2. STUDIO ASSOCIATO */}
          <Card className="bg-gradient-to-br from-emerald-950/40 to-zinc-950/80 border-emerald-500/50 hover:border-emerald-400/70 transition-all shadow-[0_0_40px_-15px_rgba(16,185,129,0.2)]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-emerald-400 text-black text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">{t("plan_studio_badge")}</div>
            <CardContent className="pt-10 px-6 sm:px-8 flex-1">
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">{t("plan_studio_name")}</h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-8 h-28 italic dark:text-zinc-400">
                {t("plan_studio_desc")}
              </p>
              <div className="space-y-4 mb-8">
                {[
                  t("plan_studio_feature_1"),
                  t("plan_studio_feature_2"),
                  t("plan_studio_feature_3"),
                  t("plan_studio_feature_4"),
                  t("plan_studio_feature_5"),
                  t("plan_studio_feature_6")
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-zinc-100">
                    <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-6 sm:p-8 pt-0">
              <Button onClick={() => setIsModalOpen(true)} className="w-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-black hover:from-emerald-400 hover:to-emerald-300 font-bold py-6 uppercase tracking-tighter shadow-lg hover:shadow-xl transition-all">
                {t("plan_button")}
              </Button>
            </div>
          </Card>

          {/* 3. GENERAL CONTRACTOR */}
          <Card className="bg-white border-stone-200 hover:border-blue-500/30 transition-all dark:bg-gradient-to-br dark:from-zinc-950 dark:to-zinc-950/60 dark:border-zinc-800/40 dark:hover:border-blue-500/20">
            <CardContent className="pt-10 px-6 sm:px-8 flex-1">
              <h3 className="text-xl font-bold text-zinc-900 mb-6 uppercase tracking-widest dark:text-white">{t("plan_contractor")}</h3>
              <p className="text-zinc-600 text-sm leading-relaxed mb-8 h-28 italic dark:text-zinc-400">
                {t("plan_contractor_desc")}
              </p>
              <div className="space-y-4 mb-8">
                {[
                  t("plan_contractor_feature_1"),
                  t("plan_contractor_feature_2"),
                  t("plan_contractor_feature_3"),
                  t("plan_contractor_feature_4"),
                  t("plan_contractor_feature_5"),
                  t("plan_contractor_feature_6")
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <ShieldCheck className="w-4 h-4 text-zinc-400 shrink-0 dark:text-zinc-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-6 sm:p-8 pt-0">
              <Button onClick={() => setIsModalOpen(true)} variant="outline" className="w-full border-blue-500/40 hover:border-blue-500/70 hover:bg-blue-500/5 text-zinc-900 font-bold py-6 uppercase tracking-tighter transition-all dark:text-white dark:border-blue-500/30">
                {t("plan_button")}
              </Button>
            </div>
          </Card>

        </div>
      </section>

      {/* INFRASTRUCTURE & SECURITY SECTION */}
      <section className="py-12 md:py-20 border-t border-black/5 bg-stone-50 dark:border-white/5 dark:bg-gradient-to-b dark:from-black dark:via-emerald-950/10 dark:to-black">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-800 to-emerald-600 dark:from-white dark:via-white dark:to-emerald-300">
              {t("infra_title")}
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto font-light text-lg mt-6 dark:text-zinc-400">
              {t("infra_subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Infrastructure */}
            <Card className="bg-white border-stone-200 hover:border-emerald-500/40 transition-all dark:bg-gradient-to-br dark:from-zinc-900/60 dark:to-zinc-950 dark:border-emerald-500/20">
              <CardContent className="pt-8 pb-8 px-8">
                <h3 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-3 dark:text-white">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400"></span>
                  {t("infra_db")}
                </h3>
                <ul className="space-y-3">
                  {[
                    t("infra_db_1"),
                    t("infra_db_2"),
                    t("infra_db_3")
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                      <span className="text-emerald-400 mt-1">→</span>
                      <div className="relative inline-block">
                        {item.includes("datacenter") ? (
                          <span
                            onMouseEnter={() => setHoveredTerm("datacenter")}
                            onMouseLeave={() => setHoveredTerm(null)}
                            className="relative cursor-help border-b border-dashed border-emerald-400"
                          >
                            {item}
                            {hoveredTerm === "datacenter" && (
                              <div className="absolute bottom-full left-0 mb-2 w-48 bg-emerald-950 border border-emerald-500 rounded-lg p-3 text-xs text-emerald-100 shadow-lg z-10">
                                Infrastruttura su datacenter europei con ridondanza geografica e uptime garantito
                              </div>
                            )}
                          </span>
                        ) : (
                          <span>{item}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Right: Security */}
            <Card className="bg-white border-stone-200 hover:border-blue-500/40 transition-all dark:bg-gradient-to-br dark:from-zinc-900/60 dark:to-zinc-950 dark:border-blue-500/20">
              <CardContent className="pt-8 pb-8 px-8">
                <h3 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-3 dark:text-white">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400"></span>
                  {t("infra_security")}
                </h3>
                <ul className="space-y-3">
                  {[
                    t("infra_sec_1"),
                    t("infra_sec_2"),
                    t("infra_sec_3")
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                      <span className="text-blue-400 mt-1">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Lambda & Serverless */}
            <Card className="bg-white border-stone-200 hover:border-purple-500/40 transition-all dark:bg-gradient-to-br dark:from-zinc-900/60 dark:to-zinc-950 dark:border-purple-500/20">
              <CardContent className="pt-8 pb-8 px-8">
                <h3 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-3 dark:text-white">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></span>
                  {t("infra_lambda")}
                </h3>
                <ul className="space-y-3">
                  {[
                    t("infra_lam_1"),
                    t("infra_lam_2"),
                    t("infra_lam_3")
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                      <span className="text-purple-400 mt-1">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Compliance */}
            <Card className="bg-white border-stone-200 hover:border-amber-500/40 transition-all dark:bg-gradient-to-br dark:from-zinc-900/60 dark:to-zinc-950 dark:border-amber-500/20">
              <CardContent className="pt-8 pb-8 px-8">
                <h3 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-3 dark:text-white">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400"></span>
                  {t("infra_compliance")}
                </h3>
                <ul className="space-y-3">
                  {[
                    t("infra_comp_1"),
                    t("infra_comp_2"),
                    t("infra_comp_3")
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                      <span className="text-amber-400 mt-1">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-zinc-600 text-sm mb-4 dark:text-zinc-400">{t("infra_footer")}</p>
            <div className="flex items-center justify-center gap-2 text-zinc-700 text-xs dark:text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {t("infra_uptime")}
            </div>
          </div>
        </div>
      </section>

      {/* GLOSSARIO MINIMAL - SOLO AWS GENERICO */}
      <section className="py-10 md:py-16 border-t border-black/5 dark:border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8 tracking-tight dark:text-white">Perché AWS?</h2>

          <div className="space-y-4">
            {/* AWS - Solo vantaggi pubblici */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative border-l-2 border-emerald-500/40 pl-5 py-3 hover:border-emerald-500/80 transition-colors">
                <h3 className="font-semibold text-emerald-600 text-sm mb-1 dark:text-emerald-400">Infrastruttura cloud scalabile</h3>
                <p className="text-zinc-600 text-xs leading-relaxed dark:text-zinc-400">Cresci senza problemi. I server si adattano automaticamente al volume di lavoro, 24/7.</p>
              </div>
            </div>

            {/* Sostenibilità */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative border-l-2 border-blue-500/40 pl-5 py-3 hover:border-blue-500/80 transition-colors">
                <h3 className="font-semibold text-blue-600 text-sm mb-1 dark:text-blue-400">Ecologia</h3>
                <p className="text-zinc-600 text-xs leading-relaxed dark:text-zinc-400">AWS gestisce centri dati ad alta efficienza energetica. Tu usi solo quello che consumi, niente sprechi.</p>
              </div>
            </div>

            {/* Affidabilità generica */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative border-l-2 border-purple-500/40 pl-5 py-3 hover:border-purple-500/80 transition-colors">
                <h3 className="font-semibold text-purple-600 text-sm mb-1 dark:text-purple-400">Affidabilità enterprise</h3>
                <p className="text-zinc-600 text-xs leading-relaxed dark:text-zinc-400">Infrastruttura usata dalle aziende più grandi del mondo. Sono loro che la testano.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t border-black/10 py-8 text-zinc-500 text-xs bg-stone-100 dark:border-white/10 dark:bg-black dark:text-zinc-600">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <strong className="text-zinc-600 text-sm block mb-3 font-medium dark:text-zinc-400">Agrimensore SRLS</strong>
            <p className="text-sm">Sede Legale:</p>
            <p className="text-xs text-zinc-500">Piazza Buffoni 5, 21013 Gallarate (VA)</p>
          </div>
          <div>
            <strong className="text-zinc-600 text-sm block mb-3 font-medium dark:text-zinc-400">Azienda</strong>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-zinc-800 transition-colors dark:hover:text-zinc-300">Chi Siamo</a></li>
              <li><a href="/privacy" className="hover:text-zinc-800 transition-colors dark:hover:text-zinc-300">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <strong className="text-zinc-600 text-sm block mb-3 font-medium dark:text-zinc-400">Partnership</strong>
            <ul className="space-y-2">
              <li><a href="/partners" className="text-zinc-700 hover:text-zinc-900 font-medium transition-colors dark:text-zinc-300 dark:hover:text-white">Diventa Partner</a></li>
              <li className="text-zinc-500 text-xs">Scopri le opportunità di collaborazione</li>
              <li className="text-zinc-500 text-xs">e i vantaggi esclusivi per i nostri partner</li>
            </ul>
          </div>
          <div>
            <strong className="text-zinc-600 text-sm block mb-3 font-medium dark:text-zinc-400">Dati Societari</strong>
            <p className="mb-1">P.IVA / C.F.: 04130840129</p>
            <p className="mb-1">REA: VA-404094</p>
            <p className="mb-1">Registro Imprese di Varese</p>
            <p>Capitale: € 1.000,00 i.v.</p>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-6 pt-6 border-t border-stone-200 text-center text-zinc-500 text-xs dark:border-zinc-800/50 dark:text-zinc-700">
          <p>{t("footer_copyright")}</p>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} t={t} />

      {/* COOKIE CONSENT BANNER - DISABLED FOR NOW */}
      {false && isMounted && cookieConsent === null && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-zinc-800 p-4 sm:p-6 shadow-2xl backdrop-blur-sm animate-in slide-in-from-bottom-5 duration-300">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col gap-4">
              {/* Content Section */}
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-2">{t("cookie_title")}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 mb-4">{t("cookie_desc")}</p>
                
                {/* Details Panel */}
                {showCookieDetails && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                    <div>
                      <p className="font-semibold text-xs text-zinc-300 mb-1">{t("cookie_essential")}</p>
                      <p className="text-xs text-zinc-500">{t("cookie_essential_desc")}</p>
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={tempAnalytics}
                        onChange={(e) => setTempAnalytics(e.target.checked)}
                        className="mt-1.5 accent-emerald-500 cursor-pointer" 
                      />
                      <div>
                        <p className="font-semibold text-xs text-zinc-300">{t("cookie_analytics")}</p>
                        <p className="text-xs text-zinc-500">{t("cookie_analytics_desc")}</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={tempMarketing}
                        onChange={(e) => setTempMarketing(e.target.checked)}
                        className="mt-1.5 accent-emerald-500 cursor-pointer" 
                      />
                      <div>
                        <p className="font-semibold text-xs text-zinc-300">{t("cookie_marketing")}</p>
                        <p className="text-xs text-zinc-500">{t("cookie_marketing_desc")}</p>
                      </div>
                    </label>
                  </div>
                )}
                
                <div className="flex gap-2 text-xs text-zinc-500">
                  <span>•</span>
                  <a href="/privacy" className="hover:text-zinc-300 transition-colors underline">{t("cookie_privacy")}</a>
                </div>
              </div>

              {/* Buttons Section */}
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  onClick={handleRejectAll}
                  variant="outline"
                  className="h-10 border-zinc-700 text-xs hover:border-zinc-500"
                >
                  {t("cookie_reject_all")}
                </Button>
                <Button
                  onClick={() => setShowCookieDetails(!showCookieDetails)}
                  variant="outline"
                  className="h-10 border-zinc-700 text-xs hover:border-zinc-500"
                >
                  {showCookieDetails ? t("cookie_close") : t("cookie_customize")}
                </Button>
                {showCookieDetails ? (
                  <Button
                    onClick={handleSaveCustom}
                    className="h-10 bg-emerald-500 text-white hover:bg-emerald-600 text-xs font-semibold"
                  >
                    Salva
                  </Button>
                ) : (
                  <Button
                    onClick={handleAcceptAll}
                    className="h-10 bg-white text-black hover:bg-zinc-200 text-xs font-semibold"
                  >
                    {t("cookie_accept_all")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}