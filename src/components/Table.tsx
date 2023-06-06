'use client';
import { createTheme, ThemeProvider } from '@mui/material';
import * as x from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid';
import { useTheme } from 'next-themes';
import { FC } from 'react';

interface TableProps {
  header: GridColDef[];
  data: any[];
}

const Table: FC<TableProps> = ({ header, data }) => {
  const { theme: applicationTheme } = useTheme();
  const darkTheme = createTheme({
    palette: { mode: applicationTheme === 'light' ? 'light' : 'dark' },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <x.DataGrid
        className="z-0 font-sans"
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        autoHeight
        style={{
          backgroundColor: applicationTheme === 'light' ? 'white' : '#152238',
          fontSize: '1rem',
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        columns={header.map((col) => {
          return {
            ...col,
            renderHeader: (params: x.GridColumnHeaderParams<any, any, any>) => {
              return (
                <strong className="font-semibold font-sans">
                  {params.colDef.headerName}
                </strong>
              );
            },
          };
        })}
        rows={data}
      />
    </ThemeProvider>
  );
};

export default Table;
