import request from '@/services/request';
import { RequestOptions } from '@/@types/options';

export const getOptions: RequestOptions = () => request.get('option');
