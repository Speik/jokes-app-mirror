import { JokeType } from '@/declarations';

type GetCategoriesResponse = {
  error: boolean;
  categories: string[];
  categoryAliases: { alias: string; resolved: string; }[],
  timestamp: number;
}

type GetJokeResponse = {
  error: boolean;
  category: string;
  type: JokeType;
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: { [flagName: string]: boolean };
  id: number;
  safe: boolean;
  lang: string;
}
