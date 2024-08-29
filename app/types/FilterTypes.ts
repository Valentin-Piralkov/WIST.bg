export type FilterOption<T extends string> = {
  value: boolean;
  label: T;
};

export type Filter<T extends string> = {
  label: T;
  options: FilterOption<T>[];
};
