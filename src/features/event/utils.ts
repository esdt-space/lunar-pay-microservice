import { Donation } from "../donations/entities";
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

export const getSortedDonations = (donationsList: Donation[]) => {
  const total: Map<string, {amount: number}> = new Map();

  donationsList.forEach((item) => {
    const key = `${item.owner}`;
    const amount = Number(item.totalAmount);

    if (!isNaN(amount)) {
      if (total.has(key)) {
        const existing = total.get(key);
        total.set(key, { amount: existing.amount + amount});
      } else {
        total.set(key, { amount: amount});
      }
    }
  });

  const result = [];
  
  total.forEach((value, key) => {
    const [owner] = key.split('-');
    result.push({ owner, amount: value.amount.toString() });
  });

  return result.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
}
