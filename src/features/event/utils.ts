import { UserActionsCount } from "./types";

export const mergeActionCounts = (arrays: UserActionsCount[][]) => {
  const userActionsMap: { [userId: string]: UserActionsCount } = {};
  const allActionTypes: Set<string> = new Set();

  arrays.forEach(array => {
    array.forEach(item => {
      item.actions.forEach(action => {
        allActionTypes.add(action.type);
      });
    });
  });

  arrays.forEach(array => {
    array.forEach(item => {
      if (!userActionsMap[item._id]) {
        userActionsMap[item._id] = {
          _id: item._id,
          actions: Array.from(allActionTypes).map(type => ({ type, count: 0 })),
          allActions: 0,
        };
      }

      item.actions.forEach(action => {
        const actionEntry = userActionsMap[item._id].actions.find(a => a.type === action.type);
        
        if (actionEntry) {
          actionEntry.count += action.count;
          userActionsMap[item._id].allActions += action.count;
        }
      });
    });
  });

  return Object.values(userActionsMap);
}
