import axios from 'axios';

const API_URL = '/api';

export interface UploadResponse {
  success: boolean;
  output_id: string;
  content_md: string;
  color_theme_md: string;
  dominant_colors: {
    hex: string;
    count: number;
  }[];
  error?: string;
}

export async function uploadPpt(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await axios.post<UploadResponse>(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as UploadResponse;
    }
    
    return {
      success: false,
      output_id: '',
      content_md: '',
      color_theme_md: '',
      dominant_colors: [],
      error: '上傳失敗，請稍後再試',
    };
  }
}

export function getDownloadUrl(outputId: string): string {
  return `${API_URL}/download/${outputId}`;
}

export async function cleanupFiles(outputId: string): Promise<void> {
  try {
    await axios.post(`${API_URL}/cleanup/${outputId}`);
  } catch (error) {
    console.error('清理文件失敗', error);
  }
} 