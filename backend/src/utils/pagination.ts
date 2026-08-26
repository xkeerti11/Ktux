export { paginationSchema } from './pagination-base';

export function paginationMeta(page: number, limit: number, total: number) {
  return { total, page, limit, totalPages: Math.ceil(total / limit) };
}
