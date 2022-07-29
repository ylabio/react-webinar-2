import { NULL_ENDING, WORD_ENDING } from "./constants";
import { getCountRemainder } from "./utils";

const wordEndingHelper = (entriesCount) => {
  const isEndingPredictable =
    getCountRemainder(entriesCount) >= 2 && getCountRemainder(entriesCount) < 5;

  const isEndingUnpredictable = entriesCount > 10 && entriesCount < 20;

  if (isEndingUnpredictable) {
    return NULL_ENDING;
  }

  if (isEndingPredictable) {
    return WORD_ENDING;
  }

  return NULL_ENDING;
};

export { wordEndingHelper };
