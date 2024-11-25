import { useUser } from '@/hooks/useUser';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/react';
import Loader from '@/components/loader';

const columns = [
  {
    key: 'position',
    label: 'Puesto',
  },
  {
    key: 'name',
    label: 'Nombre',
  },
  {
    key: 'points',
    label: 'Puntos',
  },
  {
    key: 'organization',
    label: 'Organización',
  },
];

export default function RankedTable() {
  const { ranking } = useUser();

  if (ranking.isLoading) {
    return <Loader />;
  }

  return (
    <Table
      selectionMode="single"
      aria-label="Example table with dynamic content"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={ranking.data}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              if (columnKey === 'organization') {
                return (
                  <TableCell>
                    {getKeyValue(item.organization, 'name')}
                  </TableCell>
                );
              }
              return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
