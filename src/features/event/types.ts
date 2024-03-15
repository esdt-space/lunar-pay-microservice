export type UserAction = {
  type: string;
  count: number;
}

export type UserActionsCount = {
  _id: string;
  allActions: number;
  actions: UserAction[];
}
