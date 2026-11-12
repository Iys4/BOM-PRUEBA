import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Eye } from 'lucide-react';
import { ALL_BOM_SPECIMENS, CnidariaSpecimen } from '../data/cnidariaDataset';

interface TreeNode {
  name: string;
  rankLabel: string;
  specimens: CnidariaSpecimen[];
  children: Map<string, TreeNode>;
}

interface TaxonomicTreeViewProps {
  onSelectSpecimen: (specimen: CnidariaSpecimen) => void;
}

export function TaxonomicTreeView({ onSelectSpecimen }: TaxonomicTreeViewProps) {
  // Start with everything collapsed
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(() => new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const toggleExpand = (nodeKey: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(nodeKey)) next.delete(nodeKey);
      else next.add(nodeKey);
      return next;
    });
  };

  // Build tree from ALL_BOM_SPECIMENS
  const rootNodes = useMemo(() => {
    const phylaMap = new Map<string, TreeNode>();

    const getOrCreate = (map: Map<string, TreeNode>, name: string, rankLabel: string): TreeNode => {
      if (!map.has(name)) {
        map.set(name, {
          name,
          rankLabel,
          specimens: [],
          children: new Map(),
        });
      }
      return map.get(name)!;
    };

    for (const spec of ALL_BOM_SPECIMENS) {
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = spec.name.toLowerCase().includes(query);
        const matchesCommon = spec.commonName.toLowerCase().includes(query);
        const matchesPhylum = spec.taxonomy.phylum.toLowerCase().includes(query);
        const matchesClass = spec.taxonomy.class.toLowerCase().includes(query);
        const matchesOrder = (spec.taxonomy.order || '').toLowerCase().includes(query);
        if (!matchesName && !matchesCommon && !matchesPhylum && !matchesClass && !matchesOrder) {
          continue;
        }
      }

      const phylumNode = getOrCreate(phylaMap, spec.taxonomy.phylum, 'Phylum');

      const className = spec.taxonomy.class || 'Otras clases';
      const classNode = getOrCreate(phylumNode.children, className, 'Clase');

      const orderName =
        spec.taxonomy.order ||
        (spec.taxonomy.subclass ? `Subclase ${spec.taxonomy.subclass}` : 'General');
      const orderNode = getOrCreate(classNode.children, orderName, 'Orden');

      orderNode.specimens.push(spec);
    }

    return phylaMap;
  }, [searchTerm]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-8">
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar taxón o especie..."
          className="w-full px-5 py-3.5 text-base sm:text-lg bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="space-y-4">
        {Array.from(rootNodes.entries()).map(([phylumName, phylumNode]) => {
          const phylumKey = `Phylum:${phylumName}`;
          const isPhylumOpen = expandedKeys.has(phylumKey) || Boolean(searchTerm.trim());

          return (
            <div key={phylumKey} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => toggleExpand(phylumKey)}
                className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isPhylumOpen ? (
                    <ChevronDown className="w-6 h-6 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-slate-400 shrink-0" />
                  )}
                  <span className="text-sm uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    Phylum
                  </span>
                  <span className="font-bold text-slate-900 text-xl sm:text-2xl">{phylumName}</span>
                </div>
              </button>

              {isPhylumOpen && (
                <div className="p-4 sm:p-5 pl-6 sm:pl-10 space-y-3.5 border-t border-slate-100 bg-slate-50/40">
                  {Array.from(phylumNode.children.entries()).map(([className, classNode]) => {
                    const classKey = `${phylumKey}>Class:${className}`;
                    const isClassOpen = expandedKeys.has(classKey) || Boolean(searchTerm.trim());

                    return (
                      <div key={classKey} className="border border-slate-200 rounded-xl bg-white overflow-hidden">
                        <button
                          onClick={() => toggleExpand(classKey)}
                          className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-slate-50 text-left transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {isClassOpen ? (
                              <ChevronDown className="w-5 h-5 text-emerald-600 shrink-0" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                            )}
                            <span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                              Clase
                            </span>
                            <span className="font-bold text-slate-800 text-lg sm:text-xl">{className}</span>
                          </div>
                        </button>

                        {isClassOpen && (
                          <div className="p-4 pl-6 sm:pl-9 space-y-3 border-t border-slate-100 bg-slate-50/30">
                            {Array.from(classNode.children.entries()).map(([orderName, orderNode]) => {
                              const orderKey = `${classKey}>Order:${orderName}`;
                              const isOrderOpen = expandedKeys.has(orderKey) || Boolean(searchTerm.trim());

                              return (
                                <div key={orderKey} className="border border-slate-200 rounded-xl bg-white overflow-hidden">
                                  <button
                                    onClick={() => toggleExpand(orderKey)}
                                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 text-left transition-colors"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      {isOrderOpen ? (
                                        <ChevronDown className="w-5 h-5 text-amber-600 shrink-0" />
                                      ) : (
                                        <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                                      )}
                                      <span className="text-xs uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                        Orden
                                      </span>
                                      <span className="font-semibold text-slate-800 text-base sm:text-lg">
                                        {orderName}
                                      </span>
                                    </div>
                                  </button>

                                  {isOrderOpen && (
                                    <div className="p-3.5 pl-6 sm:pl-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3">
                                      {orderNode.specimens.map((spec) => (
                                        <div
                                          key={spec.id}
                                          onClick={() => onSelectSpecimen(spec)}
                                          className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer transition-all group"
                                        >
                                          <div className="flex items-center gap-3.5 min-w-0">
                                            {spec.imageUrl ? (
                                              <img
                                                src={spec.imageUrl}
                                                alt={spec.name}
                                                className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0"
                                              />
                                            ) : (
                                              <div className="w-14 h-14 bg-slate-200 rounded-lg flex items-center justify-center shrink-0">
                                                <Eye className="w-6 h-6 text-slate-400" />
                                              </div>
                                            )}
                                            <div className="truncate">
                                              <div className="font-bold text-base sm:text-lg text-slate-900 italic group-hover:text-blue-600 truncate">
                                                {spec.name}
                                              </div>
                                              <div className="text-sm text-slate-500 truncate">
                                                {spec.commonName}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
