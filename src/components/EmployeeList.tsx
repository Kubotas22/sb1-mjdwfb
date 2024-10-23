import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  age: number;
  type: 'highschool' | 'university' | 'other';
  department: string;
  wage: number;
  lineId: string;
}

interface EmployeeListProps {
  selectedType: string;
}

const employeeTypeMap = {
  highschool: 'アルバイト(高校生)',
  university: 'アルバイト(大学生)',
  other: 'アルバイト(その他)',
};

const initialNewEmployee: Employee = {
  id: '',
  name: '',
  age: 18,
  type: 'other',
  department: '',
  wage: 1000,
  lineId: '',
};

const mockEmployees: Employee[] = [
  {
    id: '1234',
    name: '田中 真弓',
    age: 23,
    type: 'highschool',
    department: 'フロント',
    wage: 1200,
    lineId: '@jenny',
  },
  {
    id: '1235',
    name: '山田 太郎',
    age: 28,
    type: 'university',
    department: 'キッチン',
    wage: 1200,
    lineId: '@taro',
  },
  {
    id: '1236',
    name: '大澤 隼人',
    age: 25,
    type: 'other',
    department: 'キッチン',
    wage: 1200,
    lineId: '@hayato',
  },
];

const EmployeeList: React.FC<EmployeeListProps> = ({ selectedType }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState(mockEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter(
    (employee) =>
      (selectedType === 'all' || employee.type === selectedType) &&
      (searchQuery === '' ||
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEditClick = (employee: Employee) => {
    setModalMode('edit');
    setEditingEmployee({ ...employee });
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setModalMode('add');
    setEditingEmployee({ ...initialNewEmployee });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!editingEmployee) return;

    if (modalMode === 'add') {
      const newId = Math.random().toString(36).substr(2, 9);
      setEmployees((prevEmployees) => [
        ...prevEmployees,
        { ...editingEmployee, id: newId },
      ]);
    } else {
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === editingEmployee.id ? editingEmployee : emp
        )
      );
    }
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* 検索バーと追加ボタンのコンテナ */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="relative flex-1 mr-4">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="名前、勤務形態、担当部署を検索"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          従業員を追加
        </button>
      </div>

      {/* 従業員一覧テーブル */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                名前
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                年齢
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                時給
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                勤務形態
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                担当部署
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                LINE ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ¥{employee.wage}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employeeTypeMap[employee.type]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.lineId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleEditClick(employee)}
                  >
                    編集
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 追加/編集モーダル */}
      {isModalOpen && editingEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {modalMode === 'add' ? '従業員の追加' : '従業員情報の編集'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  名前
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-3 py-2"
                  value={editingEmployee.name}
                  onChange={(e) =>
                    setEditingEmployee({
                      ...editingEmployee,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  年齢
                </label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md px-3 py-2"
                  value={editingEmployee.age}
                  onChange={(e) =>
                    setEditingEmployee({
                      ...editingEmployee,
                      age: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  勤務形態
                </label>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2"
                  value={editingEmployee.type}
                  onChange={(e) =>
                    setEditingEmployee({
                      ...editingEmployee,
                      type: e.target.value as Employee['type'],
                    })
                  }
                >
                  <option value="highschool">アルバイト(高校生)</option>
                  <option value="university">アルバイト(大学生)</option>
                  <option value="other">アルバイト(その他)</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  時給
                </label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-md px-3 py-2"
                  value={editingEmployee.wage}
                  onChange={(e) =>
                    setEditingEmployee({
                      ...editingEmployee,
                      wage: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  担当部署
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-3 py-2"
                  value={editingEmployee.department}
                  onChange={(e) =>
                    setEditingEmployee({
                      ...editingEmployee,
                      department: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  LINE ID
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-3 py-2"
                  value={editingEmployee.lineId}
                  onChange={(e) =>
                    setEditingEmployee({
                      ...editingEmployee,
                      lineId: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {modalMode === 'add' ? '追加' : '保存'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
