import React from 'react';
// Lucideからアイコンコンポーネントをインポート
import { Users, Settings, Trash2 } from 'lucide-react';

// 勤務形態データの型定義
interface EmployeeType {
  id: string; // 勤務形態の一意識別子
  name: string; // 勤務形態の表示名
  priority: string; // 優先度（低、中、高）
}

// モックデータ: 実際の環境ではAPIから取得する想定
const mockTypes: EmployeeType[] = [
  { id: 'Arbeit_1', name: 'アルバイト(高校生)', priority: '低' }, // 高校生アルバイト用の設定
  { id: 'Arbeit_2', name: 'アルバイト(大学生)', priority: '中' }, // 大学生アルバイト用の設定
  { id: 'Arbeit_3', name: 'アルバイト(その他)', priority: '高' }, // その他アルバイト用の設定
  { id: 'Part', name: 'パート', priority: '中' }, // パートタイム従業員用の設定
  { id: 'Staff', name: '社員', priority: '高' }, // 正社員用の設定
];

/**
 * 従業員の勤務形態を管理するコンポーネント
 * - 勤務形態の一覧表示
 * - 各勤務形態の設定変更
 * - 従業員リストの表示
 * - 勤務形態の削除
 */
const EmployeeTypeManager: React.FC = () => {
  return (
    // メインコンテナ：白背景と影付きのカード形式
    <div className="bg-white rounded-lg shadow">
      {/* ヘッダー部分：説明文を含むセクション */}
      <div className="p-4 border-b border-gray-200">
        <p className="text-sm text-gray-600">
          勤務形態の追加、削除が操作できます。
        </p>
      </div>

      {/* テーブルを含む部分：横スクロール可能 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* テーブルヘッダー：項目名を表示 */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                勤務形態
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                優先度
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                リスト
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                設定
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                削除
              </th>
            </tr>
          </thead>

          {/* テーブルボディ：勤務形態データの一覧 */}
          <tbody className="bg-white divide-y divide-gray-200">
            {/* 各勤務形態についてループ */}
            {mockTypes.map((type) => (
              // 行：ホバー時に背景色変更
              <tr key={type.id} className="hover:bg-gray-50">
                {/* ID列：システム内部での識別子 */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {type.id}
                </td>

                {/* 勤務形態名列：画面表示用の名称 */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {type.name}
                </td>

                {/* 優先度列：勤務形態の重要度 */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  優先度：{type.priority}
                </td>

                {/* リストボタン列：従業員一覧を表示 */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    title="この勤務形態の従業員一覧を表示"
                  >
                    <Users size={20} />
                  </button>
                </td>

                {/* 設定ボタン列：勤務形態の設定を編集 */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    title="勤務形態の設定を編集"
                  >
                    <Settings size={20} />
                  </button>
                </td>

                {/* 削除ボタン列：勤務形態を削除 */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-red-600 hover:text-red-800"
                    title="この勤務形態を削除"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTypeManager;
