import { UserActionsCount } from "./types";

export const mergeActionCounts = (arrays: UserActionsCount[][]) => {
  const userActionsMap: { [user: string]: UserActionsCount } = {};
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
      if (!userActionsMap[item.userId]) {
        userActionsMap[item.userId] = {
          userId: item.userId,
          actions: Array.from(allActionTypes).map(type => ({ type, count: 0 })),
          allActions: 0,
        };
      }

      item.actions.forEach(action => {
        const actionEntry = userActionsMap[item.userId].actions.find(a => a.type === action.type);
        
        if (actionEntry) {
          actionEntry.count += action.count;
          userActionsMap[item.userId].allActions += action.count;
        }
      });
    });
  });

  return Object.values(userActionsMap);
}
