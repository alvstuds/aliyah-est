import { alert } from '@/lib/alert';
import { errorHandlerClient } from '@/lib/error-handler';
import axios from 'axios';
import { mutate } from 'swr';
import { StateCreator } from 'zustand';
import { ICrewState } from '../types';
import { createUploadFile, makeArray } from '@/lib/utils';

const createCrewSlice: StateCreator<ICrewState> = (set) => ({
  getCrewList: async (status) => {
    try {
      const res = await axios.get('/api/crew?status=' + status);
      return res.data;
    } catch (error) {
      errorHandlerClient(error);
    }
  },
  //form control crew
  addCrew: async (body, router) => {
    try {
      window.localStorage.removeItem('preview');
      window.localStorage.removeItem('tdData');
      window.localStorage.removeItem('sbData');
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key?.includes('file')) window.localStorage.removeItem(key);
      }

      const url = process.env.NEXT_PUBLIC_C_URL;

      // Crew Image Uploads
      const ImageData = createUploadFile({
        folder: 'images',
        file: body.crewImage[0],
        publicId: `crew_${new Date().valueOf()}`,
      });

      const { data: resImg } = await axios.post(
        url! + '/image/upload',
        ImageData
      );

      body.imageUrl = resImg.secure_url;
      body.imageId = resImg.public_id;

      delete body.crewImage;

      const bio_ps = Object.fromEntries(
        Object.entries(body).filter(
          ([key]) => !key.includes('td_') && !key.includes('sb_')
        )
      );

      // Travel Document Uploads
      let td_array = [];

      const tempTd: any[] = makeArray(body, 'td_');
      for (let i = 0; i < tempTd.length; i++) {
        const td_file = createUploadFile({
          folder: 'files',
          file: tempTd[i].file[0],
          publicId: `td_${new Date().valueOf()}`,
        });

        const { data } = await axios.post(url! + '/raw/upload', td_file);

        tempTd[i].fileUrl = data.secure_url;
        tempTd[i].fileId = data.public_id;

        delete tempTd[i].file;
        td_array.push(tempTd[i]);
      }

      // Seaman Book Uploads
      let sb_array = [];
      const tempSb = makeArray(body, 'sb_');
      for (let i = 0; i < tempSb.length; i++) {
        const sb_file = createUploadFile({
          folder: 'files',
          file: tempSb[i].file[0],
          publicId: `sb_${new Date().valueOf()}`,
        });

        const { data } = await axios.post(url! + '/raw/upload', sb_file);

        tempSb[i].fileUrl = data.secure_url;
        tempSb[i].fileId = data.public_id;

        delete tempSb[i].file;
        sb_array.push(tempSb[i]);
      }

      const res = await axios.post(
        '/api/crew',
        { bio_ps, td_array, sb_array },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      alert(res.data.message);
      router.replace('/crew');
      mutate('crewList');
    } catch (error) {
      errorHandlerClient(error);
    }
  },
  editCrew: async (body, router) => {
    try {
      let uploadedImage;
      if (body.crewImage) {
        const fileData = createUploadFile({
          folder: 'images',
          file: body.crewImage[0],
          publicId: body.imageId?.split('/')[1]!,
        });

        try {
          const url = process.env.NEXT_PUBLIC_C_URL + '/image/upload';
          const { data: res } = await axios.post(url!, fileData);

          uploadedImage = { imageUrl: res.secure_url, imageId: res.public_id };
        } catch (error) {
          errorHandlerClient(error);
        }
      }

      const { crewImage, ...data } = body;
      const res = await axios.put('/api/crew', { ...data, ...uploadedImage });
      alert(res.data.message);
      router.refresh();
    } catch (error) {
      errorHandlerClient(error);
    }
  },
  deleteCrew: async (id) => {
    try {
      set((state) => ({ ...state, loadingDelete: true }));
      const res = await axios.delete(`/api/crew?id=${id}`);
      alert(res.data.message);
      set((state) => ({ ...state, loadingDelete: false }));
      mutate('crewList');
    } catch (error) {
      errorHandlerClient(error);
    }
  },
  // form control documents
  addDoc: async (data, type, router) => {
    try {
      const res = await axios.post(`/api/crew/document?type=${type}`, data);
      alert(res.data.message);
      router.refresh();
    } catch (error) {
      errorHandlerClient(error);
    }
  },
  editDoc: async (body, type, router) => {
    try {
      const url = process.env.NEXT_PUBLIC_C_URL;

      if (body.file) {
        const file = createUploadFile({
          folder: 'files',
          file: body.file[0],
          publicId: body.fileId?.split('/')[1]!,
        });

        const { data } = await axios.post(url! + '/raw/upload', file);

        body.fileUrl = data.secure_url;
        body.fileId = data.public_id;
        delete body.file;
      }

      const res = await axios.put(`/api/crew/document?type=${type}`, body);
      alert(res.data.message);
      router.refresh();
    } catch (error) {
      errorHandlerClient(error);
    }
  },
  deleteDoc: async (id, type, router) => {
    try {
      set((state) => ({ ...state, loadingDelete: true }));
      const res = await axios.delete(
        `/api/crew/document?type=${type}&id=${id}`
      );
      alert(res.data.message);
      set((state) => ({ ...state, loadingDelete: false }));
      router.refresh();
    } catch (error) {
      errorHandlerClient(error);
    }
  },

  crewTableColumns: [
    { field: 'col1', headerName: 'ID Number', width: 200 },
    { field: 'col2', headerName: 'Name', width: 200 },
    { field: 'col3', headerName: 'Phone Number', width: 200 },
    { field: 'col4', headerName: 'Rank', width: 200 },
  ],
});

export default createCrewSlice;
