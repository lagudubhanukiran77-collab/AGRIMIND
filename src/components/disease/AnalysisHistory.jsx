import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Clock, Eye, Calendar, Sprout, ArrowRight } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import { useTranslation } from '../../i18n/LanguageContext';

export const AnalysisHistory = ({ onSelectHistoryItem }) => {
  const { diseaseHistory } = useFarm();
  const { t } = useTranslation();

  return (
    <Card
      title={t('disease.historyTitle')}
      subtitle="Auditable Telemetry Log of Farm Scans"
      headerAction={
        <span className="text-xs text-mutedgrey">
          {diseaseHistory.length} Scans Stored
        </span>
      }
    >
      <div className="divide-y divide-slate-100">
        {diseaseHistory.map((item) => (
          <div
            key={item.id}
            className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 p-2 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.crop}
                className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-charcoal text-xs">{item.disease}</span>
                  <Badge
                    variant={item.severity === 'None' ? 'success' : item.severity === 'Severe' ? 'danger' : 'warning'}
                    size="sm"
                  >
                    {item.severity} Severity
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-mutedgrey mt-1">
                  <span className="font-medium text-forest-900">{item.crop}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.date}
                  </span>
                  <span>·</span>
                  <span className="font-mono text-slate-600">Conf: {item.confidence}</span>
                </div>
              </div>
            </div>

            <div className="self-end sm:self-center">
              <button
                onClick={() => onSelectHistoryItem(item)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-white hover:border-forest-700 hover:text-forest-900 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
