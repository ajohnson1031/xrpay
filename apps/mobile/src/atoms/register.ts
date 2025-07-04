import { atom } from 'jotai';

interface UserData {
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  avatarUri?: string;
}

export const registerAtom = atom<UserData>({
  name: '',
  username: '',
  email: '',
  phoneNumber: '',
  password: '',
  avatarUri: undefined,
});

export const usernameAvailabilityAtom = atom<{
  checking: boolean;
  available: boolean | null;
}>({ checking: false, available: null });
