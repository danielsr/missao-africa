export type ToasterState = {
  show: boolean;
  text?: string;
};

export const toasterInitialState: ToasterState = { show: false };

export enum ToasterActionTypes {
  Show = 'TOASTER/SHOW',
  Hide = 'TOASTER/HIDE',
}

export const toasterReducer = (state, action) => {
  switch (action.type) {
    case ToasterActionTypes.Show:
      return { ...state, show: true, text: action.text };
    case ToasterActionTypes.Hide:
      return { ...state, show: false, text: null };
    default:
      return state;
  }
};
