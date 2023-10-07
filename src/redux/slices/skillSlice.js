import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

const initialState = {
  skills: [],
};

export const getSkills = createAction("skill/getSkills");
export const deleteSkill = createAction("skill/deleteSkill");
export const addSkill = createAction("skill/addSkill", ({ name, percent }) => {
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
  [addSkill]: (state, { payload }) => {
    state.skills.push(payload);
  },
  [deleteSkill]: (state, { payload }) => {
    console.log(payload);
    state.skills = state.skills.filter((el) => el.id !== payload);
  },
});

export default skillReducer;
