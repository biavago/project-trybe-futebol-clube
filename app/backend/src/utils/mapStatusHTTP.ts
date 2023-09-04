export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'CONFLICT': return 409;
    case 'INVALID_DATA': return 400;
    case 'NOT_FOUND': return 404;
    case 'SUCCESSFUL': return 200;
    default: return 500;
  }
}
