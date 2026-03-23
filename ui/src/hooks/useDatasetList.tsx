'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/utils/api';

export default function useDatasetList() {
  const [datasets, setDatasets] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const refreshDatasets = () => {
    setStatus('loading');
    apiClient
      .get('/api/datasets/list')
      .then(res => res.data)
      .then(data => {
        console.log('数据集列表:', data);
        // 排序
        data.sort((a: string, b: string) => a.localeCompare(b));
        setDatasets(data);
        setStatus('success');
      })
      .catch(error => {
        console.error('获取数据集列表失败:', error);
        setStatus('error');
      });
  };
  useEffect(() => {
    refreshDatasets();
  }, []);

  return { datasets, setDatasets, status, refreshDatasets };
}