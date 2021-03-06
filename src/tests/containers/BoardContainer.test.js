import React from "react";
import { shallow } from "enzyme";

import BoardContainer from "./../../containers/BoardContainer";
import Board from "./../../components/Board";

describe("BoardContainer", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BoardContainer />);
  });

  it("Pass cards state to `Board` as props", () => {
    const board = wrapper.find(Board).first();
    expect(board.props().cards).toEqual(wrapper.state().cards);
  });

  describe("User clicks a card", () => {
    beforeEach(() => {
      const board = wrapper.find(Board).first();
      board.simulate("cardClick", 1);
    });

    it("and the card should flip", () => {
      const cards = wrapper.state().cards.map(card => {
        return Object.assign({}, card);
      });
      cards[0].flipped = true;
      expect(wrapper.state().cards[0].flipped).toBeTruthy();
      expect(wrapper.state().cards).toEqual(cards);
    });

    describe("Then clicks another card", () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      describe("and they are not pairs", () => {
        beforeEach(() => {
          const board = wrapper.find(Board).first();
          board.simulate("cardClick", 3);
        });

        it("both cards should flip back", () => {
          jest.runAllTimers();
          expect(wrapper.state().cards[0].flipped).toBeFalsy();
          expect(wrapper.state().cards[2].flipped).toBeFalsy();
        });

        it("clicks a third one and should not flip", () => {
          const board = wrapper.find(Board).first();
          board.simulate("cardClick", 4);
          jest.runAllTimers();
          expect(wrapper.state().cards[3].flipped).toBeFalsy();
        });
      });

      describe("and they are pairs", () => {
        beforeEach(() => {
          const board = wrapper.find(Board).first();
          board.simulate("cardClick", 2);
        });

        it("both cards should not be playable anymore", () => {
          jest.runAllTimers();
          expect(wrapper.state().cards[0].played).toBeTruthy();
          expect(wrapper.state().cards[1].played).toBeTruthy();
        });

        it("both cards should not be clickeable after played", () => {
          jest.runAllTimers();
          const board = wrapper.find(Board).first();
          board.simulate("cardClick", 1);
          board.simulate("cardClick", 2);
          expect(wrapper.state().cards[0].flipped).toBeTruthy();
          expect(wrapper.state().cards[1].flipped).toBeTruthy();
        });

        it("clicks a third one and should not flip", () => {
          const board = wrapper.find(Board).first();
          board.simulate("cardClick", 4);
          jest.runAllTimers();
          expect(wrapper.state().cards[3].flipped).toBeFalsy();
        });
      });
    });

    describe("and then clicks it once again", () => {
      beforeEach(() => {
        const board = wrapper.find(Board).first();
        board.simulate("cardClick", 1);
      });

      describe("but is the only card flipped", () => {
        it("should not flip back", () => {
          expect(wrapper.state().cards[0].flipped).toBeTruthy();
        });
      });
    });
  });
});
