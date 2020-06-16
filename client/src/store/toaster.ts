export type ToasterState = {
  show: boolean;
  text?: string;
};

export const initialState: ToasterState = { show: false };

export enum ToasterActionTypes {
  Show = 'TOASTER/SHOW',
  Hide = 'TOASTER/HIDE',
}

export const toasterActions = {
  [ToasterActionTypes.Show]: (state, { text }) => ({ ...state, toaster: { show: true, text } }),
  [ToasterActionTypes.Hide]: (state) => ({ ...state, toaster: { show: false } }),
};
