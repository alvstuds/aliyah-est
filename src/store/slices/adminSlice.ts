import { alert } from '@/lib/alert';
import { errorHandlerClient } from '@/lib/error-handler';
import axios from 'axios';
import { mutate } from 'swr';
import { StateCreator } from 'zustand';
import { IAdminState } from '../types';
import { createUploadFile } from '@/lib/utils';

const createAdminSlice: StateCreator<IAdminState> = (set) => ({
  getAdminList: async () => {
    try {
      const res = await axios.get('/api/admin');
      return res.data;
    } catch (error) {
      errorHandlerClient(error);
    }
  },
  addAdmin: async (data) => {
    try {
      const res = await axios.post('/api/admin', data);
      alert(res.data.message);
      mutate('adminList');
    } catch (error) {
      errorHandlerClient(error);
    }
  },
  editAdmin: async (body, router) => {
    try {
      let uploadedAvatar;
      if (body.avatar) {
        const fileData = createUploadFile({
          folder: 'images',
          file: body.avatar[0],
          publicId: `avatar_${body.id}`,
        });

        try {
          const url = process.env.NEXT_PUBLIC_C_URL + '/image/upload';
          const { data: res } = await axios.post(url!, fileData);

          uploadedAvatar = {
            avatarUrl: res.secure_url,
            avatarId: res.public_id,
          };
        } catch (error) {
          errorHandlerClient(error);
        }
      }

      const { avatar, ...data } = body;
      const res = await axios.put(`/api/admin?id=${body.id}`, {
        ...data,
        ...uploadedAvatar,
      });

      alert(res.data.message);
      router.refresh();
    } catch (error) {
      errorHandlerClient(error);
    }
  },
  deleteAdmin: async (id) => {
    try {
      set((state) => ({ ...state, loadingDelete: true }));
      const res = await axios.delete(`/api/admin?id=${id}`);
      alert(res.data.message);
      set((state) => ({ ...state, loadingDelete: false }));
      mutate('adminList');
    } catch (error) {
      errorHandlerClient(error);
    }
  },
  adminTableColumns: [
    { field: 'col1', headerName: 'ID', width: 300 },
    { field: 'col2', headerName: 'Name', width: 250 },
    { field: 'col3', headerName: 'Email', width: 250 },
    { field: 'col4', headerName: 'Phone Number', width: 250 },
  ],
});

export default createAdminSlice;
