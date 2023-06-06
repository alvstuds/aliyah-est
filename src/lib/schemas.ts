import { z } from "zod";

const REQUIRED_ERROR = "this field is required";
const INVALID_ERROR = "invalid input";

const errorHandler = {
  invalid_type_error: INVALID_ERROR,
  required_error: REQUIRED_ERROR,
};

export const loginSchema = z.object({
  email: z.string(errorHandler).email(),
  password: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
});

export const shipSchema = z.object({
  imoNumber: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  name: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  type: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  flag: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  grt: z.coerce.number(errorHandler).min(1, { message: REQUIRED_ERROR }),
  dwt: z.coerce.number(errorHandler).min(1, { message: REQUIRED_ERROR }),
  hp: z.coerce.number(errorHandler).min(1, { message: REQUIRED_ERROR }),
  callSign: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  yearBuilt: z.coerce.number(errorHandler).min(1, { message: REQUIRED_ERROR }),
});

export const userSchema = z.object({
  name: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  email: z.string(errorHandler).email(),
  phoneNumber: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  password: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
});

export const profileSchema = z.object({
  id: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  name: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  email: z.string(errorHandler).email(),
  phoneNumber: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  avatar: z.any().nullish(),
  avatarUrl: z.string().nullish(),
  avatarId: z.string().nullish(),
});

export const crewSchema = z.object({
  idNumber: z.string(errorHandler).nonempty(REQUIRED_ERROR),
  givenName: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  surName: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  pob: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  dob: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  // crewImage: z.any().refine((file) => file, REQUIRED_ERROR),
  phoneNumber: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  imageUrl: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  imageId: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  homeAddress: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  maritalStatus: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  religion: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  height: z.coerce.number(errorHandler).min(1, { message: REQUIRED_ERROR }),
  weight: z.coerce.number(errorHandler).min(1, { message: REQUIRED_ERROR }),
  coverall: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  shoeSize: z.coerce.number(errorHandler).min(1, { message: REQUIRED_ERROR }),
  nextOfKin: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  relation: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  emergencyNumber: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  mothersName: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  fathersName: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),

  mainRank: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  prevVesselType: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  englishSkills: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),

  // td_0_type: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  // td_0_issued: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  // td_0_expired: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  // td_0_placeOfIssued: z
  //   .string(errorHandler)
  //   .min(1, { message: REQUIRED_ERROR }),
  // td_0_name: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  // td_0_surName: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  // td_0_fileId: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  // td_0_fileUrl: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),

  // sb_0_type: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  // sb_0_issued: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  // sb_0_expired: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  // sb_0_placeOfIssued: z
  //   .string(errorHandler)
  //   .min(1, { message: REQUIRED_ERROR }),
  // sb_0_name: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  // sb_0_surName: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  // sb_0_fileId: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  // sb_0_fileUrl: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
});

export const editBiodataSchema = z.object({
  idNumber: z.string(errorHandler).nonempty(REQUIRED_ERROR),
  givenName: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  surName: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  pob: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  dob: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  crewImage: z.any().refine((file) => file, REQUIRED_ERROR),
  phoneNumber: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  homeAddress: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  maritalStatus: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  religion: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  height: z.coerce.number(errorHandler).min(1, { message: REQUIRED_ERROR }),
  weight: z.coerce.number(errorHandler).min(1, { message: REQUIRED_ERROR }),
  coverall: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  shoeSize: z.coerce.number(errorHandler).min(1, { message: REQUIRED_ERROR }),
  nextOfKin: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  relation: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  emergencyNumber: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  mothersName: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  fathersName: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
});

export const editPositionSubSchema = z.object({
  mainRank: z.coerce.number(errorHandler).min(1, { message: REQUIRED_ERROR }),
  prevVesselType: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  englishSkills: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
});

export const documentSchema = z.object({
  type: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  issued: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  expired: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  placeOfIssued: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  name: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  surName: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  fileId: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
  fileUrl: z.string(errorHandler).min(1, { message: REQUIRED_ERROR }),
});
