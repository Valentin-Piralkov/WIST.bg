export type FilterOption<T extends string> = {
  value: boolean;
  label: T;
};

export type Filter<T extends string> = {
  label: T;
  options: FilterOption<T>[];
};

export type Section<T extends string> = {
  id: number;
  label: T;
};
