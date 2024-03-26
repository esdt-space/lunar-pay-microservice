export type UserAction = {
  type: string;
  count: number;
}

export type UserActionsCount = {
  userId: string;
  allActions: number;
  actions: UserAction[];
}
