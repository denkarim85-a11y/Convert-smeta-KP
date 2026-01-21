
import React, { useState } from 'react';
import { ProposalData, Category } from './types';
import { FileUploader } from './components/FileUploader.tsx';
import { ProposalEditor } from './components/ProposalEditor.tsx';
import { ProposalPreview } from './components/ProposalPreview.tsx';
import { parseEstimate, EstimatePart } from './services/geminiService';
import { Flame } from 'lucide-react';

enum AppView {
  UPLOAD = 'UPLOAD',
  EDIT = 'EDIT',
  PREVIEW = 'PREVIEW'
}

const INITIAL_DATA: ProposalData = {
  clientName: '',
  address: '',
  date: new Date().toLocaleDateString('ru-RU'),
  contractNumber: '',
  contractorName: 'Михайлов Алексей',
  items: [],
  notes: '',
  paymentTerms: '',
  additionalConditions: '',
  coverPhoto: null,
  fireplacePhoto: null,
  fireplaceDrawing: null,
  chimneyPhoto: null,
  chimneyDrawing: null,
  materialsPhotos: [],
  laborPhotos: [],
  logisticsPhotos: []
};

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.UPLOAD);
  const [data, setData] = useState<ProposalData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);

  const handleProcess = async (smetaParts: EstimatePart[], photos: any, metadata: any) => {
    setIsLoading(true);
    try {
      const parsed = await parseEstimate(smetaParts);
      
      const formattedData: ProposalData = {
        clientName: metadata.clientName || parsed.clientName || '',
        address: metadata.address || parsed.address || '',
        paymentTerms: metadata.paymentTerms || '',
        notes: metadata.notes || '',
        additionalConditions: metadata.additionalConditions || '',
        
        date: parsed.date || new Date().toLocaleDateString('ru-RU'),
        contractNumber: parsed.contractNumber || `${Math.floor(Math.random()*90000) + 10000}`,
        contractorName: 'Михайлов Алексей',
        items: (parsed.items || []).map((item: any) => ({
          ...item,
          id: Math.random().toString(36).substr(2, 9),
          category: Object.values(Category).includes(item.category) 
            ? item.category as Category 
            : Category.MATERIALS
        })),
        ...photos
      };

      setData(formattedData);
      setView(AppView.EDIT);
    } catch (error) {
      console.error(error);
      alert('Ошибка при разборе сметы. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-inter">
      {view !== AppView.PREVIEW && (
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3 px-10 mb-8 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gray-900 p-1.5 rounded-lg">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-900 leading-none tracking-tight uppercase">Fireplace Pro</h1>
                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-0.5">Automated Engine</p>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className="px-6">
        {view === AppView.UPLOAD && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <FileUploader 
              onProcess={handleProcess} 
              isLoading={isLoading} 
            />
          </div>
        )}

        {view === AppView.EDIT && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <ProposalEditor 
              data={data} 
              setData={setData} 
              onSave={() => setView(AppView.PREVIEW)} 
            />
          </div>
        )}

        {view === AppView.PREVIEW && (
          <div className="animate-in fade-in duration-700">
            <ProposalPreview 
              data={data} 
              onBack={() => setView(AppView.EDIT)} 
            />
          </div>
        )}
      </main>

      {view === AppView.UPLOAD && (
        <div className="fixed -z-10 bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-100/50 to-transparent pointer-events-none"></div>
      )}
    </div>
  );
};

export default App;
