export function csvEscape(value: unknown): string {
  const stringValue = value == null ? '' : String(value);
  return `"${stringValue.replaceAll('"', '""')}"`;
}

export function toCsv(rows: Array<Record<string, unknown>>, columns: string[]): string {
  return [
    columns.map(csvEscape).join(','),
    ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(','))
  ].join('\n');
}
