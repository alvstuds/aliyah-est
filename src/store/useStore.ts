import { create } from 'zustand'
import createAdminSlice from './slices/adminSlice'
import createAuthSlice from './slices/authSlice'
import createCrewSlice from './slices/crewSlice'
import createShipSlice from './slices/shipSlice'
import { IAdminState, IAuth, ICrewState, IShipState } from './types'

interface IState extends IAuth, IShipState, IAdminState, ICrewState {
  loadingDelete: boolean
}

const useStore = create<IState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createShipSlice(...a),
  ...createAdminSlice(...a),
  ...createCrewSlice(...a),
  loadingDelete: false,
}))

export default useStore
