'use client'
// Visor integrado de documentos PDF con estética quirúrgica HUD.
// ponytail: utiliza el renderizador nativo del navegador (Chromium PDFium / Safari PDFKit / Firefox).
// 0 KB de dependencias JS adicionales (evita los 3MB de pdfjs). Si en el futuro se requiere
// anotación interactiva o firma digital sobre el canvas, la ruta de mejora es integrar pdfjs-dist.

import { useState } from 'react'
import { FileText, ExternalLink, Download, AlertCircle } from 'lucide-react'

export interface DocumentoPDF {
  url: string
  titulo?: string
  peso?: string
  paginas?: number
}

interface Props {
  documento: DocumentoPDF
  altura?: string
}

export default function VisorPDF({ documento, altura = '680px' }: Props) {
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState(false)

  // URL limpia para la descarga; al iframe se le pasan los parámetros de
  // vista que entiende el visor nativo del navegador.
  const cleanUrl = documento.url.split('#')[0]
  const iframeSrc = `${cleanUrl}#toolbar=1&navpanes=0`

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl border"
      style={{
        borderColor: 'rgb(var(--ts-accent-rgb)/0.20)',
        background: 'linear-gradient(180deg, rgba(10,30,48,0.7), rgb(var(--ts-bg-deep-rgb)/0.95))',
      }}
    >
      {/* ── Barra superior HUD ── */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3.5"
        style={{
          borderColor: 'rgb(var(--ts-accent-rgb)/0.15)',
          background: 'rgb(var(--ts-bg-deep-rgb)/0.85)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
            style={{
              borderColor: 'rgb(var(--ts-accent-rgb)/0.3)',
              background: 'rgb(var(--ts-accent-rgb)/0.08)',
              color: 'var(--ts-accent)',
            }}
          >
            <FileText size={16} aria-hidden="true" />
          </div>
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-wider text-white sm:text-sm"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {documento.titulo ?? 'Ficha Técnica Oficial'}
            </h4>
            <div className="mt-0.5 flex items-center gap-2 text-[11px] text-white/50" style={{ fontFamily: 'var(--font-mono)' }}>
              <span>FORMATO PDF</span>
              {documento.peso && (
                <>
                  <span>•</span>
                  <span>{documento.peso}</span>
                </>
              )}
              {documento.paginas && (
                <>
                  <span>•</span>
                  <span>{documento.paginas} PÁGINAS</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Acciones directas */}
        <div className="flex items-center gap-2">
          <a
            href={documento.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ts-accent transition hover:bg-[rgb(var(--ts-accent-rgb)/0.12)] focus:outline-none focus-visible:ring-2"
            style={{
              borderColor: 'rgb(var(--ts-accent-rgb)/0.35)',
              background: 'rgb(var(--ts-accent-rgb)/0.05)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span>Pantalla Completa</span>
            <ExternalLink size={13} aria-hidden="true" />
          </a>

          <a
            href={cleanUrl}
            download
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/80 transition hover:border-ts-accent hover:text-white focus:outline-none focus-visible:ring-2"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.04)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span>Descargar</span>
            <Download size={13} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* ── Contenedor del documento nativo ── */}
      <div className="relative w-full" style={{ height: altura }}>
        {cargando && !errorCarga && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: 'var(--ts-bg-deep)' }}
          >
            <div
              className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
              style={{ borderColor: 'var(--ts-accent)', borderTopColor: 'transparent' }}
            />
            <p
              className="text-xs uppercase tracking-widest text-white/50"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Cargando documento quirúrgico...
            </p>
          </div>
        )}

        {errorCarga ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <AlertCircle size={36} className="text-ts-accent opacity-80" />
            <p className="mt-3 text-sm text-white/80">
              No fue posible incrustar la vista previa en este navegador.
            </p>
            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ts-bg-deep"
              style={{ background: 'var(--ts-accent)' }}
            >
              Abrir PDF directamente <ExternalLink size={14} />
            </a>
          </div>
        ) : (
          <iframe
            src={iframeSrc}
            title={documento.titulo ?? 'Visor de PDF'}
            className="h-full w-full border-0"
            onLoad={() => setCargando(false)}
            onError={() => {
              setCargando(false)
              setErrorCarga(true)
            }}
          />
        )}
      </div>

      {/* ── Pie de accesibilidad y aviso móvil ── */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t px-5 py-2.5 text-[11px] text-white/50"
        style={{
          borderColor: 'rgb(var(--ts-accent-rgb)/0.12)',
          background: 'rgb(var(--ts-bg-deep-rgb)/0.90)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <span>VISUALIZADOR TÉCNICO OFICIAL • ISO 13485</span>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline">¿Inconvenientes con el visor en móvil?</span>
          <a
            href={documento.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-ts-accent underline underline-offset-4 hover:text-white"
          >
            <span>Abrir en pestaña nueva</span>
            <ExternalLink size={12} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}
