import React, { useState } from 'react';
import { X, ArrowLeft, BookOpen } from 'lucide-react';
import { CnidariaSpecimen } from '../data/cnidariaDataset';
import { TaxonomicTreeView } from './TaxonomicTreeView';

interface EncyclopediaViewProps {
  onBackToHome: () => void;
}

export function EncyclopediaView({ onBackToHome }: EncyclopediaViewProps) {
  const [selectedSpecimen, setSelectedSpecimen] = useState<CnidariaSpecimen | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-2.5 -ml-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-2 text-base font-bold"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">Árbol Taxonómico</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <TaxonomicTreeView onSelectSpecimen={(spec) => setSelectedSpecimen(spec)} />
      </main>

      {/* Specimen Detail Modal (Larger space and larger texts) */}
      {selectedSpecimen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedSpecimen(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-200 bg-white sticky top-0 z-10">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 italic">
                  {selectedSpecimen.name}
                </h3>
                <p className="text-base sm:text-lg text-slate-500 mt-0.5">
                  {selectedSpecimen.commonName}
                </p>
              </div>
              <button
                onClick={() => setSelectedSpecimen(null)}
                className="p-2.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                title="Cerrar"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
              {/* Specimen Image */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center max-h-[420px]">
                <img
                  src={selectedSpecimen.imageUrl}
                  alt={selectedSpecimen.name}
                  className="w-full h-full object-contain max-h-[420px]"
                />
              </div>

              {/* Taxonomic Hierarchy Grid */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Definición Taxonómica
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {selectedSpecimen.ranks.map((r) => (
                    <div
                      key={r.key}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <span className="text-xs text-slate-400 uppercase font-bold block mb-1">
                        {r.label}
                      </span>
                      <span
                        className={`font-bold text-slate-900 text-lg sm:text-xl ${
                          r.key === 'genus' || r.key === 'species' ? 'italic' : ''
                        }`}
                      >
                        {r.canonicalValue}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
