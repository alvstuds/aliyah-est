import { GridColDef, GridRowId } from '@mui/x-data-grid';
import { Crew, SeamanBook, Ship, TravelDocument, User } from '@prisma/client';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IAuth {
  login: (data: Partial<IUser>) => void;
  logout: (setIsLoading: (isLoading: boolean) => void) => void;
}

export interface IAdminState {
  adminTableColumns: GridColDef[];
  editAdmin: (data: Partial<User & { avatar: any }>, router: any) => void;

  getAdminList: () => any;
  addAdmin: (data: Partial<User>) => void;
  deleteAdmin: (id: GridRowId) => void;
}

export interface IShip {
  createdAt: string;
  updatedAt: string;
  id: string;
  imoNumber: string;
  name: string;
  type: string;
  flag: string;
  grt: number;
  dwt: number;
  hp: number;
  callSign: string;
  yearBuilt: number;
  createdBy: string;
}

export interface IShipState {
  shipTableColumns: GridColDef[];
  getShipList: () => any;
  addShip: (data: Partial<Ship>, router: any) => void;
  editShip: (data: Partial<Ship>, router: any) => void;
  deleteShip: (id: GridRowId) => void;
}

export interface ICrewState {
  crewTableColumns: GridColDef[];
  getCrewList: (status: string | null) => any;

  addCrew: (data: Partial<Crew & { crewImage: any }>, router: any) => void;
  editCrew: (data: Partial<Crew & { crewImage: any }>, router: any) => void;
  deleteCrew: (id: GridRowId) => void;

  addDoc: (
    data: Partial<SeamanBook | TravelDocument>,
    type: string,
    router: any
  ) => void;
  editDoc: (
    data: Partial<
      (SeamanBook & { file: any }) | (TravelDocument & { file: any })
    >,
    type: string,
    router: any
  ) => void;
  deleteDoc: (id: string, type: string, router: any) => void;
}
