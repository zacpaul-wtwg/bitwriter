// doneTagStrategy.ts
export const doneTagStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'DONE_TAG'
      );
    },
    callback
  );
};
