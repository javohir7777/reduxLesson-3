import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

const initialState = {
  skills: [],
};

export const getSkills = createAction("skill/getSkills");
export const addSkills = createAction("skill/addSkill", ({ name, percent }) => {
  return {
    payload: {
      name,
      percent,
      id: nanoid(),
    },
  };
});

const skillReducer = createReducer(initialState, {
  //   [getSkills]: (state) => {},
  [addSkills]: (state, { payload }) => {
    state.skills.push(payload);
  },
});

export default skillReducer;
