import React from 'react';
import {
  Users,
  ChevronDown,
  BarChart2,
  Building2,
  MessageSquare,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
  setActiveView: (view: 'employees' | 'types') => void;
}

const employeeTypes = [
  { id: 'all', label: 'すべて' },
  { id: 'highschool', label: 'アルバイト(高校生)' },
  { id: 'university', label: 'アルバイト(大学生)' },
  { id: 'other', label: 'アルバイト(その他)' },
  { id: 'part', label: 'パート' },
  { id: 'full', label: '社員' },
];

const Sidebar: React.FC<SidebarProps> = ({
  selectedType,
  setSelectedType,
  setActiveView,
}) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <img src="/logo.svg" alt="DolphinShift" className="h-8 w-8" />
        <span className="font-bold text-xl text-blue-600">DolphinShift</span>
      </div>

      <nav className="p-4">
        <div className="space-y-1">
          <button
            onClick={() => setActiveView('employees')}
            className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
          >
            <Users size={20} className="text-gray-500" />
            <span>従業員一覧</span>
          </button>

          <div className="pt-2">
            <p className="px-2 text-sm font-medium text-gray-500">勤務形態別</p>
            {employeeTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`w-full flex items-center gap-2 p-2 rounded-lg text-left ${
                  selectedType === type.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="ml-4 text-sm">{type.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveView('types')}
            className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 mt-4"
          >
            <Settings size={20} className="text-gray-500" />
            <span>勤務形態管理</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
