import { initialState, orderFeedReducer as reducer } from "../../services/reducers/orderFeed";
import * as types from "../actions/orderFeed";

const testDataOrderFeed = {
  success: true,
  orders: [
    {
      _id: "65527476c2cc61001b3d79e4",
      ingredients: ["643d69a5c3f7b9001cfa0943", "643d69a5c3f7b9001cfa093d"],
      status: "done",
    },
  ],
  total: 25645,
  totalToday: 66,
};

describe("orderFeed reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should set status 'CONNECTING' when wsConnecting", () => {
    const action = { type: types.wsConnecting };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: "CONNECTING" });
  });

  it("should set status 'ONLINE' when wsOpen", () => {
    const action = { type: types.wsOpen };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: "ONLINE" });
  });

  it("should set status 'ERROR' and connectionError when wsError", () => {
    const action = { type: types.wsError, payload: "Test Error" };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: "ERROR",
      connectionError: "Test Error",
    });
  });

  it("should set orders info when wsMessage", () => {
    const action = { type: types.wsMessage, payload: testDataOrderFeed };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: [
        {
          _id: "65527476c2cc61001b3d79e4",
          ingredients: ["643d69a5c3f7b9001cfa0943", "643d69a5c3f7b9001cfa093d"],
          status: "done",
        },
      ],
      orderTotal: 25645,
      orderTotalToday: 66,
    });
  });

  it("should set status 'OFFLINE' and order info when wsClose", () => {
    const action = { type: types.wsClose };
    const state = reducer(
      {
        ...initialState,
        orders: [
          {
            _id: "65527476c2cc61001b3d79e4",
            ingredients: ["643d69a5c3f7b9001cfa0943", "643d69a5c3f7b9001cfa093d"],
            status: "done",
          },
        ],
        orderTotal: 25645,
        orderTotalToday: 66,
      } as any,
      action
    );
    expect(state).toEqual({
      status: "OFFLINE",
      connectionError: "",
      orders: [],
      orderTotal: 0,
      orderTotalToday: 0,
    });
  });
});
