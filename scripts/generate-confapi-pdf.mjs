// scripts/generate-confapi-pdf.mjs
import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"

const URL = process.env.PDF_URL || "http://localhost:3000/print/confapi"
const OUT_DIR = "public/downloads"
const OUT = `${OUT_DIR}/agrimensore-confapi.pdf`

await mkdir(OUT_DIR, { recursive: true })

const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  await page.goto(URL, { waitUntil: "networkidle" })
  await page.emulateMedia({ media: "print" })
  await page.pdf({
    path: OUT,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  })
  console.log(`✓ PDF generato: ${OUT}`)
} finally {
  await browser.close()
}
