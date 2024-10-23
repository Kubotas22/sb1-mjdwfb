import React, { useState } from 'react';
import {
  Users,
  Settings,
  ChevronDown,
  Search,
  Plus,
  Cog,
  Trash2,
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import EmployeeList from './components/EmployeeList';
import EmployeeTypeManager from './components/EmployeeTypeManager';

function App() {
  const [activeView, setActiveView] = useState<'employees' | 'types'>(
    'employees'
  );
  const [selectedType, setSelectedType] = useState<string>('all');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        setActiveView={setActiveView}
      />

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {activeView === 'employees' ? '従業員一覧' : '勤務形態'}
            </h1>
            <button
              onClick={() => {}}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus size={20} />
              {activeView === 'employees'
                ? '従業員を追加する'
                : '勤務形態を追加する'}
            </button>
          </header>

          {activeView === 'employees' ? (
            <EmployeeList selectedType={selectedType} />
          ) : (
            <EmployeeTypeManager />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
