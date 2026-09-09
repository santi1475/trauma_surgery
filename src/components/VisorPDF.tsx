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
  paginaInicial?: number
}

interface Props {
  documento: DocumentoPDF
  altura?: string
}

export default function VisorPDF({ documento, altura = '680px' }: Props) {
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState(false)

  // Extraer URL limpia para descarga y añadir parámetros de vista nativos de PDF
  const cleanUrl = documento.url.split('#')[0]
  const targetPage = documento.paginaInicial ? `#page=${documento.paginaInicial}&toolbar=1&navpanes=0` : '#toolbar=1&navpanes=0'
  const iframeSrc = `${cleanUrl}${targetPage}`

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl border"
      style={{
        borderColor: 'rgba(0, 217, 255, 0.20)',
        background: 'linear-gradient(180deg, rgba(10,30,48,0.7), rgba(2,11,24,0.95))',
      }}
    >
      {/* ── Barra superior HUD ── */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3.5"
        style={{
          borderColor: 'rgba(0, 217, 255, 0.15)',
          background: 'rgba(2, 11, 24, 0.85)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
            style={{
              borderColor: 'rgba(0, 217, 255, 0.3)',
              background: 'rgba(0, 217, 255, 0.08)',
              color: '#00d9ff',
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
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00d9ff] transition hover:bg-[rgba(0,217,255,0.12)] focus:outline-none focus-visible:ring-2"
            style={{
              borderColor: 'rgba(0, 217, 255, 0.35)',
              background: 'rgba(0, 217, 255, 0.05)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span>Pantalla Completa</span>
            <ExternalLink size={13} aria-hidden="true" />
          </a>

          <a
            href={cleanUrl}
            download
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/80 transition hover:border-[#00d9ff] hover:text-white focus:outline-none focus-visible:ring-2"
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
            style={{ background: '#020b18' }}
          >
            <div
              className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
              style={{ borderColor: '#00d9ff', borderTopColor: 'transparent' }}
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
            <AlertCircle size={36} className="text-[#00d9ff] opacity-80" />
            <p className="mt-3 text-sm text-white/80">
              No fue posible incrustar la vista previa en este navegador.
            </p>
            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#020b18]"
              style={{ background: '#00d9ff' }}
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
          borderColor: 'rgba(0, 217, 255, 0.12)',
          background: 'rgba(2, 11, 24, 0.90)',
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
            className="text-[#00d9ff] underline underline-offset-4 hover:text-white"
          >
            Abrir en pestaña nueva ↗
          </a>
        </div>
      </div>
    </div>
  )
}
